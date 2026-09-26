# Sıfırdan Agentic Yazılım Geliştirme — Sunum

Bu depo, PRD ve Roadmap'te tanımlanan etkileşimli sunum projesidir. Mevcut aşama Phase 0'dır; sunum uygulaması henüz oluşturulmadı.

## Kaynak belgeler

- [PRD](Sifirdan_Agentic_Yazilim_Gelistirme_Sunum_PRD.md)
- [Roadmap](Sifirdan_Agentic_Yazilim_Gelistirme_Sunum_Roadmap.md)
- [Görsel ilkeler](DESIGN_PRINCIPLES.md)

## Yerel kullanım

### Phase 0: belgeleri görüntüleme

Markdown belgelerini editöründe açıp önizleyebilirsin. İstersen repo kökünde yerel dosya sunucusu başlat:

```powershell
py -m http.server 8000
```

Ardından `http://localhost:8000` adresini aç. `py` komutu yoksa `python -m http.server 8000` kullan. Sunucuyu `Ctrl+C` ile durdur.

Bu komut yalnızca mevcut dosyaları yerel olarak sunar; sunum uygulamasını çalıştırmaz. Uygulama iskeleti Roadmap Phase 2'de kurulacaktır. O aşamadan sonra proje bağımlılıkları ve `npm run dev` komutu README'de güncellenecektir.

## Klasörler

- `sources/` — kaynak materyaller
- `transcripts/` — transkriptler
- `screenshots/` — temizlenmiş referans ekran görüntüleri
- `assets/` — yerel görsel ve medya varlıkları

## Kapsam

Önce 30 dakikalık rota tamamlanır. 45 ve 60 dakikalık ekler, 30 dakikalık sürüm kalite kapısını geçmeden başlamaz. Çalışma kuralları için [AGENTS.md](AGENTS.md) dosyasına bak.
