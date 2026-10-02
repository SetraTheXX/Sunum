# V3 genel kalite turu — Developer kanıtı, 2026-10-02

Durum: Developer incelemesi ve otomatik kontroller geçti. Son thread iletisinde yerel uygulama için QA PASS bildirildi; USB kabulü iki belge/paket kapsamı düzeltmesi bekliyor. Aşağıdaki son paket düzeltmeleri için bağımsız QA kabulü henüz yok. İnsan süreli prova yapılmadı; G9 ve saha kontrolleri açık.

## Kapsam ve düzeltmeler

30 dakikalık rotanın 12 sahnesi ve 55 durumu incelendi. Metin açıklığı/yazım, görsel hizalama ve okunabilirlik, geçiş cümleleri, Presenter notları, dört mevcut video ve iki replay kontrol edildi. Yeni özellik veya bağımlılık eklenmedi.

- `README.md`: güncel gerçek kayıt evaluator'ı ve kanıt bağlantısı düzeltildi.
- `scenes/11-vi3ecode.md`: kısa replay / uzun fallback geçişi netleştirildi; ayar ekranından tüm roller için model ataması çıkaran ifade kaldırıldı.
- `scenes/12-final.md`: Git sayılarının commit edilmemiş V3 çalışmalarını kapsamadığı açıklandı; kanıtsız “her değişikliği ben onayladım” ifadesi çıkarıldı.
- `FINAL_KONUSMA_AKISI.md`: model ataması sınırı ve finalde gerçek Git kanıtı adımı hizalandı.
- `scripts/review-general-quality.py`: 55 durum × iki görünüm × iki çözünürlük için rota/geometri taraması; 12 sahnenin tam Presenter notları; yatay taşma ve dikey kesilme hata koşulları.
- `backup/make-backup.py`: sonraki kabul edilmiş paket için iki replay kaynak MP4'ü, güncel evaluator'lar ve demo runbook'u mevcut allowlist'e eklendi.
- `scripts/verify-usb-v3.py`: replay medya yolları için yerel URL, metadata/süre ve HTTP 206 byte-range kontrolü eklendi. Bu yeni kontrol henüz yeni bir arşiv üzerinde çalıştırılmadı.

## Doğrulama

- `npm run build`: PASS (`build.txt`). Önceki dist silinmeden geçici dizine taşındı; temiz build üretildi. Yalnız girişte referans verilen 1 JS / 1 CSS var; kullanılmayan JS/CSS: 0 (`build-manifest.json`).
- Genel rota: 220 geometri vakası PASS; yatay taşma ve dikey kesilme 0; sayfa hatası, HTTP hata yanıtı ve dış istek 0 (`route-audit.json`, `tour-output.txt`).
- `python scripts/verify-replay-media.py http://localhost:4173`: PASS (`regression-output.txt`, `../replay-media/verification.json`). Presenter/Audience 55'er durum; dört video iki görünümde; iki gerçek replay tam oynatma, Space, bölüm okları, reload, reduced-motion ve çıkış; sekiz replay dikey kesilme vakası ve negatif kontrol geçti. JSON e-posta/kullanıcı yolu/secret taraması: 0 eşleşme.
- Temiz build'in altı MP4 yolu HTTP 206 ile erişildi; poster yolları HTTP 200 (`build-manifest.json`). Bu preview kontrolüdür; çıkarılmış yeni USB testi değildir.
- 1920×1080 / 1366×768 Presenter/Audience kareleri: `screenshots/general-quality/`; replay kareleri: `screenshots/replay-media/`. 1366 toplu inceleme kareleri `contact-presenter-1366.jpg` ve `contact-audience-1366.jpg`.
- Python derleme kontrolü ve `git diff --check`: PASS. Mevcut çalışma ağacındaki başka değişiklikler geri alınmadı; AGENTS.md bu turda düzenlenmedi.
- Preview: http://localhost:4173/ (yerel, erişilebilir).

## USB ve QA sırası

Yerel uygulamanın bildirilen QA PASS'i paket kabulü değildir. Bu nedenle yeni V3 USB ZIP oluşturulmadı; yeni arşiv SHA-256 ve çıkarılmış offline test için PASS iddia edilmez. QA kabulünden sonra temiz build'den mevcut `backup/make-backup.py --output <yeni-ad>.zip` yöntemi kullanılmalı; eski arşivler korunmalı. Ayrı geçici klasöre çıkarılıp `Start-Sunum.bat` / belgelenmiş PowerShell sunucusuyla açılmalı; `scripts/verify-usb-v3.py` ile hash/CRC, 55 durum, meta final, dört video ve iki replay medya yolları doğrulanmalı.

Son paket düzeltmeleri: iletide iki düzeltmenin ayrıntıları bulunmadığından kaynakta doğrulanan iki uyumsuzluk giderildi. `backup/README-OFFLINE.txt` eski 79/74 sn metin replay anlatımı yerine güncel 24,5/34 sn yerel MP4'leri, son karede reload davranışını ve arşiv JSON'larının durumunu açıklıyor. `backup/make-backup.py` artık demo runbook'unun gerektirdiği `demo/reset.ps1`, `demo/serve.ps1`, `demo/template/index.html` ve `demo/template/styles.css` dosyalarını içeriyor; değişken app/app-team kopyaları hariç tutuluyor. Allowlist dosya varlığı, runbook bağımlılıkları ve süre uyumu kontrolü PASS (`package-scope-check.json`); Python derleme ve diff kontrolü PASS. Uygulama kodu bu düzeltmelerde değişmedi.

Korunan son eski paket: `backup/Sunum-v3-usb-20261002-clean-r2.zip`.
SHA-256: `343eb091548c616a8078444382ebc23495477cf0f448da9cc0c26595d55cef43`.
Bu hash eski paketin değişmediğini gösterir; yeni kalite düzeltmelerini içerdiği anlamına gelmez.

## İnsan süreli prova

Kullanıcı sunum bilgisayarında kronometreyi başlatsın. Her sahnenin başlangıç/bitiş süresini ve kullanılan yolu (canlı demo / kısa replay / uzun fallback) `sources/phase-11/rehearsal-sheet.md` üzerine kaydetsin. Fallback'e geçildiyse nedeni ve harcanan süreyi de yazsın; toplam süreyi sonunda kaydetsin. Aynı klibin kısa ve uzun sürümlerini zorunlu olarak art arda oynatmasın. Roadmap G9 için iki tam prova ve ≤28 dakika hedefi değerlendirilsin. Projektör okunurluğu, gerçek offline bilgisayar/USB, tam ekran ve klavye kontrolü saha ortamında ayrıca denensin. Bu adımlar burada yapılmış sayılmıyor.
