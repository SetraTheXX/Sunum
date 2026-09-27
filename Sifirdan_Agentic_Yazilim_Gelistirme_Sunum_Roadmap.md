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

- [x] `npm run build` PASS.
- [x] Tüm 30 dk sahneler geziliyor.
- [x] Klavye controls PASS.
- [x] Back / forward state bozulmuyor.
- [x] 30 mode optional sahneleri atlıyor.
- [x] Reload sonrası app açılıyor.
- [x] Console’da kritik error yok.

**Durum: PASS — QA yeniden incelemesi, 27 Eylül 2026.** QA, localhost'ta 12 sahnenin indeksini, reveal ve geri/ileri davranışını, `→`, `←`, `Space`, `J`, `K`, `R` kısayollarını (odaktaki düğmeler dâhil), 30/45/60 mod seçimini ve reload sonrası URL/sahne/adım durumunu doğruladı. `npm run build` başarılı; etkileşim sırasında hata, unhandled rejection veya `console.error` yakalanmadı; harici kaynak isteği görülmedi.

**Kapsam ve kanıt sınırları:** 30 dk rotasındaki 12 sahnenin tamamı `Must`; atlanacak `Optional` sahne yok, filtre davranışı mevcut içerik üzerinde boş küme olarak çalışıyor. Browser paneli screenshot alınmasına izin vermediği için piksel düzeyinde görsel kontrol yapılamadı. Doğrudan DevTools konsolu da erişilebilir değildi; hata kontrolü sayfa içi sinyallerle sınırlı kaldı. `package.json` test/lint komutu içermediğinden bu komutlar çalıştırılmadı.

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

- [x] 4 kritik sahne aynı ailede.
- [x] 1920×1080 okunuyor.
- [x] 1366×768 taşma yok.
- [x] Başlıklar projector boyutunda.
- [x] Görsel dil Avenox kopyası değil.
- [x] AI SaaS hissi yok.
- [x] Accent sayısı kontrol altında.

**G3 QA kanıtı (2026-09-27):** QA sekiz PNG'yi açtı, gerçek piksel ölçülerini doğruladı ve dört sahnenin okunabilirliğini inceledi. 1366×768'de Cold Open ile Agent anatomy alt gezinmesi viewport içinde; metin kesilmiyor. Dört sahnenin tamamında 1920×1080 görünümü okunaklı. `npm run build` ve `git diff --check` başarılı; test/lint betiği bulunmuyor.

| Sahne | 1366×768 | 1920×1080 |
|---|---|---|
| Cold Open | [PNG](screenshots/g3/cold-open-1366x768.png) | [PNG](screenshots/g3/cold-open-1920x1080.png) |
| Chat vs Agent | [PNG](screenshots/g3/chat-vs-agent-1366x768.png) | [PNG](screenshots/g3/chat-vs-agent-1920x1080.png) |
| Agent anatomy | [PNG](screenshots/g3/agent-anatomy-1366x768.png) | [PNG](screenshots/g3/agent-anatomy-1920x1080.png) |
| Final | [PNG](screenshots/g3/final-1366x768.png) | [PNG](screenshots/g3/final-1920x1080.png) |

**Sınırlama:** Depoda Avenox referans ekran görüntüsü bulunmadığından yan yana karşılaştırma yapılamadı. QA görünür logo/limon karakteri kopyası veya AI SaaS görünümü saptamadı; G3 değerlendirmesi bu gözlemle kaydedildi.

---

# PHASE 4 — Görsel asset üretimi

**Süre:** 2–3 saat  
**Hedef:** Yalnız anlatımı gerçekten güçlendiren görseller.

## 4.1 Asset listesi

Öncelik sırası:

### P0
- [x] [Context masası v2](assets/phase-4/v2/context-desk-v2.svg)
- [x] [Vibe Coding duvarı v2](assets/phase-4/v2/vibe-coding-wall-v2.svg)
- [x] [Orchestration akışı v2](assets/phase-4/v2/orchestration-v2.svg)

### P1
- [x] [Journey v2](assets/phase-4/v2/journey-v2.svg)
- [x] [Agent anatomy v2](assets/phase-4/v2/agent-anatomy-v2.svg)
- [x] [Final system v2](assets/phase-4/v2/final-system-v2.svg)

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

