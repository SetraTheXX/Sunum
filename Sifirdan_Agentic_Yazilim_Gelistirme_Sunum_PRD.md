# Sıfırdan Agentic Yazılım Geliştirme — Sunum Sitesi PRD

**Belge türü:** Product Requirements Document  
**Teslim hedefi:** Salı, 29 Eylül 2026  
**Ana format:** Localhost üzerinde çalışan interaktif web sunumu  
**Ana süre:** 30 dakika  
**Genişletilmiş modlar:** 45 dakika / 60 dakika  
**Canlı demo:** Vi3ecode + Agent Mode  
**Hedef kitle:** Yapay zekâ destekli yazılım geliştirmeye yeni başlayan öğrenciler; ChatGPT kullanmış olabilirler fakat coding agent, context, harness, skill, MCP, Git/test/QA ve agent orkestrasyonu konusunda ön bilgi varsayılmaz.

---

## 1. Ürün özeti

Bu proje klasik PowerPoint/PDF sunumu değildir. Sunumun kendisi, anlattığı fikri temsil eden çalışan bir yazılım ürünü olacaktır.

Sunum, localhost üzerinde tam ekran çalışan; klavye ile ilerleyen; bazı kavramları interaktif animasyonlarla açan; gerçek Codex / Claude Code / Vi3ecode örneklerini kullanan; internet bağlantısına bağımlı olmayan bir **interaktif dijital ders kitabı + canlı anlatım arayüzü** olarak tasarlanacaktır.

Ana eğitim çizgisi:

> **Sıfır bilgi → LLM / Context → Chatbot → Vibe Coding → Coding Agent → Agentic Engineering → Skills / Tools / MCP → Test / Review / Git → Sub-agent / Orkestrasyon → Vi3ecode gerçek workflow**

Sunumun final hedefi öğrenciyi “vibe coding yapabiliyorum” seviyesinde bırakmak değildir. Vibe coding, modern AI destekli yazılım geliştirmeye giriş kapısı olarak anlatılacak; sunumun esas fikri, güvenilir sonuç için **modelden ziyade sistem tasarımının** önemidir.

---

# 2. Ürün vizyonu

Sunumun sonunda izleyici şu cümleyi kurabilmelidir:

> “ChatGPT ile kod istemek, coding agent kullanmak ve agentic engineering yapmak aynı şey değil. Modelin etrafında context, tools, skills, test, review, Git ve insan kontrolünden oluşan bir sistem gerekiyor.”

Sunumun merkez tezi:

> **Mesele artık yapay zekâya kod yazdırmak değil; yapay zekânın çalışacağı mühendislik sistemini kurmak.**

Kapanış tezi:

> **MODEL DEĞİL, SİSTEM.**

Alt mesaj:

> **Context · Tools · Skills · Test · Review · İnsan**

---

# 3. Sunumun öğretim hedefleri

Sunum sonunda izleyici:

1. LLM / model kavramını çok temel seviyede açıklayabilmeli.
2. Prompt ile context arasındaki farkı kavramalı.
3. Model ile coding agent / harness arasındaki farkı anlayabilmeli.
4. Chatbot ile coding agent’ın neden farklı olduğunu görebilmeli.
5. Vibe coding’in güçlü ve zayıf taraflarını anlayabilmeli.
6. “Çalışıyor” ile “doğru ve güvenilir geliştirildi” arasındaki farkı görebilmeli.
7. Coding agent’ın dosya, terminal, Git ve tool kullanarak nasıl döngüsel çalıştığını kavramalı.
8. Skill’in tekrar kullanılabilir çalışma yöntemi olduğunu anlayabilmeli.
9. MCP’yi agent’ın dış sistemlere bağlanma katmanı olarak zihninde konumlandırabilmeli.
10. Test, review, diff ve QA’nın neden gerekli olduğunu anlayabilmeli.
11. Sub-agent ve orchestration fikrini temel düzeyde kavrayabilmeli.
12. Lead → Developer → QA gibi rol ayrımının amacını anlayabilmeli.
13. Vi3ecode üzerinde bu kavramların gerçek bir workflow’da nasıl birleştiğini görebilmeli.

