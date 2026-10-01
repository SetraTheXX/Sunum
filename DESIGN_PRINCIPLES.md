# Görsel ilkeler

## Ürün hissi

Sunum; editoryal dergi, etkileşimli ders kitabı ve teknik demo arasında durur. Bir SaaS tanıtım sayfası gibi görünmez. Her sahne tek bir ana fikri taşır ve anlatıcıya hizmet eder.

## Görsel dil

- Büyük, karakterli başlıklar ve açık tipografik hiyerarşi kullan.
- Nefes alan boşluk, ince ayraçlar ve sınırlı bir vurgu rengi tercih et.
- Koyu ve açık sahneleri anlatının ritmine göre kullan.
- Basit, özgün ve baskı/çizim hissi taşıyan illüstrasyonlar kullan; sahne metnini görselin içine gömme.
- Ürün davranışı anlatılırken gerçek, yerel ekran görüntülerini tercih et. Görsel referanslar kompozisyon ve stil içindir; sahte ürün ekranı üretme.
- Animasyonu az ve anlamlı tut; bilgi sırasını veya vurguyu desteklemiyorsa kullanma.

## Okunabilirlik ve çevrimdışı kullanım

- Sunum projektörde, özellikle 1920×1080 ve 1366×768 çözünürlüklerde okunaklı kalmalı.
- Kritik fontlar ve görseller yerel olmalı; çalışma sırasında internet veya uzak CDN gerekmemeli.
- Ekran görüntülerini kırp, gerekli yeri belirginleştir ve kişisel/gizli verileri kaldır veya bulanıklaştır.

## Kaçınılacaklar

- Avenox tasarımının veya başka bir ürünün birebir kopyası
- Neon parıltı, mor-mavi gradient mesh ve glassmorphism
- Her öğeyi yuvarlak karta koymak
- Parlak 3D ikonlar, hologramlar, stok geliştirici fotoğrafları ve yapay zekâ beyni klişesi
- Gerçek olmayan dashboard metrikleri ve gereksiz grafikler
- Her öğeyi hareket ettiren dekoratif animasyonlar

---

## Visual Contract V2 — Engineering Field Manual / Systems Lab

**Durum:** Kullanıcının yönlendirdiği görsel Plan Delta. Sprint 1 kapsamında global shell ve V2 token katmanı `src/styles.css` ile `index.html` içinde `8b893650d3ed5d6e7e84395a7aac55662e82f762` commit'inde uygulandı ve bağımsız QA PASS aldı. Bu uygulama QA'sı yalnızca global shell/token kapsamını ve iki viewport regression kontrolünü kapsar; tüm V2 sahne uygulamasını, final asset/capture üretimini veya herhangi bir gate kapanışını kapsamaz. V2'nin scene-specific görsel entegrasyonu ve yeni final asset üretimi başlamadı; bu belge kalan görsel sprintin hedef sözleşmesi olmaya devam eder.

### Plan Delta ve öncelik

PRD §11'in mevcut yönü “editoryal dergi + etkileşimli ders kitabı + teknik demo”; büyük ve karakterli başlıklar, güçlü tipografik hiyerarşi, boşluk, ince ayraçlar, tek vurgu rengi, kontrollü koyu/açık sahneler ve baskı/çizim hissi veren illüstrasyonlardır. PRD başlıkların Georgia olmasını veya serif yazı tipini şart koşmaz. Sprint 1 öncesi CSS Georgia display başlığı, sıcak kâğıt, koyu mürekkep ve amber vurgu kullanıyordu; bunlar PRD şartı olmayan önceki uygulama kararlarıydı. Sprint 1 mevcut global shell/display/body typography ve renk tokenlarını V2 sans-first Field Manual yönüne güncelledi. V2 görsel yönü **Engineering Field Manual / Systems Lab** tarafına taşır: sans-serif ve sayısal bölüm hiyerarşisi, düzenli saha notları, süreç/bağlantı şemaları ve ölçüm izi. Süslü el çizimi yerine mevcut, yerel ve onaylı varlıklar ile açıkça şematik diyagramlar tercih edilir.

