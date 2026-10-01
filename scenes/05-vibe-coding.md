# 05 — Vibe Coding: Hızlı Prototipleme

## Ana fikir

Vibe coding'i küçümsemeden, neden bu kadar hızlı ve erişilebilir hissettirdiğini göstermek.

## İzleyicinin bu sahneden çıkarken anlayacağı tek şey

Doğal dille fikirden çalışan ilk sürüme hızla ulaşmak mümkün; bu güçlü bir başlangıç.

## Ekranda

- Örnek istekler: “Bir portfolyo yap.” → “Koyu tema ekle.” → “Mobil görünümü düzelt.”
- Her istekten sonra değişen tek bir görünür sonuç
- Etiket: “Temsili örnek akış”

## Konuşmacı

Adım 1 — “Bir fikirle başlıyoruz: ‘Bir portfolyo yap.’ Birkaç saniye sonra ilk görünüm ekranda.”

Adım 2 — “‘Koyu tema ekle.’ Aynı sayfa değişiyor. İste, sonucu gör, tekrar iste.”

Adım 3 — “‘Mobil görünümü düzelt.’ Teknik ayrıntıları bilmeden bir şeyin şekillendiğini görmek çok motive edici. Kod yazmamış biri için eşik düşüyor; deneyimli biri için taslak hızlanıyor.”

Vurgu: “Vibe coding'i küçümsemiyorum. Keşfetmek, öğrenmek ve bir fikri görünür kılmak için çok değerli. Ekrandaki akış temsili bir örnek; bir ürünün başarısını ölçmüyor.”

## Video

Adım 4 — Video açılınca Space ile başlat (yaklaşık 23 saniye, sessiz).

Oynarken: “Bu kez terminalde çalışan bir kodlama ajanı var. İsteği yazıyorum; ajan dosyaları kendisi oluşturuyor, sayfa açılıyor. Bir takip isteği daha veriyorum, sayfa güncelleniyor. Kopyala-yapıştır yok.”

Bitince: “Hızlı, değil mi? Ama bu kayıtta test ya da build çalışmadı; gördüğümüz şey yalnızca açılan bir sayfa.” → ile devam et.

## Canlı demo

Adım 4'te videonun yerine kullanılır; süre en fazla 3 dakika. Araç: Codex CLI, terminalde demo\app klasöründe başlatılır; prompt'taki “bu site” ve “bu klasör” demo\app'tir ve yollar ona göredir. Sunumdan önce bir kez hazırlanır, sunum sırasında reset yapılmaz: demo\reset.ps1 çalıştı, demo\serve.ps1 açık, tarayıcıda http://localhost:5500/ telefon genişliğinde (DevTools cihaz modu, 390 px) duruyor.

Prompt: “Bu sitede telefonda menüye ulaşılamıyor. Telefonda çalışan bir menü ekle. Kabul koşulu: 720 piksel ve altında başlıkta bir Menü düğmesi (hamburger) görünsün; düğmeye Tab ile gelinebilsin; menü kapalıyken gizli menü bağlantıları Tab ile odak almasın, menü açıkken Tab bağlantılara ilerlesin; tıklama, Enter ve Space menüyü açıp kapatsın; menü açıkken Esc menüyü kapatıp odağı düğmeye döndürsün; düğmenin aria-expanded değeri açık/kapalı durumu göstersin ve aria-controls menüyü işaret etsin; 720 pikselden geniş ekranda düğme görünmesin ve masaüstü menüsü değişmesin; yeni bağımlılık, CDN veya dış istek eklenmesin. Yalnız bu klasördeki dosyaları değiştir, klasörün dışına çıkma; commit veya push yapma. Bitince hangi dosyaları değiştirdiğini kısaca yaz.”

Söylenecekler ekranda gerçekten görüneni anlatır; sonucu önceden söyleme. Ajanın çıktısı her çalıştırmada farklıdır, sonuç garanti değildir.

İsteği gönderirken: “Ajana tek bir istek veriyorum; hangi dosyaya dokunacağını kendisi bulacak.”

Ajan çalışırken: ekranda okuduğu ya da değiştirdiği dosyanın adını oku. “Şu an index.html dosyasını açtı.” gibi; ekranda ne yazıyorsa o.

Ajan bitince sayfayı yenile, telefon genişliğinde düğmeye bir kez tıkla. Menü açıldıysa: “Düğme geldi, tıklayınca menü açıldı. Şu an yalnız bunu gördük; Tab, Esc ve masaüstü gibi kabul maddelerini henüz kontrol etmedik. Ona Scene 08'de bakacağız.” Düğme yoksa ya da menü açılmadıysa: “Ajan bitti dedi ama sayfada menü açılmıyor. Bu da bir sonuç: Scene 06'daki duvarın canlı hali.”

Başarısızlık işaretleri: oturum veya ağ hatası; ajan 60 saniyede dosya okumaya başlamadı; izin istemi çözülmüyor; 2 dakikada hiçbir dosya değişmedi; toplam 2,5 dakikayı geçti.

Videoya geçiş: “Canlı ortam bugün bizimle değil; aynı akışın daha önce kaydettiğim halini göstereyim.” Sunum penceresine dön, Space ile klibi başlat; klip bitince → ile devam et. Video farklı bir görevin kaydıdır; canlı demonun sonucu gibi anlatma.

## Geçiş

“Fikirden prototipe giden yol bu kadar hızlı. Peki proje büyüdüğünde hangi sorular ortaya çıkıyor?”