---

# 4. Kapsam

## 4.1 Dahil

- AI / LLM için kısa zihinsel model
- Prompt
- Context
- Model
- Coding agent
- Harness
- Files / Project Files
- Terminal
- Tools
- Git
- Skills
- MCP
- Session
- Gerekirse kısa compaction / context dolması açıklaması
- Vibe coding
- Agentic engineering
- Test / review / verify
- Sub-agent
- Orchestration
- Lead / Analyst / Developer / QA / Designer gibi rol örnekleri
- Codex
- Claude Code
- Vi3ecode
- Vi3ecode Agent Mode
- Gerçek workflow ekranları
- 30 / 45 / 60 dakika sunum modları
- Offline / fallback demo
- Presenter keyboard controls
- Görsel sistem
- Gerçek screenshot kullanımı
- Basit özel illüstrasyonlar
- Interaktif diyagramlar

## 4.2 Dahil değil

- Transformer matematiği
- Attention formülleri
- Model training / fine-tuning detayları
- Benchmark savaşı
- Model “hangisi en iyi?” sıralaması
- Güncel fiyatların detaylı karşılaştırması
- API maliyet hesabı eğitimi
- Claude Code veya Codex’in bütün menülerinin tek tek eğitimi
- MCP protokol spesifikasyonunun teknik derinliği
- İleri seviye multi-agent altyapı implementasyonu
- “AI yazılımcıların yerini alacak mı?” tartışmasını merkeze almak
- Vi3ecode satış sunumu
- Avenox tasarımının birebir kopyalanması

---

# 5. Kaynaklardan alınan ana eğitim prensipleri

Bu PRD’de kullanılan anlatı yaklaşımı, paylaşılan transkript ve ekranlardan şu ilkeleri taşır:

- Önce terminoloji ve zihinsel model oturtulur.
- “Model” ile etrafındaki agent / harness ayrılır.
- Context, modelin görebildiği çalışma alanı olarak anlatılır.
- Agent, modelin dene → sonucu gör → karar ver → devam et döngüsüne sokulması olarak basitleştirilir.
- Skill, tekrar kullanılabilir çalışma notu / yöntemi olarak konumlandırılır.
- MCP, dış dünyaya bağlantı katmanı olarak basitleştirilir.
- Üst agent’ın her işi kendi yapması yerine alt agent’lara görev dağıtmasının context ve paralellik avantajı anlatılır.
- Aynı alana birden fazla agent gönderildiğinde çakışma riski olduğu; iş sahipliğinin bölünmesi gerektiği vurgulanır.
- Yazılım geliştirme süreci kabaca kapsam/plan → implementation → test/quality olarak ayrılır.
- Vi3ecode örneğinde Lead / Analyst / Developer / QA handoff’ları gerçek workflow göstergesi olarak kullanılır.
- “Agent bitti dedi = iş gerçekten bitti” kabul edilmez; test ve review zorunlu zihinsel refleks olarak gösterilir.

Not: Transkriptlerde geçen model isimleri, fiyatlar, paketler, limitler ve ürün özellikleri zamanla değişebilir. Sunumun ana anlatısı bunlara bağımlı olmayacaktır. Sunumda kullanılacak güncel ürün ekranları ve spesifik özellik isimleri final QA sırasında ayrıca doğrulanacaktır.

---

# 6. Ana anlatı — kilit sıra

Bu sıra PRD’nin en önemli bölümüdür. İçerik üretimi sırasında rastgele değiştirilmeyecektir.

## PERDE 0 — Cold Open: “AI gerçekten uygulama yapabilir mi?”

**Amaç:** İlk 30–60 saniyede dikkat yakalamak.

Tam ekran minimal terminal:

```text
> Bir uygulama yap.

Reading project...
Planning...
Editing files...
Running tests...
Tests passed.
```

Ardından:

> **Bu, ChatGPT’ye kod sordurmakla aynı şey değil. Arada ne değişti?**

Bu soru bütün sunumun motorudur.

---

