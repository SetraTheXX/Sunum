# Sıfırdan Agentic Yazılım Geliştirme — Salı Teslim Roadmap

**Başlangıç:** Cumartesi, 26 Eylül 2026  
**Sunum hedefi:** Salı, 29 Eylül 2026  
**Ana hedef:** Önce güvenilir 30 dakikalık route.  
**Geliştirme aracı:** Vi3ecode + Agent Mode ağırlıklı  
**İkincil araçlar:** Codex / gerekirse diğer coding agent’lar  
**Ana prensip:** İçerik → çalışan iskelet → görsel kalite → demo → QA → rehearsal.

---

# 0. Yol haritası stratejisi

Zaman sınırlı olduğu için “önce bütün özellikleri yazalım, sonra sunumu dolduralım” yaklaşımı kullanılmayacak.

Öncelik:

```text
İÇERİK OMURGASI
      ↓
30 DK ROUTE
      ↓
ÇALIŞAN LOCALHOST
      ↓
GÖRSEL SİSTEM
      ↓
Vİ3ECODE DEMO
      ↓
OFFLINE / FALLBACK
      ↓
TIMING QA
      ↓
45 / 60 DK EKLERİ
```

30 dakikalık route kırmızı çizgidir.

45 / 60 dakika sürümleri **stretch goal**.

---

# PHASE 0 — Proje başlangıcı ve guardrail

**Süre:** 45–60 dk  
**Hedef:** Agentların ne yapacağını bilmesi; kapsamın dağılmaması.

## Yapılacaklar

- [ ] Yeni presentation repo / klasörü oluştur.
- [ ] `PRD.md` ekle.
- [ ] `ROADMAP.md` ekle.
- [ ] `AGENTS.md` oluştur.
- [ ] Kullanılıyorsa `CLAUDE.md` eşleniği oluştur.
- [ ] Design principles dosyası oluştur.
- [ ] Source / transcript klasörü oluştur.
- [ ] Screenshot klasörü oluştur.
- [ ] Asset klasörü oluştur.
- [ ] `README.md` içine local run komutunu yaz.
- [ ] Git init.
- [ ] İlk baseline commit.

## AGENTS.md minimum kurallar

```text
- PRD ana kaynak.
- Önce 30 dakikalık route.
- Kapsam dışı özellik ekleme.
- Avenox tasarımını kopyalama.
- AI SaaS / neon / glassmorphism estetiği kullanma.
- Remote CDN kullanma.
- Tüm kritik assetler local.
- Her faz sonunda test çalıştır.
- Test geçmeden "bitti" deme.
- Screenshotlarda kişisel veri bırakma.
```

## Gate G0

Geçilmeden Phase 1’e girilmez:

- [x] Git deposu ve Phase 0 belgeleri erişilebilir; uygulama runtime’ı G2’de doğrulanır.
- [x] PRD / roadmap repoda.
- [x] Agent kuralları mevcut.
- [x] Temiz git status.
- [x] İlk commit var.

---

# PHASE 1 — İçerik kilidi

**Süre:** 2–3 saat  
**Hedef:** Kodlamadan önce anlatı tam olsun.

## 1.1 Master narrative

Şu sıra kilitlenir:

1. Cold Open
2. Nereden nereye
3. Model / Prompt / Context
4. Chatbot vs Coding Agent
5. Vibe Coding
6. Vibe Coding’in duvarı
7. Agent anatomisi
8. Agentic Engineering
9. Tek agent sınırı
10. Orchestration
11. Vi3ecode
12. Final

## 1.2 Her bölüm için yazılacaklar

Her scene dosyasında:

```md
# Scene adı

Amaç:
İzleyicinin bu sahneden çıkarken anlayacağı tek şey:

Ekranda:
- ...

Konuşmacı:
- ...

Geçiş:
- ...

30 dk:
45 dk:
60 dk:
```

## 1.3 “Must / Optional” işaretle

### Must
30 dakika route.

### Optional
- model efor detayları
- compaction
- permissions
- paralel worktree
- ek ürün karşılaştırmaları

## 1.4 Kaynak doğruluk checklist

- [ ] Model / agent ayrımı
- [ ] Context
- [ ] Harness
- [ ] Skill
- [ ] MCP
- [ ] Sub-agent
- [ ] Orchestration
- [ ] Vi3ecode rol isimleri

