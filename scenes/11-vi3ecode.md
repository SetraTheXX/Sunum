# 11 — Tek Ajandan Ajan Takımına

## Ana fikir

Ajan rollerinin gerçek bir geliştirme iş akışında nasıl birleştiğini göstermek; Vi3ecode'u ürün tanıtımı olarak değil, kullandığım iş akışının örneği olarak konumlandırmak.

## İzleyicinin bu sahneden çıkarken anlayacağı tek şey

Roller ayrıldığında aynı görev planlanır, uygulanır ve bağımsız olarak kontrol edilir.

## Ekranda

- Soru: “Peki bunların hepsini tek bir iş akışında birleştirirsek?”
- Görev → Lead → gerektiğinde Analyst → Developer
- Araçlar / Terminal / değişiklik → QA
- FAIL → Developer'a dönüş | PASS → tamamlanma / Git

## Konuşmacı

Adım 1 — Soru: “Peki bunların hepsini tek bir iş akışında birleştirirsek? Odak ürün değil, süreç: tek modele kod yazdırmaktan, geliştirme sürecini ajan rolleriyle işletmeye geçiş.”

Adım 2 — “Görev Lead'e geliyor; Lead kapsamı netleştirip Developer'a devrediyor. Belirsizlik varsa araya Analyst giriyor.”

Adım 3 — “Developer araçlarla ve terminalle değişikliği yapıyor, işi bağımsız kontrol için QA'ya bırakıyor.”

Adım 4 — “QA iki yoldan birini açıyor: FAIL ise Developer'a dönüş, PASS ise tamamlanma ve Git. Bu şema kavramsal; şimdi gerçek ekran kaydından kısaltılmış rol devrini göstereceğim. Uzun kayıt normal rotada yok; Presenter’dan seçilen fallback olarak duruyor.”

Açıklama (kısa tut): “Vi3ecode benim ürünüm değil; projeyi Berk geliştiriyor, ben topluluk ve moderasyon tarafındayım. Kendi kullandığım iş akışı olduğu için örnek olarak gösteriyorum.”

Adım 5 — Replay (34 saniye): “Gerçek Vi3ecode kaydı: rol ayarı → istek → Lead’in Developer ve QA’ya paralel devri → Developer sonucu → QA kontrolü → yerel önizleme. Farklı model ataması iddia etmiyoruz. Kaynak dosyalar görünmediği için uygulama sıfırdan oluşturuldu; QA ekran görüntüsü alamadığını bildiriyor.”

Replay kontrolü: Space baştan oynat/duraklat; ←/→ bölümleri seçer, uçlarda sunuma devam eder. Reload son karede durur; → Scene 12’ye geçer. Uzun kayıt yalnız Presenter’daki “Uzun kaydı aç (fallback)” düğmesiyle seçilir; “Ana rotaya dön” veya ←/→ aynı adıma döndürür. Bu kayıt sunuma entegre edilmiş uygulama veya bugünkü bağımsız QA sonucu değildir.

## Video

İsteğe bağlı uzun fallback — Presenter’dan seçilen video açılınca Space ile başlat (yaklaşık 62 saniye, sessiz). En uzun klip; anlatımı buna göre yay.

Oynarken: “Önce rol ayarları: Lead, Analyst, Developer ve QA. Ayar ekranında kaydedilen değer GPT-6-Luna · Default · Max. Buradan her rol için ayrı model ataması çıkarmıyoruz; odak görev devrinde. Sonra görevi veriyorum ve ekip çalışmaya başlıyor. Aradaki bekleme kısmını kestim. Sonunda QA'nın raporu ve uygulamanın önizlemesi geliyor.”

Dürüst not: “QA ekran görüntüsü alamadığını açıkça yazıyor; bu sınırlamayı saklamadım. Kayıttaki hatalar da olduğu gibi duruyor.”

Bitince: “Burada gördüğümüz tek bir modelin cevabı değil; görevi planlayan, uygulayan ve kontrol eden bir süreç.” → ile devam et.

## Canlı demo