- [x] AI cliche?
- [x] Gereksiz detay?
- [x] Metin var mı?
- [x] Sunuma gerçekten bilgi katıyor mu?
- [x] 5 saniyede okunuyor mu?
- [x] Stil tutarlı mı?

PASS değilse asset kullanılmaz. İnceleme, altı ölçütün yanında sahneyle doğrudan içerik eşleşmesini de kontrol eder.

**V1 reddi ve Phase 4'ün yeniden açılması (2026-09-27):** Kullanıcı v1 görsellerini sunum konusuyla ilgisiz buldu. İlk QA dosya biçimi ve görsel aileyi kontrol etmiş, ancak sahne mesajlarıyla semantik eşleşmeyi yeterince sınamamıştı. İlk PASS kararı geri çekildi. V1 dosyaları silinmeden `assets/phase-4/` altında arşivde tutuluyor ve kabul edilen asset sayılmıyor.

| V1 asset | İçerik uyuşmazlığı | Durum |
|---|---|---|
| [Context masası](assets/phase-4/context-desk.png) | Model, prompt ve context ayrımını; konuşma geçmişi, dosyalar, kurallar ve araç çıktılarını göstermiyor. | Kullanıcı reddi; arşivde |
| [Vibe Coding duvarı](assets/phase-4/vibe-coding-wall.png) | Görünen çalışan sonuç ile dosya/test/review kanıtı arasındaki farkı kurmuyor. | Kullanıcı reddi; arşivde |
| [Orchestration](assets/phase-4/orchestration-conductor.png) | Lead → gerektiğinde Analyst → Developer → QA akışını, PASS bitişini ve FAIL dönüşünü göstermiyor. | Kullanıcı reddi; arşivde |
| [Journey](assets/phase-4/journey.png) | Ara → Sor → Görev ver adımlarını ve her adımın somut çıktısını eşleştirmiyor. | Kullanıcı reddi; arşivde |
| [Agent anatomy](assets/phase-4/agent-anatomy.png) | Model, context, proje dosyaları, talimatlar, tools ve terminal ilişkisini; Skill/MCP/Git'in opsiyonel olduğunu anlatmıyor. | Kullanıcı reddi; arşivde |
| [Final illustration](assets/phase-4/final-system.png) | Model + context + tools + skills + test + review + insan kontrolü birleşimini göstermiyor. | Kullanıcı reddi; arşivde |

**Phase 4 v2 asset QA — PASS (2026-09-27):** QA altı SVG'yi sahne metinleriyle eşleştirip içerik, hızlı okuma ve görsel ilkeler açısından tek tek inceledi. Her asset PASS aldı. XML doğrulamasında görünür `<text>`, gömülü `<image>` veya dış bağlantı bulunmadı; AI klişesi, ağır doku ya da parıltı saptanmadı.

| V2 asset | Eşleşen sahne | QA sonucu |
|---|---|---|
| [Context masası](assets/phase-4/v2/context-desk-v2.svg) | 03 — Model, Prompt, Context | PASS |
| [Vibe Coding duvarı](assets/phase-4/v2/vibe-coding-wall-v2.svg) | 06 — Vibe Coding'in duvarı | PASS |
| [Journey](assets/phase-4/v2/journey-v2.svg) | 02 — Nereden nereye? | PASS |
| [Agent anatomy](assets/phase-4/v2/agent-anatomy-v2.svg) | 07 — Agent anatomisi | PASS |
| [Orchestration](assets/phase-4/v2/orchestration-v2.svg) | 10 — Orchestration | PASS |
| [Final system](assets/phase-4/v2/final-system-v2.svg) | 12 — Final: Model değil, sistem | PASS |

**Sınır / sonraki kontrol:** Phase 4 asset QA önizlemesi tarayıcı panelinde 357×832 boyutundaydı; o aşamada hedef sunum ölçeği ve uygulama entegrasyonu incelenmemişti. Phase 6 Batch A'da Scene 02 Journey v2'yi, Scene 03 Context Desk v2'yi kullanıyor; iki sahne 1366×768 ve 1920×1080'de QA'dan geçti. Vibe Coding wall, Orchestration, Agent Anatomy ve Final System v2 asset'leri henüz uygulamaya entegre edilmedi; yerleşim, etiket ve kırpma kontrolleri entegrasyon sonrası yapılmalı.

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

## Plan Delta — Phase 5 evidence deferred to final gate (2026-09-27)

