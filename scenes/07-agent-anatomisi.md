# 07 — Ajanın Anatomisi

## Ana fikir

Modelin çevresindeki başlıca parçaları ve her birinin ne işe yaradığını aynı görev üzerinden tanıtmak.

## İzleyicinin bu sahneden çıkarken anlayacağı tek şey

Ajan tek bir parça değil; model, bağlam ve araçların birlikte çalıştığı bir düzen. Skill, MCP ve Git ihtiyaca göre eklenir.

## Ekranda

Örnek bir kurulum; parçalar ürüne ve göreve göre değişir.

1. Model — metni işleyen, sonraki adıma karar veren motor
2. Bağlam — bu görevde modelin önündeki bilgi
3. Proje dosyaları — üzerinde çalışılan kod ve içerik
4. Talimatlar — proje kuralları ve sınırlar
5. Araçlar — bilgi alma ve işlem yapma yetenekleri
6. Terminal — komut çalıştırma aracı
7. Skill — tekrar kullanılabilir çalışma yönergesi
8. MCP — ajanı dış araç ve veri kaynaklarına bağlayan açık protokol
9. Git — değişiklikleri izlenebilir kılan sürüm geçmişi

Alt cümle: “Model ≠ Ajan ≠ İş akışı”

## Konuşmacı

Adım 1 — “Aynı mobil menü görevini bir ajan kurulumundan geçirelim. Bu evrensel bir liste değil; parçalar ürüne ve göreve göre değişir.”

Adım 2 — Model: “Görevi yorumlayan ve bir sonraki adıma karar veren motor.”

Adım 3–5 — Bağlam, proje dosyaları, talimatlar: “Görev önce bağlama giriyor. Bağlamı proje dosyaları ve talimatlar besliyor: hangi kod, hangi kurallar, nelere dokunulmayacak.”

Adım 6–7 — Araçlar ve terminal: “Model bir araç çağırıyor; terminal komutu çalışıyor, dosyada değişiklik oluyor. Test sonucu gibi çıktılar tekrar bağlama dönüyor; model ona göre devam ediyor ya da duruyor.”

Adım 8 — Skill: “Tekrar eden bir işi nasıl yaptığımızı anlatan yönerge. ‘Önce bileşeni bul, küçük değiştir, sonra kabul koşulunu kontrol et’ gibi. Model eğitimi değil; kullanılması da şart değil.”

Adım 9 — MCP: “Ajanı dış sistemlere, örneğin bir iş takip aracına, standart bir yolla bağlar. Bağlantının varlığı güvenlik ya da doğruluk garantisi değil; hangi yetkiyle bağlandığımız hâlâ önemli.”

Adım 10 — Git: “Değişiklik geçmişini tutar: ne değişti, gerekirse geri dönebilir miyiz? Ama Git bir test değildir.”

Adım 11 — Özet: “Model motor. Ajan, modeli araç ve bağlamla çalıştıran ortam. İş akışı ise görev, ajan ve insan kontrolüyle birlikte bütün süreç. Üçü aynı şey değil.”

## Geçiş

“Parçaları tanıdık. Şimdi onları fikirden doğrulanmış değişikliğe giden bir çalışma sırasına koyalım.”