## Gate G1 — Content Freeze

- [x] 30 dk bütün sahneler var.
- [x] Hiçbir sahne “sonra yazarız” değil.
- [x] Her sahnenin tek ana fikri var.
- [x] Sunumun başlangıcı ve finali yazılmış.
- [x] Vi3ecode geçiş cümlesi hazır.
- [x] 30 dk metin kaba prova ≤ 35 dk.

**Durum: PASS — QA yeniden incelemesi, 27 Eylül 2026.** QA; PRD sırasındaki 12 sahneyi, her sahnedeki tek ana fikri, açılışı, Vi3ecode geçişini ve finali doğruladı. Yerel bağlantı kontrolünde kırık bağlantı bulunmadı; `git diff --check` başarılı.

**Süre kanıtı:** 31:19, 125 kelime/dakika varsayımıyla hesaplanan kaba tahmindir ve G1'in 35 dakika sınırının altındadır. Kronometreli tam prova yapılmış değildir; zorunlu prova Phase 11'de kalır. QA, 7. sahnenin konuşma süresini sahne içi 2:45 konuşma bütçesinden yaklaşık 34 saniye uzun tahmin etti; bu fark Phase 11 zamanlama provasında ölçülmelidir.

---

# PHASE 2 — Teknik iskelet

**Süre:** 2–3 saat  
**Hedef:** Çirkin ama eksiksiz çalışan sunum.

## Yapılacaklar

- [ ] Vite + React + TypeScript
- [ ] Global design tokens
- [ ] Scene container
- [ ] Presenter route
- [ ] 30 / 45 / 60 mode
- [ ] `→`, `←`, `Space`
- [ ] `J`, `K`
- [ ] progress rail
- [ ] scene index
- [ ] reveal step engine
- [ ] reset scene
- [ ] fullscreen uygun layout
- [ ] no-network başlangıç

## Önemli

Bu fazda:
- illüstrasyon yok,
- kompleks animation yok,
- aesthetic polish yok.

Sadece bütün 30 dk route gezinilebilir olacak.

## Teknik test

```bash
npm install
npm run dev
npm run build
```

Varsa:

```bash
npm run lint
npm test
```

## Gate G2 — Skeleton PASS

- [ ] `npm run build` PASS.
- [ ] Tüm 30 dk sahneler geziliyor.
- [ ] Klavye controls PASS.
- [ ] Back / forward state bozulmuyor.
- [ ] 30 mode optional sahneleri atlıyor.
- [ ] Reload sonrası app açılıyor.
- [ ] Console’da kritik error yok.

---

# PHASE 3 — Visual system

**Süre:** 3–4 saat  
**Hedef:** Sunumun “kimliği” oluşur.

## 3.1 Design tokens

Kilitlenecek:

- background
- surface
- text
- muted text
- one main accent
- optional error / success
- display font
- body font
- mono font
- spacing scale
- border system

## 3.2 Görsel hedef

> Editorial / technical / handmade.

Aşağıdakiler yasak:

- neon
- glass
- gradient mesh
- fake office
- AI brain
- 3D blobs
- card spam

## 3.3 Ana componentler

- [ ] Editorial heading
- [ ] Kicker
- [ ] Rule / divider
- [ ] Quote
- [ ] Terminal
- [ ] Flow diagram
- [ ] Screenshot annotation
- [ ] Comparison
- [ ] Callout
- [ ] Code / diff
- [ ] Role badge

## 3.4 İlk visual QA

Sadece 4 kritik sahne polish edilir:

1. Cold Open
2. Chat vs Agent
3. Agent anatomy
4. Final

Bu dört sahne bütün sitenin visual contract’ını belirler.

## Gate G3 — Visual Contract

- [ ] 4 kritik sahne aynı ailede.
- [ ] 1920×1080 okunuyor.
- [ ] 1366×768 taşma yok.
- [ ] Başlıklar projector boyutunda.
- [ ] Görsel dil Avenox kopyası değil.
- [ ] AI SaaS hissi yok.
- [ ] Accent sayısı kontrol altında.

---

# PHASE 4 — Görsel asset üretimi

**Süre:** 2–3 saat  
**Hedef:** Yalnız anlatımı gerçekten güçlendiren görseller.

## 4.1 Asset listesi

Öncelik sırası:

