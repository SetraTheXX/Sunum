# 04 — Chatbot ve Coding Agent

**Durum:** Must — 30 dakika rotası

**Tahmini süre:** 3:20

## Amaç

Sohbet cevabı ile proje araçlarını kullanıp sonuçları tekrar değerlendiren agent döngüsünü ayırt etmek.

## İzleyicinin bu sahneden çıkarken anlayacağı tek şey

Bu sunumda “coding agent”, modelin araç kullanıp sonuçları yeni adıma taşıdığı bir çalışma döngüsüdür.

## Ekranda

- Chatbot: Sen → Model → Cevap
- Coding agent: Sen → Agent/Harness → Model → Araç → Sonuç → tekrar değerlendirme
- Araç örnekleri: dosya oku/değiştir, terminal komutu çalıştır
- Alt not: “Model ≠ onu projede çalıştıran coding-agent ortamı”

## Konuşmacı

“Chatbot'ta tipik akış şudur: Bir soru gönderirim, model bir yanıt üretir. Bu çok kullanışlıdır; kod önerebilir veya ne yapmam gerektiğini anlatabilir. Coding agent dediğimiz düzende, modelden gelen karar araçlara aktarılabilir. Agent projedeki dosyaları okuyabilir, izin verilen bir değişikliği yapabilir, terminalde komut çalıştırabilir ve sonucu tekrar context'e alabilir. Model de yeni sonucu görüp devam edip etmeyeceğine karar verir.

Bu sunumda coding agent'ı böyle bir araç döngüsü etrafında tanımlıyorum. Ürünler bu terimleri ve sınırları farklı adlandırabilir; model ile çalışma ortamını ayırma fikri ise burada önemli. Ortamın dosya erişimi, terminali ve talimatları vardır; bunlar hangi işlerin yapılabildiğini ve hangi sınırların geçerli olduğunu belirler. Bu çevreyi açıklarken “harness” sözcüğünü kullanacağız: burada modelin çevresindeki çalışma, araç ve agent ortamı için kullandığımız pratik bir terim; her ürün için tek ve resmî bir kategori iddiası değil. Model bir parça; agent çalışma döngüsü, context, araçlar ve kuralların birlikte çalıştığı düzendir.

Örnek olarak Claude model ailesinin adı, Claude Code ise agentic coding tool'dur; GPT bir model ailesini, Codex ise kod üzerinde çalışan agent ürün ve araçlarını anlatır. Codex adı model adlarında da geçebildiği için bunu katı bir marka sınıflandırması gibi ezberlemeyelim. Önemli olan burada hangi parçanın model, hangisinin projede çalışan ortam olduğunu sormak. Bugün marka yarıştırmayacağız; ortak çalışma biçimine odaklanacağız.”

“Şemadaki okları takip edelim. Kullanıcı hedef verir; çalışma ortamı projeyi hazırlar ve modele gerekli bağlamı iletir. Model bir cevap ya da araç çağrısı üretir. Bir araç çağrısı varsa ortam onu çalıştırır ve sonucu geri iletir. Sonuç, bir sonraki kararın girdisi olur. Döngü görev tamamlanana, sınırına ulaşana veya insan müdahalesi gerekene kadar sürebilir. Bir sohbet arayüzünde de arka planda araçlar bulunabilir; belirleyici olan düğmenin adı değil, bu döngünün nasıl kurulduğudur.

Burada “agent kendi başına her şeye erişebilir” demiyoruz. Bir ürün hangi dosyalara ve komutlara erişim tanıyorsa agent'ın yapabildiği de o sınırlar içindedir. Kod yazma önerisi veren bir sohbet yanıtı, dosyaya uygulanmış değişiklikle aynı şey değildir. Tersine, araç çağrısı yapmak da değişikliğin doğru olduğunu kanıtlamaz. Bu nedenle ilerleyen sahnelerde hem agent'ın yeteneklerini hem de onu çevreleyen kontrol adımlarını konuşacağız.”

## Geçiş

“Bu araç döngüsünden önceki hızlı ve eğlenceli başlangıca bakalım: fikirden ilk çalışan arayüze.”

## 30 dk

3:20 — Yaklaşık 2:25 konuşma ve 0:55 ok/araç döngüsünü izleme. Ürün adı veya güncel özellik listesi ezberletme.

## 45 dk

Phase 1 kapsamı dışında; ek içerik yazılmadı.

## 60 dk

Phase 1 kapsamı dışında; ek içerik yazılmadı.
