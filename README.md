# Sıfırdan Agentic Yazılım Geliştirme — Sunum

Bu depo, PRD ve Roadmap'te tanımlanan etkileşimli sunum projesidir. **Mevcut aşama Phase 2 — Teknik iskelet**; uygulama 30 dakikalık rotanın 12 sahnesiyle kuruluyor. 45/60 dakikalık ek içerikler Phase 12'ye bırakılmıştır.

## Kaynak belgeler

- [PRD](Sifirdan_Agentic_Yazilim_Gelistirme_Sunum_PRD.md)
- [Roadmap](Sifirdan_Agentic_Yazilim_Gelistirme_Sunum_Roadmap.md)
- [Görsel ilkeler](DESIGN_PRINCIPLES.md)
- [12 sahnelik Phase 1 rota](scenes/README.md)
- [Phase 1 kaynak ve iddia kaydı](sources/phase-1-source-register.md)

## Yerel kullanım

### Phase 2: yerel sunum iskeleti

Bağımlılıkları kur ve geliştirme sunucusunu başlat:

```powershell
npm install
npm run dev
```

Vite'ın yazdırdığı localhost adresini aç. Üretim çıktısını doğrulamak için `npm run build` çalıştır; istersen `npm run preview` ile build'i yerel olarak görüntüle. Sunucuları `Ctrl+C` ile durdur.

Sahne metinleri `scenes/` altındaki Phase 1 belgelerinden yerel olarak okunur. `/?mode=30` ana rotayı açar. 45/60 seçicileri bu iskelette görünür; yalnızca 30 dakikalık çekirdek sahneler hazırdır, uzun rota ekleri henüz yoktur. Sunum kontrolleri: `→`/`Space` adım veya sahne ilerletir, `←` geri alır; `J`/`K` sahne değiştirir, `R` geçerli sahneyi baştan açar. İndeks ve ekran kontrolleri de kullanılabilir.

## Klasörler

- scenes/ — 30 dakikalık anlatının 12 sahnesi
- `sources/` — kaynak materyaller
- `transcripts/` — transkriptler
- `screenshots/` — temizlenmiş referans ekran görüntüleri
- `assets/` — yerel görsel ve medya varlıkları

## Kapsam

Phase 2 yalnızca teknik iskelet ve 30 dakikalık rota gezinmesini kapsar. 45/60 dakikalık ek içerikler, illüstrasyonlar ve görsel polish daha sonraki fazlardadır. Çalışma kuralları için [AGENTS.md](AGENTS.md) dosyasına bak.