## PERDE 1 — Nereden nereye geldik?

Üç küçük evre:

### Eski
```text
İnsan → Google / StackOverflow → Kod
```

### Chat dönemi
```text
İnsan → ChatGPT → Kod → Kopyala / Yapıştır
```

### Agent dönemi
```text
İnsan → Coding Agent → Repo → Terminal → Test → Git → Çalışan yazılım
```

**Mesaj:** Değişen sadece model kalitesi değil; modelin etrafındaki çalışma sistemi.

---

## PERDE 2 — Çok kısa temel: Model + Prompt + Context

### Model
Metin / kod gibi çıktılar üreten “beyin”.

### Prompt
Modele verdiğin görev / istek.

### Context
Modelin o anda görebildiği çalışma masası.

Görsel metafor:

```text
          MODEL

     ┌─────────────┐
     │   MASA      │
     │ Prompt      │
     │ Dosyalar    │
     │ Kurallar    │
     │ Tool çıktısı│
     │ Sohbet      │
     └─────────────┘

       = CONTEXT
```

**Ana cümle:**  
> “Model masanın üzerinde olmayan şeyi göremez.”

30 dakikalık modda token/parameter derinine girilmez.

---

## PERDE 3 — Chatbot ≠ Coding Agent

### Chatbot

```text
Sen → Model → Cevap
```

### Coding Agent

```text
                     ┌─ Files
                     ├─ Terminal
Sen → Agent/Harness ─┼─ Git
            │        ├─ Tools
            ▼        └─ Browser / MCP
          Model
```

Bu perdede şu ayrımlar net verilir:

> **Claude ≠ Claude Code**  
> **GPT ≠ Codex**

Model başka şeydir. Modeli proje üzerinde çalıştıran harness / agent ortamı başka şeydir.

Codex ve Claude Code ürün savaşı yapılmaz. İkisi ortak kavramları göstermek için örneklenir.

---

## PERDE 4 — Vibe Coding: Neden büyüleyici?

Örnek:

```text
“Bana bir portfolyo sitesi yap.”
↓
“Dark mode ekle.”
↓
“Login ekle.”
↓
“Mobil yap.”
```

Kısa, eğlenceli ve pozitif anlatım.

Mesaj:

> “Fikri, çok az teknik sürtünmeyle çalışan bir şeye dönüştürmek mümkün.”

Vibe coding ilk başta küçümsenmez.

---

## PERDE 5 — Vibe Coding’in duvarı

Proje büyür.

Sorular:

- Neden login bozuldu?
- AI hangi dosyayı değiştirdi?
- Test var mı?
- Güvenlik doğru mu?
- Başka feature kırıldı mı?
- Dependency neden eklendi?
- Prod’a güvenli mi?
- AI “bitti” dedi ama gerçekten bitti mi?

Ana ekran:

> **ÇALIŞIYOR ≠ DOĞRU YAPILDI**

Geçiş:

> “İşte burada vibe coding, mühendislik sistemine dönüşmek zorunda.”

---

## PERDE 6 — Agent’ın kaputunu aç

Bu bölüm sunum sitesinin ana interaktif sahnelerinden biridir.

Her `Space` / `→` ile bir bileşen eklenir:

1. MODEL
2. CONTEXT
3. PROJECT FILES
4. INSTRUCTIONS (`AGENTS.md`, `CLAUDE.md` örneği)
5. TOOLS
6. TERMINAL
7. SKILLS
8. MCP
9. GIT

Sonunda bütün sistem birleşir.

Ana cümle:

> **Model ≠ Agent ≠ Workflow**

### Basit tanımlar

**Harness:** Modelin etrafındaki çalışma makinesi.  
**Tool:** Agent’ın iş yapmak için kullandığı araç.  
**Skill:** Bir işi nasıl yapacağını tarif eden tekrar kullanılabilir yöntem.  
**MCP:** Harici veri / servis / sistemlere bağlantı katmanı.  
**Git:** Değişiklikleri izlenebilir ve geri alınabilir hâle getiren temel katman.

30 dakikalık modda her kavram 15–30 saniye.

---

