<#
  Sunum için kurulum gerektirmeyen yerel web sunucusu.
  Yalnız Windows'un yerleşik PowerShell 5.1 ve .NET HttpListener sınıfını kullanır;
  Python, Node, npm veya ek program gerekmez. Yalnız bu bilgisayardan (localhost) erişilir.
  Start-Sunum.bat tarafından çağrılır; pencere kapatılınca sunucu durur.
#>
param(
  [Parameter(Mandatory = $true)][string]$Root,
  [int]$Port = 8000,
  [switch]$NoBrowser
)

$ErrorActionPreference = 'Stop'
# Turkish letters in the console window display correctly on English and Turkish Windows alike.
try { [Console]::OutputEncoding = [System.Text.Encoding]::UTF8 } catch { }
$Root = [System.IO.Path]::GetFullPath($Root).TrimEnd('\') + '\'
if (-not (Test-Path -LiteralPath (Join-Path $Root 'index.html'))) {
  Write-Host "dist klasörü bulunamadı: $Root" -ForegroundColor Red
  exit 2
}

$mime = @{
  '.html' = 'text/html; charset=utf-8'; '.js' = 'application/javascript; charset=utf-8'
  '.css' = 'text/css; charset=utf-8'; '.json' = 'application/json; charset=utf-8'
  '.png' = 'image/png'; '.jpg' = 'image/jpeg'; '.svg' = 'image/svg+xml'
  '.ico' = 'image/x-icon'; '.mp4' = 'video/mp4'; '.woff2' = 'font/woff2'
}

# The first free port from 8000 upward; localhost prefixes need no administrator rights.
$listener = $null
for ($p = $Port; $p -lt $Port + 20; $p++) {
  $candidate = New-Object System.Net.HttpListener
  $candidate.Prefixes.Add("http://localhost:$p/")
  try { $candidate.Start(); $listener = $candidate; $Port = $p; break } catch { $candidate.Close() }
}
if (-not $listener) {
  Write-Host 'Yerel sunucu başlatılamadı (8000-8019 portları kullanılamıyor).' -ForegroundColor Red
  exit 3
}

$url = "http://localhost:$Port/"
Write-Host ''
Write-Host '  Sunum hazır:' -NoNewline; Write-Host " $url" -ForegroundColor Green
Write-Host '  Tarayıcı açılmazsa bu adresi Edge veya Chrome''a yazın.'
Write-Host '  Sunum bitince bu pencereyi kapatın.'
Write-Host ''
if (-not $NoBrowser) { Start-Process $url }

function Send-File($context) {
  $request = $context.Request
  $response = $context.Response
  try {
    $relative = [System.Uri]::UnescapeDataString($request.Url.AbsolutePath).TrimStart('/')
    if ($relative -eq '') { $relative = 'index.html' }
    $path = [System.IO.Path]::GetFullPath((Join-Path $Root $relative))
    if (-not $path.StartsWith($Root, [System.StringComparison]::OrdinalIgnoreCase) -or -not (Test-Path -LiteralPath $path -PathType Leaf)) {
      $response.StatusCode = 404
      return
    }

    $extension = [System.IO.Path]::GetExtension($path).ToLowerInvariant()
    $response.ContentType = if ($mime.ContainsKey($extension)) { $mime[$extension] } else { 'application/octet-stream' }
    $response.Headers['Accept-Ranges'] = 'bytes'
    $response.Headers['Cache-Control'] = 'no-cache'

    $stream = [System.IO.File]::OpenRead($path)
    try {
      $length = $stream.Length
      $start = 0L; $end = $length - 1
      # Videos are read in byte ranges; answer "bytes=a-b" requests with 206 Partial Content.
      $range = $request.Headers['Range']
      if ($range -and $range -match '^bytes=(\d*)-(\d*)$') {
        if ($Matches[1] -ne '') { $start = [long]$Matches[1]; if ($Matches[2] -ne '') { $end = [Math]::Min([long]$Matches[2], $length - 1) } }
        elseif ($Matches[2] -ne '') { $start = [Math]::Max(0L, $length - [long]$Matches[2]) }
        if ($start -gt $end) {
          $response.StatusCode = 416
          $response.Headers['Content-Range'] = "bytes */$length"
          return
        }
        $response.StatusCode = 206
        $response.Headers['Content-Range'] = "bytes $start-$end/$length"
      }
      $count = $end - $start + 1
      $response.ContentLength64 = $count
      if ($request.HttpMethod -eq 'HEAD') { return }
      $stream.Position = $start
      $buffer = New-Object byte[] 65536
      while ($count -gt 0) {
        $read = $stream.Read($buffer, 0, [int][Math]::Min($buffer.Length, $count))
        if ($read -le 0) { break }
        $response.OutputStream.Write($buffer, 0, $read)
        $count -= $read
      }
    } finally { $stream.Dispose() }
  } catch {
    # The browser often cancels a video request midway; that is expected and not an error.
  } finally {
    try { $response.Close() } catch { }
  }
}

try {
  while ($listener.IsListening) {
    $pending = $listener.BeginGetContext($null, $null)
    # Short waits keep Ctrl+C responsive while idle.
    while (-not $pending.AsyncWaitHandle.WaitOne(250)) { }
    Send-File ($listener.EndGetContext($pending))
  }
} finally {
  $listener.Close()
}
