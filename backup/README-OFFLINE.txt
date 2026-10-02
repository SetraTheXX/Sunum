MODEL DEĞİL, SİSTEM — SUNUM YEDEĞİ
==================================

1) İNTERNET VARSA: VERCEL (en kolay)
   VERCEL-URL.txt içindeki adresi tarayıcıda aç. Kurulum ve giriş gerekmez.
   Bu adres önceki yayındır; V3 bu tur deploy edilmedi. Güncel V3 için
   aşağıdaki yerel ZIP açılışını kullan.

2) İNTERNET YOKSA: Start-Sunum.bat (kurulum gerektirmez)
   a) ZIP'i USB'den bilgisayara ya da doğrudan USB üzerinde bir klasöre
      ÇIKAR. ZIP'in içinden çift tıklamak çalışmaz; önce "Tümünü ayıkla".
   b) Sunum-final-backup klasöründeki Start-Sunum.bat dosyasına çift tıkla.
   c) Siyah bir pencere açılır ve tarayıcı http://localhost:8000 adresinde
      sunumu gösterir. Açılmazsa pencerede yazan adresi Edge/Chrome'a yaz.
      (8000 doluysa 8001, 8002... kullanılır; pencere doğru adresi yazar.)
   d) Sunum boyunca siyah pencereyi AÇIK bırak. Bitince kapat.

   Gerekenler: Windows 10 veya 11. Python, Node, npm, yönetici izni ve
   internet GEREKMEZ. Sunucu yalnız bu bilgisayardan erişilebilir
   (localhost); ağa açılmaz, güvenlik duvarı izni istemez.

   Nasıl çalışır: Start-Sunum.bat, Windows'la birlikte gelen Windows
   PowerShell 5.1'i başlatır. offline\serve.ps1 betiği .NET'in yerleşik
   HttpListener sınıfıyla dist\ klasörünü sunar. İnternetten indirilmiş
   ek bir program (.exe) yoktur; betiğin tamamı açık metindir.

   Sorun olursa:
   - "Windows bilgisayarınızı korudu" (SmartScreen) uyarısı: "Ek bilgi"
     → "Yine de çalıştır". İnternetten gelmiş dosyalarda görülebilir.
   - Pencere hemen kapanıyor ya da "PowerShell engellendi" diyorsa okul
     bilgisayarında betik çalıştırma yönetici tarafından kapatılmış
     demektir. Bu durumda okul IT'sinden izin iste ya da kendi
     bilgisayarını bağla, veya 3) seçeneğini dene.
   - Video açılmazsa ekrandaki kareyle anlatmaya devam et; videoların
     kopyaları videos\ klasöründe, ayrıca doğrudan oynatılabilir.

3) PYTHON VEYA NODE VARSA (alternatif)
   - Python:  cd dist  →  py -m http.server 8000   (ya da python -m ...)
              sonra http://localhost:8000
   - Node/npm (proje klasöründe):
       npm install        (ilk seferde; internet gerekir)
       npm run build      (dist\ klasörünü yeniden üretir)
       npm run preview    (http://localhost:4173)

   Not: dist\index.html dosyasına doğrudan çift tıklamak sunumu AÇMAZ;
   tarayıcılar dosyadan (file://) açılan modül betiklerini engeller.

4) KONTROLLER
   → / Space   sonraki adım veya sahne
   ←           geri
   J / K       sonraki / önceki sahne
   R           sahnenin başı
   Esc         tam ekrandan çık
   Video adımları (Scene 04, 05, 08, 11): video durmuş açılır,
   Space oynatır / duraklatır, → sonraki sahneye geçer.
   V3 ana rota: 53 durum. Scene 08 kısa replay Adım 4 (24,5 sn);
   Scene 11 kısa replay Adım 5 (34 sn). Uzun kayıtlar ana rotada yoktur;
   Presenter’dan "Uzun kaydı aç (fallback)" seçimiyle açılır. "Ana rotaya
   dön" veya oklar aynı adıma döndürür. Replay'ler gerçek ekran
   kaydından kısaltılmış yerel MP4'lerdir. Replay'de Space baştan
   oynatır/duraklatır; oklar kesitleri seçer, uçlarda sunuma devam eder.
   Reload son karede durur. Resmî demo linkleri yalnız Presenter'dadır,
   internet gerektirir; çevrimdışı fallback değildir.

5) YEDEKTE NELER VAR  (ZIP içinde Sunum-final-backup/ klasörü)
   Erken Space/metadata yarışı düzeltildi. Aralıklı waiting/duraksama
   belirsizliği açık: her cihazda kesintisiz oynatma garantisi değildir.
   İnsan süreli prova ve gerçek USB/projektör saha kontrolleri yapılmalıdır.

   - Start-Sunum.bat: çevrimdışı başlatıcı
   - offline/serve.ps1: yerel sunucu betiği
   - offline/SHA256SUMS.txt: bu iki dosyanın SHA-256 değerleri
     (kontrol: PowerShell'de  Get-FileHash .\Start-Sunum.bat )
   - dist/: hazır üretim build'i (videolar dist/assets/ içinde de var)
   - src/, scenes/, index.html, package.json, package-lock.json,
     tsconfig.json, vite.config.ts: uygulama kaynağı
   - assets/video-drafts/: uygulamanın build sırasında okuduğu dört video
   - assets/replays/: Scene 08 ve 11 kısa gerçek ekran replay MP4'leri;
     sunum dışında doğrudan oynatılabilir (24,5 ve 34 sn)
   - assets/video-posters/: videolar oynatılamazsa gösterilen kareler
   - videos/: aynı dört videonun okunur adlı kopyaları; sunum dışında
     doğrudan oynatmak için
       scene-04-chatbot.mp4          (Scene 04, ~21 sn)
       scene-05-terminal-ajani.mp4   (Scene 05, ~23 sn)
       scene-08-masaustu-ajan.mp4    (Scene 08, ~42 sn)
       scene-11-ajan-takimi.mp4      (Scene 11, ~62 sn)
   - FINAL_KONUSMA_AKISI.md: konuşma rehberi
   - src/data/replays/: eski metin replay'lerinin redakte edilmiş arşivi;
     güncel sahneler bu JSON'ları oynatmaz
   - src/data/gitHistory.json: meta finalin yerel Git kanıt verisi
   - scripts/git-history.mjs: kaynak build'inin veri üretim betiği
   - sources/phase-11/rehearsal-sheet.md: boş insan prova çizelgesi
   - demo/README.md, demo/template/, demo/reset.ps1 ve demo/serve.ps1:
     isteğe bağlı canlı demonun yönergesi, şablonu ve hazırlık betikleri;
     değiştirilmiş app/app-team kopyaları pakete alınmaz. Ajan araçları
     ve hesaplar ayrıca gerekir; kayıtlı videolar offline fallback'tir.
   - README.md, PRD ve Roadmap: proje belgeleri
   - VERCEL-URL.txt: yayındaki adres
   node_modules, .git, .vercel ve gizli anahtar dosyaları yedeğe alınmaz.
