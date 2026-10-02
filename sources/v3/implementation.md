# V3 replay uygulaması ve QA devri — 2026-10-01

Branch: `feat/v3-wow`. Commit, push ve deploy yapılmadı. Preview: http://localhost:4173/.

## Kapsam ve Plan Delta

Diskte ayrı Analyst V3 Plan Delta raporu bulunamadı. Thread'deki açık kullanıcı isteği V3 kapsamını belirliyor: iki gerçek replay ve Presenter resmî demo linkleri. README mevcut React/Vite uygulamasını ve build komutlarını belgeliyor; eski Phase 0 talimatından yeni framework çıkarılmadı. PRD, Roadmap'in mevcut Plan Delta'ları, DESIGN_PRINCIPLES ve proje hafıza indeksi okundu. Graphify `query_graph` ve `get_neighbors` ile App/SceneVisual etki alanı kontrol edildi; graph kaynaklarına karşı gerçek dosyalar doğrulandı.

Rota **55 durum**: önceki meta final dahil 53 + Scene 08/11 için birer replay. Replay içindeki sekiz kesit ayrı sunum URL durumları değildir. Video son adım olarak kalır: Scene 04=5, 05=4, 08=5, 11=6. Replay adresleri: `/?scene=8&step=4`, `/?scene=11&step=5`; Audience için `&view=audience` eklenir. Tamamı oynatılırsa replay süreleri **79 + 74 = 153 sn** ekler. Süre optimizasyonu ve insan provası yapılmadı; G9 ve diğer açık gate'ler kapanmaz. Roadmap sessizce değiştirilmedi.

## Gerçek kaynaklar ve sınırlar

Önceki thread'in metadata taraması `.claude/projects`, `.codex/sessions` ve Vi3ecode profillerini kapsıyordu. Seçilen Vi3ecode dosyaları bu tur diskte tekrar okundu; ham dosyalar repoya kopyalanmadı. Boyutlar inceleme anındadır; aktif JSONL büyüyebilir.

Ortak maskelenmiş kök: `~/AppData/Roaming/com.vi3ecode.desktop/engine-accounts/profiles/[profil]/claude/projects/[Sunum]/`.

| Replay | Gerçek dosya | İncelenen boyut | Kesit (UTC; sıfır tabanlı JSONL satırı) |
|---|---|---:|---|
| Scene 08 — tek Developer | `0fba68a7-c148-4130-891f-58b4d53eb89c.jsonl` | 12.250.621 bayt | 2026-10-01 16:28:49–16:32:08; 297–319 |
| Scene 11 — Developer düzenlemesi | aynı Developer dosyası | 12.250.621 bayt | 2026-10-01 18:56:58–18:57:20; 1083–1104 |
| Scene 11 — Lead ve iletilen QA sonuçları | `f63f7caf-389c-4db2-83b3-65d5e42f2d1c.jsonl` | 2.172.598 bayt | 2026-10-01 18:56:59–18:58:30; 193–205 |

Scene 08 Claude Code/Vi3ecode Developer oturumudur; Codex App kaydı olarak sunulmaz. Ayrı plan mesajı yoktur: plan kesiti gerçek düzenleme girdisindeki kod yorumunu gösterir ve bu durum kesit etiketinde/JSON notunda belirtilir. Kod diff'i gerçek düzenleme girdisinden; build ve test satırları gerçek tool sonuçlarından alınmıştır.

Scene 11 QA sonucuyla başlar; Lead planı → Developer okuma/diff/grep → iletilen QA doğrulamasıyla biter. QA satırları Lead'e ulaşan görev mesajlarıdır; QA'nın kendi ham oturumu değildir. README düzeltmesi kod testinin yerine geçmez; oturumda build yapılmadığı için bu replay'e build uydurulmadı. Diff `Edit` aracının gerçek old/new girdisinden biçimlendirildi; ürün ekranı capture'ı taklit edilmedi.

Yalnız Sunum göreviyle ilgili metinler seçildi. Özel/proje dışı sohbet, düşünce blokları, tam sistem prompt'ları alınmadı. E-posta, kullanıcı yolu ve tokenlar dışlandı; shell yolu `~` ile temsil edildi. `…` çıkarılan metni gösterir; diff `+/-` işaretleri sunum biçimidir. Her replay'de “Gerçek oturumdan kısaltılmıştır” notu görünür. JSON kaynak alanları maskelenmiş yol, zaman ve kesit bilgilerini içerir.