Bu kullanıcı tarafından istenen Plan Delta yalnızca görsel dile ve audience-facing navigasyon sunumuna uygulanır. PRD içerik kaynağı olmaya devam eder: 30 dakikalık rota, 12 sahnenin sırası, 48 beat'in anlamı, iddia sınırları, Scene 11'in ürün değil gerçek workflow örneği olması ve “MODEL DEĞİL, SİSTEM.” finali değişmez. Roadmap faz sırası ve gate kriterlerinde üstündür; V2 hiçbir gate'i kapatmaz. V1 ilkeleri tarihsel baseline olarak saklanır; Sprint 1 global shell/token değişikliği eski CSS mood'unu V2 ile uyumlu hale getirmiştir, sonraki scene-specific görsel uygulama da V2'yi izlemelidir. No SaaS dashboard, başka ürün/marka kopyası, neon, gradient mesh, glass, her öğeye kart veya dekoratif animasyon.

### V2 tokenları

Bu tabloda tanımlanan temel renk, tipografi, spacing, radius ve focus tokenları Sprint 1'de global shell'e uygulandı. Bu durum scene-specific diagram, görsel, capture veya interaction entegrasyonunun tamamlandığı anlamına gelmez. Açık ve koyu yüzey yalnızca anlatı geçişi gerekiyorsa kullanılır. Her sahnede bir ana vurgu seçilir; durum renkleri yalnızca PASS/attention/FAIL anlamı için eklenir.

| Rol | Açık / field | Koyu / lab | Kullanım |
|---|---|---|---|
| Canvas | `#F2F1E9` | `#17262D` | Mat, düz ana yüzey; doku/gradient yok. |
| Surface | `#FAF9F4` | `#24363C` | Yalnızca bir içeriği gruplamak gerektiğinde; tüm içeriği karta çevirmeyin. |
| Ink / primary text | `#17262D` | `#F4F1E8` | Başlık ve gövde. |
| Muted / secondary text | `#4D5F64` | `#C1CBC8` | İkincil açıklama; bilgi taşırsa kontrast hedefini karşılamalı. |
| Rule / diagram grid | `#BCC8C5` | `#53666B` | Ayraç ve dekoratif olmayan şema çizgisi; tek başına anlam kodlamaz. |
| Systems teal | `#176B64` | `#78CFC0` | Ana ilişki, akış ya da aktif nokta. |
| Trace oxide | `#96401F` | `#F2AA80` | Kanıt/iz veya ikincil vurgu; tek başına durum göstergesi değil. |
| Attention ochre | `#75500A` | `#F3CF78` | Soru, not, bekleme. |
| PASS | `#286044` | `#95D5A8` | PASS metni ve aynı anlamı veren etiket/simge. |
| FAIL | `#983D34` | `#F1A19A` | FAIL metni ve aynı anlamı veren etiket/simge. |

Ölçülen metin/yüzey kontrastları: açıkta ink 13.71:1, muted 5.91:1, teal 5.58:1, oxide 6.08:1, ochre 6.37:1; koyuda ink 13.76:1, muted 9.35:1, teal 8.50:1, oxide 8.02:1, ochre 10.36:1. V2 kabul hedefi normal metinde en az 4.5:1, büyük başlıkta en az 3:1'dir; yüzeyler arası durum/bağlantılar renk yanında etiket, çizgi türü veya simgeyle de ayrılır. Rule rengi metin yerine kullanılmaz.

### Tipografi

| Token | Değer | Kullanım |
|---|---|---|
| `--v2-font-display` | `Bahnschrift, "Segoe UI", Arial, sans-serif` | Sans-first, kompakt bölüm ve sahne başlığı; dosya indirme yok. |
| `--v2-font-body` | `"Segoe UI", Arial, sans-serif` | Açıklama ve audience-facing controls. |
| `--v2-font-mono` | `ui-monospace, Consolas, "Liberation Mono", monospace` | Kısa sıra numarası, kısayol ve gerçek kaynakta varsa kod. |
| `--v2-type-title` | `clamp(2.5rem, 4vw, 4.5rem)` | Sahne başlığı; Türkçe uzun başlığa göre satır kırılımı. |
| `--v2-type-section` | `clamp(1.75rem, 2.5vw, 2.25rem)` | Diyagram bölümü/ana alt başlık. |
| `--v2-type-body` | `clamp(1.125rem, 1.45vw, 1.375rem)` | Ana mesaj; hedef çözünürlüklerde 18–22 px aralığının altına düşürmeyin. |
| `--v2-type-detail` | `clamp(1rem, 1.1vw, 1.125rem)` | Diyagram ikincil açıklaması; 16 px altına inmeyin. |
| `--v2-type-label` | `0.875rem` | Eyebrow, scene index ve kısa kontrol etiketi; kritik bilgi için daha küçük metin kullanmayın. |

