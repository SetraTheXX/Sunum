import {
  AbsoluteFill,
  Composition,
  Sequence,
  Freeze,
  staticFile,
  useCurrentFrame,
  interpolate,
} from "remotion";
import { OffthreadVideo as Video } from "remotion";
type Cut = {
  start: number;
  duration: number;
  label: string;
  caption: string;
  crop: [number, number, number, number];
  mask?: number[][];
  freeze?: boolean;
};
export const cuts08: Cut[] = [
  {
    start: 2.5,
    duration: 5.5,
    label: "İSTEK",
    caption: "Kullanıcı, repoyu inceleyip sessiz bir Remotion sunumu istiyor.",
    crop: [750, 915, 740, 90],
  },
  {
    start: 13.9,
    duration: 5,
    freeze: true,
    label: "DEĞİŞİKLİK",
    caption:
      "Gerçek sonuç ekranında dosya düzenleme ve komut işlemi özetleniyor.",
    crop: [750, 185, 740, 110],
  },
  {
    start: 13.9,
    duration: 4,
    freeze: true,
    label: "KONTROL ÖZETİ",
    caption:
      "Ajan lint ve TypeScript kontrolünün geçtiğini bildiriyor. Bu, bağımsız test çıktısı değil.",
    crop: [750, 770, 740, 105],
    mask: [[350, 95, 1570, 145]],
  },
  {
    start: 19,
    duration: 10,
    label: "ÇIKTIYI İZLEME",
    caption:
      "Oluşturulan video açılıyor. Bu görüntü SecureCheck doğruluğunu kanıtlamaz.",
    crop: [0, 90, 1920, 900],
  },
];
export const cuts11: Cut[] = [
  {
    start: 0,
    duration: 5,
    label: "ROL AYARI",
    caption:
      "Lead, Developer ve QA rolleri. Kayıtta farklı model atamaları gösterilmiyor.",
    crop: [360, 100, 1540, 880],
  },
  {
    start: 12,
    duration: 6,
    label: "İSTEK",
    caption: "Kullanıcı, kısa bir uygulama geliştirme örneği istiyor.",
    crop: [360, 100, 1540, 880],
  },
  {
    start: 38,
    duration: 6,
    freeze: true,
    label: "LEAD → DEVELOPER · QA",
    caption: "Lead işi devrediyor; Developer ve QA paralel görevlendiriliyor.",
    crop: [425, 545, 520, 215],
  },
  {
    start: 43,
    duration: 5,
    freeze: true,
    label: "DEVELOPER",
    caption: "Developer tek dosyalık uygulamayı oluşturduğunu bildiriyor.",
    crop: [425, 275, 520, 195],
    mask: [[360, 0, 630, 265]],
  },
  {
    start: 49,
    duration: 3.5,
    freeze: true,
    label: "QA · İŞLEV KONTROLÜ",
    caption:
      "QA: ekleme, tamamlama, silme ve yenileme sonrası kalıcılık kontrolü.",
    crop: [435, 343, 505, 90],
  },
  {
    start: 49,
    duration: 3.5,
    freeze: true,
    label: "QA · KISIT",
    caption: "QA, panel gizli olduğu için ekran görüntüsü alınamadığını bildiriyor.",
    crop: [435, 489, 505, 60],
  },
  {
    start: 53,
    duration: 5,
    label: "UYGULAMA ÖNİZLEMESİ",
    caption:
      "Yerel uygulama görünümü. Bu örnek, sunum deposuna entegre edilmiş bir uygulama değil.",
    crop: [980, 165, 885, 850],
  },
];
const total = (cuts: Cut[]) =>
  Math.round(cuts.reduce((n, c) => n + c.duration, 0) * 30);
function Clip({ cut, file }: { cut: Cut; file: string }) {
  const frame = useCurrentFrame();
  const [x, y, w, h] = cut.crop;
  const scale =
    Math.min(1760 / w, 710 / h) *
    interpolate(frame, [0, 18], [0.98, 1], { extrapolateRight: "clamp" });
  const masks = [
    [0, 0, cut.label === "ÇIKTIYI İZLEME" ? 0 : 360, 1080],
    [0, 0, 1920, 90],
    [0, 1008, 1920, 72],
    ...(cut.mask ?? []),
  ];
  return (
    <AbsoluteFill
      style={{
        background: "#eef0e7",
        color: "#192c2a",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 32,
          left: 80,
          fontSize: 46,
          fontWeight: 700,
        }}
      >
        {file === "scene08.mp4"
          ? "Codex App · Tek ajan"
          : "Vi3ecode · Rol devri"}
      </div>
      <div
        style={{
          position: "absolute",
          top: 101,
          left: 80,
          fontSize: 27,
          fontWeight: 700,
        }}
      >
        {cut.label}
      </div>
      <div
        style={{
          position: "absolute",
          left: 80,
          top: 170,
          width: 1760,
          height: 710,
          overflow: "hidden",
          background: "#101515",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 1920,
            height: 1080,
            transformOrigin: "0 0",
            clipPath: `inset(${y}px ${1920-x-w}px ${1080-y-h}px ${x}px)`,
            transform: `translate(${(1760 - w * scale) / 2 - x * scale}px, ${(710 - h * scale) / 2 - y * scale}px) scale(${scale})`,
          }}
        >
          {cut.freeze ? <Freeze frame={0}>
          <Video
            src={staticFile(file)}
            trimBefore={Math.round(cut.start * 30)}
            muted
            style={{ width: 1920, height: 1080 }}
          />
          </Freeze> : (
          <Video
            src={staticFile(file)}
            trimBefore={Math.round(cut.start * 30)}
            muted
            style={{ width: 1920, height: 1080 }}
          />
          )}
          {masks.map(([mx, my, mw, mh], i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: mx,
                top: my,
                width: mw,
                height: mh,
                background: "#101515",
              }}
            />
          ))}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 80,
          top: 916,
          width: 1760,
          fontSize: 36,
          lineHeight: 1.25,
        }}
      >
        {cut.caption}
      </div>
      <div style={{ position: "absolute", left: 80, bottom: 20, fontSize: 24 }}>
        Gerçek oturumdan kısaltılmıştır · {cut.freeze ? "Odak için dondurulmuş gerçek kare" : "Kişisel ekran çevresi maskelenmiştir"}
      </div>
    </AbsoluteFill>
  );
}
function Replay({ cuts, file }: { cuts: Cut[]; file: string }) {
  let offset = 0;
  return (
    <>
      {cuts.map((cut, i) => {
        const from = offset;
        offset += Math.round(cut.duration * 30);
        return (
          <Sequence
            key={i}
            from={from}
            durationInFrames={Math.round(cut.duration * 30)}
          >
            <Clip cut={cut} file={file} />
          </Sequence>
        );
      })}
    </>
  );
}
export const MyComposition = () => (
  <>
    <Composition
      id="Scene08"
      component={Replay}
      defaultProps={{ cuts: cuts08, file: "scene08.mp4" }}
      durationInFrames={total(cuts08)}
      fps={30}
      width={1920}
      height={1080}
    />
    <Composition
      id="Scene11"
      component={Replay}
      defaultProps={{ cuts: cuts11, file: "scene11.mp4" }}
      durationInFrames={total(cuts11)}
      fps={30}
      width={1920}
      height={1080}
    />
  </>
);
