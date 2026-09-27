# Phase 11A — Run 1 navigation dry-run

- **Tarih:** 2026-09-28
- **Test edilen commit:** `fd5cc915f476fccd8a0e113f2b9f4192845996c7`
- **Build:** `npm run build` — PASS
- **Sunum:** Production preview, `http://127.0.0.1:4173/`
- **Tarayıcı erişimi:** Paylaşılan browser panelinde `browser_navigate`, `browser_get_text` ve `browser_screenshot` ile canlı sayfa açılıp incelendi. Görüntü panelde geçici olarak incelendi; screenshot dosyası kaydedilmedi.

## Sonuç

Otomatik Run 1 akışı PASS; navigation hatası bulunmadı. Bu bir süre ölçümü veya insan provası değildir.

- Production render 30 dk modunda 12 sahneyi doğru başlık ve sayaçlarla gösterdi.
- Görünür “Sonraki sahne / Adımı aç” düğmesinin tıklanmasıyla 47 ileri geçiş yapıldı. Reveal sırası her sahnede 1’den son adıma ilerledi; sahne geçişi sonraki sahnenin 1. adımına döndü. Scene 07’deki 11 adım da doğru sırada açıldı.
- Scene 11, 4/4 adımdan Scene 12’nin 1/3 adımına geçti. Final 3/3 olduğunda ileri düğmesi `disabled` oldu; rota Scene 12’de kaldı.
- İlk sahnenin 1. adımındayken önceki düğmesi devre dışıydı ve `ArrowLeft` olayından sonra URL/sahne değişmedi. Finalde `Space`, `ArrowRight` ve `J` olayları Scene 12 / 3. adım URL'sini değiştirmedi.
- Geri düğmesi Final'de 3 → 2 → 1 adımına, ardından Scene 11'in 4/4 adımına döndü.
- `ArrowRight`, `Space`, `ArrowLeft`, `J`, `K` ve `R` için sayfaya sentetik `keydown` olayı gönderildi. İleri/geri reveal, sonraki/önceki sahne ve sahneyi ilk adıma sıfırlama URL durumunda doğrulandı. Bunlar fiziksel klavye veya tuş odağı testi değildir.
- Doğrudan `?mode=30&scene=N&step=1` yüklemesi 12 sahnenin tamamında doğru başlık, ilk reveal ve URL state’i verdi. İlk hızlı gezinme dizisi panel rate limit'ine takıldı; 08–12 düşük tempoda yeniden denenip başarıyla doğrulandı. Ayrıca Scene 11 `step=4` ve Scene 12 `step=3` doğrudan açıldı.

## Kapsam ve sınırlar

- Tam ileri rota tüm 12 sahneyi ve reveal’ları kapsadı; bu bir insan anlatımı, Run 2 veya Run 3 değildir.
- Klavye davranışı uygulama handler’ına sentetik olay göndermekle sınandı; gerçek fiziksel tuş girişi doğrulanmadı.
- Tarayıcı panelinin rate limit'i ilk hızlı çağrı dizisini durdurdu; çağrılar aralıklı tekrarlandığında bütün 12 doğrudan URL kontrolü tamamlandı. Uygulama kaynaklı başarısız gezinme yok.
- Yeni screenshot/video kanıt dosyası üretilmedi. Ekran görüntüsü yalnızca paylaşılan panelde anlık inceleme için görüntülendi.
- `package.json` içinde test/lint betiği yok; bu Run 1 için dependency veya test framework eklenmedi.
