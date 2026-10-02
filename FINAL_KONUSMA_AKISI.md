# Konuşma akışı — kısa rehber

Ezber metni değil; sahne başında bir bakışta hatırlamak için. Ayrıntılı notlar Presenter görünümünde, **Konuşmacı notları** altında.

**Kontroller:** `→` / `Space` ilerle · `←` geri · `J` / `K` sahne · `R` sahne başı · `Esc` tam ekrandan çık
**Video adımları:** Scene 04 Adım 5, Scene 05 Adım 4, Scene 08/11 uzun kayıtları ana rota adımı değildir; Presenter’dan fallback olarak seçilir. Video durmuş açılır → önce bir cümle kur → `Space` → bitince `→`.

**Replay:** Scene 08 Adım 4 (Codex App, 24,5 sn), Scene 11 Adım 5 (Vi3ecode, 34 sn). Space oynat/duraklat; oklar bölümleri seçer, uçlarda sunuma devam eder. Reload son karede durur.

**53 durumlu ana rota:** Kısa klip bitince → sonraki sahne. Uzun kayıt yalnız Presenter’daki “Uzun kaydı aç (fallback)” düğmesiyle seçilir. Bitince “Ana rotaya dön” veya ←/→ seçimden önceki adıma döndürür; ardından → ile rotaya devam et. Kısa ve uzun sürümü art arda izletmek varsayılan akış değildir.

**Ana soru:** Çalışıyor mu? ≠ Doğru ve güvenilir mi?
**Son cümle:** Model değil, sistem.

---

## 01 — Açılış: AI ile gerçekten uygulama yapılabilir mi?

- **Ana fikir:** AI çalışan bir başlangıç üretebilir; çalışıyor görünmesi güvenilir olduğu anlamına gelmez.
- **Adımlar:** soruyu sor, bekle → “Bir uygulama yap” → istek, değişiklik, sonuç → iki ayrı soru.
- **Söyle:** “Ekranın açılması yalnızca ilk soruya cevap veriyor. Bugün ikincisini konuşacağız.”
- **Geçiş:** “Önce çalışma biçimimizin nereden nereye geldiğine bakalım.”

## 02 — Nereden nereye?

- **Ana fikir:** Değişen yalnızca model değil; araçla kurduğumuz çalışma biçimi.
- **Tek görev:** web sayfasının başlığını değiştirmek.
- **Adımlar:** Ara → kaynaklar sende. Sor → açıklama sende. Görev ver → incelenecek değişiklik sende.
- **Vurgu:** “Yeni olan daha iyi” çizgisi değil; üçü de bugün kullanılıyor.
- **Geçiş:** “Ortada üç kavram var: model, prompt ve bağlam.”

## 03 — Model, Prompt ve Bağlam

- **Ana fikir:** Model işler, prompt ister, bağlam (context) o anda masadaki bilgidir.
- **Benzetme:** Prompt masadaki görev kâğıdı; bağlam masadaki her şey.
- **Örnek:** “Menüyü düzelt” → “Telefonda menü açılmıyor, masaüstünü değiştirme, bitince testi çalıştır.”
- **Son adım:** Masada olmayanı model görmez; araç çıktısı masaya eklenir.
- **Geçiş:** “Masaya araçlar gelince sohbet ile kodlama ajanı ayrışıyor.”

## 04 — Chatbot ve Kodlama Ajanı · video

- **Ana fikir:** Kodlama ajanı, modelin araç kullanıp sonucu sonraki adıma taşıdığı döngü.
- **Adımlar:** Chatbot: cevap sana döner, sen taşırsın → Ajan: model araç çağırır, sonuç geri döner → izinli araçlar → “Model aynı; ortam farklı.” (harness)
- **Marka notu:** Claude / Claude Code, GPT / Codex: model ile ortamı ayırmak için; karşılaştırma değil.
- **Video (~21 sn):** `Space` → “İstek, kod cevabı, kopyala, index.html, tarayıcı. Her adımı taşıyan benim.”
- **Bitince:** “Sohbet kodu verdi; projeye taşıyan ben oldum.” → `→`
- **Geçiş:** “İşi araca bıraktığımız en hızlı hâl: fikirden ilk ekrana.”

## 05 — Vibe Coding: Hızlı Prototipleme · video

- **Ana fikir:** Doğal dille fikirden ilk sürüme hızla ulaşmak mümkün; bu güçlü bir başlangıç.
- **Adımlar:** portfolyo yap → koyu tema → mobil düzen. İste, gör, tekrar iste.
- **Vurgu:** Küçümseme yok: keşif, öğrenme, prototip için çok değerli. Ekrandaki akış temsili.
- **Video (~23 sn):** `Space` → “Terminalde bir ajan: istek, dosyalar, sayfa; bir takip isteği, güncelleme. Kopyala-yapıştır yok.”
- **Bitince:** “Hızlı. Ama bu kayıtta test ya da build yok; gördüğümüz yalnızca açılan bir sayfa.” → `→`
- **Geçiş:** “Proje büyüyünce hangi sorular çıkıyor?”

## 06 — Vibe Coding’in Duvarı

