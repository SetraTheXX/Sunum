# 03 — Model, Prompt, Context

**Durum:** Must — 30 dakika rotası

**Tahmini süre:** 3:45

## Amaç

Öğrencinin model, kendisine verilen istek ve o anda erişebildiği bilgiyi birbirine karıştırmamasını sağlamak.

## İzleyicinin bu sahneden çıkarken anlayacağı tek şey

Model isteği işler; prompt görevi söyler; context, bu görev sırasında modele sunulan ilgili bilgidir.

## Ekranda

- Model: metin üreten/işleyen motor
- Prompt: “Bu turda modele hangi isteği ve yönlendirmeyi veriyorum?”
- Context: “Bu istek işlenirken modele hangi bilgiler sunuluyor veya araçlarla alınıyor?”
- Context masası: prompt + ilgili konuşma parçaları + proje dosyaları + talimatlar + araç çıktıları
- Alt cümle: “Sunulmayan bilgi kendiliğinden görünmez; araçla alınan bilgi context'e eklenebilir.”

## Konuşmacı

“Önce model: girdileri işleyip çıktı üreten parça. Bu sahnede teknik eğitim vermiyoruz; onu işin motoru gibi düşünebilirsiniz. Prompt, bu turda modele verdiğimiz istek ve yönlendirmedir: ‘Mobil menüdeki hatayı düzelt.’ Context ise bu istek işlenirken modelin önüne konan veya araçlarla alınan ilgili bilgilerdir. Bir coding agent görevinde buna önceki konuşma parçaları, projeden getirilen dosyalar, çalışma kuralları ve araç sonuçları girebilir.

Bunu bir çalışma masası gibi düşünelim. Prompt, masaya bıraktığımız görev kâğıdı; context ise o görev için masaya konan ve çalışma sırasında eklenebilen ilgili bilgi. Prompt context'in içinde yer alabilir; ikisi aynı kavram değildir. Bu bir benzetme; modelin gerçek iç işleyişini tarif etmiyor. Context'i kalıcı hafızayla da eşitlemeyelim: burada o isteği işlerken kullanılan bilgi alanından söz ediyoruz. Görev için önemli bir dosya, kural veya test sonucu context'e sunulmamış ya da araçla alınmamışsa model onu bu turda incelemiş gibi davranamayız. Daha uzun prompt her zaman daha iyi context demek değildir. İyi başlangıç, gereken bilgiyi seçmek ve hangi varsayımların hâlâ belirsiz olduğunu söylemektir.

Birazdan göreceğimiz agent da modelin yerine geçen sihirli başka bir beyin değil. Aynı model çağrısını görev, context ve araç döngüsünün içine yerleştiren bir çalışma düzenidir.”

“Mobil menü örneğine dönelim. Prompt yalnızca ‘menüyü düzelt’ derse, hangi ekranda ve hangi davranışta sorun olduğunu bilmeyebiliriz. ‘Telefon genişliğinde menü açılmıyor; masaüstü görünümünü değiştirme; bitince ilgili testi çalıştır’ dediğimizde istek ve kabul beklentisi daha açık olur. Ama bu da tek başına yeterli değil: agent ilgili dosyayı görebiliyor mu, proje hangi test komutunu kullanıyor, mobil görünümün mevcut davranışı ne? Bunlar aynı isteğe sunulan context'e dahil edilebilir. İstek prompt'un parçasıdır; context ise modelin bu işi yanıtlarken kullandığı daha geniş bilgi kümesidir.

Context'i sınırsız bir depo gibi düşünmeyelim. Her konuşma mesajını veya her dosyayı eklemek zorunda değiliz; görevle ilişkili ve güvenilir bilgiyi seçmek gerekir. Eski bir not güncelliğini yitirmiş olabilir, test çıktısı yeni bir gerçekle çelişebilir. Bu yüzden “hangi bilgi modele ulaştı?” sorusu kadar “bu bilgi hâlâ doğru mu?” sorusu da önemlidir. Agent sonucu görüp yeni bir karar verdiğinde, o sonuç da sonraki turda çalışma masasına eklenebilir. Bu basit fikir bizi chat cevabından araç döngüsüne götürecek.”

## Geçiş

“Masaya dosyalar ve araçlar geldiğinde, yalnızca cevap veren bir sohbet ile projede adım atan bir coding agent arasındaki fark ortaya çıkar.”

## 30 dk

3:45 — Yaklaşık 2:25 konuşma ve 1:20 context masasına örnekleri yerleştirme. Model, prompt ve context'i ayrı tanımla; context window, token sayısı ve compaction ayrıntılarına girme.

## 45 dk

Phase 1 kapsamı dışında; ek içerik yazılmadı.

## 60 dk

Phase 1 kapsamı dışında; ek içerik yazılmadı.
