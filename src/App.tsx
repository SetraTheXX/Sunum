import { Fragment, useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { scenes, type Scene } from './content';
import SceneVisual from './SceneVisual';
import { getSceneVideo, withVideoStep } from './sceneVideos';
import { getLiveDemo } from './liveDemo';

const routeScenes = scenes.map(withVideoStep);
// Every scene uses the bold entrance (kinetic title + visual entrance) when entered forward.
const kineticScenes = new Set(scenes.map((scene) => scene.number));
const notesStorageKey = 'sunum-notes-open';

function readAudienceMode(): boolean {
  return new URLSearchParams(window.location.search).get('view') === 'audience';
}

function writeAudienceMode(enabled: boolean) {
  const url = new URL(window.location.href);
  if (enabled) url.searchParams.set('view', 'audience');
  else url.searchParams.delete('view');
  window.history.replaceState({}, '', url);
}

// Older links carried ?mode=30/45/60; the final deck has one route, so the parameter is dropped.
function normalizeLegacyMode() {
  const url = new URL(window.location.href);
  if (!url.searchParams.has('mode')) return;
  url.searchParams.delete('mode');
  window.history.replaceState({}, '', url);
}

function readNotesOpen(): boolean {
  try {
    return window.localStorage.getItem(notesStorageKey) === '1';
  } catch {
    return false;
  }
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

function writeLocation(sceneIndex: number, step: number) {
  const url = new URL(window.location.href);
  url.searchParams.delete('mode');
  url.searchParams.set('scene', String(sceneIndex + 1));
  url.searchParams.set('step', String(step));
  window.history.replaceState({}, '', url);
}

function startingStep(scene: Scene) {
  return Math.min(1, scene.screenSteps.length);
}

export default function App() {
  const [audienceMode, setAudienceMode] = useState(readAudienceMode);
  const audienceModeRef = useRef(audienceMode);
  const videoPlayerRef = useRef<HTMLVideoElement | null>(null);
  const [sceneIndex, setSceneIndex] = useState(() => readSceneIndex(routeScenes.length));
  const [visibleSteps, setVisibleSteps] = useState(() => readStep(routeScenes[readSceneIndex(routeScenes.length)]));
  const [notesOpen, setNotesOpen] = useState(readNotesOpen);
  const [demoCopied, setDemoCopied] = useState(false);
  // Set only when a later scene is entered forward at its first reveal (→, J, scene list);
  // going back (K, ←, earlier scene in the list), any step, R or reload clears it.
  const [sceneEntry, setSceneEntry] = useState(false);
  const currentScene = routeScenes[sceneIndex];
  const isVideoReveal = Boolean(getSceneVideo(currentScene.number) && visibleSteps >= currentScene.screenSteps.length);
  const liveDemo = getLiveDemo(currentScene.number);
  const isLastState = sceneIndex === routeScenes.length - 1 && visibleSteps >= currentScene.screenSteps.length;
  const progress = ((sceneIndex + 1) / routeScenes.length) * 100;

  useEffect(() => {
    normalizeLegacyMode();
  }, []);

  function updateNotesOpen(open: boolean) {
    setNotesOpen(open);
    try {
      window.localStorage.setItem(notesStorageKey, open ? '1' : '0');
    } catch {
      // Notes still toggle for this session when storage is unavailable.
    }
  }

  function updateAudienceMode(enabled: boolean) {
    audienceModeRef.current = enabled;
    setAudienceMode(enabled);
    writeAudienceMode(enabled);
  }

  function selectScene(nextIndex: number, step?: number) {
    const boundedIndex = Math.max(0, Math.min(routeScenes.length - 1, nextIndex));
    const requestedStep = step ?? startingStep(routeScenes[boundedIndex]);
    const boundedStep = Math.max(0, Math.min(routeScenes[boundedIndex].screenSteps.length, requestedStep));
    setSceneIndex(boundedIndex);
    setVisibleSteps(boundedStep);
    setSceneEntry(boundedIndex > sceneIndex && boundedStep === startingStep(routeScenes[boundedIndex]));
    writeLocation(boundedIndex, boundedStep);
  }

  function next() {
    if (visibleSteps < currentScene.screenSteps.length) {
      const nextStep = visibleSteps + 1;
      setSceneEntry(false);
      setVisibleSteps(nextStep);
      writeLocation(sceneIndex, nextStep);
      return;
    }
    if (sceneIndex < routeScenes.length - 1) selectScene(sceneIndex + 1);
  }

  function previous() {
    if (visibleSteps > startingStep(currentScene)) {
      const previousStep = visibleSteps - 1;
      setSceneEntry(false);
      setVisibleSteps(previousStep);
      writeLocation(sceneIndex, previousStep);
      return;
    }
    if (sceneIndex > 0) {
      const previousSceneIndex = sceneIndex - 1;
      selectScene(previousSceneIndex, routeScenes[previousSceneIndex].screenSteps.length);
    }
  }

  function resetScene() {
    const step = startingStep(currentScene);
    setSceneEntry(false);
    setVisibleSteps(step);
    writeLocation(sceneIndex, step);
  }

  async function copyDemoUrl(url: string) {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // Clipboard API unavailable: fall back to a temporary selection.
      const field = document.createElement('textarea');
      field.value = url;
      document.body.append(field);
      field.select();
      document.execCommand('copy');
      field.remove();
    }
    setDemoCopied(true);
  }

  useEffect(() => setDemoCopied(false), [sceneIndex, visibleSteps]);

  async function toggleAudienceMode() {
    const entering = !audienceModeRef.current;
    updateAudienceMode(entering);
    try {
      if (entering && !document.fullscreenElement && document.fullscreenEnabled) {
        await document.documentElement.requestFullscreen();
      } else if (!entering && document.fullscreenElement) {
        await document.exitFullscreen();
      }
    } catch {
      // Keep the CSS audience view when an embedded browser blocks native fullscreen.
    }
  }

  useEffect(() => {
    function handleFullscreenChange() {
      if (!document.fullscreenElement && audienceModeRef.current) updateAudienceMode(false);
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const target = event.target;
      const isVideoArea = target instanceof HTMLElement && Boolean(target.closest('.scene-video-reveal'));
      const isVideoNavigationKey = isVideoArea && (event.key === 'ArrowRight' || event.key === 'ArrowLeft');
      // Focus stays on a scene-list button after a click; route keys still drive the deck from there.
      // Space and Enter keep their native button behaviour.
      // The live demo buttons behave the same way, so the deck keeps moving after "Aç" or "Kopyala".
      const isRouteKeyButton = target instanceof HTMLElement && Boolean(target.closest('.scene-link, .live-demo-bar'));
      const isRouteKey = isRouteKeyButton
        && !event.ctrlKey && !event.metaKey && !event.altKey
        && ['ArrowRight', 'ArrowLeft', 'j', 'k', 'r'].includes(event.key.length === 1 ? event.key.toLowerCase() : event.key);
      if (audienceMode && event.key === 'Escape') {
        event.preventDefault();
        void toggleAudienceMode();
        return;
      }
      // Space on a focused scene-list button keeps its native "select scene" click, even on a video step.
      // On the live demo bar Space still plays the fallback video.
      const isSceneLink = target instanceof HTMLElement && Boolean(target.closest('.scene-link'));
      if (isVideoReveal && event.key === ' ' && !isSceneLink) {
        event.preventDefault();
        if (event.repeat) return;
        const player = videoPlayerRef.current;
        if (player) {
          if (player.paused) {
            if (player.ended) player.currentTime = 0;
            void player.play().catch(() => undefined);
          } else {
            player.pause();
          }
        }
        return;
      }
      if (
        target instanceof HTMLElement &&
        target.closest('button, a, input, select, textarea, summary, [role="button"], [contenteditable="true"]')
        && !(audienceMode && target.closest('.audience-exit'))
        && !isVideoNavigationKey
        && !isRouteKey
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
  }, [sceneIndex, visibleSteps, currentScene, audienceMode, isVideoReveal]);

  return (
    <div className={`presentation-shell${audienceMode ? ' is-audience-mode' : ''}`}>
      <aside className="scene-rail" aria-label="Sahne listesi">
        <a className="wordmark" href="/" aria-label="Sunum başına dön">
          <span className="wordmark-mark" aria-hidden="true">S</span>
          <span>MODEL DEĞİL,<br />SİSTEM.</span>
        </a>

        <nav className="scene-list" aria-label="Sahneler">
          <span className="eyebrow scene-list-heading">SAHNELER</span>
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
              {getSceneVideo(scene.number) && <span className="scene-link-video" title="Video içerir" aria-label="video içerir">▶</span>}
            </button>
          ))}
        </nav>
      </aside>

      <main className="stage" aria-labelledby="scene-title">
        <header className="stage-header">
          <div className="route-label">
            <span className="route-dot" aria-hidden="true" />
            SUNUM AKIŞI
          </div>
          <div className="stage-header-actions">
            <span className="stage-counter">{String(sceneIndex + 1).padStart(2, '0')} / {String(routeScenes.length).padStart(2, '0')}</span>
            <button className="fullscreen-button" type="button" onClick={() => void toggleAudienceMode()} aria-pressed={audienceMode} title="Tam ekran sunum · Esc ile çık">
              <span aria-hidden="true">⛶</span> Tam ekran
            </button>
          </div>
        </header>

        <div className="progress-track" role="progressbar" aria-label="Sahne ilerlemesi" aria-valuemin={1} aria-valuemax={routeScenes.length} aria-valuenow={sceneIndex + 1}>
          <span style={{ width: `${progress}%` }} />
        </div>

        <section className={`scene-stage scene-stage--${String(currentScene.number).padStart(2, '0')}${isVideoReveal ? ' scene-stage--video' : ''}`} key={currentScene.number}>
          <div className="scene-meta">
            <span className="eyebrow">SAHNE {String(currentScene.number).padStart(2, '0')}</span>
            {audienceMode && (
              <span className="audience-scene-index">{String(sceneIndex + 1).padStart(2, '0')} / {String(routeScenes.length).padStart(2, '0')}</span>
            )}
            {audienceMode && (currentScene.number === 1 || currentScene.number === 12) && (
              <span className="audience-scene-title">{currentScene.number === 1 ? 'Açılış' : 'Final'}</span>
            )}
          </div>
          {kineticScenes.has(currentScene.number) ? (
            <h1
              id="scene-title"
              className={`kinetic-title${sceneEntry ? ' motion-title-enter' : ''}`}
              style={{ '--stagger': `${Math.min(90, 280 / Math.max(1, currentScene.title.split(' ').length - 1))}ms` } as CSSProperties}
            >
              {currentScene.title.split(' ').map((word, index) => (
                <Fragment key={index}>
                  {index > 0 && ' '}
                  <span style={{ '--word': index } as CSSProperties}>{word}</span>
                </Fragment>
              ))}
            </h1>
          ) : (
            <h1 id="scene-title">{currentScene.title}</h1>
          )}
          <p className="scene-takeaway">{currentScene.takeaway}</p>

          <div className="screen-content" aria-live="polite" aria-label="Ekrandaki içerik">
            <div className="screen-content-heading">
              <span className="eyebrow">EKRANDA</span>
              <span className="step-counter">{isVideoReveal ? 'Video' : `Adım ${visibleSteps} / ${currentScene.screenSteps.length}`}</span>
            </div>
            <SceneVisual scene={currentScene} visibleSteps={visibleSteps} videoPlayerRef={videoPlayerRef} sceneEntry={sceneEntry && kineticScenes.has(currentScene.number)} />
            {isVideoReveal && !audienceMode && liveDemo && (
              <aside className="live-demo-bar" aria-label="Canlı demo">
                <span className="live-demo-kicker">CANLI DEMO</span>
                <span className="live-demo-tool">{liveDemo.tool}</span>
                <code className="live-demo-url">{liveDemo.url}</code>
                <button type="button" className="live-demo-action" onClick={() => window.open(liveDemo.url, '_blank', 'noopener')}>Aç</button>
                <button type="button" className="live-demo-action" onClick={() => void copyDemoUrl(liveDemo.url)} aria-live="polite">{demoCopied ? 'Kopyalandı' : 'Kopyala'}</button>
                <span className="live-demo-fallback">Aksarsa: sunuma dön → <kbd>Space</kbd> · klip bitince <kbd>→</kbd></span>
              </aside>
            )}
            {isVideoReveal ? (
              <p className="next-hint"><kbd>Space</kbd> videoyu oynatır / duraklatır · <kbd>→</kbd> sonraki sahne</p>
            ) : visibleSteps < currentScene.screenSteps.length ? (
              <p className="next-hint"><kbd>→</kbd> sonraki adım</p>
            ) : !isLastState ? (
              <p className="next-hint"><kbd>→</kbd> sonraki sahne</p>
            ) : (
              <p className="next-hint is-finale">Sunumun sonu.</p>
            )}
          </div>

          <details className="speaker-notes" open={notesOpen} onToggle={(event) => updateNotesOpen(event.currentTarget.open)}>
            <summary>Konuşmacı notları</summary>
            <div className="notes-body">
              {currentScene.purpose && <p className="notes-lead"><strong>Ana fikir:</strong> {currentScene.purpose}</p>}
              {currentScene.speakerNotes.map((note, index) => <p key={index}>{note}</p>)}
              {currentScene.videoNotes.length > 0 && (
                <div className="notes-video">
                  <strong className="notes-label">Video</strong>
                  {currentScene.videoNotes.map((note, index) => <p key={index}>{note}</p>)}
                </div>
              )}
              {currentScene.liveDemo.length > 0 && (
                <div className="notes-video notes-live-demo">
                  <strong className="notes-label">Canlı demo</strong>
                  {currentScene.liveDemo.map((note, index) => <p key={index}>{note}</p>)}
                </div>
              )}
              {currentScene.transition && <p className="notes-transition"><strong>Geçiş:</strong> {currentScene.transition}</p>}
            </div>
          </details>
        </section>

        <footer className="stage-footer">
          <div className="keyboard-legend" aria-label="Klavye kısayolları">
            <span><kbd>←</kbd><kbd>→</kbd> adım</span>
            <span><kbd>J</kbd><kbd>K</kbd> sahne</span>
            <span><kbd>R</kbd> sahne başı</span>
            <span><kbd>Space</kbd> video</span>
            <span><kbd>Esc</kbd> tam ekrandan çık</span>
          </div>
          <div className="stage-actions">
            <button className="nav-button" type="button" onClick={previous} disabled={sceneIndex === 0 && visibleSteps <= startingStep(currentScene)}>
              <span aria-hidden="true">←</span> Geri
            </button>
            <button className="nav-button nav-button-primary" type="button" onClick={next} disabled={isLastState}>
              {visibleSteps < currentScene.screenSteps.length ? 'Sonraki adım' : 'Sonraki sahne'} <span aria-hidden="true">→</span>
            </button>
          </div>
        </footer>
      </main>
      {audienceMode && (
        <button
          className="audience-exit"
          type="button"
          aria-label="Tam ekrandan çık (Esc)"
          title="Tam ekrandan çık · Esc"
          onClick={() => void toggleAudienceMode()}
        >
          <span aria-hidden="true">ESC</span>
        </button>
      )}
    </div>
  );
}