## PERDE 7 — Agentic Engineering

Vibe coding’den sistemli geliştirmeye geçiş:

```text
HEDEF
  ↓
CONTEXT
  ↓
PLAN
  ↓
IMPLEMENT
  ↓
TEST
  ↓
REVIEW
  ↓
VERIFY
  ↓
GIT
```

Ana cümle:

> “Fark daha uzun prompt yazmak değil; çıktıyı doğrulayan bir sistem kurmak.”

Ek cümle:

> “Agent’ın ‘bitti’ demesi, işin bittiği anlamına gelmez.”

---

## PERDE 8 — Tek agent’ın sınırı / Orkestrasyon

30 dakikalık modda **çok kısa**.

Soru:

> “Planlayan, kodlayan, test eden ve kendi kodunu review eden aynı agent olmak zorunda mı?”

Sonra:

```text
Lead
  ↓
Developer
  ↓
QA
  ↓
PASS → Git
  │
 FAIL
  ↓
Developer
```

Ana metafor:

> **Şef işçilik yapmaz.**

Üst agent:

- işi böler,
- doğru role verir,
- context’i korur,
- sonuçları toplar,
- gerektiğinde geri döndürür.

45/60 dakika modunda:

- sub-agent,
- paralellik,
- context tasarrufu,
- görev sahipliği,
- aynı dosyada çakışma,
- worktree / sıra / ownership yaklaşımı

kısaca genişletilebilir.

---

# 7. Büyük final — Vi3ecode

Vi3ecode, sunumun başında uzun uzun tanıtılmayacaktır. Önce kavramlar öğretilecek; sonra:

> **“Peki bütün bunları tek yerde toplasak?”**

Siyah / boş bir ara sahne.

Ardından Vi3ecode gerçek ekranı.

## 7.1 Şeffaf tanıtım

Sunucu notu:

> “Vi3ecode benim ürünüm değil. Ben topluluk/moderasyon tarafında yer alıyorum. Proje Berk’in. Aktif kullandığım ve bu anlattığımız kavramları gerçek bir workflow’da çok net gösterdiği için burada örnek olarak kullanacağım.”

Bu ifade pazarlama / gizli reklam hissini azaltır.

---

## 7.2 Vi3ecode arayüzünde gösterilecekler

Gerçek screenshot / canlı ekran üzerinde:

- Agent Mode
- Ürün ekibi
- Lead
- Analyst
- Developer
- QA
- Designer
- Thread
- Handoff
- Tool / terminal çağrıları
- Test sonucu
- QA raporu
- Gerekirse Developer’a geri dönüş
- Final approval / tamamlanma

Anlatım:

> “Burada artık bir modele ‘kod yaz’ demiyorum. Bir geliştirme sürecini çalıştırıyorum.”

---

## 7.3 Demo için ideal task

Demo basit, görsel ve doğrulanabilir olmalı.

Örnekler:

- Fiyatlandırma sayfası küçük düzeltmesi
- Mobil menü bug fix
- Küçük erişilebilirlik düzeltmesi
- Bir form validasyonu
- Küçük UI feature
- Küçük test gerektiren bug

Demo **büyük feature** olmayacak.

İstenen davranış:

1. Lead görevi anlar.
2. Gerekirse Analyst’a yollar.
3. Developer değişikliği yapar.
4. Test çalışır.
5. QA review eder.
6. Fail varsa geri döndürür.
7. PASS ile tamamlanır.

### Demo ana mesajı

```text
Chat
↓
Coding Agent
↓
Agent Team
```

Soyutlama seviyesi yükselmiştir.

---

# 8. Final

İlk soruya geri dön:

> **“AI ile uygulama yapılabilir mi?”**

**EVET.**

Sonra:

> **“Peki güvenilir yazılım yapılabilir mi?”**

Cevap:

> **AI tek başına yetmez.**

Final ekran:

# MODEL DEĞİL, SİSTEM.

Altında:

**Context · Tools · Skills · Test · Review · İnsan**

Opsiyonel son cümle:

> “Yazılım geliştirme bitmedi. Sadece soyutlama seviyesi yükseldi.”