- Real Codex / Vi3ecode product-screen capture and recording work is deferred to the final evidence stage before the final presentation. The existing Anthropic Claude Code checklist image remains a sourced product example only; it is not a live project session.
- G4 remains unchecked and mandatory before the final presentation. Codex and Vi3ecode evidence gaps must be closed with authentic, privacy-reviewed captures before that gate passes.
- Do not mark Vi3ecode workflow scenes complete while their real screen evidence is missing; do not substitute the marketing simulation or generated screens.
- By explicit user direction, Phase 6 scene batches that do not depend on the missing product captures may proceed in roadmap order, with their own implementation and QA gates. G4 does not block those batches; it remains a mandatory final presentation gate, and no Vi3ecode workflow is to be represented as authentically evidenced until real captures pass privacy QA.

## Plan Delta — Phase 7.1–11 preparation; final visual/evidence sprint (2026-09-27)

- The current scope is documentation-only preparation: record the Phase 7.1 demo plan, then prepare Phases 8–11 in roadmap order. This planning does not execute the demo or any offline, projector, content, or timing QA, and it does not pass a gate.
- Execution remains at Phase 6, Batch E: Final is PASS, while Vi3ecode intro/workflow is open. Phase 7.1 is plan-only; Phases 8–11 have preparation notes only and are not executed.
- Keep Phase 6 Vi3ecode intro/workflow open. G4 and G5 remain unchecked until authentic product evidence and the complete live/fallback demo criteria are actually verified. G6–G9 likewise require their own recorded test results against their existing gate criteria.
- Defer any remaining visual refresh, authentic screenshot/video production, their integration into the presentation, and final placement/crop QA to a separate final sprint before the presentation. Do not create simulated/generated product UI or screenshots in this preparation pass.

---

# PHASE 6 — Core scene implementation

**Süre:** 4–6 saat  
**Hedef:** 30 dakika route production kalitesinde.

Sıra:

## Batch A — Açılış

- [x] Cold Open
- [x] Evolution
- [x] Model / Context

Test.

**Batch A QA — PASS (2026-09-27):** Independent QA reviewed all six Edge headless previews against the scene text at 1366×768 and 1920×1080. Cold Open was retained; Evolution and Model / Context use the approved local Journey / Context Desk v2 SVGs. All six PNG dimensions match their filenames, text and footer fit, and `npm run build` passed. The live browser panel could not be used for target-size inspection; no test or lint script is defined in `package.json`.

| Scene | 1366×768 | 1920×1080 |
|---|---|---|
| Cold Open | [PNG](screenshots/phase-6/batch-a/scene-01-cold-open-1366x768.png) | [PNG](screenshots/phase-6/batch-a/scene-01-cold-open-1920x1080.png) |
| Evolution | [PNG](screenshots/phase-6/batch-a/scene-02-evolution-1366x768.png) | [PNG](screenshots/phase-6/batch-a/scene-02-evolution-1920x1080.png) |
| Model / Context | [PNG](screenshots/phase-6/batch-a/scene-03-model-context-1366x768.png) | [PNG](screenshots/phase-6/batch-a/scene-03-model-context-1920x1080.png) |

## Batch B — Vibe

- [x] Chat vs Agent
- [x] Vibe Coding
- [x] Vibe wall

**Batch B QA kapısı — PASS (2026-09-27):** QA üç sahneyi ilgili kaynak metinlerle eşleştirip 1366×768 ve 1920×1080 PNG'lerini inceledi; içerik okunaklı, alt gezinme görünür, taşma ve sahte ürün arayüzü yok. `npm run build` başarılı; test/lint betiği tanımlı değil. Browser paneli `ERR_CONNECTION_REFUSED` verdiğinden QA canlı panel yerine kayıtlı PNG'leri inceledi. G4 açık ve final sunum öncesi zorunlu kalır.

| Scene | 1366×768 | 1920×1080 |
|---|---|---|
| Chat vs Agent | [PNG](screenshots/phase-6/batch-b/chat-vs-agent-1366x768.png) | [PNG](screenshots/phase-6/batch-b/chat-vs-agent-1920x1080.png) |
| Vibe Coding | [PNG](screenshots/phase-6/batch-b/vibe-coding-1366x768.png) | [PNG](screenshots/phase-6/batch-b/vibe-coding-1920x1080.png) |
| Vibe wall | [PNG](screenshots/phase-6/batch-b/vibe-wall-1366x768.png) | [PNG](screenshots/phase-6/batch-b/vibe-wall-1920x1080.png) |

