# Model Değil, Sistem — Sıfırdan Agentic Yazılım Geliştirme Sunumu

AI ile uygulama geliştirmeyi sohbetten ajan takımına kadar anlatan, 12 sahnelik etkileşimli sunum. Dört sahnede kısa, sessiz ekran kayıtları vardır.

## Kaynak belgeler

- [PRD](Sifirdan_Agentic_Yazilim_Gelistirme_Sunum_PRD.md)
- [Roadmap](Sifirdan_Agentic_Yazilim_Gelistirme_Sunum_Roadmap.md) — kalite kapıları ve açık işler
- [Görsel ilkeler](DESIGN_PRINCIPLES.md)
- [Sunum akışı ve sahne dosyaları](scenes/README.md)
- [Konuşma rehberi](FINAL_KONUSMA_AKISI.md)
- [Kaynak ve iddia kaydı](sources/phase-1-source-register.md)

## Çalıştırma

Node.js ve npm gerekir.

```powershell
npm install
npm run dev        # geliştirme sunucusu
npm run build      # tsc --noEmit ve üretim build'i (dist/)
npm run preview    # dist/ klasörünü yerelde sunar
```

Vite'ın yazdırdığı localhost adresini aç; sunucuyu `Ctrl+C` ile durdur. Build'de yalnız yerel dosyalar kullanılır; harici CDN veya ağ isteği yoktur.

## Sunum kontrolleri

- İki görünüm var: **Presenter** (sahne listesi, ekrandaki içerik, konuşmacı notları) ve **tam ekran sunum**. Sağ üstteki **Tam ekran** düğmesi sunuma geçer, `Esc` geri döner.
- `→` / `Space` sonraki adım veya sahne, `←` geri, `J` / `K` sonraki / önceki sahne, `R` sahnenin başı.
- Video adımlarında (Scene 04, 05, 08, 11) video durmuş başlar; `Space` oynatır / duraklatır, `→` sonraki sahneye geçer. Adımdan çıkınca video durup başa döner. Video oynatılamazsa aynı kayıttan alınmış kare gösterilir.
- Scene 08/11 ekran replay’leri: gerçek Codex App 24,5 sn (Adım 4) / Vi3ecode 34 sn (Adım 5). Space oynat/duraklat, oklar kayıt bölümleri; reload son karede durur. Ana rota 53 durum. Uzun kayıtlar normal ileri gezinmede yoktur; Presenter’daki “Uzun kaydı aç (fallback)” seçimiyle açılır, “Ana rotaya dön” veya ←/→ aynı adıma döndürür. Resmî bağlantılar yalnız Presenter’da, internet gerektirir. Eski dosyalar korunur. Kabul edilmiş accepted-r3 USB paketi önceki 55 durumlu sürümdür ve bu değişiklikle güncellenmedi.
- V3 kontrolü: açık preview üzerinde `python scripts/verify-replay-media.py`; Python Playwright ve yerel Edge gerekir. Kaynak/kesit sınırları ve QA devri: [Güncel replay ve QA kanıt kaydı](sources/replay-media/README.md).
- Adres çubuğu konumu tutar: `/?scene=4&step=5` doğrudan o adımı açar, `&view=audience` tam ekran görünümünü açar. Eski `?mode=30/45/60` bağlantıları tek rotaya yönlenir.

## Klasörler

- `scenes/` — 12 sahnenin metni ve konuşmacı notları
- `src/` — React uygulaması
- `assets/` — yerel görseller, video posterleri ve sunum videoları
- `sources/` — kaynak materyaller ve denetim kayıtları
- `transcripts/` — transkriptler
- `screenshots/` — temizlenmiş referans ekran görüntüleri

Çalışma kuralları için [AGENTS.md](AGENTS.md) dosyasına bak.
