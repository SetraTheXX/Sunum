import { useEffect, useState } from 'react';
import { scenesForMode, type Scene } from './content';

type Mode = 30 | 45 | 60;

function readMode(): Mode {
  const value = Number(new URLSearchParams(window.location.search).get('mode'));
  return value === 45 || value === 60 ? value : 30;
}

function readSceneIndex(routeLength: number): number {
  const value = Number(new URLSearchParams(window.location.search).get('scene'));
  return Number.isInteger(value) && value >= 1 && value <= routeLength ? value - 1 : 0;
}

function readStep(scene: Scene): number {
  const value = Number(new URLSearchParams(window.location.search).get('step'));
  if (!Number.isInteger(value) || value < 1) return Math.min(1, scene.screenSteps.length);
  return Math.min(value, scene.screenSteps.length);
}

function writeLocation(mode: Mode, sceneIndex: number, step: number) {
  const url = new URL(window.location.href);
  url.searchParams.set('mode', String(mode));
  url.searchParams.set('scene', String(sceneIndex + 1));
  url.searchParams.set('step', String(step));
  window.history.replaceState({}, '', url);
}

function startingStep(scene: Scene) {
  return Math.min(1, scene.screenSteps.length);
}

export default function App() {
  const [mode, setMode] = useState<Mode>(readMode);
  const [sceneIndex, setSceneIndex] = useState(() => readSceneIndex(scenesForMode(readMode()).length));
  const [visibleSteps, setVisibleSteps] = useState(() => {
    const initialMode = readMode();
    const initialRoute = scenesForMode(initialMode);
    return readStep(initialRoute[readSceneIndex(initialRoute.length)]);
  });
  const routeScenes = scenesForMode(mode);
  const currentScene = routeScenes[sceneIndex];
  const progress = ((sceneIndex + 1) / routeScenes.length) * 100;

  function selectScene(nextIndex: number, step?: number) {
    const boundedIndex = Math.max(0, Math.min(routeScenes.length - 1, nextIndex));
    const requestedStep = step ?? startingStep(routeScenes[boundedIndex]);
    const boundedStep = Math.max(0, Math.min(routeScenes[boundedIndex].screenSteps.length, requestedStep));
    setSceneIndex(boundedIndex);
    setVisibleSteps(boundedStep);
    writeLocation(mode, boundedIndex, boundedStep);
  }

  function selectMode(nextMode: Mode) {
    const nextRoute = scenesForMode(nextMode);
    const matchingIndex = nextRoute.findIndex((scene) => scene.number === currentScene.number);
    const nextIndex = matchingIndex >= 0 ? matchingIndex : Math.min(sceneIndex, nextRoute.length - 1);
    const nextStep = Math.min(visibleSteps, nextRoute[nextIndex].screenSteps.length);
    setMode(nextMode);
    setSceneIndex(nextIndex);
    setVisibleSteps(nextStep);
    writeLocation(nextMode, nextIndex, nextStep);
  }

  function next() {
    if (visibleSteps < currentScene.screenSteps.length) {
      const nextStep = visibleSteps + 1;
      setVisibleSteps(nextStep);
      writeLocation(mode, sceneIndex, nextStep);
      return;
    }
    if (sceneIndex < routeScenes.length - 1) selectScene(sceneIndex + 1);
  }

  function previous() {
    if (visibleSteps > startingStep(currentScene)) {
      const previousStep = visibleSteps - 1;
      setVisibleSteps(previousStep);
      writeLocation(mode, sceneIndex, previousStep);
      return;
    }
    if (sceneIndex > 0) {
      const previousSceneIndex = sceneIndex - 1;
      selectScene(previousSceneIndex, routeScenes[previousSceneIndex].screenSteps.length);
    }
  }

  function resetScene() {
    const step = startingStep(currentScene);
    setVisibleSteps(step);
    writeLocation(mode, sceneIndex, step);
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const target = event.target;
      if (
        target instanceof HTMLElement &&
        target.closest('button, a, input, select, textarea, summary, [role="button"], [contenteditable="true"]')
      ) {
        return;
      }

      if (event.key === 'ArrowRight' || event.key === ' ') {
        event.preventDefault();
        next();
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        previous();
      } else if (event.key.toLowerCase() === 'j') {
        event.preventDefault();
        if (sceneIndex < routeScenes.length - 1) selectScene(sceneIndex + 1);
      } else if (event.key.toLowerCase() === 'k') {
        event.preventDefault();
        if (sceneIndex > 0) selectScene(sceneIndex - 1);
      } else if (event.key.toLowerCase() === 'r') {
        event.preventDefault();
        resetScene();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mode, sceneIndex, visibleSteps, currentScene]);

  async function toggleFullscreen() {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else if (document.fullscreenEnabled) {
        await document.documentElement.requestFullscreen();
      }
    } catch {
      // Embedded browser panels may block fullscreen requests.
    }
  }

  return (
    <div className="presentation-shell">
      <aside className="scene-rail" aria-label="Sahne indeksi">
        <a className="wordmark" href="/?mode=30" aria-label="Sunum başına dön">
          <span className="wordmark-mark" aria-hidden="true">S</span>
          <span>MODEL DEĞİL,<br />SİSTEM.</span>
        </a>

        <div className="mode-picker" aria-label="Sunum süresi modu">
          <span className="eyebrow">ROTA</span>
          <div className="mode-options">
            {([30, 45, 60] as const).map((option) => (
              <button
                key={option}
                type="button"
                className={`mode-option${mode === option ? ' is-selected' : ''}`}
                aria-pressed={mode === option}
                onClick={() => selectMode(option)}
              >
                {option}<span>dk</span>
              </button>
            ))}
          </div>
          {mode !== 30 && (
            <p className="mode-note" role="status">
              {mode} dk ek içerikleri henüz hazır değil. Şimdilik 30 dk çekirdek rota gösteriliyor.
            </p>
          )}
        </div>

        <nav className="scene-list" aria-label="Sahneler">
          <div className="scene-list-heading">
            <span className="eyebrow">İÇİNDEKİLER</span>
            <span>{routeScenes.length}</span>
          </div>
          {routeScenes.map((scene, index) => (
            <button
              key={scene.number}
              type="button"
              className={`scene-link${index === sceneIndex ? ' is-active' : ''}`}
              aria-current={index === sceneIndex ? 'step' : undefined}
              onClick={() => selectScene(index)}
            >
              <span className="scene-link-number">{String(scene.number).padStart(2, '0')}</span>
              <span className="scene-link-title">{scene.title}</span>
              <span className="scene-link-time">{scene.duration}</span>
            </button>
          ))}
        </nav>

        <div className="rail-footer" aria-label="Klavye ipuçları">
          <span><kbd>→</kbd> adım</span>
          <span><kbd>J</kbd> sahne</span>
          <span><kbd>R</kbd> baştan</span>
        </div>
      </aside>

      <main className="stage" aria-labelledby="scene-title">
        <header className="stage-header">
          <div className="route-label">
            <span className="route-dot" aria-hidden="true" />
            30 DAKİKALIK ÇEKİRDEK ROTA
          </div>
          <div className="stage-header-actions">
            <span className="stage-counter">{String(sceneIndex + 1).padStart(2, '0')} / {String(routeScenes.length).padStart(2, '0')}</span>
            <button className="icon-button" type="button" onClick={() => void toggleFullscreen()} aria-label="Tam ekranı aç veya kapat" title="Tam ekran">
              <span aria-hidden="true">⛶</span>
            </button>
          </div>
        </header>

        <div className="progress-track" role="progressbar" aria-label="Sahne ilerlemesi" aria-valuemin={1} aria-valuemax={routeScenes.length} aria-valuenow={sceneIndex + 1}>
          <span style={{ width: `${progress}%` }} />
        </div>

        <section className="scene-stage" key={currentScene.number}>
          <div className="scene-meta">
            <span className="eyebrow">SAHNE {String(currentScene.number).padStart(2, '0')}</span>
            <span className="scene-duration">{currentScene.duration}</span>
          </div>
          <h1 id="scene-title">{currentScene.title}</h1>
          <p className="scene-takeaway">{currentScene.takeaway}</p>

          <div className="screen-content" aria-live="polite" aria-label="Açılan sunum adımları">
            <div className="screen-content-heading">
              <span className="eyebrow">EKRANDA</span>
              <span className="step-counter">{visibleSteps} / {currentScene.screenSteps.length} adım</span>
            </div>
            <ol className="reveal-list">
              {currentScene.screenSteps.slice(0, visibleSteps).map((step, index) => (
                <li key={`${currentScene.number}-${index}`} className={index === visibleSteps - 1 ? 'is-current' : ''}>
                  <span className="reveal-index">{String(index + 1).padStart(2, '0')}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            {visibleSteps < currentScene.screenSteps.length ? (
              <p className="next-hint">Devam etmek için <kbd>→</kbd> veya <kbd>Space</kbd></p>
            ) : sceneIndex < routeScenes.length - 1 ? (
              <p className="next-hint">Sonraki sahne için <kbd>→</kbd> veya <kbd>Space</kbd></p>
            ) : (
              <p className="next-hint is-finale">30 dakikalık rota tamamlandı.</p>
            )}
          </div>

          <details className="speaker-notes">
            <summary>Sunucu notları</summary>
            <div className="notes-body">
              {currentScene.purpose && <p className="purpose-note"><strong>Amaç:</strong> {currentScene.purpose}</p>}
              {currentScene.speakerNotes.map((note, index) => <p key={index}>{note}</p>)}
              {currentScene.transition && <p><strong>Geçiş:</strong> {currentScene.transition}</p>}
            </div>
          </details>
        </section>

        <footer className="stage-footer">
          <div className="keyboard-legend">
            <span><kbd>←</kbd> geri</span>
            <span><kbd>→</kbd> ilerle / aç</span>
            <span><kbd>J</kbd> sonraki sahne</span>
            <span><kbd>K</kbd> önceki sahne</span>
            <span><kbd>R</kbd> sahneyi sıfırla</span>
          </div>
          <div className="stage-actions">
            <button className="nav-button" type="button" onClick={previous} disabled={sceneIndex === 0 && visibleSteps <= startingStep(currentScene)}>
              <span aria-hidden="true">←</span> Geri
            </button>
            <button className="nav-button nav-button-primary" type="button" onClick={next} disabled={sceneIndex === routeScenes.length - 1 && visibleSteps >= currentScene.screenSteps.length}>
              {visibleSteps < currentScene.screenSteps.length ? 'Adımı aç' : 'Sonraki sahne'} <span aria-hidden="true">→</span>
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
}
