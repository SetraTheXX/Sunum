import type { Scene } from "./content";
export type Replay = {
  id: string;
  title: string;
  tool: string;
  duration: number;
  src: string;
  chapters: { start: number; label: string }[];
};
const replays: Record<number, Replay> = {
  8: {
    id: "codex-app-real",
    title: "Codex App · Tek ajan",
    tool: "Codex App",
    duration: 24.5,
    src: new URL("../assets/replays/scene08-real-final-20261002.mp4", import.meta.url)
      .href,
    chapters: [
      { start: 0, label: "İstek" },
      { start: 5.5, label: "Değişiklik" },
      { start: 10.5, label: "Kontrol özeti" },
      { start: 14.5, label: "Çıktıyı izleme" },
    ],
  },
  11: {
    id: "vi3ecode-real",
    title: "Vi3ecode · Rol devri",
    tool: "Vi3ecode",
    duration: 34,
    src: new URL("../assets/replays/scene11-real-readable-20261002.mp4", import.meta.url)
      .href,
    chapters: [
      { start: 0, label: "Roller" },
      { start: 5, label: "İstek" },
      { start: 11, label: "Lead" },
      { start: 17, label: "Developer" },
      { start: 22, label: "QA kontrol" },
      { start: 25.5, label: "QA kısıt" },
      { start: 29, label: "Önizleme" },
    ],
  },
};
export function getReplay(number: number): Replay | undefined {
  return replays[number];
}
export function withReplayStep(scene: Scene): Scene {
  return getReplay(scene.number)
    ? {
        ...scene,
        screenSteps: [
          ...scene.screenSteps,
          "GERÇEK KAYIT · REPLAY",
        ],
      }
    : scene;
}
