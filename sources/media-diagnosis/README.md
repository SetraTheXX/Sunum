# Aralıklı medya duraksaması — Developer incelemesi, 2026-10-02

Yeni düzeltme ve kanıtlar QA'nın bağımsız doğrulamasını bekliyor. QA'nın özgün tarayıcı/olay kaydı kaynak belgelerinde bulunamadı; thread'deki genel bulgu ve önceki `paused=false / readyState=2` test gözlemi incelendi. Özgün QA olayının birebir aynı kök nedenden geldiği iddia edilmez.

## Doğrulanan oynatıcı hatası

Kısa klip açıldığında `TranscriptReplay.onLoadedMetadata` videoyu son kareye alıyordu. Kullanıcı metadata gelmeden Space ile başlatırsa, gecikmiş metadata handler'ı başlayan oynatmayı son kareye taşıyor; hemen `pause` ve `ended` geliyor. Bu normal buffering değil, uygulamanın kullanıcı isteğini ezmesi.

Headless Edge 154.0.4258.48, localhost Vite preview, yeni/cold browser context; MP4 metadata isteğine 800 ms kontrollü gecikme. İki kısa klip × erken/metadata-hazır Space × üç tekrar: 12 vaka.

- Önce: erken Space vakalarının **6/6**'sı son karede durdu; normal Space vakaları baştan ilerledi (`before.json`, `before-output.txt`). Olay sırası: play(0) → waiting → loadedmetadata → seeking(24,4/33,9) → playing → pause/ended(24,5/34).
- Sonra: **12/12** başlatma vakası baştan ilerledi; erken vakalarda zorunlu son-kare atlaması **0/6** (`after.json`, `after-output.txt`, `race-summary.json`).
- Dar düzeltme yalnız `src/TranscriptReplay.tsx`: oynat/bölüm seçimi niyeti ref ile tutulur; kullanıcı etkileşmişse metadata handler'ı son kareye taşımaz. Kullanıcının kasıtlı pause/seek/çıkışla iptal ettiği bekleyen play isteğinin `AbortError`'ı video açılamadı hatası gibi gösterilmez. Etkileşim yoksa reload'un son karede durma davranışı korunur.

## Ayrı tarayıcı/medya gözlemi ve sınırlar

4× oynatma hızında hem uygulamada hem React/ajan kontrolü olmayan aynı localhost origin'indeki yalın `<video>` belgesinde `waiting` görüldü (`native-comparison.json`, `native-output.txt`). Bu olaylarda `paused=false`, medya hatası yok ve tampon bazı vakalarda `[0, tam süre]` olmasına rağmen `readyState=2`. Dolayısıyla yalnız dosya indirme eksikliği açıklaması yeterli değil; tarayıcının seek/kare hazırlama hattı araştırılmalı. Bunun CPU, decoder veya headless zamanlaması kaynaklı olduğunu ayıran bir profil alınmadı; kesin neden iddia edilmez.

Native fixture HTML'i Playwright ile sunuldu; request interception/cache ve preload davranışları uygulamayla tamamen eşlenmiş bir performans benchmark'ı değildir. Bu kontrol yalnız uygulamanın Space/pause handler'ı olmadan da bekleme oluşabildiğini gösterir. 4× hız bir stres koşuludur; insanın 1× saha izlemesine eşit değildir. Erken/normal 1× testteki `waiting` olayları da before/after event dökümlerinde görünür. Tekrarlı testlerin geçmesi hiçbir cihazda duraksama olmayacağı garantisi değildir.

## Bağımlılık/etki kontrolü

Graphify query ve SceneVisual komşuları sorgulandı: App → SceneVisual → medya görünümü; içerik ve motion bağımlılıkları kontrol edildi. Yeni TranscriptReplay modülü grafikte yok; kaynak import'u, ayrı kısa video ref'i, uzun kayıt oynatıcı effect cleanup'ı ve App Space/fallback/view akışı kaynaktan doğrulandı. Graph güncellemesi yapılmadı. App, SceneVisual, uzun video dosyaları ve sunucu bu tur değiştirilmedi.

## Kontroller

- `npm run build`: PASS (`build.txt`). Python test betiklerinin derleme ve `git diff --check` kontrolü PASS.
- `scripts/diagnose-media.py`: yukarıdaki 12 önce/12 sonra vakası; gecikme browser testinde uygulandı, bilgisayar ağ ayarları değiştirilmedi.
- `scripts/verify-media-transitions.py`: **12** tekrar (iki sahne × kısa/uzun × üç); Space play/pause, bölüm okları, fallback dönüşü, sahne çıkışında eski öğenin paused/unmounted olması, Presenter→Audience→Presenter'da aynı video öğesi/zaman/oynatma durumu korunması PASS (`transitions.json`, `transitions-output.txt`). Erken ikinci Space ile kasıtlı play iptali yanlış hata göstermedi.
- Güncel `scripts/verify-replay-media.py` tüm turu PASS (`verification.json`, `regression-output.txt`): **53 durum × iki görünüm**, iki kısa klibin son kareye kadar decoder oynatması, dört kayıt kontrolü, fallback dönüşleri, reload/reduced-motion/çıkış, JSON gizlilik taraması 0, sayfa hatası/dış istek 0. 1920/1366 kareleri `screenshots/media-diagnosis/`; kesilme/negatif kontrol PASS.
- `scripts/verify-fallback-offline.py` PASS (`offline-verification.json`, `offline-output.txt`): Windows PowerShell yerel sunucusu, dış browser trafiği engelli/probe; 53 durum ileri/geri × iki görünüm, meta final, altı medya × iki görünüm, HTTP 206/200 yerel medya/poster yolları, Space, aynı adıma dönüş ve R/J kontrolleri. Bu dist testidir; yeni USB oluşturulmadı.
- Preview: http://127.0.0.1:4173/ ; offline test sunucusu: http://localhost:8020/ .
- accepted-r3 ZIP değişmedi (`preservation.json`): SHA-256 `99beda7b159f41f9071188319eb9cac088a6d31778cdbd60ce69b7a7da8873f2`.

Bu tur değişen yollar: `src/TranscriptReplay.tsx`; yeni `scripts/diagnose-media.py`, `scripts/verify-media-transitions.py`, `scripts/compare-media-buffering.py`; bu kanıt klasörü ve `screenshots/media-diagnosis/`. Güncel offline evaluator'ın çıktı dosyası `sources/fallback-route/offline-verification.json` yeniden üretildi ve burada kopyası tutuldu. Mevcut çalışma ağacındaki önceki değişiklikler korunuyor.

QA: erken Space/metadata yarışını ve özgün duraksama senaryosunu bağımsız doğrulayın. Özgün olay için browser/headless/hız, süre, readyState, paused, buffered ve hata/olay dizisi kaydı gerekli; yalnız “video durdu” aynı kök nedenin kanıtı değildir. İnsan süreli prova ve gerçek sunum bilgisayarı/USB/projektör saha kapıları açık. `feat/v3-wow`; commit/push/deploy yapılmadı. Önceki QA PASS yeni düzeltmeye taşınmadı.
