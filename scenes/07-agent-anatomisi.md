# 07 — Agent anatomisi

**Durum:** Must — 30 dakika rotası

**Tahmini süre:** 4:30

## Amaç

Modelin etrafındaki başlıca parçaları ve bu parçaların farklı görevlerini tanıtmak.

## İzleyicinin bu sahneden çıkarken anlayacağı tek şey

Bir coding agent'ın bileşenleri ürüne ve göreve göre değişir; Skill, MCP ve Git kullanılabilecek örneklerdir, her kurulumda zorunlu değildir.

## Ekranda

Örnek bir kurulumda görülebilecek bileşenler aşağıdaki sırada görünür; bu evrensel veya zorunlu bir liste değildir. Kullanılan parçalar ürüne ve göreve göre değişir. Her satıra kısa bir tanım eklenir:

1. Model — metin/karar motoru
2. Context — bu görevde modele sunulan bilgi
3. Project files — üzerinde çalışılan dosyalar
4. Instructions — proje kuralları ve sınırlar
5. Tools — bilgi alma veya işlem yapma yetenekleri
6. Terminal — komut çalıştırma aracı
7. Skill — kullanılıyorsa, tekrar kullanılabilir yönerge ve destek dosyaları
8. MCP — kullanılıyorsa, AI uygulamasını araçlara/veri kaynaklarına bağlayan açık protokol
9. Git — kullanılıyorsa, değişiklikleri izlenebilir hâle getiren sürüm geçmişi

Alt cümle: “Model ≠ Agent ≠ Workflow”

## Konuşmacı

“Örnek bir coding agent kurulumunun parçalarını sırayla görelim. Bu, her üründe veya görevde bulunması gereken zorunlu bir liste değil; bileşenler ürüne ve göreve göre seçilir. Model isteği işler; context, bu görev sırasında modele sunulan veya araçlarla getirilen bilgidir. Project files agent'ın gerçekten inceleyebileceği çalışma malzemesidir. Instructions ise proje ve görev için uyulacak yönü, sınırları ve beklentiyi yazar.

Tools, bilgi okumaya veya değişiklik yapmaya yarayan yeteneklerdir. Terminal de kullanılabilecek araçlardan biridir; komut çalıştırır ama sonucu ayrıca değerlendirmek gerekir. Skill kullanılıyorsa, tekrar eden bir işi nasıl yapacağımızı anlatan yeniden kullanılabilir yönerge ve destek dosyaları sağlar; model training veya fine-tuning değildir ve her görev için şart değildir. MCP kullanılıyorsa, AI uygulamalarının dış sistemlerdeki veri ve araçlarla standart biçimde bağlantı kurmasına yarar; her üründe bulunması gerekmez ve kendi başına bir kalite kontrolü değildir. Git kullanılıyorsa değişiklik geçmişini görmeyi ve gerekirse önceki sürüme dönmeyi kolaylaştırır; coding agent'ın her görevde Git kullanması zorunlu değildir ve Git tek başına doğru kod üretmez.

Bu parçaların kesin adları ve uygulaması araçtan araca değişebilir; her kurulum bunların uygun olanlarını seçer. Bu sunumda ‘harness’ derken model çağrısını araç döngüsü, context ve çalışma sınırlarıyla yöneten çevreyi kastediyorum; bu açıklayıcı bir kullanım, bütün ürünlerin benimsediği resmî kategori adı değil. Her bir kavramı şimdi yalnızca isim düzeyinde tanımak yeterli; önemli olan hepsini aynı şey sanmamak. Model tek başına workflow'un tamamı değildir; çevresindeki bileşenler seçilen kurulumda iş bölümünü sağlar.”

“Aynı mobil menü görevini bu örnek kurulumdan geçirelim. Model görevi yorumlar. Context'e ekran görüntüsü ya da mevcut davranış notu, proje dosyaları ve talimatlar eklenebilir. Agent önce ilgili dosyayı bulup okuyabilir; değişikliğe başlamadan önce kapsamını belirler. Araç olarak dosya arama veya terminal kullanabilir. Terminalden gelen sonuç, örneğin testin başarılı olup olmadığı, tekrar context'e döner. Model bu sonuca göre işi bitirebilir ya da yeni bir adım deneyebilir.

Bu örnekte bir Skill seçilmişse tekrarlanan çalışma yöntemini sağlar: önce ilgili bileşeni bul, sonra küçük bir değişiklik yap, ardından kabul koşulunu kontrol et. Skill yeni bir canlı bilgi kaynağı değildir; bir işi nasıl yürüttüğümüzü paketler ve bu görevde kullanılmaması da mümkündür. MCP seçilmişse issue takip sistemi gibi dış bir kaynağa standart bağlantı yolu sağlayabilir. MCP'nin varlığı, uygulamanın otomatik olarak güvenli veya doğru olduğu anlamına gelmez; hangi sunucuya ve hangi yetkiye bağlandığımız hâlâ önemlidir.

Git kullanılıyorsa proje değişiklik geçmişini gösterebilir. Diff, yapılan değişikliği gösterir; commit bir durumu kaydeder; gerekirse önceki duruma dönme yolu verir. Ancak Git bir test değildir ve her coding agent görevinde kullanılmak zorunda değildir. Kurulumda seçilen parçaların işi ayrıdır: model üretir, context bilgi taşır, tools etkileşim sağlar, yönergeler tekrar edilebilirliği destekler, Git varsa değişiklikleri izlenebilir tutar. Bir parçayı eklemek diğerlerinin görevini ortadan kaldırmaz.”

## Geçiş

“Parçaları tanıdık. Şimdi bunları fikirden doğrulanmış değişikliğe giden bir çalışma sırasına koyalım.”

## 30 dk

4:30 — Yaklaşık 2:45 konuşma ve 1:45 dokuz bileşeni sırayla görünür kılma. Skill'in yönerge, MCP'nin bağlantı standardı olduğunu ayrı vurgula. Protokol/terminal teknik ayrıntısına girme.

## 45 dk

Phase 1 kapsamı dışında; ek içerik yazılmadı.

## 60 dk

Phase 1 kapsamı dışında; ek içerik yazılmadı.
