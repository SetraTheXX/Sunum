# Gerçek ekran replay’leri — V3 / 2026-10-02

Bu tur yalnız Scene 08 Adım 4 ve Scene 11 Adım 5 yeniden işlendi. Rota hâlâ 55 durum. Eski metin JSON’ları ve dört video korundu; USB ZIP’leri değiştirilmedi. Önceki 79/74 sn metin replay’lerinin yerini, son istekteki **kısa gerçek ekran MP4** kapsamına göre 24,5/34 sn klipler aldı. Bu süre değişikliği insan provasını tamamlamaz.

## Kaynak ve kesitler

- Scene 08: `assets/video-drafts/scene-08-codex-app-draft-20260928.mp4` (42,10 sn), ham kaynak `F:/Codex app Videosu.mp4` korunur. Taslak zamanında 2,5–8 istek; 13,900 sonuç ekranı kare dondurma (5 sn); 13,900 kontrol özeti kare dondurma (4 sn); 19–29 üretilen videoyu izleme. Çıktı 24,5 sn. Ajanın lint/TypeScript özeti bağımsız stdout değildir. Ekranda gerçek kod diff’i yok; eklenmedi.
- Scene 11: `assets/video-drafts/scene-11-vi3ecode-draft-20260928.mp4` (62,116 sn), ham kaynak `F:/Vi3ecode kısmı ve örnek gösterim.mp4` korunur. Taslak zamanında 0–5 roller; 12–18 kısa uygulama örneği isteği; 38,000 Lead kare dondurma (6 sn); 43,000 Developer kare dondurma (5 sn); 49,000 QA işlev kontrolü kare dondurma (3,5 sn) ve aynı kareden screenshot kısıtı (3,5 sn); 53–58 uygulama önizlemesi. Çıktı 34 sn. Lead’in Developer/QA devri paraleldir. Kayıttaki aynı GPT-6-Luna ayarı farklı model ataması olarak anlatılmaz. QA screenshot kısıtı korunur; sunum deposuna entegrasyon iddia edilmez.

## Redaksiyon / kurgu

Yerel Remotion 4.0.532 renderer `renderer/` içinde; uygulama bağımlılığı eklenmedi. Çerçeve tabanlı 600 ms küçük odak zoom’u, Türkçe açıklamalar ve solid maskeler kullanılır. Yan hesap/proje alanları, üst sekmeler, görev çubuğu ve Developer komut alanı maskelenir. Kullanıcı yolu, özel konuşma ve token içeren ham oturum kopyalanmadı. Renderer public girişleri yalnız önceden maskelenmiş taslakların yerel kopyalarıdır ve gitignore kapsamındadır. Görsel redaksiyon kare kontrolüdür; JSON regex taraması video içeriğini kanıtlamaz.

## Yeniden üretim

`renderer/` içinde `npm ci`, ardından `npx remotion render src/index.ts Scene08 ../../../assets/replays/scene08-real-v3-20261002.mp4 --browser-executable="C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe" --concurrency=2 --crf=20`; Scene11 için composition ve çıktı adını değiştir. Aynı adlı onaylı çıktıyı yenilerken önce farklı çıktı adı kullanın. @remotion/media Video Edge kare çıkarma zaman aşımı verdi; başarılı render OffthreadVideo ile yapılır. Ham kayıtlar değişmez.

## Sunum ve fallback

Space oynat/duraklat, oklar gerçek kayıt bölümlerine gider. Reload son karede durur. Sahne çıkışında medya durur. Reduced-motion çevre animasyonlarını kapatır; kodlanmış video hareketi yalnız kullanıcı oynatınca görülür. Presenter/Audience aynı görüntüyü kullanır. Uzun korunmuş fallback videoları S08 Adım 5 / S11 Adım 6’dadır; aynı kaydı iki kez izletmek zorunlu değildir. Video açılamazsa konuşma notundaki bölümleri anlatıp korunmuş fallback adımına geçin. Resmî internet linkleri offline fallback değildir.

İnsan süreli prova bekliyor: her sahnenin başlangıç/bitişini, toplam süreyi, kullanılan fallback ve kayıp zamanı kaydedin; 30 dakikalık rotanın iki kez ≤28 dakikada tamamlanması G9 kanıtıdır. Bu tur insan provası yapılmadı. Yeni QA sonucu gelmeden USB paketi güncellenmez.


## Kanıtlar ve değişen yollar

