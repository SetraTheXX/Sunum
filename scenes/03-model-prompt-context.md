# 03 — Model, Prompt ve Bağlam

## Ana fikir

Modeli, verdiğimiz isteği ve o anda modelin önündeki bilgiyi birbirinden ayırmak.

## İzleyicinin bu sahneden çıkarken anlayacağı tek şey

Model isteği işler; prompt ne istediğimizi söyler; bağlam o anda modelin önündeki bilgidir.

## Ekranda

- Model: metni işleyen ve çıktı üreten motor
- Prompt: “Bu turda modelden ne istiyorum?”
- Bağlam (context): “Bu istek işlenirken modelin önünde hangi bilgiler var?”
- Bağlam masası: prompt + önceki konuşma + proje dosyaları + talimatlar + araç çıktıları
- Alt cümle: “Modele sunulmayan bilgi görünmez; araçla getirilen bilgi bağlama eklenir.”

## Konuşmacı

Adım 1 — Model: “Model işin motoru: metni işler, çıktı üretir. Bugün iç yapısına girmiyoruz.”

Adım 2 — Prompt: “Prompt, bu turda verdiğimiz istek. Örneğin: ‘Mobil menüdeki hatayı düzelt.’”

Adım 3 — Bağlam: “Bağlam, İngilizcesiyle context, bu istek işlenirken modelin önüne konan her şey. Bir çalışma masası düşünün: prompt masaya bırakılan görev kâğıdı, bağlam ise masadaki her şey.”

Adım 4 — Masaya gelenler: “‘Menüyü düzelt’ tek başına belirsiz. ‘Telefonda menü açılmıyor, masaüstünü değiştirme, bitince testi çalıştır’ dediğimizde istek netleşir. İlgili dosya, proje kuralları ve önceki konuşma da masadaysa model gerçekten işe başlayabilir.”

Adım 5 — Sınır: “Masada olmayan bilgiyi model görmez. Ajan bir dosya okuduğunda ya da test çalıştırdığında o sonuç da masaya eklenir. Daha uzun prompt her zaman daha iyi bağlam demek değil; önemli olan doğru bilgiyi seçmek.”

## Geçiş

“Masaya araçlar geldiğinde, yalnızca cevap veren bir sohbet ile projede adım atan bir kodlama ajanı arasındaki fark ortaya çıkıyor.”