---

# 9. Süre modları

Sunum tek codebase olacaktır. İçerik üç route’a ayrılır.

## 9.1 30 dakika — ANA / sınav modu

| Bölüm | Hedef süre |
|---|---:|
| Cold open | 1–2 dk |
| Nereden nereye | 1–2 dk |
| Model + Context | 3–4 dk |
| Chatbot → Coding Agent | 3–4 dk |
| Vibe Coding | 2–3 dk |
| Vibe Coding’in duvarı | 2–3 dk |
| Agent anatomisi | 4–5 dk |
| Agentic Engineering | 2–3 dk |
| Orkestrasyon | 1 dk |
| Vi3ecode | 4–5 dk |
| Final | 1 dk |

**Rehearsal hedefi:** 26–28 dakika.  
2–4 dakika hoca kesmesi / nefes / soru / teknik gecikme için buffer.

---

## 9.2 45 dakika

30 dakikalık omurga korunur.

Ek:

- Context / session örneği
- Codex / Claude Code kısa ürün örnekleri
- Skills örneği
- MCP örneği
- Test / diff / review gerçek screenshot
- Orchestration biraz daha açık
- Vi3ecode demo 6–7 dk

**Rehearsal hedefi:** 40–42 dakika.

---

## 9.3 60 dakika

45 dakikalık sürüme ek:

- Context dolması / compaction kısa örnek
- Permissions / güvenlik sınırları
- Sub-agent context avantajı
- Parallel agent ownership
- Fail → Developer → QA tekrar döngüsü
- Daha uzun Vi3ecode canlı demo
- 3–5 dk soru payı

**Rehearsal hedefi:** 52–55 dakika.

---

# 10. Sunum modu sistemi

İlk açılışta gizli / presenter amaçlı seçim:

```text
PRESENTATION MODE

[ 30 MIN ]
[ 45 MIN ]
[ FULL / 60 ]
```

Alternatif URL:

- `/?mode=30`
- `/?mode=45`
- `/?mode=60`

Opsiyonel:

- `S` → short route
- `F` → full route
- `D` → demo bölümüne git
- `R` → mevcut sahneyi resetle

Sunum sırasında hoca süreyi kısaltırsa mode değiştirilebilir.

---

# 11. Görsel dil

## 11.1 Temel yön

Avenox referanslarından alınacak şey **görsel kopya değil, prensip**:

> **Editorial dergi + interaktif ders kitabı + teknik demo**

Görsel dil AI-SaaS landing page gibi görünmemeli.

### Ana özellikler

- Büyük ve karakterli başlıklar
- Güçlü tipografik hiyerarşi
- Bol boşluk
- İnce bölücü çizgiler
- Bir ana vurgu rengi
- Koyu ve açık sahnelerin kontrollü kullanımı
- Sade editoryal kartlar
- Elle çizilmiş / baskı hissi veren illüstrasyonlar
- Gerçek screenshotlar
- Hafif doku
- Az ama anlamlı animasyon
- Tek sahne = tek ana fikir

---

## 11.2 Kesinlikle kaçınılacaklar

- Fotogerçekçi “gece ofisinde laptop” AI görselleri
- Cyberpunk
- Neon glow
- Mor-mavi gradient mesh
- Glassmorphism
- Her şeyi rounded card içine koymak
- 3D glossy ikonlar
- Floating hologramlar
- Stock developer görselleri
- Sahte dashboard metrikleri
- Gereksiz grafik / chart
- Her öğenin animasyonlu olması
- “AI brain” klişesi
- Devreli insan kafası
- Robot el / insan el tokalaşması
- Aynı anda 4–5 vurgu rengi
- Sahte ürün screenshotları
- Görsel üreticide tam slayt üretmek

**Kural:** AI görsel üreticisi **tam slayt üretmeyecek**.  
Sadece bağımsız illüstrasyon / asset üretecek. Layout, tipografi ve metin HTML/CSS/SVG ile yapılacak.

---

# 12. Özgün görsel kimlik

Avenox limon karakteri kopyalanmayacaktır.