### P0
- [ ] Context masası
- [ ] Vibe Coding duvarı
- [ ] Orchestration / şef metaforu

### P1
- [ ] Journey
- [ ] Agent anatomy yardımcı illustration
- [ ] Final illustration

## 4.2 AI image generation kuralı

AI’a:

> “Sunum slaytı yap”

DENMEYECEK.

Onun yerine:

> “Ivory paper üzerinde, iki renkli, editorial ink illustration; transparent/clean background; text yok.”

Üretilen asset:
- arka plansız veya düz zemin,
- metinsiz,
- bağımsız,
- crop edilebilir
olmalı.

Layout site içinde yapılır.

## 4.3 Asset review

Her asset için:

- [ ] AI cliche?
- [ ] Gereksiz detay?
- [ ] Metin var mı?
- [ ] Sunuma gerçekten bilgi katıyor mu?
- [ ] 5 saniyede okunuyor mu?
- [ ] Stil tutarlı mı?

PASS değilse asset kullanılmaz.

---

# PHASE 5 — Real screenshot pack

**Süre:** 1.5–2 saat  
**Hedef:** Sunumu “gerçek” yapan kanıt ekranları.

## Codex

- [ ] Agent task örneği
- [ ] Files / terminal / diff örneği
- [ ] Test örneği

## Claude Code

Claude hesabı yoksa:
- [ ] kaynak / video screenshot
- [ ] gerekirse resmi ürün görüntüsü

Ama bunu canlı ürün eğitimi gibi göstermeme.

## Vi3ecode

P0:

- [ ] Agent Mode ana ekran
- [ ] Team roles
- [ ] Developer
- [ ] Handoff
- [ ] QA
- [ ] test PASS

## Screenshot processing

- [ ] Crop
- [ ] Zoom
- [ ] Blur private data
- [ ] Highlight
- [ ] Export WebP / PNG
- [ ] Local asset

## Gate G4 — Evidence Pack

- [ ] Her gerçek ürün iddiasının en az bir görsel örneği.
- [ ] Vi3ecode bölümü screenshotlarla tek başına anlatılabiliyor.
- [ ] Kullanıcı mail/token/path gibi özel bilgi yok.

---

# PHASE 6 — Core scene implementation

**Süre:** 4–6 saat  
**Hedef:** 30 dakika route production kalitesinde.

Sıra:

## Batch A — Açılış

- [ ] Cold Open
- [ ] Evolution
- [ ] Model / Context

Test.

## Batch B — Vibe

- [ ] Chat vs Agent
- [ ] Vibe Coding
- [ ] Vibe wall

Test.

## Batch C — Architecture

- [ ] Agent anatomy
- [ ] Skill
- [ ] MCP
- [ ] Git / tool

Test.

## Batch D — Engineering

- [ ] Agentic Engineering
- [ ] test / review / verify
- [ ] orchestration

Test.

## Batch E — Final

- [ ] Vi3ecode intro
- [ ] Vi3ecode workflow
- [ ] final

Test.

Her batch sonrası:

```bash
npm run build
npm run lint
npm test
```

---

# PHASE 7 — Vi3ecode demo hazırlığı

**Süre:** 2–3 saat  
**Hedef:** Sunumun “wow” anı fakat aynı zamanda en güvenilir bölümü.

## 7.1 Demo task seç

Kriter:

- 2–5 dakikada anlaşılır.
- Büyük refactor değil.
- Ekranda değişim görülebilir.
- Test sonucu var.
- QA meaningful.
- Kişisel veri yok.

Örnek:
- mobile menu bug
- pricing UI
- accessibility fix
- validation
- küçük responsive problem

## 7.2 Plan A

Canlı Vi3ecode.

## 7.3 Plan B

Daha önce tamamlanmış real thread.

## 7.4 Plan C

Lokal 60–90 sn video.

## 7.5 Plan D

Screenshot sequence.

## 7.6 Demo script

Sunucu ne söyleyecek:

1. “Bu benim ürünüm değil…”
2. “Solda agent takımı.”
3. “Lead görevi yönlendiriyor.”
4. “Developer uyguluyor.”
5. “Burada handoff.”
6. “QA kendi testini yapıyor.”
7. “Fail olursa geri gidiyor.”
8. “İşte agentic workflow.”

## Gate G5 — Demo PASS

