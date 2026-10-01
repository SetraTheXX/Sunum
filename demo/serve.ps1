<#
  demo/app klasörünü http://localhost:5500/, -Folder app-team ile demo/app-team klasörünü
  http://localhost:5501/ adresinde sunar. Kurulum, npm veya Python gerektirmez
  (Windows PowerShell 5.1'in yerleşik HttpListener'ı). Yalnız bu bilgisayardan erişilir.
  Durdurmak için pencerede Ctrl+C.

    powershell -ExecutionPolicy Bypass -File demo\serve.ps1
    powershell -ExecutionPolicy Bypass -File demo\serve.ps1 -Folder app-team
#>
param([ValidateSet('app', 'app-team')][string]$Folder = 'app', [int]$Port = 0)
if (-not $Port) { $Port = if ($Folder -eq 'app-team') { 5501 } else { 5500 } }
$ErrorActionPreference = 'Stop'
[Console]::OutputEncoding = [Text.Encoding]::UTF8
$root = Join-Path (Split-Path -Parent $MyInvocation.MyCommand.Path) $Folder
if (-not (Test-Path (Join-Path $root 'index.html'))) { throw "demo\$Folder yok. Önce demo\reset.ps1 çalıştırın." }
$root = (Resolve-Path $root).Path

$types = @{ '.html' = 'text/html; charset=utf-8'; '.css' = 'text/css; charset=utf-8'; '.js' = 'text/javascript; charset=utf-8';
  '.svg' = 'image/svg+xml'; '.png' = 'image/png'; '.jpg' = 'image/jpeg'; '.ico' = 'image/x-icon'; '.json' = 'application/json' }

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$Port/")
$listener.Start()
Write-Host "Demo hazır ($Folder): http://localhost:$Port/  (Ctrl+C ile durdurun)"
try {
  while ($listener.IsListening) {
    $context = $listener.GetContext()
    $response = $context.Response
    try {
      $path = [Uri]::UnescapeDataString($context.Request.Url.AbsolutePath).TrimStart('/')
      if ($path -eq '' -or $path.EndsWith('/')) { $path += 'index.html' }
      $file = [IO.Path]::GetFullPath((Join-Path $root $path))
      if (-not $file.StartsWith($root, [StringComparison]::OrdinalIgnoreCase)) { $response.StatusCode = 403 }
      elseif (-not (Test-Path -LiteralPath $file -PathType Leaf)) { $response.StatusCode = 404 }
      else {
        $bytes = [IO.File]::ReadAllBytes($file)
        $ext = [IO.Path]::GetExtension($file).ToLowerInvariant()
        $response.ContentType = if ($types.ContainsKey($ext)) { $types[$ext] } else { 'application/octet-stream' }
        # Each refresh shows the agent's latest edit.
        $response.Headers['Cache-Control'] = 'no-store'
        $response.ContentLength64 = $bytes.Length
        if ($context.Request.HttpMethod -ne 'HEAD') { $response.OutputStream.Write($bytes, 0, $bytes.Length) }
      }
    } catch { $response.StatusCode = 500 } finally { $response.Close() }
  }
} finally { $listener.Stop() }