Sunum için isteğe bağlı özgün motif:

### “Cursor Worker” / “Agent Worker”
Basit, iki renkli, elle çizilmiş küçük bir karakter / imleç figürü.

Kullanım:

- Context sahnesinde masaya dosya koyar.
- Vibe coding sahnesinde aceleyle kutu taşır.
- Test sahnesinde büyüteç tutar.
- Orchestration sahnesinde şef / conductor olur.
- Finalde bir workflow haritasına bakar.

Karakter zorunlu değildir. Zaman yetersizse sadece editorial illüstrasyon seti kullanılır.

---

# 13. Görsel / asset planı

Hedef: **az sayıda güçlü görsel**.

## Ana özel illüstrasyonlar

1. **Journey / Yol**
   - Chat → Vibe Coding → Agent → Agent Team
2. **Context masası**
   - Prompt / dosya / kurallar / tool output
3. **Vibe Coding’in duvarı**
   - hızlı yapılan ama birbirine dolaşan feature’lar
4. **Agent anatomisi**
   - model + harness + tools
5. **Orchestration**
   - şef / conductor metaforu
6. **Final**
   - tek model yerine çalışan bir sistem / üretim hattı

## Gerçek screenshotlar

- Codex uygulama / agent çalışma örneği
- Claude Code örneği (varsa kaynak görüntü)
- Git diff / test örneği
- Vi3ecode Agent Mode
- Vi3ecode Lead/Developer/QA handoff
- Vi3ecode test sonucu

### Görsel kalite kuralı

Gerçek screenshotlar:
- kırpılmış,
- gerekli yere zoom yapılmış,
- özel / kişisel veri temizlenmiş,
- kritik alan annotation ile işaretlenmiş
olmalıdır.

---

# 14. Animasyon dili

Animasyon “gösteriş” değil, anlatım aracıdır.

## Uygun

- Bir zincirin adım adım oluşması
- Context öğelerinin masaya gelmesi
- Agent → tool bağlantısının çizilmesi
- Handoff okunun hareket etmesi
- QA fail durumunda okun Developer’a dönmesi
- Test sonucu PASS olduğunda highlight
- Git diff’in satır satır reveal olması

## Uygun değil

- Sürekli floating
- Parallax her yerde
- Arka plan particle
- Sürekli glow pulse
- Sonsuz bouncy icons
- Her metnin typewriter olması

**Prensip:**  
> Hareket, ancak yeni bir bilgi gösteriyorsa vardır.

---

# 15. Teknik mimari

## 15.1 Önerilen stack

- Vite
- React
- TypeScript
- CSS Modules veya tek kontrollü global design system
- SVG diyagramlar
- GSAP veya CSS transitions — yalnız gerektiği kadar
- Local asset storage
- Local fonts
- Network bağımlılığı olmayan production build

## 15.2 Neden

- Hızlı geliştirme
- Sahne component’leri
- Sunum mode state’i
- Klavye navigasyonu
- Reusable reveal / diagram components
- Kolay offline build
- Vi3ecode / Codex agentları için okunabilir proje yapısı

---

# 16. Önerilen dosya yapısı

```text
presentation/
├─ src/
│  ├─ app/
│  │  ├─ App.tsx
│  │  ├─ presentation-mode.ts
│  │  └─ keyboard.ts
│  │
│  ├─ scenes/
│  │  ├─ 00-cold-open/
│  │  ├─ 01-evolution/
│  │  ├─ 02-model-context/
│  │  ├─ 03-chat-vs-agent/
│  │  ├─ 04-vibe-coding/
│  │  ├─ 05-vibe-wall/
│  │  ├─ 06-agent-anatomy/
│  │  ├─ 07-agentic-engineering/
│  │  ├─ 08-orchestration/
│  │  ├─ 09-vi3ecode/
│  │  └─ 10-final/
│  │
│  ├─ components/
│  │  ├─ Scene.tsx
│  │  ├─ Reveal.tsx
│  │  ├─ ProgressRail.tsx
│  │  ├─ TerminalBeat.tsx
│  │  ├─ FlowDiagram.tsx
│  │  ├─ ScreenshotFrame.tsx
│  │  └─ PresenterControls.tsx
│  │
│  ├─ data/
│  │  ├─ routes.ts
│  │  ├─ glossary.ts
│  │  └─ sources.ts
│  │
│  └─ styles/
│     ├─ tokens.css
│     ├─ typography.css
│     └─ global.css
│
├─ public/
│  ├─ images/
│  ├─ screenshots/
│  ├─ illustrations/
│  ├─ logos/
│  ├─ fonts/
│  └─ fallback-demo/
│
└─ package.json
```