- [ ] Plan A test edildi.
- [ ] Plan B hazır.
- [ ] Plan C/D local.
- [ ] İnternet kapalıyken fallback çalışıyor.
- [ ] Demo 5 dakikayı geçmiyor.
- [ ] Özel bilgi yok.

---

# PHASE 8 — Offline / resilience test

**Süre:** 1–1.5 saat

Bilgisayarı airplane/offline duruma getir.

Kontrol:

- [ ] Site açılıyor.
- [ ] Font geliyor.
- [ ] Görseller geliyor.
- [ ] JS çalışıyor.
- [ ] Animasyonlar çalışıyor.
- [ ] Screenshotlar geliyor.
- [ ] Demo fallback geliyor.
- [ ] Console remote request spam yok.

## Reload test

Her kritik scene’de reload:

- [ ] cold open
- [ ] agent anatomy
- [ ] Vi3ecode
- [ ] final

## Gate G6 — Offline PASS

Hiç internet olmadan 30 dk route tamamlanabiliyor.

---

# PHASE 9 — Projector / resolution QA

**Süre:** 1–2 saat

## 1920×1080

- [ ] header
- [ ] body
- [ ] code
- [ ] screenshots
- [ ] diagrams

## 1366×768

- [ ] overflow
- [ ] tiny text
- [ ] nav collision
- [ ] screenshot crop

## Tarayıcı

- [ ] Chrome/Chromium
- [ ] Firefox — mümkünse

## Zoom

- [ ] %100
- [ ] %110 projector emergency

## Gate G7 — Visual QA PASS

- Kritik hiçbir bilgi küçük değil.
- Scroll gerekmiyor veya kontrollü.
- Cursor / browser chrome sunumu bozmuyor.
- Fullscreen düzgün.

---

# PHASE 10 — İçerik QA

**Süre:** 1–2 saat

Her claim için:

- [ ] Kaynağı var mı?
- [ ] Güncelliğe bağımlı mı?
- [ ] Gereksiz iddialı mı?
- [ ] Model / ürün karışmış mı?
- [ ] Opinion, fact gibi mi sunulmuş?

Özellikle:

- [ ] Claude ≠ Claude Code
- [ ] GPT ≠ Codex
- [ ] Context tanımı
- [ ] MCP tanımı
- [ ] Skill tanımı
- [ ] Orchestration açıklaması
- [ ] Vi3ecode özellik adı

Güncel sayı / fiyat gerekiyorsa:
- doğrula,
- yoksa çıkar.

## Gate G8 — Content PASS

Sunum ürün sürümlerine gereksiz şekilde bağımlı değil.

---

# PHASE 11 — Timing QA

Bu aşama zorunlu.

## Run 1 — konuşmadan tıklama

Amaç:
- navigation,
- sequence,
- transitions.

## Run 2 — tam 30 dk rehearsal

Kronometre.

Hedef:

> **26–28 dakika**

Not al:

```text
Scene / Actual / Problem
```

## Run 3 — düzeltme sonrası

Tekrar.

### Eğer > 30 dk

İlk kesilecekler:

1. ekstra model detayları
2. compaction
3. uzun MCP örneği
4. sub-agent edge case
5. Claude/Codex UI karşılaştırması

Kesilmeyecekler:

- Context
- Chat vs Agent
- Vibe wall
- Agent anatomy
- Agentic Engineering
- Vi3ecode
- Final

## Gate G9 — Timing PASS

İki arka arkaya rehearsal ≤ 28 dk.

---

# PHASE 12 — 45 / 60 dakika stretch route

**Yalnız 30 dk PASS ise.**

## 45

Ek:
- Codex walkthrough
- Claude Code kısa walkthrough
- Skill örneği
- MCP örneği
- diff / test
- orchestration detay

## 60

Ek:
- session / compaction
- permissions
- context management
- parallel agents
- ownership
- Vi3ecode uzun demo
- soru payı

45/60 içerikleri 30 route’un davranışını bozamaz.

---

# PHASE 13 — Final package

**Salı öncesi son iş**

## Local copies

- [ ] Source repo
- [ ] Production build
- [ ] Zip backup
- [ ] USB kopyası — mümkünse
- [ ] Demo video
- [ ] Screenshot pack
- [ ] PRD
- [ ] Roadmap

## Sunum açma

Sunumdan önce:

```bash
npm run dev
```

veya production local server.

