# 08 — Ajan Tabanlı Mühendislik

## Ana fikir

Hızlı kod üretimini, sonucu kanıtla kontrol eden bir geliştirme turuna bağlamak.

## İzleyicinin bu sahneden çıkarken anlayacağı tek şey

Ajan tabanlı mühendislik (agentic engineering): her değişiklik kanıtıyla birlikte ilerler.

## Ekranda

- Akış: Hedef → Bağlam → Plan → Uygula → Test → İnceleme → Doğrula → Git
- Üç kanıt noktası: değişen dosyalar, test sonucu, inceleme sonucu
- Son cümle: “İlerleme = değişiklik + doğrulanabilir kanıt”

## Konuşmacı

Adım 1 — Hedef: “Aynı görev: mobil menü telefonda açılmıyor. Önce kabul koşulunu yazıyoruz: telefonda menü açılsın, masaüstü değişmesin. Sonra bağlamı hazırlıyoruz ve küçük bir plan çıkarıyoruz.”

Adım 2 — Uygula: “Ajan değişikliği yapıyor. İlk kanıt noktası değişen dosyalar: tam olarak ne değişti?”

Adım 3 — Kanıt: “Sonra test: komut ve çıktısı. Sonra kod incelemesi: ikinci bir göz. Doğrula adımında sonucu baştaki kabul koşuluna göre kontrol ediyoruz; hata varsa döngü başa dönüyor. En sonda Git ile değişiklik kayıt altına giriyor.”

Adım 3 sonu (ekrandaki son cümle) — “İlerleme, değişiklik artı doğrulanabilir kanıt. Küçük bir işte bazı adımlar birleşebilir, ama doğrulama ihtiyacı kaybolmaz. Ajanın ‘bitti’ demesi, kanıt toplama sorumluluğunu ortadan kaldırmaz.”

Adım 4 — Replay (24,5 saniye): “Gerçek Codex App kaydı: kullanıcı repoyu inceleyip sessiz bir Remotion sunumu istiyor; tek ajan dosya ve komutlarla çalışıyor, kontrol özetini bildiriyor, ardından oluşturulan video açılıyor. Lint/TypeScript satırları ajanın özeti; bağımsız test stdout’u veya SecureCheck doğruluk kanıtı değil.”

Replay kontrolü: Space baştan oynat/duraklat; ←/→ kayıt bölümlerini seçer, uçlarda sunuma devam eder. Reload son karede durur. Bitince → Scene 09’a geçer. Uzun kayıt ana rotada yoktur; yalnız Presenter’daki “Uzun kaydı aç (fallback)” düğmesiyle seçilir. “Ana rotaya dön” veya ←/→ aynı adıma döndürür; sonra → sonraki sahneye geçer.

## Video

İsteğe bağlı uzun fallback — Presenter’dan seçilen video açılınca Space ile başlat (yaklaşık 42 saniye, sessiz). En uzun ikinci klip; acele etme.

Oynarken: “Burada masaüstü bir kodlama ajanına görev veriyorum. Prompt'u yazıyorum, ajan repo ve araçlarla çalışmaya başlıyor, bitince ne yaptığını özetliyor. Sonunda ürettiği videoyu izliyoruz.”

Bitince: “Ajan işi bitirdi ve özetledi. Ama o özet de bir iddia; içeriğin doğruluğunu ayrıca kontrol etmemiz gerekiyor. İşte bu yüzden kanıt noktalarından bahsediyoruz.” → ile devam et.

## Canlı demo

Adım 4 kısa klibin yerine kullanılır; süre en fazla 3 dakika. Araç: Codex App, çalışma klasörü olarak demo\app seçilir; prompt'taki “bu klasör” demo\app'tir ve git diff orada çalışır. Bu, Scene 05'te yapılan değişikliğin kontrolüdür; arada reset yapılmaz. Scene 05'te hiçbir dosya değişmediyse kontrol edilecek bir şey yoktur: doğrudan videoya geç.

Prompt: “Bu klasördeki son değişikliği kontrol et; bu klasör sitenin köküdür ve bütün yollar ona göredir. Önce bu klasörde git diff ile neyin değiştiğini göster. Sonra aşağıdaki her kabul maddesini ayrı ayrı yaz: kontrol ettiysen nasıl kontrol ettiğini ve sonucunu, kontrol edemediysen ‘kontrol edilmedi’ yaz. Dosyalarda değişiklik yapma; commit veya push yapma. Kabul koşulu: 720 piksel ve altında başlıkta bir Menü düğmesi (hamburger) görünsün; düğmeye Tab ile gelinebilsin; menü kapalıyken gizli menü bağlantıları Tab ile odak almasın, menü açıkken Tab bağlantılara ilerlesin; tıklama, Enter ve Space menüyü açıp kapatsın; menü açıkken Esc menüyü kapatıp odağı düğmeye döndürsün; düğmenin aria-expanded değeri açık/kapalı durumu göstersin ve aria-controls menüyü işaret etsin; 720 pikselden geniş ekranda düğme görünmesin ve masaüstü menüsü değişmesin; yeni bağımlılık, CDN veya dış istek eklenmesin.”

Söylenecekler ekranda gerçekten görüneni anlatır. Ajanın raporu her çalıştırmada farklıdır, PASS garanti değildir.

İsteği gönderirken: “Bu sefer yeni kod istemiyorum; Scene 05'teki değişikliği baştaki kabul koşuluna göre kontrol etmesini istiyorum.”

Diff gelince ekrandaki dosya adlarını oku: “Değişen dosyalar bunlar: …”

Kontrol özeti gelince maddeleri ekrandan oku: “Şu maddeleri kontrol ettiğini ve nasıl kontrol ettiğini yazıyor: … Şu maddeyi kontrol edemediğini yazıyor: …” Bir madde için ‘geçti’ yazıp yöntemini yazmadıysa: “Burada ‘geçti’ yazıyor ama nasıl kontrol ettiğini yazmıyor; bu bir iddia, kanıt değil.”

Sonra tarayıcıda telefon genişliğinde kendin dene: Tab ile düğmeye gel, Enter, ardından Esc. Ne olduysa onu söyle: “Elle denedim: Tab düğmeye geldi, Enter menüyü açtı, Esc kapattı.” ya da hangi adımın çalışmadığını.

Başarısızlık işaretleri: oturum veya ağ hatası; 90 saniyede ilk çıktı yok; ajan dosya değiştirmeye kalkıyor; diff boş ya da beklenmedik dosyalar değişmiş; toplam 2,5 dakikayı geçti.

Videoya geçiş: “Canlı ortam burada takıldı; aynı tür bir görevin daha önce kaydettiğim halini göstereyim. Önemli olan ajanın ne iddia ettiği değil, hangi kanıtı gösterdiği.” Sunum penceresine dön, Adım 4’e dön; Presenter’dan “Uzun kaydı aç (fallback)” düğmesini seç, Space ile klibi başlat. Bitince “Ana rotaya dön” veya → ile Adım 4’e dön; ardından → sonraki sahneye geç.

## Geçiş

“Peki planlayan, yapan ve kontrol eden hep aynı ajan mı olmalı?”