---

# 17. Klavye / sunum UX

Minimum:

| Tuş | İşlev |
|---|---|
| `→` / `Space` | sonraki beat |
| `←` | önceki beat |
| `J` / `K` | sonraki / önceki sahne |
| `Home` | başlangıç |
| `D` | Vi3ecode demo |
| `R` | sahneyi resetle |
| `?` | presenter help |
| `Esc` | kontrol overlay |

Ek:

- Scene progress
- Aktif bölüm başlığı
- Mouse zorunlu olmayacak
- Focus kaybolsa bile klavye navigasyonu bozulmayacak

---

# 18. Offline-first gereksinimleri

Sunum internet olmadan açılabilmelidir.

Zorunlu:

- Fontlar local
- CSS/JS local
- Görseller local
- Screenshotlar local
- Video fallback local
- CDN yok
- Google Fonts runtime isteği yok
- Remote image dependency yok

Canlı demo dışındaki sunum internet olmadan %100 çalışacaktır.

---

# 19. Vi3ecode canlı demo güvenlik / fallback

Canlı demo sunumun tek başarısızlık noktası olmayacaktır.

## Plan A — canlı

Vi3ecode açılır ve küçük task çalıştırılır.

## Plan B — önceden tamamlanmış thread

Gerçek bir geçmiş Agent Mode task’ı açılır; handoff ve test adımları anlatılır.

## Plan C — lokal kayıt

60–90 saniyelik local MP4 / WebM.

## Plan D — screenshot sequence

5–7 screenshot:
1. task
2. Lead
3. Developer
4. handoff
5. QA
6. test
7. PASS

Tek tuşla fallback.

**Sunum asla canlı API cevabını beklemek zorunda kalmamalıdır.**

---

# 20. İçerik doğruluğu

Sunumda sayısal / güncel ürün iddiaları minimum tutulacak.

Özellikle finalden önce kontrol:

- Codex UI isimleri
- Claude Code terminolojisi
- Vi3ecode arayüz isimleri
- MCP tanımı
- Skill tanımı
- Agent / sub-agent terminolojisi
- Ekran görüntüsündeki özel veriler
- Değişmiş model isimleri

Güncel fiyat / limit bilgisi ana anlatıya dahil edilmeyecek.

---

# 21. Presenter copy prensipleri

Slaytta yazan ile konuşulan aynı şey olmayacak.

## Slayt

Kısa:

> **ÇALIŞIYOR ≠ DOĞRU YAPILDI**

## Konuşma

Açıklama, örnek, hikâye.

Kural:

- Büyük başlık: 3–9 kelime
- Ana açıklama: ideal 1–3 cümle
- Paragraf gerektiğinde editorial bölüm
- Kod / terminal: en fazla gerekli satırlar
- Her beat’te bir ana fikir

---

# 22. 30 dakika route — ekran / beat taslağı

Yaklaşık 24–30 beat.

1. `> Bir uygulama yap.`
2. AI işlem zinciri
3. “Arada ne değişti?”
4. Eski → Chat → Agent
5. Model nedir?
6. Context masası
7. Chatbot
8. Coding Agent
9. Claude ≠ Claude Code / GPT ≠ Codex
10. Vibe coding örneği
11. Feature üstüne feature
12. İlk kırılma
13. “Çalışıyor ≠ doğru”
14. Agent anatomisi — model
15. context/files
16. tools/terminal
17. skill
18. MCP
19. Git
20. tamamlanmış mimari
21. Agentic Engineering pipeline
22. “Agent bitti dedi”
23. Test / review / verify
24. Tek agent sınırı
25. Lead → Developer → QA
26. “Peki hepsini tek yerde toplasak?”
27. Vi3ecode
28. gerçek handoff / QA
29. Chat → Agent → Agent Team
30. “MODEL DEĞİL, SİSTEM.”