Adım 5 kısa klibin yerine kullanılır; süre en fazla 4 dakika. Araç: Vi3ecode, proje klasörü olarak demo\app-team açık (prompt'taki “bu klasör” demo\app-team'tir ve yollar ona göredir), roller hazır (Lead, Analyst, Developer, QA). demo\app-team sunumdan önceki tek reset ile hazırlanmıştır: Scene 05'in değişikliğini içermez, aynı görev en baştan yapılır. Önizleme: demo\serve.ps1 -Folder app-team, http://localhost:5501/. Replay anlatımı da 4 dakikalık canlı demo bütçesinin içindedir; bütçe dolarsa Presenter’dan uzun fallback’i seç. Ekip çalışması dakikalar sürebilir: görevi Adım 1'de gönder, Adım 2–4'ü anlatırken çalışsın, Adım 5'te ekrandakini göster.

Prompt: “Bu klasördeki sitede telefonda menüye ulaşılamıyor; bu klasör sitenin köküdür ve bütün yollar ona göredir; telefonda çalışan bir menü eklenecek. Bu işi rollerle yürütün ve her devri açıkça yazın: Lead görevi ve kabul koşulunu netleştirip Developer'a devretsin; belirsizlik varsa önce Analyst'e sorsun. Developer değişikliği yapıp hangi dosyaları değiştirdiğini yazsın ve işi QA'ya devretsin. QA önce git diff ile değişen dosyaları göstersin. Sonra her kabul maddesini ayrı kontrol edip PASS veya FAIL yazsın ve her maddede yöntemini belirtsin: sayfayı http://localhost:5501/ adresinde 390 piksel genişlikte açıp denediyse yaptığı adımları ve gördüğünü, yalnız kodu okuduysa ‘kod okunarak’ yazsın; hiç kontrol edemediği maddeyi ‘kontrol edilmedi’ diye belirtsin. FAIL ise işi gerekçesiyle Developer'a geri versin. Yalnız bu klasördeki dosyaları değiştirin, klasörün dışına çıkmayın; commit veya push yapmayın. Kabul koşulu: 720 piksel ve altında başlıkta bir Menü düğmesi (hamburger) görünsün; düğmeye Tab ile gelinebilsin; menü kapalıyken gizli menü bağlantıları Tab ile odak almasın, menü açıkken Tab bağlantılara ilerlesin; tıklama, Enter ve Space menüyü açıp kapatsın; menü açıkken Esc menüyü kapatıp odağı düğmeye döndürsün; düğmenin aria-expanded değeri açık/kapalı durumu göstersin ve aria-controls menüyü işaret etsin; 720 pikselden geniş ekranda düğme görünmesin ve masaüstü menüsü değişmesin; yeni bağımlılık, CDN veya dış istek eklenmesin.”

Söylenecekler ekranda gerçekten görüneni anlatır. Ajan çıktısı her çalıştırmada farklıdır; PASS garanti değildir. FAIL gelirse saklama, şemadaki dönüş yolunun canlı örneği olarak göster.

Adım 1'de görevi gönderirken: “Görevi şimdi gönderiyorum; biz şemayı konuşurken ekip çalışacak.”

Adım 5'te ekrandaki gerçek devirleri oku: “Lead görevi Developer'a şu notla devretmiş: …” — “Developer şu dosyaları değiştirdiğini yazıyor: …” — “QA'nın kararı: … Gerekçesi: … Yöntemi: …” QA bir maddeyi yalnız kodu okuyarak geçirdiyse bunu söyle: “Bu madde tarayıcıda denenmedi, kod okunarak geçti.” QA FAIL verdiyse: “İş gerekçesiyle Developer'a geri döndü; şemadaki dönüş yolu bu.” Henüz QA'ya ulaşmadıysa: “Ekip hâlâ Developer aşamasında; beklemeyelim.” ve videoya geç.

Başarısızlık işaretleri: oturum veya ağ hatası; Adım 5'e gelindiğinde rollerden hiçbiri çıktı üretmemiş; araç hatası döngüye girmiş; toplam 4 dakikayı geçti.

Videoya geçiş: “Ekip hâlâ çalışıyor; beklemeyelim. Aynı tür bir çalışmanın baştan sona kaydını göstereyim.” Sunum penceresine dön, Adım 5’e dön; Presenter’dan “Uzun kaydı aç (fallback)” düğmesini seç, Space ile klibi başlat. Bitince “Ana rotaya dön” veya → ile Adım 5’e dön; ardından → sonraki sahneye geç.

## Geçiş

“Artık baştaki soruya dönebiliriz.”
