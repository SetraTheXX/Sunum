# 10 — Orkestrasyon

## Ana fikir

Lead, Analyst, Developer ve QA arasındaki devir teslimi kısa ve izlenebilir bir akışla göstermek.

## İzleyicinin bu sahneden çıkarken anlayacağı tek şey

Orkestrasyon (orchestration): doğru işi doğru role verip sonucu kontrol noktalarından geçirmek.

## Ekranda

- Akış: Lead → Analyst (gerektiğinde) → Developer → QA
- QA sonucu: PASS → tamamla / FAIL → Developer'a geri dön
- Git: incelenebilir değişikliğin son kayıt noktası

## Konuşmacı

Adım 1 — Roller: “Lead hedefi ve kapsamı netleştirip işi devrediyor. Belirsizlik varsa Analyst araştırıyor. Developer değişikliği yapıyor. QA sonucu bağımsız olarak kontrol ediyor. Rol adları örnek; her ekip farklı adlandırabilir.”

Adım 2 — QA: “QA iki yoldan birini açıyor: PASS ise iş tamamlanıyor, FAIL ise Developer'a geri dönüyor. QA'nın onayı ancak gerçek test ve inceleme kanıtına dayanıyorsa anlamlı.”

Adım 3 — Git: “Son durak Git: incelenebilir bir kayıt. Bu düzen hatayı sihirli biçimde önlemiyor; kimin neyi yaptığını ve neyin kontrol edildiğini görünür kılıyor.”

## Geçiş

“Bu rolleri gerçek bir çalışma ortamında bir araya getirince nasıl görünüyor?”
