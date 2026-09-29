# 08 — Ajan Tabanlı Mühendislik

## Ana fikir

Hızlı kod üretimini, sonucu kanıtla kontrol eden bir geliştirme turuna bağlamak.

## İzleyicinin bu sahneden çıkarken anlayacağı tek şey

Ajan tabanlı mühendislik (agentic engineering): her değişiklik kanıtıyla birlikte ilerler.

## Ekranda

- Akış: Hedef → Bağlam → Plan → Uygula → Test → İnceleme → Doğrula → Git
- Üç kanıt noktası: değişen dosyalar, test sonucu, inceleme sonucu
- Son cümle: “İlerleme = değişiklik + doğrulanabilir kanıt”

## Konuşmacı

Adım 1 — Hedef: “Aynı görev: mobil menü telefonda açılmıyor. Önce kabul koşulunu yazıyoruz: telefonda menü açılsın, masaüstü değişmesin. Sonra bağlamı hazırlıyoruz ve küçük bir plan çıkarıyoruz.”

Adım 2 — Uygula: “Ajan değişikliği yapıyor. İlk kanıt noktası değişen dosyalar: tam olarak ne değişti?”

Adım 3 — Kanıt: “Sonra test: komut ve çıktısı. Sonra kod incelemesi: ikinci bir göz. Doğrula adımında sonucu baştaki kabul koşuluna göre kontrol ediyoruz; hata varsa döngü başa dönüyor. En sonda Git ile değişiklik kayıt altına giriyor.”

Adım 4 — “İlerleme, değişiklik artı doğrulanabilir kanıt. Küçük bir işte bazı adımlar birleşebilir, ama doğrulama ihtiyacı kaybolmaz. Ajanın ‘bitti’ demesi, kanıt toplama sorumluluğunu ortadan kaldırmaz.”

## Video

Adım 5 — Video açılınca Space ile başlat (yaklaşık 42 saniye, sessiz). En uzun ikinci klip; acele etme.

Oynarken: “Burada masaüstü bir kodlama ajanına görev veriyorum. Prompt'u yazıyorum, ajan repo ve araçlarla çalışmaya başlıyor, bitince ne yaptığını özetliyor. Sonunda ürettiği videoyu izliyoruz.”

Bitince: “Ajan işi bitirdi ve özetledi. Ama o özet de bir iddia; içeriğin doğruluğunu ayrıca kontrol etmemiz gerekiyor. İşte bu yüzden kanıt noktalarından bahsediyoruz.” → ile devam et.

## Geçiş

“Peki planlayan, yapan ve kontrol eden hep aynı ajan mı olmalı?”
