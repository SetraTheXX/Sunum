# Scene 08/11 kısa ana rota ve seçilen uzun fallback — 2026-10-02

Developer doğrulaması tamamlandı; yeni davranış için bağımsız QA bekleniyor. Analyst'in yeni araştırma sonuçları bu paralel dalın thread'inde henüz yok; adım bulguları doğrudan `src/App.tsx`, `src/sceneVideos.ts`, `src/replays.ts` ve sahne belgelerinden doğrulandı. Resmî aday araştırması veya video indirme yapılmadı.

## Davranış ve Plan Delta

Önceki kabul edilen yerel sürümde uzun kayıtlar normal ileri gezinmede Scene 08 Adım 5 ve Scene 11 Adım 6 idi. Kullanıcının bu turdaki açık kapsamına göre bu iki normal adım çıkarıldı. Ana rota **53 durum** (önceki 55 − 2). Kısa gerçek klipler Scene 08 Adım 4 (24,5 sn) ve Scene 11 Adım 5 (34 sn) olarak korundu. Uzun kayıtların yaklaşık 104 saniyelik toplamı artık varsayılan rotada zorunlu değil; insan süreli toplam süre ölçülmedi.

Uzun kayıt yalnız Presenter'daki “Uzun kaydı aç (fallback)” seçimiyle açılır; seçimdeki adım saklanır. “Ana rotaya dön”, ← veya → aynı adıma döndürür; ardından rota devam eder. J/K sahne değiştirir; R sahne başına dönüp fallback'i kapatır. Reload normal adımı gösterir. Audience'da seçim düğmesi yoktur; Presenter'da seçilmiş fallback Audience'a geçerken gösterilebilir. Video Space ile oynar/durur; seçimden sonra video alanına odak verilir. Dönüş düğmesi Space/Enter ile kullanılabilir. Eski dört video ve iki kısa MP4 değişmedi.

## Bu tur değişen yollar

- `src/App.tsx`, `src/SceneVisual.tsx`, `src/sceneVideos.ts`, `src/replays.ts`: rota, açık fallback seçimi, aynı adıma dönüş ve medya görünümü.
- `src/TranscriptReplay.tsx`: replay dışındaki düğmelerin Space olayını yakalamaz.
- `src/styles.css`: fallback satırının boşluğu azaltıldı; 1366 kısa replay ve 1366/1920 uzun fallback not başlığı kesilmesi giderildi. Uzun fallback'te tekrarlanan başlık/ipucu gizlendi. Video ve QA metni boyutu korundu.
- `scenes/08-agentic-engineering.md`, `scenes/11-vi3ecode.md`, `FINAL_KONUSMA_AKISI.md`, `README.md`, `demo/README.md`, `DESIGN_PRINCIPLES.md`, `backup/README-OFFLINE.txt`: ana rota/fallback anlatımı ve adım eşlemeleri.
- `scripts/verify-replay-media.py`, `scripts/verify-usb-v3.py`, `scripts/review-general-quality.py`: güncel 53 durum ve seçilmiş fallback beklentileri. Eski kabul edilmiş paketin içindeki evaluator değiştirilmedi.
- `scripts/verify-fallback-offline.py`: mevcut dist için ağ engelleme, altı medya yolu ve fallback dönüş kontrolü; USB üretmez.
- Bu klasördeki kanıtlar ve `screenshots/fallback-route/` kareleri.

## Kanıtlar

- `npm run build`: PASS (`build.txt`). Python derleme kontrolü ve `git diff --check`: PASS.
- `python scripts/verify-replay-media.py http://127.0.0.1:4173 sources/fallback-route screenshots/fallback-route`: PASS (`test-output.txt`, `verification.json`). 53 durum × Presenter/Audience; ileri ve geri rota, iki kısa klibin son kareye kadar gerçek decoder oynatması, Space/bölüm okları/reload/reduced-motion/çıkış, dört kayıt × iki görünüm kontrolü; seçme/aynı adıma dönüş/reload. JSON gizlilik taraması 0 eşleşme. Sayfa hatası/dış istek 0.
- 1920×1080 ve 1366×768 kareleri: `screenshots/fallback-route/`. Sekiz replay geometri vakası, QA kısıt karesi ve negatif kesilme kontrolü PASS. Uzun fallback Presenter kareleri ayrıca kaydedildi; dört not/geometri vakası PASS (`fallback-layout.json`).
- Tam klip testi ilk denemelerde 20 saniyelik sınırda yükleme bekledi; video hata vermeden oynuyordu. Test tek sekme kullanır, ilk son-kare seek'inin bitmesini bekler ve tam oynatma için 60 saniye sınırı uygular. Son tur PASS; hız/performance garantisi değildir.
- Windows PowerShell offline sunucusu: `powershell.exe -NoProfile -ExecutionPolicy Bypass -File backup/offline/serve.ps1 -Root dist -Port 8020 -NoBrowser`.
- `python scripts/verify-fallback-offline.py`: PASS (`offline-output.txt`, `offline-verification.json`). Dış ağ browser bağlamında engellendi ve probe doğrulandı. 53 durum ileri/geri × iki görünüm; meta final; dört eski video ve iki kısa klip × iki görünüm, yerel HTTP 206 byte-range, poster HTTP 200, oynat/duraklat; son ve ara adımdan fallback dönüş, dönüş düğmesinde Space, R/J. Sayfa hatası/hata yanıtı/dış istek 0. Bu mevcut dist testidir; yeni USB veya gerçek saha provası değildir.
- Preview: http://127.0.0.1:4173/ .
- `preservation.json`: altı kaynak MP4 kabul edilmiş ZIP içeriğiyle hash olarak aynı. Accepted-r3 USB SHA-256 değişmedi: `99beda7b159f41f9071188319eb9cac088a6d31778cdbd60ce69b7a7da8873f2`. Arşiv hâlâ önceki 55 durumlu kabul edilmiş snapshot'tır; yeni 53 durumlu davranış ona taşınmadı.

Graphify erişimi çalıştı; App/SceneVisual etki alanı kontrol edildi. Yeni replay/video modülleri grafikte bulunmadığı için kaynakları ve çağıranları doğrulandı; graph build/update yapılmadı. `feat/v3-wow` korundu; commit/push/deploy yok. Önceki QA PASS yeni değişikliklere taşınmadı. İnsan süreli prova ve saha kapıları açık; QA bu turdaki rota/fallback davranışını bağımsız kontrol etmeli.
