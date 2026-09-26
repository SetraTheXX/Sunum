# Phase 1 — Kaynak ve iddia kaydı

**Kontrol tarihi:** 27 Eylül 2026

Phase 1 başında sources/, transcripts/ ve screenshots/ içinde yalnızca boş .gitkeep dosyaları vardı. Bu nedenle güncel ürün ekranı veya transkript kanıtı mevcut değildi. Aşağıdaki resmi kaynaklar temel kavramların doğrulanması için incelendi; sunum için indirilen bir medya varlığı yoktur.

## İçerik dayanakları

| Konu | Sahnedeki kullanım | Dayanak ve sınır |
|---|---|---|
| Model, prompt, context ve agent loop | Modelin istek, bağlam ve araç çıktılarıyla birlikte çalıştığını anlatan basit zihinsel model | [OpenAI: Unrolling the Codex agent loop](https://openai.com/index/unrolling-the-codex-agent-loop/). Codex uygulamasının açıklamasıdır; sunumdaki “çalışma masası” benzetmesi öğretim amaçlıdır, teknik tanım değildir. |
| Model adı ile coding-agent ürünü ayrımı | Claude/Claude Code ve GPT/Codex örnekleri, yalnızca model ve çalışma ortamı ayrımını göstermek için | [Anthropic: Claude Code overview](https://code.claude.com/docs/en/overview), [OpenAI: Key concepts](https://developers.openai.com/api/docs/concepts) ve [Code generation](https://developers.openai.com/api/docs/guides/code-generation). Ürün/model adları zamanla değişebilir ve bazı adlar birleşik olabilir; sahnede marka taksonomisi iddia edilmiyor. |
| Agent, model, tools, instructions; tek/çok agent orkestrasyonu | Araç kullanımı ve handoff'un chat yanıtından farkı; birden fazla agent'ın her zaman gerekli olmadığı | [OpenAI: A practical guide to building agents](https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/). Genel kavramlar için kullanılır; tek bir evrensel agent tanımı iddia edilmez. |
| Skill | Tekrarlanabilir görev yönergesi ve destekleyici dosyalar | [OpenAI API: Skills](https://developers.openai.com/api/docs/guides/tools-skills). Bu kaynak OpenAI API Skills uygulamasını tarif eder; sahnede kısa öğretim tanımı olarak kullanılır. |
| MCP | AI uygulamalarını harici sistemlere bağlayan açık standart | [Model Context Protocol: What is MCP?](https://modelcontextprotocol.io/introduction). Standart bağlantı protokolü olarak anlatılır; protokolün teknik katmanları bu rotanın dışında. |
| Git | Değişiklik geçmişini kaydetme, karşılaştırma ve geri dönebilme | [Pro Git: About Version Control](https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control). Git'in tek başına doğruluk veya kalite garantisi olduğu söylenmez. |
| Vi3ecode rol ve handoff adları | Lead, Analyst, Developer, QA; paylaşılan thread ve handoff akışı | [Vi3ecode resmi ana sayfası](https://vi3ecode.com/) ve [changelog](https://vi3ecode.com/changelog), 27 Eylül 2026'da kontrol edildi. Ürün arayüzü değişebileceği için gösterilecek güncel ekran ve adımlar Phase 5'te yeniden doğrulanmalı. |

## Açık doğrulama noktaları

- **Vi3ecode gerçek ekranı:** Bu fazda screenshot veya canlı ürün görüntüsü alınmadı. Demo metni yalnızca gerçekten görülebilen Agent Mode, rol, handoff ve QA/test adımlarını kullanmalı; mevcut ekranda olmayan bir adım gösterilmiş gibi anlatılmamalı. Kanıt Phase 5'e aittir.
- **Sunucu ilişki açıklaması:** “Vi3ecode benim ürünüm değil; topluluk/moderasyon tarafında yer alıyorum, proje Berk'in” açıklaması kullanıcı tarafından sağlanan PRD metninden alınmıştır; dış kaynaktan bağımsız doğrulanmadı. Sunucu bu kişisel beyanı sunumdan önce kendisi teyit etmelidir.
- Güncel fiyat, limit, model sıralaması, sayısal metrik veya marka karşılaştırması kullanılmadı.
- Vibe coding örnekleri ve kalite soruları anlatım örneğidir; gerçek bir ürünün başarısı ya da belirli bir uygulama hatası hakkında kanıt iddiası taşımaz.
