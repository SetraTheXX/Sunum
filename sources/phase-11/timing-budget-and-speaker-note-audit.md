# Phase 11A — 30 dakika süre bütçesi ve konuşmacı notu riskleri

- **Tarih:** 2026-09-28
- **İncelenen metin:** PRD süre hedefleri ve Scene 01–12 kaynak dosyalarındaki `Konuşmacı`, `Geçiş` ve `30 dk` bölümleri.
- **Durum:** Bütçe bir prova sonucu değil; Run 2/3 gerçek süreleri insan tarafından ölçülecek.

## Süre bütçesi

PRD hedefi 26–28 dakika ve 2–4 dakika soru/nefes/teknik gecikme payıdır. Sahne kaynaklarındaki mevcut kaba sürelerin toplamı 29:45'tir; bu toplam kronometreli prova değildir. Aşağıdaki hedefler kısa Cold Open'ı koruyup ana öğretim başlıklarına süre ayıran Phase 11A planlamasıdır.

| Scene | Başlık | Hedef süre | Hard max | Risk |
|---|---|---:|---:|---|
| 01 | Cold Open: AI gerçekten uygulama yapabilir mi? | 1:20 | 1:30 | Yüksek — açılış hedefi kısa; kaynak tahmini 1:50, güvenilirlik soruları ve izleyici sorusu süreyi uzatabilir. |
| 02 | Nereden nereye? | 1:25 | 1:30 | Orta — üç çalışma biçimi ve örnek aynı fikri iki kez açıklatabilir. |
| 03 | Model, Prompt, Context | 3:40 | 3:55 | Yüksek — üç tanım, bağlam metaforu ve mobil menü örneği yoğun; başlangıç seviyesinde duraklama gerekebilir. |
| 04 | Chatbot ve Coding Agent | 3:00 | 3:05 | Yüksek — araç döngüsü ve model/ortam ayrımı tekrar açılıyor; marka terminolojisinde uzama riski var. |
| 05 | Vibe Coding | 2:00 | 2:05 | Orta — üç istek ve prototipin olumlu yönü birkaç örnekle anlatılıyor. |
| 06 | Vibe Coding'in duvarı | 2:20 | 2:25 | Orta-yüksek — ana cümleyi anti-vibe coding olmadığını açıklayarak tekrar etme; Scene 08 ile test/review örtüşmesi. |
| 07 | Agent anatomisi | 4:10 | 4:25 | Yüksek — dokuz bileşen, opsiyonellik sınırları ve ikinci bir görev örneği var; teknik terim sayısı fazla. |
| 08 | Agentic Engineering | 2:25 | 2:30 | Orta-yüksek — akış iki kez anlatılıyor ve test kanıtının sınırı açıklanıyor; Scene 06/10 ile örtüşme riski. |
| 09 | Tek agent sınırı | 0:30 | 0:35 | Düşük — kısa ve tek sorulu; geçişte uzatmamak yeterli. |
| 10 | Orchestration | 0:40 | 0:45 | Orta — Lead/Analyst/Developer/QA ve PASS/FAIL'i bir nefeste anlatmak gerekebilir. |
| 11 | Agent'tan agent takımına | 4:15 | 4:20 | Yüksek — workflow, şeffaflık ve kanıt sınırlarını açıklar; demo/ürün turu bekleme süresi eklenmemeli. |
| 12 | Final: Model değil, sistem | 1:00 | 1:05 | Orta — 45–75 saniyelik final aralığında; bileşenleri tekrar saymak son duraklamayı uzatabilir. |
| **Toplam** |  | **26:45** | **28:00** | Target sürede 3:15, hard max'ta 2:00 soru/nefes/teknik buffer kalır. |

**Scene 11 sınırı:** 4:15 hedef / 4:20 hard max; 5 dakikanın altında kalır. Authentic ekran/video henüz olmadığı için canlı demo, yükleme veya kayıt bekleme süresi bütçeye eklenmedi. Burada yalnız workflow ana fikri anlatılır.

**Hard max yorumu:** Sahne hard max'larının toplamı 28:00'dır. Run 2'de bir sahne hard max'ı aşarsa önce o sahnenin risk notundaki açıklama/örnekleri gözden geçir; ana eğitim omurgasını kesme. Bütçe planlanmıştır, gerçek performans kanıtı değildir.

## Gerçek Run 2 28 dakikayı aşarsa kesme önceliği

Kullanıcının Phase 11 talimatına göre:

1. Ekstra model detayı
2. Uzun metafor açıklaması
3. MCP ek açıklaması
4. Sub-agent edge case
5. Claude/Codex ürün ayrıntısı

Context, Chatbot → Coding Agent, Vibe Coding'in duvarı, Agent anatomisi, Agentic Engineering, agent team/Vi3ecode ana fikri ve “MODEL DEĞİL, SİSTEM.” finali kesilmez. Scene 11 ürün turuna çevrilmez; demo beklemesi uydurulmaz.

## Scene 01–12 konuşmacı notu risk denetimi

Bu denetim kaynak metin okumasıdır; henüz yüksek sesle prova veya süre ölçümü yapılmadı. “Tekrar” sütunu konu tekrarını işaretler; yalnız bariz duplicate satır/typo düzeltmesi yapıldı.

