# Sıfırdan Agentic Yazılım Geliştirme — Sunum

Bu depo, PRD ve Roadmap'te tanımlanan etkileşimli sunum projesidir. **Mevcut aşama Phase 1 — İçerik kilidi**; önce 30 dakikalık rota hazırlanıyor. Sunum uygulaması henüz oluşturulmadı.

## Kaynak belgeler

- [PRD](Sifirdan_Agentic_Yazilim_Gelistirme_Sunum_PRD.md)
- [Roadmap](Sifirdan_Agentic_Yazilim_Gelistirme_Sunum_Roadmap.md)
- [Görsel ilkeler](DESIGN_PRINCIPLES.md)
- [12 sahnelik Phase 1 rota](scenes/README.md)
- [Phase 1 kaynak ve iddia kaydı](sources/phase-1-source-register.md)

## Yerel kullanım

### Phase 1: içerik belgelerini görüntüleme

Markdown belgelerini editöründe açıp önizleyebilirsin. İstersen repo kökünde yerel dosya sunucusu başlat:

```powershell
py -m http.server 8000
```

Ardından `http://localhost:8000` adresini aç. `py` komutu yoksa `python -m http.server 8000` kullan. Sunucuyu `Ctrl+C` ile durdur.

Bu komut yalnızca dosyaları yerel olarak sunar; sunum uygulamasını çalıştırmaz. Uygulama iskeleti Roadmap Phase 2'de kurulacak, runtime orada G2 kapsamında doğrulanacaktır.

## Klasörler

- scenes/ — 30 dakikalık anlatının 12 sahnesi
- `sources/` — kaynak materyaller
- `transcripts/` — transkriptler
- `screenshots/` — temizlenmiş referans ekran görüntüleri
- `assets/` — yerel görsel ve medya varlıkları

## Kapsam

Phase 1 yalnızca 30 dakikalık içerik rotasını kilitler. 45 ve 60 dakikalık genişletmeler, 30 dakikalık sürüm kalite kapısını geçmeden başlamaz. Bu fazda uygulama kodu, manifest veya görsel polish eklenmez. Çalışma kuralları için [AGENTS.md](AGENTS.md) dosyasına bak.