---

# 23. Kalite kriterleri

Sunum başarılı kabul edilir, eğer:

### İçerik
- Sıfır bilgiyle takip edilebiliyor.
- Vibe coding küçümsenmeden sınırı anlatılıyor.
- Model / agent ayrımı net.
- Skill ve MCP iki cümlede anlaşılabiliyor.
- Agentic engineering’in neden gerektiği hissediliyor.
- Orkestrasyon gereksiz derine inmiyor.
- Vi3ecode önceki kavramların doğal finali oluyor.

### Görsel
- AI-generated SaaS landing page hissi yok.
- Her sahnede tek ana odak var.
- Projector’da okunuyor.
- Gerçek screenshotlar temiz.
- Editorial dil bütün sahnelerde tutarlı.

### Teknik
- Offline açılıyor.
- 1920×1080 çalışıyor.
- 1366×768 çalışıyor.
- Klavye navigasyonu tam.
- Reload sonrası bozulmuyor.
- Mod seçimi çalışıyor.
- Demo fallback’i çalışıyor.

### Zaman
- 30 dk rehearsal ≤ 28 dk
- 45 dk rehearsal ≤ 42 dk
- 60 dk rehearsal ≤ 55 dk

---

# 24. Non-negotiables

1. **30 dakika route önce bitecek.**
2. 45/60 dakika route, 30 dakikalık sürüm tamamlanmadan geliştirilmeyecek.
3. Canlı Vi3ecode demo tek başarısızlık noktası olmayacak.
4. Sunumun tamamı internet olmadan çalışacak.
5. Avenox görsel olarak kopyalanmayacak.
6. AI ile tam slayt render edilmeyecek.
7. AI görsel üretimi sadece asset / illustration için.
8. Dashboard estetiğinden kaçınılacak.
9. Her sahne bir ana fikir taşıyacak.
10. Güncel model/fiyat detayları ana anlatının temelini oluşturmayacak.
11. Vi3ecode ilişkisinde şeffaflık korunacak.
12. Final mesaj değişmeyecek:

> **MODEL DEĞİL, SİSTEM.**

---

# 25. Definition of Done

Proje “bitti” sayılır, eğer:

- [ ] 30 dakikalık route eksiksiz.
- [ ] PRD’deki ana sıra korunmuş.
- [ ] Site localhost’ta tek komutla açılıyor.
- [ ] Production build alınabiliyor.
- [ ] İnternetsiz çalışıyor.
- [ ] Presenter mode seçimi çalışıyor.
- [ ] Klavye navigasyonu çalışıyor.
- [ ] Vi3ecode gerçek screenshotları mevcut.
- [ ] Canlı demo veya geçmiş thread hazır.
- [ ] Video/screenshot fallback hazır.
- [ ] Bütün kişisel/özel bilgiler temizlenmiş.
- [ ] 1920×1080 projector QA yapılmış.
- [ ] 1366×768 QA yapılmış.
- [ ] 30 dk rehearsal iki kez geçilmiş.
- [ ] Kritik terimler doğrulanmış.
- [ ] Son sahne güçlü ve sade.
- [ ] Son anda internet/model problemi olsa bile sunum tamamlanabiliyor.

---

# 26. Son ürünün hissi

Bu proje:

- PowerPoint gibi hissettirmemeli.
- SaaS landing page gibi hissettirmemeli.
- AI tarafından tek promptla yapılmış gibi hissettirmemeli.
- Avenox klonu gibi hissettirmemeli.

Şöyle hissettirmeli:

> **Bir geliştiricinin kendi konusu için yaptığı, editoryal dili olan, interaktif, çalışan ve gerçekten anlatmak için tasarlanmış küçük bir yazılım ürünü.**