## Resmî bağlantılar

İki benzersiz URL Scene 08/11 Presenter alanında bulunur; Audience DOM'unda yoktur. İndirme, iframe, embed ve otomatik dış istek yoktur.

- [Anthropic Claude Code resmî demo GIF](https://github.com/anthropics/claude-code/blob/main/demo.gif): Anthropic'in resmî reposunda mevcut `demo.gif` sayfası; HTTP/web erişimi doğrulandı. Bu aday GIF'tir, video olduğu iddia edilmez.
- [OpenAI Codex App tanıtımı ve demo](https://openai.com/index/introducing-the-codex-app/): resmî OpenAI sayfası, başlığı ve erişimi doğrulandı. Yeni sekmede açılır; internet gerekir.

## Değişen dosyalar

Bu uygulama: `src/App.tsx`, `src/SceneVisual.tsx`, `src/styles.css`, `src/TranscriptReplay.tsx`, `src/replays.ts`, `src/data/replays/scene08.json`, `src/data/replays/scene11.json`, `scripts/verify-v3.py`, `README.md`, `DESIGN_PRINCIPLES.md`, `sources/v3/*`, `screenshots/v3/*`.

Önceki turdan kalan meta final: `src/GitEvidence.tsx`, `src/data/gitHistory.json`, `scripts/git-history.mjs`, `package.json`, `scenes/12-final.md` ve ortak SceneVisual/styles değişiklikleri. Çalışma ağacında ayrıca önceden var olan AGENTS/tool yapılandırması ve graph çıktıları var; bu tur bunlar düzenlenmedi. `assets/` ve `src/sceneVideos.ts` için Git diff yok; dört MP4 ve posterler korundu.

## Kontroller ve bağımsız QA isteği

- `npm run build`: TypeScript/Vite PASS; prebuild 41 gerçek Git commit'i okuyor.
- `python scripts/verify-v3.py`: [verification.json](verification.json); JSON email/user_path/secret taraması, 55 durum × 2 görünüm, dört video × 2 görünüm, replay Space/ok/reload/reduced-motion/çıkış, tam 79/74 sn timer sırası (virtual clock), dış istek ve sayfa hataları.
- Mevcut regresyon, yalnız yeni 55 durum ve video adımı adreslerine uyarlanarak çalıştırıldı: [regression.json](regression.json). Eski metin taraması İngilizce kod/oturum alıntılarını da uyarı sayar; bunlar içerik hatası diye otomatik sınıflandırılmadı.
- Mevcut odak/Space video matrisi sonuç üretmeden süre sınırına takıldı ve yalnız bu testin Python süreci durduruldu: [video-space.txt](video-space.txt). Bu koşu PASS değildir; önceki Edge çökmesinin aynı nedenini kanıtlamaz. `verify-v3.py` içinde düğme odağı, video click→Space ve Presenter sahne listesi odağı kontrolleri ayrıca çalıştırıldı; sonuçlar `verification.json` içindedir. QA eski uzun matrisi/main karşılaştırmasını bağımsız değerlendirmeli.
- [Replay kareleri](../../screenshots/v3/): iki sahne × Presenter/Audience × 1920/1366, toplam 8 PNG. 1366 Presenter Scene 08 ve 1920 Audience Scene 11 diff kareleri gözle kontrol edildi.
- `git diff --check`: whitespace hatası yok.

QA: meta finalde gerçek Git verisi ve iki diff sınırını; replay satırlarını yukarıdaki yerel kaynak kesitleriyle; gizlilik taramasını; bütün 55 durumu; dört videoyu; odaklı Space/ok/J/K/R davranışını; tam zamanlı replay'i; reduced-motion ve hızlı çıkışta iptali bağımsız doğrula. Headless Edge Space çökmesini gerçek tarayıcıda veya mevcut main preview karşılaştırmasıyla yeniden değerlendir. Firefox, native zoom/fullscreen, projektör, USB/ZIP ve kesintisiz insan provası bu uygulamanın kanıtı kapsamında değildir.
