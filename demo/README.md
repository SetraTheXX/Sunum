# Canlı demo hedef uygulaması

Sunumdan bağımsız, tek sayfalık küçük bir site: **Atölye Kuzey**. Scene 05, 08 ve 11'deki canlı demolarda hep aynı görev kullanılır: telefonda ulaşılamayan menüyü düzeltmek. Sunum uygulamasının (`src/`) bir parçası değildir; sunum build'ine girmez.

- `template/`: Değişmeyen başlangıç durumu. Elle düzenlemeyin.
- `app/`: Scene 05'te ajanın değiştirdiği, Scene 08'de kontrol edilen kopya. `http://localhost:5500/`.
- `app-team/`: Scene 11'de aynı görevin rol devriyle en baştan yapıldığı kopya. `http://localhost:5501/`.
- `reset.ps1`: İki kopyayı da tek çalıştırmada şablondan yeniden kurar. Her kopyada ayrı bir git deposu açıp "başlangıç" commit'ini atar; böylece ajan `git diff` ile değişikliği gösterebilir. İki kopya da ana depoda yok sayılır (`.gitignore`).
- `serve.ps1`: Bir kopyayı localhost'ta sunar (`-Folder app` → 5500, `-Folder app-team` → 5501).

## Gereksinimler

- **npm, Node veya bağımlılık gerekmez.** Site düz HTML ve CSS'tir; CDN, web fontu veya dış istek yoktur.
- Sunucu Windows PowerShell 5.1 ile çalışır. Python varsa alternatif: `py -m http.server 5500 --directory demo/app`.
- `git` varsa reset betiği her kopya için ayrı bir depo kurar. Yoksa demo yine açılır, yalnız diff gösterilemez.
- **Canlı demo için ajan aracı gerekir:** Codex CLI, Codex App ve Vi3ecode. Bunlar internet bağlantısı ve hesap girişi ister; bu klasör onları kurmaz.

## Başlangıç durumu

Masaüstünde üst menü (Projeler, Hizmetler, Hakkında, İletişim) görünür. Ekran 720 px ve altındaysa menü gizlenir ve yerine hiçbir şey gelmez: **telefonda menüye ulaşılamaz.** Bu bilinçli bir başlangıç durumudur.

## Kabul koşulu

Üç demodaki prompt'lar bu koşulun tamamını içerir. Ajanın değişikliği şu koşulların hepsi sağlanırsa kabul edilir:

1. 720 px ve altındaki genişlikte başlıkta bir Menü düğmesi (hamburger) görünür.
2. Düğmeye Tab ile gelinir. Menü kapalıyken gizli menü bağlantıları Tab ile odak almaz; menü açıkken Tab bağlantılara ilerler.
3. Tıklama, Enter ve Space menüyü açar, tekrar kullanınca kapatır.
4. Menü açıkken **Esc** menüyü kapatır ve odak düğmeye döner.
5. Düğmenin `aria-expanded` değeri menünün açık/kapalı durumunu doğru gösterir; `aria-controls` menüyü işaret eder.
6. Masaüstü görünümü değişmez: 720 px'ten genişte düğme görünmez, üst menü eskisi gibi yan yana durur.
7. Yeni bağımlılık, CDN veya dış istek eklenmez.

