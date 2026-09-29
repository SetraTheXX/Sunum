import type { Scene } from './content';

export interface SceneVideo {
  src: string;
  poster: string;
  kicker: string;
  duration: string;
}

export const sceneVideos: Partial<Record<number, SceneVideo>> = {
  4: {
    src: new URL('../assets/video-drafts/scene-04-chatbot-final-20260928.mp4', import.meta.url).href,
    poster: new URL('../assets/video-posters/scene-04-chatbot-poster.png', import.meta.url).href,
    kicker: 'SOHBET · KOD ELLE TAŞINIR',
    duration: '21 SN',
  },
  5: {
    src: new URL('../assets/video-drafts/scene-05-codex-cli-draft-20260928.mp4', import.meta.url).href,
    poster: new URL('../assets/video-posters/scene-05-codex-cli-poster.png', import.meta.url).href,
    kicker: 'TERMİNALDE AJAN · İSTEKTEN SAYFAYA',
    duration: '23 SN',
  },
  8: {
    src: new URL('../assets/video-drafts/scene-08-codex-app-draft-20260928.mp4', import.meta.url).href,
    poster: new URL('../assets/video-posters/scene-08-codex-app-poster.png', import.meta.url).href,
    kicker: 'MASAÜSTÜ AJAN · GÖREV → ÖZET',
    duration: '42 SN',
  },
  11: {
    src: new URL('../assets/video-drafts/scene-11-vi3ecode-draft-20260928.mp4', import.meta.url).href,
    poster: new URL('../assets/video-posters/scene-11-vi3ecode-poster.png', import.meta.url).href,
    kicker: 'AJAN TAKIMI · ROLLER → GÖREV → QA',
    duration: '62 SN',
  },
};

export function getSceneVideo(sceneNumber: number) {
  return sceneVideos[sceneNumber];
}

export function withVideoStep(scene: Scene): Scene {
  const video = getSceneVideo(scene.number);
  return video
    ? { ...scene, screenSteps: [...scene.screenSteps, video.kicker] }
    : scene;
}