Başlık line-height 1.05–1.15, gövde 1.45–1.6, diyagram 1.25–1.4. Metin önceliği sans ve ağırlıkla kurulur; uzun metni harf aralığıyla sıkıştırmayın. Speaker notes normal audience görünümünde açılmaz.

### Spacing, ölçü ve radius

| Token ailesi | Değerler |
|---|---|
| Spacing | `4, 8, 12, 16, 24, 32, 48, 64, 80px` |
| Sahne güvenli kenarı | 1366×768'de en az `40px`; 1920×1080'de en az `56px`; gerçek zoom'da ayrıca doğrulanır. |
| Okuma ölçüsü | Gövde satırı en çok `68ch`; başlık/metin blokları şemayı itmeyecek genişlikte. |
| Rule | `1px` normal, en fazla `2px` etkin bağlantı; dekoratif kutu gölgesi yok. |
| Radius | Ana stage ve diyagram çerçevesi `0px`; küçük kontrol `3px`; gerekirse grup yüzeyi en çok `6px`; pill ve cam yüzey yok. |
| Focus | En az `3px` yüksek kontrastlı `:focus-visible` outline ve `3px` offset; klavye odağı renk dışında biçimle görünür. |

### Diyagram dili

- Saha defteri numaraları, sabit hizalama çizgisi, açık başlangıç/bitiş, yön oku ve koşullu dal kullanın. Düğümler düz, kareye yakın ve kısa etiketli olsun; her kavramı bağımsız karta çevirmeyin.
- Ana düğüm metni en az 18 px, ikincil etiket 16 px; tam cümleleri düğümlere sıkıştırmayın. Gerekirse mevcut beat'i sırayla açın; yeni beat veya iddia eklemeyin.
- Akış ana çizgisi 2 px'e kadar, yardımcı kural 1 px; teal birincil ilişki, oxide kanıt izi, ochre bekleme/uyarı içindir. FAIL dönüşü, PASS çıkışı gibi yollar etiket ve ok biçimiyle de anlaşılmalıdır.
- `Scene 03` workbench/context ilişkisi, `04` karşılaştırmalı iki akış, `07` numaralı sistem anatomisi, `08` doğrulama hattı ve `10` rol/geri dönüş akışı şema ailesidir. Bunlar gerçek uygulama ekranı taklidi değildir.

### Scene aileleri ve kompozisyon

| Scenes | Aile / kompozisyon | Görsel sınır |
|---|---|---|
| 01–02 | **Briefing page:** açılış sorusu, sonra kısa rota/evrim izi. | Tek odak ve net bölüm indeksi; açılış ürün demosuna dönüşmez. |
| 03–04 | **Concept bench:** Model/Prompt/Context masası ve Chatbot/Coding Agent akış karşılaştırması. | Kavram şeması; vendor UI veya genellenmiş ürün iddiası yok. |
| 05–06 | **Experiment → verification:** hızlı istek/değişim sekansı, sonra sonuç/kanıt ayrımı. | Vibe coding küçümsenmez; mock ürün ekranı veya sahte test çıktısı yok. |
| 07–08 | **System map → field procedure:** agent parçaları, ardından hedeften Git'e süreç. | Sıralı, okunabilir şema; optional bileşenler isteğe bağlı görünür. |
| 09–10 | **Decision → team flow:** tek agent sınırı sorusu, ardından orchestration ve QA dönüşü. | Karar ve koşullu yollar etiketli; PASS/FAIL dekoratif rozet değildir. |
| 11 | **Authentic workflow evidence:** gerçek Vi3ecode workflow capture'ı varsa onun kaynağa bağlı sunumu. | Capture yoksa yalnız “kavramsal workflow” olarak açıkça işaretli şema kalır; placeholder ürün UI'sı değildir. G4/G5/G6 açık kalır. |
| 12 | **Closeout:** zihinsel model özeti ve baskın final cümlesi. | “MODEL DEĞİL, SİSTEM.” en güçlü hiyerarşik öğe kalır; yeni sonuç/claim yok. |

Bu aileler içerik/reveal sırasını değiştirmez; tam sıra Scene 01 → 12 olarak kalır.

### Audience-facing navigation

