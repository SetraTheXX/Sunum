import type { CSSProperties } from 'react';

export interface ScreenshotMarker {
  caption: string;
  x: number;
  y: number;
}

interface ScreenshotAnnotationProps {
  src: string;
  alt: string;
  markers: readonly ScreenshotMarker[];
  caption?: string;
}

function percentage(value: number) {
  return `${Math.max(0, Math.min(100, value))}%`;
}

export function ScreenshotAnnotation({ src, alt, markers, caption }: ScreenshotAnnotationProps) {
  return (
    <figure className="screenshot-annotation">
      <div className="screenshot-annotation__canvas">
        <img src={src} alt={alt} />
        {markers.map((marker, index) => {
          const position: CSSProperties = { left: percentage(marker.x), top: percentage(marker.y) };
          const number = String(index + 1).padStart(2, '0');

          return (
            <span key={`${number}-${marker.caption}`} className="screenshot-annotation__marker" style={position} aria-hidden="true">
              {number}
            </span>
          );
        })}
      </div>
      {(caption || markers.length > 0) && (
        <figcaption className="screenshot-annotation__caption">
          {caption && <p>{caption}</p>}
          {markers.length > 0 && (
            <ol aria-label="Ekran görüntüsü açıklamaları">
              {markers.map((marker, index) => (
                <li key={`${index}-${marker.caption}`}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  {marker.caption}
                </li>
              ))}
            </ol>
          )}
        </figcaption>
      )}
    </figure>
  );
}

export type CodeDiffKind = 'context' | 'add' | 'remove';

export interface CodeDiffLine {
  kind: CodeDiffKind;
  text: string;
}

interface CodeDiffProps {
  lines: readonly CodeDiffLine[];
  label?: string;
}

const diffSigns: Record<CodeDiffKind, string> = {
  context: ' ',
  add: '+',
  remove: '−',
};

export function CodeDiff({ lines, label = 'Kod değişikliği' }: CodeDiffProps) {
  return (
    <figure className="code-diff" aria-label={label}>
      <pre><code>{lines.map((line, index) => (
        <span key={`${index}-${line.kind}`} className={`code-diff__line code-diff__line--${line.kind}`}>
          <span className="code-diff__sign" aria-hidden="true">{diffSigns[line.kind]}</span>
          <span>{line.text || ' '}</span>
        </span>
      ))}</code></pre>
    </figure>
  );
}

interface RoleBadgeProps {
  label: string;
  tone?: 'neutral' | 'accent';
}

export function RoleBadge({ label, tone = 'neutral' }: RoleBadgeProps) {
  return <span className={`role-badge role-badge--${tone}`}>{label}</span>;
}
