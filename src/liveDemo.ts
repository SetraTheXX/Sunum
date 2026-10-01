// Live demo targets (demo/README.md): served locally by demo/serve.ps1, edited by an agent during Scene 05/08/11.
// Scene 05 and 08 share demo/app (made, then checked); Scene 11 runs the same task from the start in demo/app-team.
// Presenter-only: the audience view never shows this. The scene video stays the fallback.
interface LiveDemo {
  tool: string;
  url: string;
}

const liveDemos: Partial<Record<number, LiveDemo>> = {
  5: { tool: 'Codex CLI · üretim', url: 'http://localhost:5500/' },
  8: { tool: 'Codex App · kontrol', url: 'http://localhost:5500/' },
  11: { tool: 'Vi3ecode · rol devri', url: 'http://localhost:5501/' },
};

export function getLiveDemo(sceneNumber: number) {
  return liveDemos[sceneNumber];
}