- Her karede `Sahne NN/12`, kısa güncel sahne başlığı ve ince toplam ilerleme izi gösterin. İlerleme yalnız renge bağlı olmasın.
- Alt gezinmede görünür “Önceki” ve “Sonraki” metni, klavye ipucu ve net disabled sınırı olsun. Klavye kısayolları düğmenin yerini almaz; `focus-visible` hiçbir reveal durumunda kaybolmaz.
- Sahne indeksi yardımcı gezinme olarak açılıp kapanabilir; ana sahne alanını, başlığı veya footer'ı örtmez. Presenter-only notlar/teknik kontroller projection view'da varsayılan olarak kapalıdır.
- Debug, dosya yolu, URL parametresi ve üretici bilgisi audience ekranına sızmaz. Scene/step URL state'i kullanıcıya görünür bir teknik UI'ya dönüşmeden reload'ı korur.

### Projector ve offline kabul kuralları

- Her 12 sahne ve bütün reveal'lar gerçek render'da 1366×768 ile 1920×1080; %100 ve gerçek browser toolbar %110 zoom'da test edilir. Fullscreen/native chrome ayrı kaydedilir. Emüle viewport PNG'si native zoom veya fiziksel sınıf/projektör testi yerine geçmez.
- Başlık, kritik gövde, diyagram, footer ve kontroller kırpılmaz; page-level istemsiz scroll olmaz. Gerekli metin min boyutları yukarıdaki tokenlardır; kritik bilgi dipnota taşınmaz. Her sahne ailesi için en yoğun reveal ayrıca kontrol edilir.
- CSS/JS, font (sistem font fallback'i dahil), SVG/PNG ve kabul edilen video yerel paketlenir. CDN, Google Fonts/runtime font, remote image, analytics/telemetry ve ağ gerektiren player yoktur. Video varsa autoplay yok; codec/oynatma başarısızlığında aynı authentic kaynaktan privacy-reviewed yerel still fallback veya açıkça “kavramsal anlatım / kanıt yok” seçilir.
- Reveal ve scene navigation kullanıcı kontrollüdür. V2 başlangıçta motion eklemedi; 2026-10-01 Plan Delta'sıyla kontrollü motion başladı (aşağıdaki Motion kayıtları). Önerilen her motion için Purpose, Trigger, Duration, Fallback ve reduced-motion davranışı yazılır; offline ve navigation QA geçmeden eklenmez.

### Motion kayıtları (v2, 2026-10-01)

Ortak kurallar `src/motion.ts` ve `src/styles.css` (`.motion-enter`) içindedir: sahne içinde yalnız tek adımlık ileri reveal'da yeni grup hareket eder. Sahne girişi (kinetik başlık ve görselin girişi) yalnız sahneye ileri yönde, ilk adımında girilince oynar: →, J veya sahne listesinde sonraki bir sahne. İlk açılış, reload, ← / Geri, K, sahne listesinde önceki bir sahne ve R tamamlanmış hali anında gösterir. Sonraki adım `motion-enter` sınıfını kaldırır ve çalışan Web Animations'ı iptal eder; böylece hızlı gezinme son duruma oturur. Hareket bitince ekran durağandır.

**Scene 03 — Model, Prompt ve Bağlam (pilot, "daha cesur" revizyonu 2026-10-01)**

| Alan | Kayıt |
|---|---|
| Purpose | Modelin sabit kaldığını, isteğin dışarıdan modele ulaştığını ve bağlamın sunulan bilgiyle genişlediğini göstermek; kullanıcı pilotu "daha cesur" istedi. |
| Trigger | Sahneye ileri yönde ilk adımda girmek (Scene 02'den →, J veya sahne listesinden; K ve ← ile geri dönüşte oynamaz): başlık kelime kelime blur/ölçekten netleşir, model 0.85→1 ölçekle girer ve teal glow bir kez yanıp sakinleşir, aura belirir. → ile tek adım ileri: R2 prompt çizgisi çizilir, üzerinde bir paket akar, varışta modelin glow'u kısa nabız atar. R3 bağlam sınırı modelden spring ile (%4 overshoot) açılır. R4 üç kaynak sahne kenarlarından uçup gelir, bağlantı çizilir, modele değdiği noktada halka nabzı atar; sınır ve aura (arka katman, daha az hareket: parallax) genişler. R5 yalnız araç çıktısı ve sağdan "Sunulmayan bilgi / GÖRÜNMEZ" girer. Model reveal'lar boyunca yerinden oynamaz. |
| Duration | Başlık 420 ms + 90 ms stagger (≤690 ms); model girişi 560 ms, glow 900 ms; paket 180–700 ms; sınır spring 420 ms; aura 640 ms; kaynak uçuşu 340 ms (+60 ms stagger), çizgi 300 ms, nabız 300 ms. Ölçülen en uzun reveal 900 ms; döngü yok, sonra ekran durağan. |
| Fallback | Son durumun durağan SVG'si her zaman DOM'dadır; paket ve nabız halkaları dinlenmede görünmez (opacity 0). Sonraki adım sınıfları kaldırıp Web Animations'ı iptal eder; reload, Geri, R ve sahneye geri dönüş animasyonsuz son hali açar. |
| Reduced-motion | `prefers-reduced-motion: reduce` iken bütün CSS animasyonları kapatılır, FLIP/aura çalıştırılmaz; başlık ve her reveal anında son haliyle görünür. |
| Sınır | Glow/aura düşük opaklıkta tek teal tonudur (neon, gradient mesh veya sürekli nabız değil); son hallerde okunurluk 1920×1080 ve 1366×768'de kontrol edildi. |

**Scene 01, 02, 04–12 — ortak motor (`src/sceneMotion.ts`, 2026-10-01)**

Scene 03'ün dili kalan sahnelere tek bir motorla uygulanır; her sahne bileşenine ayrı ayrı animasyon kodu yazılmaz. Her commit sonrası görsel bir önceki hal ile karşılaştırılır:

- **Yeni reveal:** Önceden olmayan öğeler sahne merkezine göre en yakın kenardan %6 overshoot'la gelir (420 ms, ≤70 ms stagger, en fazla 8 kademe). İçlerindeki çizgiler çizilir (360 ms); uzun çizgide tek bir paket akar (480 ms); küçük noktalar varışta bir kez nabız atar (240 ms).
- **Spring "nefes":** Kalıp yer değiştiren öğeler eski yerlerinden %5 overshoot'la yerine oturur (460 ms).
- **Durum değişimi:** Sınıfı değişen çizgide paket akar; sınıfı değişen küçük grup (aktif istasyon gibi) bir kez büyüyüp oturur. Sahnenin yarısından büyük gruplar nabız atmaz.
- **Aura ve parallax:** Görselin arkasında sabit, düşük opaklıkta tek teal ton vardır; her ileri adımda öndeki öğelerden daha az ve daha yavaş itilir (640 ms).
- **Sahne girişi:** Kinetik başlık bütün sahnelerde çalışır; kelime gecikmesi toplam ≤280 ms olacak şekilde ölçeklenir. Görselin en büyük parçası 0.86→1 ölçekle, diğerleri kısa uçuşla girer.

| Sahne | Purpose | Trigger ve vurgu |
|---|---|---|
| 01 Açılış | Tek isteğin yapıya dönüşmesini hissettirmek. | İstek çizgisi forma çizilir; yapılmış yüz, iki soru ve 01-02-03 ekseni sırayla kenardan gelir. |
| 02 Nereden nereye? | Aynı görevin üç çalışma biçimini yan yana kurmak. | Her yeni çalışma biçimi kenardan gelir; mevcut sütunlar yer açarken spring ile kayar. |
| 04 Chatbot ve Kodlama Ajanı | Cevabın insana dönmesi ile aracın projeye uzanması farkı. | Ajan şeridi alttan gelir, akış çizgileri çizilir, uzun yolda paket akar. Video adımı değişmez. |
| 05 Hızlı Prototipleme | Aynı uygulamanın açık → koyu → mobil dönüşümü. | Koyu tema yalnız ileri adımda 420 ms renk geçişiyle gelir; mobil düzen kenardan gelir, eski geniş düzen kesikli iz olarak kalır. Video adımı değişmez. |
| 06 Vibe Coding'in Duvarı | Uygulama sabit, sorular etrafında açılır. | Uygulama yerinde kalır; beş soru kendi kenarından gelir, çizgileri uygulamaya çizilir, uçlar nabız atar; ardından kanıt çerçevesi gelir. |
| 07 Ajanın Anatomisi | Her parçanın göreve bağlanması. | Yeni düğüm kenardan gelir, bağlantısı çizilir; mevcut düğümler gerekirse spring ile kayar. |
| 08 Ajan Tabanlı Mühendislik | Kanıtların hedefe bağlanması. | Değişiklik ve kanıt noktaları sağdan gelir; bağlantılar ve hedefe dönen doğrulama döngüsü çizilir, döngüde paket akar. Video adımı değişmez. |
| 09 Tek Ajanın Sınırı | Üç sorumluluğun tek ajanda toplanması. | Girişte ajan çekirdeği ölçekle gelir; denge notu ikinci adımda gelir. |
| 10 Orkestrasyon | Görev izinin Lead → Developer → QA akışı ve koşullu yollar. | Yolu katedilen hatlarda paket akar, aktif istasyon bir kez nabız atar; FAIL ve PASS yolları ayrı ayrı çizilir. |
| 11 Ajan Takımı | Görev çipinin kulvarlar arasında taşınması. | Çip eski kulvarından yenisine spring ile taşınır; yeni yol çizilir, üzerinde paket akar; koşullu FAIL/PASS ayrı gelir. Video adımı değişmez. |
| 12 Final | Parçaların birleşmesi, sonra kalkması ve final cümlesi. | Reveal 2'de parçalar kenarlardan merkeze doğru gelir. Reveal 3'te sistemin bir kopyası dağılarak kalkar (480 ms); final cümlesi iki parça halinde blur/ölçekten netleşir (≤820 ms). |

Ortak alanlar (bütün satırlar için):

| Alan | Kayıt |
|---|---|
| Duration | Ölçülen en uzun reveal 900 ms; sonsuz döngü yok, hareket bitince ekran durağan. |
| Fallback | Son hal her zaman DOM'dadır; paket kopyaları ve Scene 12 çıkış kopyası iş bitince ya da sonraki gezinmede silinir. Sonraki commit çalışan her animasyonu iptal eder; hızlı gezinme son hale oturur. Yalnız ileri adımda ve ileri sahne girişinde oynar; Geri, K, R, reload ve listede önceki sahne animasyonsuzdur. Scene 05 renk geçişi de yalnız ileri adımda (`data-motion="step"`) açıktır. |
| Reduced-motion | Motor hiç animasyon başlatmaz, renk geçişleri ve CSS animasyonları kapatılır; her hal anında görünür. |
| Video | Scene 04/05/08/11 video adımı, oynatıcı, Space davranışı ve poster/fallback motorun dışındadır. |
| Sınır | Motion yalnız hareket ve opaklık kullanır; içerik, sıra, metin ve son hal değişmez. Glow/aura düşük opaklıkta tek teal tondur (neon değil). |

### Authentic capture, privacy ve kanıt sınırı

- Ürün iddiasını destekleyen capture gerçek Codex/Vi3ecode arayüzünden, gerçek oturum/iş akışından alınır; kaynak, tarih, görünen ürün sürümü/tarayıcı ve ilgili scene claim'i kaydedilir. UI'ı HTML/CSS/SVG ile taklit etmek, AI ile üretmek, outcome/label değiştirmek veya promo/simulation sayfasını gerçek workflow diye göstermek yasaktır.
- Capture öncesi izin ve kapsam doğrulanır. Token, credential, e-posta, kişi/kurum/branch/repo özel bilgisi, müşteri verisi, özel dosya yolu, bildirim ve ilgisiz sekmeler kırpılır/bulanıklaştırılır. Redakte edilmiş kopya gözle incelenir, yerel tutulur ve offline açılma/oynama denetiminden geçer; hassas orijinal public evidence paketine alınmaz.
- Sunumun Phase 9 QA PNG'leri sunum render'ı kanıtıdır; authentic ürün kanıtı değildir. Bunlar tek başına G4/G5/G6'yı ve emüle ölçümler G7'yi kapatmaz. Scene 11'de capture/fallback yoksa içerik kavramsal olarak işaretlenir ve ilgili gate'ler açık kalır.

### Öncelik ve uygulama kapısı

DESIGN_PRINCIPLES V2, kalan scene-specific görsel sprint için yönlendirme sözleşmesidir. Sprint 1 global shell/token katmanını uyguladı; bu dar kapsamlı uygulama build ve iki çözünürlükte 24/24 regression kontrolüyle QA PASS aldı. PASS yalnızca bu shell/token değişikliğine ilişkindir; tüm V2 sözleşmesinin sahnelere uygulanması, production asset/capture üretimi, authentic evidence veya gate sonucu değildir. Roadmap sırası içinde manifest kapsamındaki asset üretimi/entegrasyonu, authentic evidence, projector/browser QA ve ilgili gate'ler ayrı kanıtla tamamlanır.
