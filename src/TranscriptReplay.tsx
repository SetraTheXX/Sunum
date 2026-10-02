import { useEffect, useRef, useState } from "react";
import type { Replay } from "./replays";
export default function TranscriptReplay({ replay }: { replay: Replay }) {
  const ref = useRef<HTMLVideoElement>(null);
  const userInteracted = useRef(false);
  const [index, setIndex] = useState(replay.chapters.length - 1);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  function toggle() {
    const video = ref.current;
    if (!video) return;
    userInteracted.current = true;
    if (video.paused) {
      if (video.currentTime >= replay.duration - 0.2) video.currentTime = 0;
      void video.play().catch((error: unknown) => {
        // Pause, seek or unmount can intentionally cancel a pending play request.
        if (!(error instanceof DOMException && error.name === 'AbortError')) setFailed(true);
      });
    } else video.pause();
  }
  function seek(next: number) {
    const video = ref.current;
    if (!video) return;
    userInteracted.current = true;
    video.pause();
    video.currentTime = replay.chapters[next].start;
    setIndex(next);
  }
  useEffect(() => {
    const video = ref.current;
    return () => {
      video?.pause();
    };
  }, []);
  useEffect(() => {
    function key(event: KeyboardEvent) {
      if (event.ctrlKey || event.metaKey || event.altKey) return;
      const target = event.target;
      if (target instanceof HTMLElement && target.closest('button') && !target.closest('.transcript-replay')) return;
      if (
        target instanceof HTMLElement &&
        target.closest(".scene-link,a,input,textarea,select,summary")
      )
        return;
      const handled =
        event.key === " " ||
        (event.key === "ArrowLeft" && index > 0) ||
        (event.key === "ArrowRight" && index < replay.chapters.length - 1);
      if (!handled) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      if (event.repeat) return;
      if (event.key === " ") toggle();
      else seek(index + (event.key === "ArrowRight" ? 1 : -1));
    }
    window.addEventListener("keydown", key, true);
    return () => window.removeEventListener("keydown", key, true);
  });
  return (
    <figure
      className="transcript-replay"
      data-event={index}
      data-playing={playing}
    >
      <figcaption className="replay-heading">
        <span>
          <strong>{replay.title}</strong>
          <small>{replay.duration} sn · Yerel ekran kaydı</small>
        </span>
        <button onClick={toggle}>{playing ? "DURAKLAT" : "OYNAT"}</button>
      </figcaption>
      <div className="replay-track">
        {replay.chapters.map((chapter, i) => (
          <button
            key={i}
            aria-current={index === i ? "step" : undefined}
            onClick={() => seek(i)}
          >
            {i + 1} · {chapter.label}
          </button>
        ))}
      </div>
      <video
        className="replay-player"
        ref={ref}
        src={replay.src}
        muted
        playsInline
        preload="metadata"
        onLoadedMetadata={() => {
          if (ref.current && !userInteracted.current)
            ref.current.currentTime = Math.max(0, replay.duration - 0.1);
        }}
        onPlay={() => { userInteracted.current = true; setPlaying(true); }}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onError={() => setFailed(true)}
        onTimeUpdate={() => {
          const time = ref.current?.currentTime ?? 0;
          setIndex(
            replay.chapters.reduce(
              (last, c, i) => (c.start <= time ? i : last),
              0,
            ),
          );
        }}
      />
      <p className="replay-source">
        Gerçek oturumdan kısaltılmıştır · {replay.tool} ·{" "}
        {failed
          ? "Video açılamadı: bölümleri konuşma notuyla anlatın."
          : "Kişisel bilgiler maskelendi; kayıtta olmayan sonuç eklenmedi."}
      </p>
      <p className="replay-controls">
        <kbd>Space</kbd> oynat / duraklat · <kbd>←</kbd> <kbd>→</kbd> kayıt
        bölümleri · uçlarda sunuma devam
      </p>
    </figure>
  );
}
