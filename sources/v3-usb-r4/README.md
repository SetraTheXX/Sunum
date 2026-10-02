# V3 USB r4 — 53 durum ve metadata düzeltmesi, 2026-10-02

Thread'de kabul edilen 53 durumlu ana rota ve metadata yarışı düzeltmesi mevcut `backup/make-backup.py` yöntemiyle paketlendi. Bu rapor Developer paket kontrolüdür; yeni arşivin bağımsız QA kabulü bekleniyor.

- Nihai ZIP: `backup/Sunum-v3-usb-20261002-r4-53-verified.zip`.
- SHA-256: `1b05832a17a5f6b2a7471879f6d6b781dc651ffdbe0d1f035b09cd5265e578ca`.
- Boyut: 47.563.831 byte; 80 dosya. `contents.json` her dosyanın boyut/hash manifestidir; `contents.txt` tam yol listesidir; `SHA256SUMS.txt` arşiv hash'idir.
- Temiz build PASS (`build.txt`): önceki dist silinmeden geçici klasörde korundu. Arşivde kullanılmayan JS/CSS 0; 1 referanslı JS ve 1 CSS (`package-scope.json`).
- Paket: hazır dist, kaynak/12 sahne, iki kısa gerçek replay (24,5/34 sn), dört korunmuş kayıt ve posterleri, meta final JSON'u, redakte eski transcript JSON arşivi, offline başlatıcı/sunucu, konuşma ve demo yönergeleri, demo şablon/betikleri, güncel evaluator'lar ve boş prova çizelgesi. Ham oturumlar, hesaplar, node_modules ve değişken demo çalışma kopyaları yok.

## Çıkarılmış offline kontrol

ZIP ayrı yeni geçici klasöre çıkarıldı (`launcher-final.json` yerel çıkarma konumunu içerir). Belgelenmiş `Start-Sunum.bat` çalıştırıldı; Windows PowerShell 5.1/.NET sunucusu başladı. Testte otomatik browser açılışı bastırıldı; bildirilen adres ayrıca browser panelinde açıldı: http://localhost:8001/ . Sunucu erişilebilir bırakıldı; internet kurulumuna ihtiyaç yok.

`python scripts/verify-usb-v3.py <url> <çıkarma-kökü> <nihai-zip> sources/v3-usb-r4` PASS (`verification.json`, `test-output.txt`):

- ZIP CRC ve her çıkarılmış dosyanın manifest hash'i; başlatıcı SHA256SUMS kontrolü.
- Browser dış istekleri engellendi; bağımsız engelleme probu PASS. Bilgisayarın ağ ayarları değiştirilmedi.
- Presenter/Audience **53'er durum**, ileri/geri gezinme; final Scene 12 Adım 4. Meta finalde iki gerçek diff referansı var.
- Scene 08 Adım 4 ve Scene 11 Adım 5 kısa klip: metadata/süre, HTTP 206 byte-range, Space play/pause. Audience'da uzun fallback seçim düğmesi yok.
- Dört kayıt × iki görünüm: Space play/pause, yerel MP4 HTTP 206 ve poster HTTP 200. Uzun Scene 08/11 kayıtları önce Presenter'da açık seçimle açıldı, gerektiğinde Audience'a geçildi. → aynı adıma döndürdü; sonraki → sonraki sahneye geçti.
- Sayfa hatası, HTTP hata yanıtı ve dış sayfa isteği 0.

Çıkarılmış pakette `scripts/diagnose-media.py` ile metadata isteğine 800 ms kontrollü gecikme verildi (browser testinde; ağ ayarları değiştirilmedi): iki kısa klip × erken/metadata-hazır Space × üç tekrar = **12/12 PASS**, erken altı vakada zorunlu son-kare bitişi **0/6** (`metadata-race.json`, `metadata-summary.json`, `metadata-output.txt`). Başlatma sonrasında oynatma baştan ilerledi. Paket kaynaklarında metadata guard'ı ve güncel evaluator doğrulandı.

## Paket turundaki değişiklikler ve koruma

Uygulama kodu bu tur değiştirilmedi. `scripts/verify-usb-v3.py` artık geri rotayı, Presenter-only seçimi ve fallback dönüşünü kontrol ediyor; Space sonrası React durum alanını senkron okuyup aralıklı yanlış FAIL üretmek yerine Playwright'in beklemeli assertion'ını kullanıyor. `backup/README-OFFLINE.txt` açık duraksama/prova sınırını içeriyor. Python derleme ve `git diff --check` PASS.

İlk aday `Sunum-v3-usb-20261002-r4-53.zip` silinmedi; nihai yukarıdaki `-verified.zip` seçilmeli. Önceki beş arşivin hash'i değişmedi (`old-archives.json`, `package-scope.json`); accepted-r3 SHA-256 hâlâ `99beda7b159f41f9071188319eb9cac088a6d31778cdbd60ce69b7a7da8873f2`. Accepted-r3 eski 55 durumlu snapshot olarak korunuyor.

## Açık sınırlar

Metadata yarışı düzeltmesi kabul edilmiş olsa da aralıklı `waiting`/duraksamanın kesin kök nedeni açık. Bu testler her tarayıcı/cihazda kesintisiz oynatma garantisi değildir. İnsan süreli prova ve gerçek USB/sunum bilgisayarı/projektör saha kapıları kapanmadı. Kullanıcı sahne başlangıç/bitişlerini, toplam süreyi, kısa klip/uzun fallback/canlı demo seçimini ve fallback neden/süresini paket içindeki prova çizelgesine kaydetmeli. Yeni paket için bağımsız QA kontrolü sonraki adımdır.

Graphify sorgusu çalıştı; güncel paket evaluator'ı grafikte bulunmadığından kaynakla doğrulandı. Graph build/update yapılmadı. `feat/v3-wow` korundu; commit/push/deploy yok.