- `build.txt`: npm run build PASS; renderer TypeScript kontrolü PASS.
- `verification.json`: Presenter/Audience 55’er durum, iki tam medya oynatması (4x), Space/ok/reload/reduced-motion/çıkış, dört eski video × iki görünüm PASS; pageerror/dış istek yok. JSON gizlilik taraması 0 eşleşme. `scripts/verify-replay-media.py` güncel evaluator’dır; eski `verify-v3.py` önceki metin replay’i içindir.
- `media-probe.json`, `media-check08.json`, `media-check11.json`: H.264, 1920×1080, CFR 30 fps, BT.709; bilinçli sessiz klipler. Araç audio/subtitle için opsiyonel uyarı verebilir; açıklamalar görüntüye işlenmiştir.
- `manifest.json`: kesitler, kaynak/çıktı SHA-256 ve ham kaynak varlığı. `preservation.json`: dört video önceki ZIP ile byte hash eşleşmesi; ZIP aynı kaldı.
- `screenshots/replay-media/scene-{8,11}-{presenter,audience}-{1920,1366}.png`: iki ölçekte önizleme. `scene08-final-sheet.png` / `scene11-v2-sheet.png`: görsel kesit/redaksiyon kontrolü.

Bu tur değişen uygulama yolları: `src/replays.ts`, `src/TranscriptReplay.tsx`, `src/styles.css`; anlatım: `scenes/08-agentic-engineering.md`, `scenes/11-vi3ecode.md`, `demo/README.md`, `FINAL_KONUSMA_AKISI.md`, `README.md`, `DESIGN_PRINCIPLES.md`; yeni medya: `assets/replays/*-final-20261002.mp4`; yeni renderer/kanıt: `sources/replay-media/`, `scripts/verify-replay-media.py`, `screenshots/replay-media/`. Önceden kirli olan AGENTS/App/SceneVisual/package/vite/meta-final değişiklikleri bu tur yeniden düzenlenmedi.

Renderer girdilerini hazırlamak için iki taslak MP4’ü `renderer/public/scene08.mp4` ve `scene11.mp4` olarak yerel kopyalayın. Render sonrasında ffmpeg-skill `export.py INPUT --preset youtube --crf 18 --fast -o FINAL.mp4` ile dağıtım klibini üretin; ham kaynak üzerinde çalışmayın. Remotion yalnız üretim klasöründedir, uygulama runtime’ına eklenmedi. Graphify erişimi başarılı; SceneVisual bağlantıları kontrol edildi, yeni replay modülleri grafikte bulunmadığı için kaynakları esas alındı.

QA: kliplerin tamamını izleyerek araç/sahne eşlemesini, maske sınırlarını, dondurulmuş kare notlarını ve 1366 okunurluğunu bağımsız kontrol edin. Meta final, 55 durum, dört video ve Space davranışını `python scripts/verify-replay-media.py http://localhost:4173` ile yeniden doğrulayın. Yeni QA kararı olmadan USB paketi yenilenmez.


## 1366 Presenter düzeltmesi / QA geri dönüşü

Replay adımına özgü Presenter yerleşimi sıkılaştırıldı: video 36vh ile sınırlı, yinelenen durum/kısayol satırı kaldırıldı, aralıklar daraltıldı. Audience yerleşimi korunur. Scene 11 QA raporu iki büyütülmüş gerçek kadraja ayrıldı: ilk işlev/kalıcılık maddesi ve screenshot alınamama maddesi. Süre hâlâ 34 sn, rota hâlâ 55 durumdur. Eski Scene 11 MP4 korunur; aktif çıktı `assets/replays/scene11-real-readable-20261002.mp4`.

`vertical-before.json` eski build’de iki sahnenin video/kaynak/kontrol/not özetinin kesildiğini kaydeder. Güncel evaluator `verification.json` içinde 1920/1366 × Presenter/Audience × iki sahne için görünür viewport ve tüm overflow ancestor sınırlarını kontrol eder; yeni sonuçlarda sıfır dikey kesilme var. Negatif kontrolde 650 px yüksekliğe zorlanan video doğru biçimde reddedilir. QA işlev ve QA kısıt kareleri ayrı kaydedilir. Konuşmacı notlarının gövdesi kullanıcı tarafından açıldığında kaydırılabilir; evaluator kapalı notların özetini ve replay kontrollerini kaydırmadan doğrular.

Bu düzeltmenin değişen yolları: `src/App.tsx` (replay sınıfı), `src/styles.css` (Presenter replay yerleşimi), `src/replays.ts` (yeni MP4 ve QA kısıt bölümü), `sources/replay-media/renderer/src/Composition.tsx` (QA kadrajları), `scripts/verify-replay-media.py` (dikey kesilme/negatif kontrol), yeni MP4, manifest/probe/build/verification ve önizleme kareleri. Yeni QA değerlendirmesi beklenir; USB güncellenmedi. Commit/push/deploy yok.