| Scene | Tekrar / başka sahneyle örtüşme | Başlangıç seviyesi / teknik ayrıntı | Uzunluk ve doğal sunum riski |
|---|---|---|---|
| 01 | Güvenilirlik sorusu Scene 06 ve Final'de yeniden dönecek; burada açılış kancası olarak gerekli. | Düşük teknik yük. | Kaynak 1:50 tahmini kısa açılış hedefini aşıyor; arka arkaya gelen sorular ve uzun özet doğallığı/süreyi zorlayabilir. |
| 02 | Ara → Sor → Görev ver çizgisi ve başlık değiştirme örneği aynı farkı yeniden kuruyor. | Düşük teknik yük; tarihsel “dönem” gibi anlaşılmaması için açıklama var. | Örneklerin ikisini de anlatmak hedef 1:25'i aşabilir; doğal karşılaştırma için bir örnek yeterli olabilir (Run 2'de karar ver). |
| 03 | Model/prompt/context tanımları, masa metaforu ve mobil menü örneğiyle birkaç kez tekrar ediliyor. | Kavram yükü çekirdeğin gerekli parçası; context'in kalıcı hafıza olmadığı uyarısı yerinde. | Dört uzun paragraf; metafordan ikinci prompt örneğine geçerken nefes ve vurgu riski yüksek. Şimdilik metin kısaltılmadı. |
| 04 | Model/ortam ayrımı Scene 03 ve 07 ile örtüşüyor; ok döngüsü iki kez tarif ediliyor. | Harness açıklaması ve Claude/Codex örnekleri yeni başlayan için terim yoğun. | Uzun paragraflar; marka örnekleri ana döngüden fazla süre alabilir. Ürün ayrıntılarını genişletme. |
| 05 | Portfolyo/koyu tema/mobil örneği sonraki paragraflarda prototip hızını yeniden anlatıyor. | Teknik yük hafif; vibe coding'in olumlu tarafı dengeli. | İki ayrı örnek açıklaması var; üç isteğin her birinde durmak toplam 2:00 hedefini zorlayabilir. |
| 06 | “Çalışıyor ≠ doğru yapıldı” ve vibe coding karşıtı olmadığı fikri farklı paragraflarda yeniden açıklanıyor; Scene 08'e doğrulama geçişi var. | Test, diff ve review ayrımı başlangıç için uygun; örnek riskler gerçek bug iddiası değil. | Tekrarın amacı yanlış anlamayı önlemek, fakat tüm örnekleri okumak hedefi aşabilir. Vibe coding'i küçümseyen tona kayma riski düşük. |
| 07 | Bileşen tanımları ilk bölümde, aynı mobil menü workflow'u ikinci bölümde tekrar kuruluyor. | Dokuz bileşen ve skill/MCP/Git caveat'leri en yüksek jargon yükü. | Kaynak tahmini 4:30; bileşenleri tek tek genişletmek kolayca uzatır. Birer cümleyle sınırlayıp listeyi hızlı açma gerekli. |
| 08 | Hedef→Git akışı önce sayılıyor, sonra mobil menü örneğiyle yeniden yürütülüyor; test sınırı Scene 06/10 ile örtüşüyor. | Testin garanti olmadığı uyarısı doğru ama ayrıntıya kaçmamalı. | İki anlatım turundan yalnız biri ana akışta ayrıntılı anlatılmalı; “değişiklik + kanıt” mesajını koru. |
| 09 | Scene 10'a doğal soru bırakıyor; belirgin tekrar yok. | Basit ve anlaşılır. | Kısa metin; yeni örnek eklenirse sahne amacından sapabilir. |
| 10 | PASS/FAIL akışı Scene 08/11'de tekrar görünecek; burada rol ayrımı için gerekli. | Analyst'in koşullu olması ve rol örneği açık. | Tek paragraf doğal; “orchestration” terimini tekrar açıklamadan akışı söylemek yeterli. |
| 11 | Workflow örneği ve “ürün turu değil/gerçek UI kanıtı değil” sınırı farklı paragraflarda tekrarlanıyordu. | Rol ve handoff fikri kolay; belirli ürün feature'ı iddiası yok. | Üç paragraf ve disclosure var. Kavramsal workflow/kanıt sınırı ikinci paragrafta zaten açık olduğundan aynı “gerçek arayüz iddiası değil” cümlesi üçüncü paragraftan çıkarıldı; sahiplik/moderasyon şeffaflığı korundu. Demo bekleme riski yok. |
| 12 | Context/tools/skills/test/review/insan listesi, ardından bileşen rolleri yeniden sayılıyor. | Düşük teknik yük; geleceğe dair kesin tahmin yapılmaması zaten belirtilmiş. | 1:00 hedefinde final cümlesinden önce uzun özet ve sessizlik birlikte uzayabilir; son “MODEL DEĞİL, SİSTEM.” cümlesini tek başına bırak. |

### En yüksek üç süre riski

1. **Scene 07:** dokuz kavram + ayrıntılı ikinci örnek.
2. **Scene 03:** başlangıç seviyesi kavram yoğunluğu ve tekrarlı açıklama.
3. **Scene 01:** 1:50 kaynak tahminine karşı kısa Cold Open bütçesi.

Scene 11 de yüksek risklidir; ancak 4:20 hard max altında, authentic demo beklemesi eklemeden anlatılabilir. Gerçek Run 2 verisi olmadan süre riski çözülmüş sayılmaz.