## Batch C — Architecture

- [x] Agent anatomy
- [x] Skill
- [x] MCP
- [x] Git / tool

Test — PASS.

**Batch C QA — PASS (2026-09-27):** All four items—Agent anatomy, Skill, MCP, and Git/tool—are covered by Scene 07 ([source](scenes/07-agent-anatomisi.md#L17)). QA confirmed all nine components, the optional status of Skill/MCP/Git, and no clipping at both target resolutions. `npm run build` passed; `package.json` has no test or lint script. Browser-panel inspection failed (“the page loaded, but the browser panel could not be shown”), and readability from projector distance was not evaluated. G4 remains open and mandatory before the final presentation.

| Scene | 1366×768 | 1920×1080 |
|---|---|---|
| Agent anatomy | [PNG](screenshots/phase-6/batch-c/scene-07-agent-anatomy-1366x768.png) | [PNG](screenshots/phase-6/batch-c/scene-07-agent-anatomy-1920x1080.png) |

## Batch D — Engineering

- [x] Agentic Engineering — Scene 08
- [x] test / review / verify — Scene 08
- [x] orchestration — Scene 10
- [x] Batch D QA / test — PASS (2026-09-27)

**Batch D QA — PASS (2026-09-27):** Independent QA matched both scenes to their source text and reviewed all four Edge headless PNGs. Scene 08 shows the full Hedef → Context → Plan → Implement → Test → Review → Verify → Git flow and its file, test, and review evidence points. Scene 10 marks Analyst as conditional, shows QA PASS completion and FAIL return to Developer, and includes the Git checkpoint. No clipping or fabricated product interface was found. `npm run build` passed; `package.json` defines no test or lint script. The live browser panel could not be shown, so QA reviewed the saved PNGs. G4 remains open and mandatory before the final presentation.

| Scene | 1366×768 | 1920×1080 |
|---|---|---|
| Agentic Engineering — 08 | [PNG](screenshots/phase-6/batch-d/scene-08-agentic-engineering-1366x768.png) | [PNG](screenshots/phase-6/batch-d/scene-08-agentic-engineering-1920x1080.png) |
| Orchestration — 10 | [PNG](screenshots/phase-6/batch-d/scene-10-orchestration-1366x768.png) | [PNG](screenshots/phase-6/batch-d/scene-10-orchestration-1920x1080.png) |

## Batch E — Final

- [ ] Vi3ecode intro
- [ ] Vi3ecode workflow
- [x] Final — Scene 12 QA PASS (2026-09-27)

Test.

**Final scene QA — PASS (2026-09-27):** QA reviewed the saved Edge headless captures at both target resolutions. Scene 12 includes the opening question with “EVET”, the reliable-software components, and the dominant “MODEL DEĞİL, SİSTEM.” closing; content and navigation are not clipped. `npm run build` passed; no test or lint script is defined. The live browser panel could not be shown, so QA inspected the saved PNGs. PRD describes the component summary below the main message, while these captures place it above the closing statement; the scene source ordering is preserved and this placement difference remains recorded.

| Scene | 1366×768 | 1920×1080 |
|---|---|---|
| Final — 12 | [PNG](screenshots/phase-6/batch-e/final-1366x768.png) | [PNG](screenshots/phase-6/batch-e/final-1920x1080.png) |

Vi3ecode intro/workflow remain open pending authentic product-screen evidence. G4 remains open and mandatory before the final presentation.

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

### Phase 7.1 hazırlık kararı — PLAN ONLY (2026-09-27)

**Seçilen demo görevi:** Sahne değişince etkin sahne başlığı ve sıra bilgisinin ekran okuyucuya tek, nazik bir duyuruyla iletilmesi. PRD §17 etkin bölüm başlığını ve klavye navigasyonunun odağı bozmamasını ister. Mevcut `src/App.tsx` içinde açılan adımlar için `aria-live` bölgesi var; sahne başlığı bu bölgenin dışında. Bu nedenle görev yeni bir hata varmış gibi sunulmayacak; uygulama sırasında önce desteklenen ekran okuyucuda mevcut duyuru davranışı kontrol edilecek. Zaten yeterliyse kusur uydurulmayacak ve gerçek, küçük bir erişilebilirlik işi seçilene kadar demo başlatılmayacak.

**Sınır ve kabul ölçütleri:** Tek dosyalı, bağımlılık eklemeyen küçük değişiklik; sahne listesi, Geri/İleri ve J/K ile geçişte etkin sahne başlığı ve `n / 12` bilgisi bir kez duyurulur; klavye odağı yerinde kalır; adım açma gereksiz tekrar duyurusu üretmez; `npm run build` başarılı olur; QA gerçek ekran okuyucu/klavye etkileşimini doğrular. Kişisel veri veya harici servis gerekmez. Hedef toplam demo süresi 3–4 dakika, kesin üst sınır 5 dakikadır.

**Demo scripti (Lead → Developer → QA → PASS/FAIL):**

1. **0:00–0:30 Lead:** Görevi, kabul ölçütlerini ve tek dosya sınırını söyler; işi Developer’a devreder.
2. **0:30–2:00 Developer:** Mevcut duyuru davranışını gösterir; gerekiyorsa küçük değişikliği yapar ve kapsamı aşmadığını açıklar.
3. **2:00–3:00 Developer:** `npm run build` çalıştırır; sahne değiştirmeyi klavye ile gösterir.
4. **3:00–4:00 QA:** Bağımsız olarak ekran okuyucu duyurusunu, odağın korunmasını ve adım tekrarlarını kontrol eder; build sonucunu doğrular.
5. **PASS:** QA kanıtı ve değişen dosya/komut özetiyle kapatır. **FAIL:** Hatalı kabul ölçütünü Developer’a geri yollar; 5 dakikalık sınırda canlı denemeyi durdurup yerel fallback’e geçer.

Bu script ve görev seçimi yalnızca hazırlıktır. Vi3ecode’da gerçek Agent Mode yürütümü, test sonucu, QA sonucu veya ürün ekranı kanıtı üretilmiş sayılmaz; G5 açık kalır.

Örnek:
- mobile menu bug
- pricing UI
- accessibility fix
- validation
- küçük responsive problem

## 7.2 Plan A

Canlı Vi3ecode Agent Mode: erişilebilir gerçek proje/branch, görev öncesi net kabul ölçütü ve gizli veri içermeyen kapsam gerekir. Lead görevi Developer’a verir; QA bağımsız kontrol yapar. Login/ağ/araç beklemesi 5 dakikalık demo sınırını aşarsa deneme kesilir ve yerel fallback’e geçilir; token veya kimlik bilgisi kayda alınmaz.

## 7.3 Plan B

Kaynağı ve proje/branch bağlamı doğrulanabilen, gerçekten tamamlanmış Vi3ecode Agent Mode thread’i. Lead, Developer, handoff, test ve QA sonucu aynı gerçek thread’den seçilir; bu ChatGPT konuşması, pazarlama simülasyonu veya üretilmiş ekran yerine kullanılamaz.

## 7.4 Plan C

Gerçek Vi3ecode demo yürütümünden 60–90 saniyelik yerel MP4/WebM; son sprintte özel bilgiler temizlenir ve dosya sunum laptopunda internet kapalıyken oynatılarak doğrulanır. Bu hazırlık geçişinde video üretilmez.

## 7.5 Plan D

Gerçek Vi3ecode arayüzünden 5–7 karelik yerel sıra: görev, Lead, Developer, handoff, QA, test, PASS. Kaynak/oturum kaydı korunur; özel bilgi kırpılır veya bulanıklaştırılır; tek tuşla çevrimdışı açılabilir. Bu hazırlık geçişinde screenshot üretilmez.

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

## 7.7 Planlama durumu ve kanıt gereksinimi

**Durum (2026-09-27):** 7.1 görev/script ve fallback gereksinimleri yazıldı; canlı demo, B/C/D fallback dosyaları ve süre/mahremiyet kontrolleri henüz yapılmadı. G5 açık. G5 için gerçek Plan A denemesi, B/C/D fallback’lerinin yerel ve çevrimdışı hazır oluşu, toplam sürenin 5 dakikanın altında kalması ve özel bilgi taraması kanıtlanmalı.

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

**Hazırlık kaydı (2026-09-27):** İlk kayıt yalnız test sırası ve kanıt şablonuydu; aşağıdaki yürütme kaydı bu testi tamamlar.

Bilgisayarı airplane/offline duruma getir.

Kontrol:

- [x] Site açılıyor — production preview offline açıldı.
- [x] Font geliyor — sistem font yığını kullanılıyor; uzak font isteği yok.
- [x] Görseller geliyor — Scene 02/03 SVG çizimleri bundle içi `data:` kaynaklarından yüklendi.
- [x] JS çalışıyor — 30 dk rota ve etkileşimler çalıştı.
- [—] Animasyonlar — uygulamada CSS/JS animasyon akışı tanımlı değil; doğrulanacak animasyon yok.
- [ ] Screenshotlar geliyor — core route içinde screenshot varlığı yok; fallback ekran dizisi de aynı authentic Vi3ecode kanıt blocker’ının parçası.
- [ ] Demo fallback geliyor.
- [x] Uygulamadan remote istek yok; kaydedilen CDP HTTP/yükleme/runtime hata dizileri boş. Console hataları ayrı alanda saklanmadı.

## Reload test

Her kritik scene’de reload:

- [x] cold open — `?mode=30&scene=1`
- [x] agent anatomy — `?mode=30&scene=7`
- [x] Vi3ecode — `?mode=30&scene=11`
- [x] final — `?mode=30&scene=12`

## G6 için kanıt planı ve yürütme kaydı

1. QA test edilen commit’i ve production build sonucunu kaydeder; test sunucusunu loopback’te başlatır ve ya işletim sistemi ağını kapatır ya da yalnız loopback origin’ine izin veren, tüm dış HTTP/HTTPS trafiğini reddeden izole browser proxy’si kullanır.
2. Soğuk açılışta site, yerel font, CSS/JS, görseller ve hazır olduğunda yerel demo fallback’inin açıldığını doğrular.
3. Cold Open, Agent Anatomy, Vi3ecode ve Final sahnelerini yeniden yükler; ardından 30 dakikalık rotayı tamamlar.
4. Tarayıcı console/network kaydında uzak font, CDN, görsel veya beklenmeyen remote istek/hata olmadığını not eder.

Kanıt kaydı: tarih, commit, build sonucu, işletim sistemi/tarayıcı, ağın kapalı olduğuna dair yöntem, kontrol başına PASS/FAIL, console/network gözlemi ve hata/çözüm. Screenshot/video kanıtı bu hazırlık turunda alınmaz; gerektiğinde son sprintte üretilir.

## Gate G6 — Offline PASS

Hiç internet olmadan 30 dk route tamamlanabiliyor.

**Phase 8 yürütme (2026-09-27): PARTIAL.** `npm run build` geçti. Production preview temiz, geçici headless Edge profiliyle açıldı; browser panelinde de production preview görüntülenip okundu. Offline testi, işletim sistemi ağını/firewall'ı değiştirmeden yapıldı: izole Edge profili için yerel proxy kuruldu; yalnız `http://127.0.0.1:4173` origin'ine izin verildi, diğer HTTP istekleri ve tüm HTTPS CONNECT istekleri 403 ile reddedildi. Ayrı `.invalid` CONNECT probe'u 403 döndü; dış ağa çıkış olmadığını doğruladı. Test başına 28/28 PASS: 30 dk modda 12 sahnenin tüm adımları ileri/geri gezildi, next/previous, Space, ArrowRight/ArrowLeft, J/K, R, `scene`/`step` URL durumu ve desteklenen fullscreen kontrol edildi. Dört kritik URL yeniden yüklendi. Uygulamanın page-network kaydında uzak istek yoktu. Kaydedilen HTTP hata, yükleme hatası ve Runtime exception dizileri boş; console hataları ayrı alanda saklanmadığından console için PASS iddiası yapılmıyor. Edge'in kendi arka plan trafiğinden 28 uzak istek proxy tarafından engellendi. JS/CSS loopback'ten, Scene 02/03 SVG'leri bundle içi data URI'den yüklendi; fontlar yerel sistem font yığını. Uygulamanın 30 dk rotasında screenshot/PNG kaynağı yok; animasyon akışı da tanımlı değil.

Test sırasında tarayıcının varsayılan `/favicon.ico` isteği 404 verdi. `index.html`'e boş data favicon tanımı eklenip production build yenilendi; son offline koşusunda HTTP/asset hatası sıfırlandı. Ayrıntılı sonuç ve yöntem: [Phase 8 offline test kaydı](sources/phase-8/offline-resilience-2026-09-27.md). Geçici JSON raporundaki 28 istek `blockedEdgeBackgroundRequests` olarak etiketlendi; bunlar uygulamanın istekleri değildir. `package.json` yalnız `dev`, `build`, `preview` script'lerini içeriyor; test/lint script'i yok.

**G6 durumu: PARTIAL / BLOCKED.** 30 dk core route offline PASS; tam G6 PASS değil. Tek blocker, authentic Vi3ecode demo fallback'inin (gerçek, privacy-reviewed yerel fallback) henüz bulunmaması/kurulmaması. Phase 6 Vi3ecode intro/workflow açık; G4 ve G5 açık kalır.

---

# PHASE 9 — Projector / resolution QA

**Süre:** 1–2 saat

**Hazırlık kaydı (2026-09-27):** Hedef matris ve raporlama biçimi tanımlandı; gerçek browser/projektör incelemesi yapılmadı, G7 açık.

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

## G7 için kanıt planı — test edilmedi

QA her 12 sahne için 1920×1080 ve 1366×768; desteklenen Chromium/Chrome ve mümkünse Firefox; %100 ve %110 zoom matrisini doldurur. Her hücrede başlık/body/code/görsel okunurluğu, taşma, navigation çakışması, crop, kontrollü scroll, cursor/browser chrome ve fullscreen sonucu kaydedilir. Gerçek projektör kullanılamazsa bu sınırlama ayrıca belirtilir; PNG viewport kontrolü tek başına projektör PASS sayılmaz.

Kanıt kaydı: build/commit, ekran ve tarayıcı boyutu, zoom, sahne, bulgu/önem, düzeltme ve tekrar kontrolü. Görsel kanıt gerekiyorsa yalnız gerçek uygulama görünümünden son sprintte alınır; simülasyon üretilmez.

## Gate G7 — Visual QA PASS

- Kritik hiçbir bilgi küçük değil.
- Scroll gerekmiyor veya kontrollü.
- Cursor / browser chrome sunumu bozmuyor.
- Fullscreen düzgün.

**Durum (2026-09-27): AÇIK — hedef çözünürlük PNG’leri mevcut, fakat tam sahne/tarayıcı/zoom/projektör matrisi tamamlanmadı.**

---

# PHASE 10 — İçerik QA

**Süre:** 1–2 saat

**Hazırlık kaydı (2026-09-27):** Claim-review yöntemi tanımlandı; claim audit yapılmadı, G8 açık.

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

## G8 için kanıt planı — inceleme yapılmadı

QA her iddia için şu kayıtları tutar: sahne/iddia, fact-opinion-product/model sınıfı, birincil kaynak ve erişim tarihi, güncellik bağımlılığı, doğrulama kararı ve yapılan düzeltme/çıkarma. Claude ≠ Claude Code, GPT ≠ Codex, Context, MCP, Skill, orchestration ve Vi3ecode adları özellikle kontrol edilir. Kaynak bulunamayan veya gereksiz güncel sayısal iddia kaldırılır; ürün terimleri için resmî/current kaynak kullanılır.

## Gate G8 — Content PASS

Sunum ürün sürümlerine gereksiz şekilde bağımlı değil.

**Durum (2026-09-27): AÇIK — claim register ve bağımsız içerik incelemesi henüz yok.**

---

# PHASE 11 — Timing QA

Bu aşama zorunlu.

**Hazırlık kaydı (2026-09-27):** Rehearsal sırası ve kayıt şablonu tanımlandı; prova yapılmadı, G9 açık.

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

## G9 için kanıt planı — prova yapılmadı

- Run 1: kronometresiz tıklamalı geçiş; navigation, sıra ve transition sorunlarını not et.
- Run 2: 30 dakikalık rotayı kesintisiz sun; her sahne için gerçek süre ve problem yaz; toplam hedef 26–28 dk.
- Gerekli düzeltmeleri yaptıktan sonra Run 3’ü kesintisiz tekrar et.
- Birbiri ardına iki tam prova ≤28 dakika olmadan G9 PASS verilmez; arada düzeltme varsa sayım yeniden başlar.

Kanıt kaydı: tarih, commit, her sahnenin gerçek süresi, toplam süre, sorunlar ve düzeltmeler. Zaman ölçümü gerçek sunum provasıyla yapılır; tahmini süre veya statik storyboard kanıt sayılmaz.

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

**Durum (2026-09-27): AÇIK — rehearsal kaydı yok.**

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