İki ayrı browser tab:

1. Presentation
2. Vi3ecode

Demo fallback presentation asset içinde.

## Son preflight

- [ ] Laptop şarja bağlı
- [ ] Notifications off
- [ ] Discord/WhatsApp kapalı
- [ ] Browser tabs temiz
- [ ] Terminal font büyük
- [ ] Vi3ecode login hazır
- [ ] Repo hazır
- [ ] Internet varsa test
- [ ] Fallback test
- [ ] F11 / fullscreen test
- [ ] Mouse görünürlüğü
- [ ] Ses gerekmiyorsa mute

---

# Bug / kalite önceliği

## P0 — Sunum yapılamaz

- site açılmıyor
- next/prev bozuk
- 30 mode çalışmıyor
- font kayıp
- scene taşmış
- demo fallback yok

Derhal düzelt.

## P1 — Büyük kalite

- diagram okunmuyor
- screenshot küçük
- section transition karışık
- timing > 30
- offline asset missing

Sunumdan önce düzelt.

## P2 — Polish

- animasyon easing
- ufak spacing
- decorative texture
- secondary illustration

Zaman kalırsa.

## P3 — Nice-to-have

- fancy presenter view
- extra animation
- mobile support
- 60 dk ekstra scene

Salı öncesi gerekmez.

---

# Vi3ecode Agent Mode önerilen geliştirme workflow’u

Sunum projesini bile anlatılan yöntemle geliştir.

## Lead

- PRD oku.
- Fazı seç.
- Scope’u dar tut.
- Acceptance criteria yaz.
- Developer’a devret.

## Developer

- Sadece aktif faz.
- Component / content implement.
- Test.
- Build.

## QA

Kontrol:

- PRD uyumu
- screenshot
- 1080p
- 768p
- keyboard
- offline
- copy

FAIL:
Developer’a geri.

PASS:
commit.

## Örnek görev

```text
PRD ve ROADMAP'i oku.

Sadece Phase 2'yi uygula.
30 dakikalık route için çalışan sunum iskeletini oluştur.

Sınırlar:
- henüz görsel polish yapma
- remote CDN ekleme
- 45/60 dakikalık optional sahneleri implement etmeye çalışma
- PRD'deki scene sırasını değiştirme

Bitti sayılır:
- npm build PASS
- bütün 30 dk sahneler gezilebilir
- next/prev keyboard çalışır
- mode=30 çalışır
- QA raporu eklenir
```

Bu yöntem, agent’ın scope creep yapmasını engeller.

---

# Commit önerileri

```text
chore: initialize presentation workspace
docs: add presentation narrative and source notes
feat: add presentation routing and keyboard controls
feat: implement core 30-minute scenes
style: establish editorial presentation system
feat: add agent architecture interactions
feat: add vi3ecode workflow segment
feat: add offline demo fallback
test: add presentation route and interaction checks
fix: harden projector layouts
docs: finalize presenter notes
```

---

# Salı’ya kadar gerçekçi öncelik

## Cumartesi

**Mutlaka:**
- Phase 0
- Phase 1
- Phase 2

Günün sonunda:
> çirkin ama baştan sona çalışan 30 dk sunum.

---

## Pazar

**Mutlaka:**
- Phase 3
- Phase 4
- Phase 5
- Phase 6 başlangıç

Günün sonunda:
> sunum artık “gerçek ürün” gibi görünmeli.

---

## Pazartesi

**Mutlaka:**
- Phase 6 bitir
- Phase 7 Vi3ecode
- Phase 8 offline
- Phase 9 projector
- Phase 10 content
- Phase 11 timing

Günün sonunda:
> sunum hazır.

---

## Salı

**Yeni feature yok.**

Sadece:

- rehearsal
- typo
- kritik bug
- backup
- login
- projector
- timing

### Salı kuralı

> **Sunum günü tasarım yapılmaz.**

---

# Final Ship Gate

Sunuma gitmeden önce:

```text
[ ] Build PASS
[ ] Offline PASS
[ ] 30 min PASS x2
[ ] Vi3ecode Plan A
[ ] Vi3ecode fallback
[ ] 1080p PASS
[ ] 768p PASS
[ ] Privacy PASS
[ ] Source backup
[ ] Zip backup
[ ] Notifications OFF
```

Bunların hepsi yeşilse:

# SHIP.
