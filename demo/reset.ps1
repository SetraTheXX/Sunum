<#
  Canlı demo için hedef uygulamayı başlangıç durumuna döndürür.

  demo/template/ hiç değişmez. Bu betik demo/app/ ve demo/app-team/ klasörlerini silip şablondan
  yeniden kopyalar; git varsa her birinde ayrı bir git deposu açıp "başlangıç" commit'i atar. Böylece ajan
  değişiklikleri `git diff` ile gösterebilir ve ana sunum deposu hiç etkilenmez (demo/app ve demo/app-team gitignore'da).
  Sunumdan önce bir kez (ve her provadan sonra) çalıştırın; sunum sırasında yeniden çalıştırmayın:

    powershell -ExecutionPolicy Bypass -File demo\reset.ps1
#>
$ErrorActionPreference = 'Stop'
[Console]::OutputEncoding = [Text.Encoding]::UTF8
$demo = Split-Path -Parent $MyInvocation.MyCommand.Path
$template = Join-Path $demo 'template'
if (-not (Test-Path (Join-Path $template 'index.html'))) { throw "Şablon bulunamadı: $template" }

# One run before the presentation prepares both working copies from the same template:
#   app      → Scene 05 (üretim) and Scene 08 (kontrol of the same change)
#   app-team → Scene 11 (the same task from the start, with role handoff)
foreach ($name in 'app', 'app-team') {
  $app = Join-Path $demo $name
  # Only demo\app and demo\app-team are ever deleted.
  if ((Split-Path -Parent $app) -ne $demo) { throw "Beklenmeyen hedef yol: $app" }
  if (Test-Path $app) { Remove-Item -LiteralPath $app -Recurse -Force }
  New-Item -ItemType Directory -Path $app | Out-Null
  Copy-Item -Path (Join-Path $template '*') -Destination $app -Recurse

  $git = Get-Command git -ErrorAction SilentlyContinue
  if ($git) {
    Push-Location $app
    try {
      git init --quiet --initial-branch=main
      # Line endings are normalised, so an agent saving CRLF on Windows shows only its real change in git diff.
      git config core.autocrlf false
      git config core.eol lf
      Set-Content -Path (Join-Path $app '.git\info\attributes') -Value '* text=auto' -Encoding ascii
      git add --all
      git -c user.name='Sunum Demo' -c user.email='demo@example.invalid' -c commit.gpgsign=false commit --quiet -m 'Demo başlangıç durumu: mobil menü yok'
      $head = (git rev-parse --short HEAD).Trim()
      $dirty = (git status --porcelain | Measure-Object).Count
    } finally { Pop-Location }
    Write-Host "Demo sıfırlandı: $app (git $head, değişiklik: $dirty)"
  } else {
    Write-Host "Demo sıfırlandı: $app (git bulunamadı; diff gösterimi olmadan devam edilebilir)"
  }
}