- **Ana fikir:** Çalışıyor ≠ doğru yapıldı.
- **Sorular:** Güvenli mi? Başka yeri bozdu mu? İstenen şey mi? Test edildi mi? İncelendi mi?
- **Vurgu:** Slogan değil; çalışan ekranın verdiği kanıt sınırlı. Dosya farkı, test ve kod incelemesi birlikte güven verir.
- **Geçiş:** “Ajanın kaputunu açalım.”

## 07 — Ajanın Anatomisi

- **Ana fikir:** Ajan tek parça değil; model, bağlam ve araçların birlikte çalıştığı düzen.
- **Sıra:** Model → Bağlam → Proje dosyaları → Talimatlar → Araçlar → Terminal → Skill → MCP → Git.
- **Dikkat:** Skill = yönerge, model eğitimi değil. MCP = bağlantı standardı, güvenlik garantisi değil. Git = geçmiş, test değil. Üçü de isteğe bağlı.
- **Özet:** Model ≠ Ajan ≠ İş akışı.
- **Geçiş:** “Parçaları bir çalışma sırasına koyalım.”

## 08 — Ajan Tabanlı Mühendislik · video

- **Ana fikir:** Her değişiklik kanıtıyla birlikte ilerler.
- **Adımlar:** Hedef + kabul koşulu → ajan uygular, değişen dosyalar → test, inceleme, doğrula, Git → “İlerleme = değişiklik + doğrulanabilir kanıt.”
- **Vurgu:** Ajanın “bitti” demesi kanıt değil.
- **Replay (Adım 4, 24,5 sn):** “Tek ajan: gerçek Codex App isteği, dosya/komut işlemi, ajanın kontrol özeti ve üretilen videonun izlenmesi. Bağımsız test çıktısı değil.”
- **İsteğe bağlı uzun fallback (~42 sn):** `Space` → “Masaüstü ajan: görev, repo ve araçlarla çalışma, özet, sonunda ürettiği video.”
- **Bitince:** “Özet de bir iddia; içeriği ayrıca kontrol ederiz. Kanıt noktaları bu yüzden var.” → `→`
- **Geçiş:** “Planlayan, yapan ve kontrol eden hep aynı ajan mı olmalı?”

## 09 — Tek Ajanın Sınırı

- **Ana fikir:** Tek ajan çoğu iş için yeterli; büyüyünce bağımsız kontrol gerekir.
- **Söyle:** “Kendi işini kontrol etmenin sınırı var. Ama her işe birden fazla ajan gerekmez; koordinasyon maliyeti de var.”
- **Geçiş:** “Roller ayrılınca iş nasıl akar? Orkestrasyon.”

## 10 — Orkestrasyon

- **Ana fikir:** Doğru işi doğru role ver, sonucu kontrol noktalarından geçir.
- **Adımlar:** Lead → (gerekirse Analyst) → Developer → QA → PASS: tamamla / FAIL: geri dön → Git.
- **Vurgu:** QA onayı ancak gerçek test ve inceleme kanıtına dayanıyorsa anlamlı.
- **Geçiş:** “Gerçek bir çalışma ortamında nasıl görünüyor?”

## 11 — Tek Ajandan Ajan Takımına · video

- **Ana fikir:** Roller ayrılınca aynı görev planlanır, uygulanır ve bağımsız kontrol edilir.
- **Adımlar:** soru → Lead devreder → Developer araçlarla uygular → QA: FAIL geri, PASS Git. “Şema kavramsal; gerçek kaydı şimdi gösteriyorum.”
- **Açıklama (kısa):** Vi3ecode benim ürünüm değil; Berk geliştiriyor, ben topluluk tarafındayım. Kullandığım iş akışı olduğu için örnek.
- **Replay (Adım 5, 34 sn):** “Gerçek Vi3ecode: Lead Developer ve QA’ya paralel iş devreder; Developer sonucu, QA kontrolü ve screenshot kısıtı görünür. Model ataması uydurulmaz.”
- **İsteğe bağlı uzun fallback (~62 sn):** `Space` → “Rol ayarları (ekranda kaydedilen değer; rol başına ayrı model iddiası yok) → görev → bekleme kesildi → QA raporu ve önizleme.”
- **Dürüst not:** QA ekran görüntüsü alamadığını yazıyor; hatalar olduğu gibi duruyor.
- **Bitince:** “Tek modelin cevabı değil; planlayan, uygulayan ve kontrol eden bir süreç.” → `→`
- **Geçiş:** “Baştaki soruya dönelim.”

## 12 — Model Değil, Sistem

- **Adımlar:** “AI ile uygulama yapılabilir mi?” — Evet. → Güvenilir yazılım için: bağlam, araçlar, test, inceleme, insan. → Bu sunumun gerçek Git kaydı ve iki diff. → Son cümle.
- **Söyle:** “Bazen tek model yeter, bazen birkaç rol. Ama işi kabul etme sorumluluğu her durumda insanda.”
- **Kapanış:** “Model değil, sistem.” Sus, birkaç saniye bekle; teşekkür et, soruları al.