**Kapsam kuralı (üç prompt'ta da yazılı):** Ajan yalnız çalışma klasöründeki dosyaları değiştirir (Scene 05: `demo\app`, Scene 11: `demo\app-team`; Scene 08 hiç değiştirmez), klasörün dışına çıkmaz, **commit veya push yapmaz.** Prompt'lardaki “bu klasör” her zaman ajanın açıldığı çalışma klasörüdür; yollar ona göredir.

**Scene 11 QA kanıt yöntemi:** QA önce `git diff` ile değişen dosyaları gösterir; her maddede yöntemini yazar: tarayıcıda `http://localhost:5501/` 390 px genişlikte denendiyse adımlar ve görülen sonuç, yalnız kod okunduysa “kod okunarak”, denenemediyse “kontrol edilmedi”.

Bu koşullar bir sonucu garanti etmez; ajanın çıktısı her çalıştırmada farklı olabilir. Demoda kabul koşulu, değişiklik ve yapılan kontrol ayrı ayrı gösterilir. Kontrol yapılmadıysa "kontrol edildi" denmez.

## Hazırlık ve reset sırası

Reset yalnız iki yerde çalışır: **sunumdan önce bir kez** ve **her provadan sonra.** Sunum sırasında, demolar arasında reset çalıştırılmaz.

```powershell
# 1. Sunumdan önce bir kez: iki kopyayı da başlangıç durumuna getir
powershell -ExecutionPolicy Bypass -File demo\reset.ps1
#    Çıktıda iki satır "değişiklik: 0" yazmalı (app ve app-team).

# 2. İki sunucuyu ayrı pencerelerde aç (sunum boyunca açık kalsın)
powershell -ExecutionPolicy Bypass -File demo\serve.ps1
powershell -ExecutionPolicy Bypass -File demo\serve.ps1 -Folder app-team
#    Tarayıcı: http://localhost:5500/ ve http://localhost:5501/
#    Telefon görünümü için DevTools cihaz modu (390 px).

# 3. Ajan araçlarını açın: Codex CLI ve Codex App → demo\app, Vi3ecode → demo\app-team.

# Değişikliği görmek için: git -C demo\app diff   ya da   git -C demo\app-team diff
```

Sunumda Presenter görünümünde Scene 05, 08 ve 11'in video adımında "CANLI DEMO" notu çıkar. Buradaki düğmeler o sahnenin demo adresini (05 ve 08: 5500, 11: 5501) yeni sekmede açar ya da panoya kopyalar. Audience görünümünde bu not yoktur.

## Runbook: Scene 05 → 08 → 11

Üç demo aynı işi izler: önce üretim, sonra aynı değişikliğin kontrolü, sonra aynı görevin rollerle en baştan yapılması. Tam prompt metinleri ve söylenecekler sahne dosyalarının `## Canlı demo` bölümündedir ve Presenter'ın konuşmacı notlarında görünür.

| Sahne | Araç ve kopya | Görev | Süre bütçesi | Videoya geç |
|---|---|---|---|---|
| 05 · üretim | Codex CLI · `demo\app` | Telefonda çalışan Menü düğmesini ekle (kabul koşulunun tamamı) | ≤3 dk | 2 dk'da dosya değişmediyse ya da 2,5 dk geçtiyse |
| 08 · kontrol | Codex App · `demo\app` | Scene 05'in değişikliğini `git diff` ve madde madde kontrolle raporla; dosya değiştirme | ≤3 dk | 05'te dosya değişmediyse, 90 sn'de ilk çıktı yoksa ya da 2,5 dk geçtiyse |
| 11 · rol devri | Vi3ecode · `demo\app-team` | Aynı görev en baştan: Lead → (gerekirse Analyst) → Developer → QA, her devir açıkça yazılı; QA FAIL ise Developer'a dönüş | ≤4 dk (görevi Adım 1'de gönder) | Adım 5'te QA'ya ulaşılmadıysa ya da 4 dk geçtiyse |

- **Konuşma gözleme bağlıdır.** Sonucu önceden söyleme; ekranda ne görünüyorsa onu oku: dosya adları, diff, rollerin devir mesajları, QA'nın kararı ve gerekçesi. Sayfayı yenileyip kendin de dene ve gördüğünü söyle.
- **Sonuç garanti değildir.** Ajan çıktısı her çalıştırmada farklıdır. FAIL ya da "kontrol edilmedi" gelirse saklanmaz; anlatının parçası yapılır.
- **Başarısızlık işaretleri:** oturum veya ağ hatası, çözülmeyen izin istemi, beklenen sürede çıktı yok, sayfa bozuk, süre bütçesi aşıldı.
- **Videoya geçiş:** Cümleyi söyle ("Canlı ortam bugün bizimle değil; aynı akışın daha önce kaydettiğim halini göstereyim."), **sunum penceresine dön → Space ile klibi başlat; klip bitince → ile devam et.** Videolar farklı görevlerin kayıtlarıdır; canlı demonun sonucu gibi anlatılmaz.

### Prova ve sunum öncesi kontrol listesi

- [ ] İnternet bağlantısı var; ajan araçları yanıt veriyor (her birinde kısa bir deneme).
- [ ] Codex CLI ve Codex App `demo\app`, Vi3ecode `demo\app-team` klasöründe açık; oturumlar açık; Vi3ecode'da dört rol hazır.
- [ ] `demo\reset.ps1` sunumdan önce bir kez çalıştı; iki satırda da "değişiklik: 0" yazıyor.
- [ ] İki sunucu açık; `http://localhost:5500/` ve `http://localhost:5501/` telefon genişliğinde açılıyor, menüye ulaşılamıyor; masaüstünde menü yan yana.
- [ ] Ekran büyütme: terminal yazı tipi ≥20 pt; Codex App ve Vi3ecode %125–150 zoom; tarayıcı demosu okunuyor.
- [ ] Ekran gizliliği: bildirimler kapalı; ilgisiz sekme, hesap adı, token veya özel dosya yolu görünmüyor.
- [ ] Fallback denendi: sunum penceresine dönüş, Space ile Scene 05/08/11 klibi oynuyor, klip bitince → sonraki sahneye geçiyor.
- [ ] Kronometre: her demo için süre bütçesi not edildi.
- [ ] Prova bitince `demo\reset.ps1` yeniden çalıştırıldı.

## Canlı demo yapılamazsa: video fallback

- **USB veya okul bilgisayarında canlı demo yapılamaz.** Orada ajan aracı, hesap girişi ve internet bulunmayabilir. `Start-Sunum.bat` yalnız sunumu açar, demo ortamını kurmaz.
- Bu durumda ya da demoda bir aksaklık olursa: **sunum penceresine dön → Space ile video adımındaki klibi başlat; klip bitince → ile devam et** (Scene 05, 08, 11). Videolar gerçek kayıtlardır ve çevrimdışı oynar.
- Videolar bu demo uygulamasının değil, farklı görevlerin kayıtlarıdır. Canlı demonun sonucu gibi anlatılmamalıdır.
