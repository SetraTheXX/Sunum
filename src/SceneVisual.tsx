import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { CSSProperties, RefObject } from 'react';
import type { Scene } from './content';
import { getSceneVideo } from './sceneVideos';
import { enterClass, prefersReducedMotion, useBoxMorph, useDepthShift, useEnteringReveal } from './motion';
import { useSceneMotion } from './sceneMotion';

interface SceneVisualProps {
  scene: Scene;
  visibleSteps: number;
  videoPlayerRef: RefObject<HTMLVideoElement | null>;
  /** True when the scene was just entered at its first reveal by navigation (not reload). */
  sceneEntry?: boolean;
}

function removeLabel(text: string, label: string) {
  return text.replace(new RegExp(`^${label}:\\s*`), '');
}

function unquote(text: string) {
  return text.replace(/^[“"]|[”"]$/g, '');
}

function quotedText(text: string) {
  return text.match(/[“"](.+?)[”"]/u)?.[1] ?? text;
}

function OpeningVisual({ steps }: { steps: string[] }) {
  const question = steps.find((step) => step.startsWith('Büyük soru:'));
  const request = steps.find((step) => step.startsWith('Ardından tek istek:'));
  const sequence = steps.find((step) => step.startsWith('Basit sıra:'));
  const caution = steps.find((step) => step.startsWith('Alt mesaj:'));

  const questionText = question ? quotedText(removeLabel(question, 'Büyük soru')) : '';
  const requestText = request ? quotedText(removeLabel(request, 'Ardından tek istek')) : '';
  const sequenceParts = sequence ? removeLabel(sequence, 'Basit sıra').split(/\s*→\s*/).filter(Boolean) : [];
  const cautionText = caution ? removeLabel(caution, 'Alt mesaj') : '';
  const cautionQuestions = [...cautionText.matchAll(/[“"](.+?)[”"]/gu)].map((match) => match[1]);

  return (
    <div className={`opening-audience opening-audience--${steps.length}`} data-reveal={steps.length}>
      <div className="opening-audience-main">
        <div className="opening-audience-story">
          {questionText && (
            <blockquote className="opening-audience-question">
              <span className="primitive-label">AÇILIŞ SORUSU</span>
              <p>{questionText}</p>
            </blockquote>
          )}
          {requestText && (
            <div className="opening-audience-request">
              <span className="primitive-label">İSTEK</span>
              <p>{requestText}</p>
            </div>
          )}
          {cautionQuestions.length === 2 && (
            <div className="opening-audience-check" aria-label="Çalışma sonucu ve güvenilirliği için iki ayrı soru">
              {cautionQuestions.map((text, index) => (
                <div className="opening-audience-check-item" key={text}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <p>{text.charAt(0).toLocaleUpperCase('tr-TR') + text.slice(1)}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        <svg className="opening-audience-form" viewBox="0 0 600 520" role="img" aria-labelledby="opening-form-title opening-form-description">
          <title id="opening-form-title">Kavramsal yapım iskeleti</title>
          <desc id="opening-form-description">Bir isteğin çalışan bir başlangıca dönüşmesini anlatan soyut yapı. Gerçek ürün ekranı veya doğrulama kanıtı değildir.</desc>
          <g className="opening-form-guides" fill="none" aria-hidden="true">
            <path d="M42 462H574M72 82V454M536 79V454" />
            <path d="M52 92h40M52 112h24M522 92h40M542 112h20M52 440h20M544 440h20" />
          </g>
          <g className="opening-form-faces" aria-hidden="true">
            <path className="opening-form-top" d="M74 158 338 82 532 184 268 262Z" />
            <path className="opening-form-left" d="M74 158 268 262v190L74 344Z" />
            <path className="opening-form-front" d="m268 262 264-78v198l-264 70Z" />
          </g>
          {steps.length >= 2 && (
            <g className="opening-form-input" aria-hidden="true">
              <path d="M26 271h74l57-49" />
              <circle cx="26" cy="271" r="9" />
              <path d="M155 220 268 262v190" />
            </g>
          )}
          {steps.length >= 3 && (
            <g className="opening-form-built" aria-hidden="true">
              <path className="opening-form-built-face" d="m268 262 264-78v198l-264 70Z" />
              <path className="opening-form-built-ribs" d="M322 246v192m54-208v194m53-210v196m53-212v198" />
              <path className="opening-form-built-base" d="m268 452 264-70" />
              <circle className="opening-form-result" cx="532" cy="382" r="13" />
            </g>
          )}
          <g className="opening-form-outline" fill="none" aria-hidden="true">
            <path d="M74 158 338 82l194 102v198l-264 70L74 344Z" />
            <path d="m74 158 194 104 264-78M268 262v190" />
            <path d="M130 174v198m65-217v256M338 82v204" />
          </g>
          {steps.length >= 4 && (
            <g className="opening-form-questions" fill="none" aria-hidden="true">
              <path className="opening-form-question-first" d="M535 382h20l24-53" />
              <path className="opening-form-question-second" d="M535 382h20l24 70" />
              <circle className="opening-form-question-first" cx="580" cy="328" r="9" />
              <circle className="opening-form-question-second" cx="580" cy="452" r="9" />
            </g>
          )}
        </svg>
      </div>
      {sequenceParts.length === 3 && (
        <div className="opening-audience-axis" aria-label={sequenceParts.join(' → ')}>
          {sequenceParts.map((part, index) => (
            <span className={index === 2 ? 'is-result' : ''} key={part}>
              <small>{String(index + 1).padStart(2, '0')}</small>
              {index === 1 ? 'değişiklik' : part}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function JourneyAudienceVisual({ steps }: { steps: string[] }) {
  const headingStep = steps.find((step) => step.startsWith('Üç başlık:'));
  const noteStep = steps.find((step) => step.startsWith('Not:'));
  const stages = headingStep ? removeLabel(headingStep, 'Üç başlık').split(/\s*→\s*/).filter(Boolean) : [];
  const note = noteStep ? removeLabel(noteStep, 'Not') : '';
  const work = [
    { tool: 'Benzer örnekleri ve kaynakları bulur.', human: 'Kaynağı seçer, dosyayı açar ve başlığı değiştirirsin.', result: 'Elinde kaynaklar var.' },
    { tool: 'Model hangi satırın nasıl değişeceğini açıklar.', human: 'Öneriyi dosyana uygularsın.', result: 'Elinde bir açıklama var.' },
    { tool: 'Ajan ilgili dosyayı bulur, değiştirir ve farkı gösterir.', human: 'Değişikliği inceler, kabul eder veya düzeltirsin.', result: 'Elinde incelenecek bir değişiklik var.' },
  ];

  return (
    <div className={`journey-audience journey-audience--${steps.length}`} data-reveal={steps.length}>
      <header className="journey-audience-task">
        <span className="primitive-label">AYNI KÜÇÜK GÖREV</span>
        <p>Bir web sayfasının <strong>başlığını değiştir.</strong></p>
      </header>
      <ol className="journey-audience-stages" aria-label="Aynı görevde üç çalışma biçimi">
        {stages.slice(0, steps.length).map((stage, index) => (
          <li className={`journey-audience-stage journey-audience-stage--${index + 1}`} key={stage}>
            <div className="journey-audience-name">
              <span className="journey-audience-index">{String(index + 1).padStart(2, '0')}</span>
              <h2>{stage}</h2>
            </div>
            <div className="journey-audience-work">
              <div className="journey-audience-tool"><span>ARAÇTAN GELEN</span><p>{work[index].tool}</p></div>
              <div className="journey-audience-human"><span>SENİN ADIMIN</span><p>{work[index].human}</p></div>
            </div>
            <p className="journey-audience-result">{work[index].result}</p>
          </li>
        ))}
      </ol>
      {note && (
        <aside className="journey-audience-note">
          <p>{note}</p>
        </aside>
      )}
    </div>
  );
}

function ContextAudienceVisual({ steps, sceneEntry }: { steps: string[]; sceneEntry: boolean }) {
  const sourceStep = steps.find((step) => step.startsWith('Bağlam masası:'));
  const sources = sourceStep ? removeLabel(sourceStep, 'Bağlam masası').split(/\s*\+\s*/).filter(Boolean).slice(1) : [];
  const limitStep = steps.find((step) => step.startsWith('Alt cümle:'));
  const limit = limitStep ? unquote(removeLabel(limitStep, 'Alt cümle')) : '';
  const reveal = steps.length;
  // The boundary widens as information is placed on the desk; source anchors stay fixed.
  // Before reveal 3 the boundary hugs the model, so its first appearance grows out of the engine.
  const boundary = reveal < 3 ? { x: 535, y: 130, width: 210, height: 210 } : reveal === 3 ? { x: 440, y: 95, width: 400, height: 280 } : reveal === 4 ? { x: 300, y: 50, width: 680, height: 380 } : { x: 262, y: 22, width: 742, height: 428 };
  const stepEntering = useEnteringReveal(reveal);
  // Arriving at the scene's first reveal by navigation plays the model's entrance; reload does not.
  const entering = sceneEntry && reveal === 1 ? 1 : stepEntering;
  const { rectRef, labelRef } = useBoxMorph<SVGRectElement, SVGTextElement>(boundary, entering);
  const auraRef = useDepthShift<SVGGElement>(entering);
  // Sources fly in from the nearest stage edge before their link is drawn to the model.
  const linked = [
    { dot: [420, 140], edge: [544, 193], label: [322, 112, 'start'], from: [-150, -60] },
    { dot: [900, 140], edge: [739, 199], label: [960, 112, 'end'], from: [150, -60] },
    { dot: [900, 330], edge: [739, 271], label: [900, 372, 'middle'], from: [150, 60] },
    { dot: [390, 330], edge: [541, 271], label: [390, 372, 'middle'], from: [-150, 60] },
  ] as const;
  const visibleSources = sources.slice(0, reveal >= 5 ? 4 : reveal === 4 ? 3 : 0);

  return (
    <div className={`context-audience context-audience--${reveal}`} data-reveal={reveal}>
      <svg className="context-audience-system" viewBox="0 0 1200 470" role="img" aria-label={`Model: metni işleyen motor. ${reveal >= 2 ? 'Prompt: bu turdaki istek, ayrı bir girişten gelir. ' : ''}${reveal >= 3 ? 'Bağlam: bu istekte modele sunulan bilginin sınırı. ' : ''}${visibleSources.length ? `Sınırın içine bağlanan bilgiler: ${visibleSources.join(', ')}. ` : ''}${reveal >= 5 ? 'Araç çıktısı araçla eklendi; sunulmayan bilgi sınırın dışında kalır ve görünmez.' : ''}`}>
        <defs>
          <radialGradient id="context-aura-fill">
            <stop offset="0" stopColor="#176B64" stopOpacity=".16" />
            <stop offset=".55" stopColor="#176B64" stopOpacity=".06" />
            <stop offset="1" stopColor="#176B64" stopOpacity="0" />
          </radialGradient>
          <filter id="context-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="9" />
          </filter>
        </defs>
        <g ref={auraRef} className="context-audience-aura">
          <ellipse cx="640" cy="235" rx={150 + reveal * 70} ry={110 + reveal * 26} fill="url(#context-aura-fill)" />
        </g>
        {reveal >= 3 && (
          <g className={`context-audience-boundary${enterClass(entering, 3)}`}>
            <rect ref={rectRef} x={boundary.x} y={boundary.y} width={boundary.width} height={boundary.height} rx="18" />
            <text ref={labelRef} x={boundary.x + 22} y={boundary.y + 7}>
              <tspan className="context-audience-kicker">BAĞLAM</tspan>
              <tspan className="context-audience-small" dx="12">bu istekte sunulan bilgi</tspan>
            </text>
          </g>
        )}
        {reveal >= 2 && (
          <g className={`context-audience-prompt${enterClass(entering, 2)}`}>
            <text x="40" y="172" className="context-audience-kicker">PROMPT</text>
            <text x="40" y="205" className="context-audience-caption">Bu turdaki istek</text>
            <path className="motion-line" pathLength={1} d="M40 235 H525" />
            <path className="motion-after-line" d="M525 235 l-14 -8 m14 8 l-14 8" />
            <path className="motion-packet" pathLength={1} d="M40 235 H530" />
          </g>
        )}
        {visibleSources.length > 0 && (
          <g className="context-audience-sources">
            {visibleSources.map((source, index) => {
              const { dot, edge, label, from } = linked[index];
              return (
                <g
                  className={`${index === 3 ? 'context-audience-tool' : ''}${enterClass(entering, index === 3 ? 5 : 4)}`.trim() || undefined}
                  key={source}
                  style={{ '--from-x': `${from[0]}px`, '--from-y': `${from[1]}px`, '--order': index === 3 ? 0 : index } as CSSProperties}
                >
                  <path className="motion-line" pathLength={1} d={`M${dot[0]} ${dot[1]} L${edge[0]} ${edge[1]}`} />
                  <g className="motion-fly">
                    <circle cx={dot[0]} cy={dot[1]} r="7" />
                    <text x={label[0]} y={label[1]} textAnchor={label[2]}>{source}</text>
                    {index === 3 && <text x={label[0]} y={label[1] + 27} textAnchor={label[2]} className="context-audience-small">araçla eklendi</text>}
                  </g>
                  <circle className="motion-pulse" cx={edge[0]} cy={edge[1]} r="12" />
                </g>
              );
            })}
          </g>
        )}
        <g className={`context-audience-engine${enterClass(entering, 1)}`}>
          <circle className="context-audience-engine-glow" cx="640" cy="235" r="108" filter="url(#context-glow)" />
          <circle className="context-audience-engine-outer" cx="640" cy="235" r="105" />
          <circle className="context-audience-engine-inner" cx="640" cy="235" r="92" />
          <text x="640" y="229" className="context-audience-engine-name">MODEL</text>
          <text x="640" y="260" className="context-audience-engine-detail">Metni işler, çıktı üretir</text>
        </g>
        {reveal >= 5 && (
          <g className={`context-audience-outside${enterClass(entering, 5)}`}>
            <path d="M1062 235 H1016" />
            <path d="M1016 235 l12 -8 m-12 8 l12 8" />
            <path d="M1030 218 l16 34" />
            <text x="1070" y="214">Sunulmayan</text>
            <text x="1070" y="240">bilgi</text>
            <text x="1070" y="272" className="context-audience-outside-result">GÖRÜNMEZ</text>
          </g>
        )}
      </svg>
      <p className="context-audience-limit" aria-hidden={limit ? undefined : true}>{limit}</p>
    </div>
  );
}

function ComparisonAudienceVisual({ steps }: { steps: string[] }) {
  const toolsStep = steps.find((step) => step.startsWith('Araç örnekleri:'));
  const noteStep = steps.find((step) => step.startsWith('Alt not:'));
  const tools = toolsStep ? removeLabel(toolsStep, 'Araç örnekleri').split(/\s*,\s*/).filter(Boolean) : [];
  const note = noteStep ? unquote(removeLabel(noteStep, 'Alt not')) : '';
  const reveal = steps.length;
  // Solid ink paths are carried by the person; accent paths are carried by permitted tools.

  return (
    <div className={`comparison-audience comparison-audience--${reveal}`} data-reveal={reveal}>
      <svg className="comparison-audience-system" viewBox="0 0 1200 470" role="img" aria-label={`Aynı istek iki çalışma biçiminde. Chatbot: istek modele gider, cevap sana döner; kopyalayıp projeye uygulayan sensin. ${reveal >= 2 ? 'Kodlama ajanı: istek ajan ortamına gider; model araç çağırır, izinli araç projede değişiklik yapar, sonuç modele dönüp tekrar değerlendirilir. Hedef, izin ve son kontrol sende kalır. ' : ''}${tools.length ? `İzinli araç örnekleri: ${tools.join(', ')}. ` : ''}${reveal >= 4 ? 'Model aynı; onu projede çalıştıran ortam farklı.' : ''}`}>
        <g className="comparison-audience-lane">
          <text x="40" y="30" className="comparison-audience-kicker">CHATBOT</text>
          <rect className="comparison-audience-person" x="40" y="52" width="120" height="64" rx="10" />
          <text x="100" y="92" className="comparison-audience-node">SEN</text>
          <path className="comparison-audience-flow" d="M160 72 H376 M376 72 l-13 -7 m13 7 l-13 7" />
          <text x="268" y="60" className="comparison-audience-label">istek</text>
          <circle className="comparison-audience-model" cx="430" cy="84" r="48" />
          <text x="430" y="92" className="comparison-audience-node">MODEL</text>
          <path className="comparison-audience-flow" d="M384 98 H166 M166 98 l13 -7 m-13 7 l13 7" />
          <text x="275" y="124" className="comparison-audience-label">cevap sana döner</text>
          <path className="comparison-audience-hand" d="M100 116 V168 H1024 M1024 168 l-15 -9 m15 9 l-15 9" />
          <text x="720" y="154" className="comparison-audience-label comparison-audience-owner">sen kopyalar, uygularsın</text>
          <rect className="comparison-audience-project" x="1030" y="134" width="130" height="68" rx="10" />
          <text x="1095" y="175" className="comparison-audience-node">PROJE</text>
        </g>
        {reveal >= 2 && (
          <g className="comparison-audience-lane">
            <path className="comparison-audience-divider" d="M40 226 H1160" />
            <text x="40" y="262" className="comparison-audience-kicker">KODLAMA AJANI</text>
            <rect className="comparison-audience-person" x="40" y="300" width="120" height="64" rx="10" />
            <text x="100" y="340" className="comparison-audience-node">SEN</text>
            <text x="100" y="392" className="comparison-audience-small">hedef, izin ve</text>
            <text x="100" y="416" className="comparison-audience-small">son kontrol sende</text>
            <rect className={`comparison-audience-harness${reveal >= 4 ? ' is-emphasized' : ''}`} x="296" y="276" width="484" height="166" rx="14" />
            <text x="316" y="302" className="comparison-audience-kicker comparison-audience-harness-name">AJAN ORTAMI</text>
            <path className="comparison-audience-flow" d="M160 332 H384 M384 332 l-13 -7 m13 7 l-13 7" />
            <text x="228" y="320" className="comparison-audience-label">istek</text>
            <circle className="comparison-audience-model" cx="430" cy="352" r="48" />
            <text x="430" y="360" className="comparison-audience-node">MODEL</text>
            <path className="comparison-audience-flow" d="M477 338 H596 M596 338 l-13 -7 m13 7 l-13 7" />
            <rect className="comparison-audience-tool" x="600" y="320" width="130" height="64" rx="10" />
            <text x="665" y="359" className="comparison-audience-node">ARAÇ</text>
            <path className="comparison-audience-flow is-return" d="M600 368 H478" />
            <path className="comparison-audience-flow" d="M478 368 l13 -7 m-13 7 l13 7" />
            <text x="540" y="424" className="comparison-audience-label">sonuç → tekrar değerlendirme</text>
            <path className="comparison-audience-agent-path" d="M730 336 H1024 M1024 336 l-15 -9 m15 9 l-15 9" />
            <text x="935" y="322" className="comparison-audience-label comparison-audience-agent-owner">izinli değişiklik</text>
            <path className="comparison-audience-agent-path is-return" d="M1030 368 H736" />
            <path className="comparison-audience-agent-path is-head" d="M736 368 l13 -7 m-13 7 l13 7" />
            <rect className="comparison-audience-project" x="1030" y="318" width="130" height="68" rx="10" />
            <text x="1095" y="359" className="comparison-audience-node">PROJE</text>
          </g>
        )}
        {tools.length > 0 && (
          <g className="comparison-audience-permission">
            <path d="M842 300 V396" />
            <text x="842" y="290" className="comparison-audience-kicker">İZİN</text>
            {tools.slice(0, 2).map((tool, index) => (
              <text key={tool} x="935" y={420 + index * 26} className="comparison-audience-small">{tool}</text>
            ))}
          </g>
        )}
      </svg>
      <p className="comparison-audience-note" aria-hidden={note ? undefined : true}>{note}</p>
    </div>
  );
}

function VibeCodingAudienceVisual({ steps }: { steps: string[] }) {
  const requestStep = steps.find((step) => step.startsWith('Örnek istekler:'));
  const requests = requestStep ? removeLabel(requestStep, 'Örnek istekler').split(/\s*→\s*/).map(unquote) : [];
  const noteStep = steps.find((step) => step.startsWith('Etiket:'));
  const note = noteStep ? unquote(removeLabel(noteStep, 'Etiket')) : '';
  const reveal = steps.length;
  // One representative app changes in place: request, see the result, ask again.
  const results = ['ilk görünüm ortaya çıktı', 'aynı sayfa koyu temada', 'aynı sayfa mobil düzende'];
  const rowY = [100, 220, 340];
  const current = Math.min(reveal, 3) - 1;
  const mobile = reveal >= 3;
  const frameLeft = mobile ? 700 : 480;

  return (
    <div className={`vibe-coding-audience vibe-coding-audience--${reveal}`} data-reveal={reveal}>
      <svg className="vibe-coding-audience-system" viewBox="0 0 1200 470" role="img" aria-label={`Temsili örnek uygulama üzerinde hızlı döngü: istek ver, sonucu gör, tekrar iste. ${requests.slice(0, current + 1).map((request, index) => `${request} Sonuç: ${results[index]}.`).join(' ')}`}>
        <g className="vibe-coding-audience-loop">
          {requests.slice(0, current + 1).map((request, index) => (
            <g className={index === current ? 'is-current' : 'is-past'} key={request}>
              <text x="40" y={rowY[index] - 8} className="vibe-coding-audience-index">{String(index + 1).padStart(2, '0')}</text>
              <path className="vibe-coding-audience-marker" d={`M76 ${rowY[index] - 32} V${rowY[index] + 30}`} />
              <text x="92" y={rowY[index] - 6} className="vibe-coding-audience-request">“{request}”</text>
              <text x="92" y={rowY[index] + 24} className="vibe-coding-audience-result">→ {results[index]}</text>
              {index < current && (
                <g className="vibe-coding-audience-again">
                  <path d={`M52 ${rowY[index] + 12} V${rowY[index] + 80} M52 ${rowY[index] + 80} l-7 -12 m7 12 l7 -12`} />
                  <text x="92" y={rowY[index] + 66}>tekrar iste</text>
                </g>
              )}
            </g>
          ))}
          <path className="vibe-coding-audience-link" d={`M420 ${rowY[current]} H${frameLeft - 12} M${frameLeft - 12} ${rowY[current]} l-13 -7 m13 7 l-13 7`} />
        </g>
        <g className={`vibe-app${reveal >= 2 ? ' is-dark' : ''}`}>
          {mobile ? (
            <>
              <rect className="vibe-app-ghost" x="480" y="40" width="680" height="390" rx="14" />
              <text x="500" y="416" className="vibe-app-ghost-label">önceki geniş düzen</text>
              <rect className="vibe-app-bg" x="700" y="26" width="250" height="432" rx="30" />
              <text x="825" y="52" className="vibe-app-tag">TEMSİLİ ÖRNEK</text>
              <text x="722" y="94" className="vibe-app-ink vibe-app-brand">Portfolyo</text>
              <path className="vibe-app-menu" d="M906 80 H930 M906 87 H930 M906 94 H930" />
              <text x="722" y="140" className="vibe-app-ink vibe-app-title-small">Tasarım ve kod</text>
              <rect className="vibe-app-muted" x="722" y="156" width="200" height="9" rx="4.5" />
              <rect className="vibe-app-muted" x="722" y="172" width="150" height="9" rx="4.5" />
              <rect className="vibe-app-button" x="722" y="192" width="120" height="34" rx="17" />
              <text x="782" y="214" className="vibe-app-button-text vibe-app-button-small">İletişim</text>
              {[244, 314, 384].map((y, index) => (
                <g key={y}>
                  <rect className="vibe-app-tile" x="722" y={y} width="206" height="60" rx="8" />
                  <text x="738" y={y + 37} className="vibe-app-ink vibe-app-tile-label">Proje {index + 1}</text>
                </g>
              ))}
            </>
          ) : (
            <>
              <rect className="vibe-app-bg" x="480" y="40" width="680" height="390" rx="14" />
              <path className="vibe-app-divider" d="M480 80 H1160" />
              <circle className="vibe-app-muted" cx="504" cy="60" r="5" />
              <circle className="vibe-app-muted" cx="522" cy="60" r="5" />
              <circle className="vibe-app-muted" cx="540" cy="60" r="5" />
              <text x="1140" y="66" className="vibe-app-tag vibe-app-tag-end">TEMSİLİ ÖRNEK</text>
              <text x="512" y="118" className="vibe-app-ink vibe-app-brand">Portfolyo</text>
              {[930, 996, 1062].map((x) => <rect className="vibe-app-muted" key={x} x={x} y="106" width="50" height="10" rx="5" />)}
              <text x="512" y="184" className="vibe-app-ink vibe-app-title">Tasarım ve kod</text>
              <rect className="vibe-app-muted" x="512" y="204" width="360" height="12" rx="6" />
              <rect className="vibe-app-muted" x="512" y="226" width="280" height="12" rx="6" />
              <rect className="vibe-app-button" x="512" y="252" width="140" height="40" rx="20" />
              <text x="582" y="278" className="vibe-app-button-text">İletişim</text>
              {[512, 724, 936].map((x, index) => (
                <g key={x}>
                  <rect className="vibe-app-tile" x={x} y="316" width="192" height="92" rx="8" />
                  <text x={x + 16} y="392" className="vibe-app-ink vibe-app-tile-label">Proje {index + 1}</text>
                </g>
              ))}
            </>
          )}
        </g>
      </svg>
      <p className="vibe-coding-audience-note" aria-hidden={note ? undefined : true}>{note}</p>
    </div>
  );
}

function VibeWallAudienceVisual({ steps }: { steps: string[] }) {
  const headlineStep = steps.find((step) => step.startsWith('Büyük ifade:'));
  const signalsStep = steps.find((step) => step.startsWith('İki ayrı işaret:'));
  const headline = headlineStep ? unquote(removeLabel(headlineStep, 'Büyük ifade')) : '';
  const [working] = headline.split(/\s*≠\s*/u);
  const signals = signalsStep ? removeLabel(signalsStep, 'İki ayrı işaret').split(/\s*\/\s*/u).map(unquote) : [];
  const reveal = steps.length;
  // Scene 05's representative result stays in the middle; open questions and the missing evidence layer surround it.
  const questions = [
    { lines: ['Güvenli mi?'], text: [400, 209], anchor: [497, 203], side: 'end' },
    { lines: ['Başka bir yeri', 'bozdu mu?'], text: [400, 332], anchor: [497, 338], side: 'end' },
    { lines: ['Yapılan değişiklik gerçekten', 'istenen şey mi?'], text: [790, 136], anchor: [725, 128], side: 'start' },
    { lines: ['Test edildi mi?'], text: [790, 276], anchor: [725, 270], side: 'start' },
    { lines: ['İncelendi mi?'], text: [790, 396], anchor: [725, 390], side: 'start' },
  ] as const;
  const statement = reveal >= 3 ? 'Çalışıyor olması, doğru yapıldığı anlamına gelmez.' : '';

  return (
    <div className={`vibe-wall-audience vibe-wall-audience--${reveal}`} data-reveal={reveal}>
      <svg className="vibe-wall-audience-system" viewBox="0 0 1200 490" role="img" aria-label={`Temsili örnek uygulama açılıyor ve çalışıyor görünüyor; bu görünen sonuçtur. ${reveal >= 2 ? `Cevaplanmamış sorular: ${questions.map(({ lines }) => lines.join(' ')).join(' ')} ` : ''}${reveal >= 3 ? `${signals[1] ?? 'Doğrulama kanıtı'} bu örnekte sunulmadı.` : ''}`}>
        {reveal >= 3 && (
          <g className="vibe-wall-audience-evidence">
            <rect x="30" y="14" width="1140" height="470" rx="22" />
            <rect className="vibe-wall-audience-legend" x="44" y="0" width="472" height="28" />
            <text x="56" y="21">
              <tspan className="vibe-wall-audience-kicker">{(signals[1] ?? 'Doğrulama kanıtı').toLocaleUpperCase('tr-TR')}</tspan>
              <tspan className="vibe-wall-audience-small" dx="12">bu örnekte sunulmadı</tspan>
            </text>
          </g>
        )}
        <g className="vibe-app is-dark">
          <rect className="vibe-app-bg" x="475" y="26" width="250" height="432" rx="30" />
          <text x="600" y="52" className="vibe-app-tag">TEMSİLİ ÖRNEK</text>
          <text x="497" y="94" className="vibe-app-ink vibe-app-brand">Portfolyo</text>
          <path className="vibe-app-menu" d="M681 80 H705 M681 87 H705 M681 94 H705" />
          <text x="497" y="140" className="vibe-app-ink vibe-app-title-small">Tasarım ve kod</text>
          <rect className="vibe-app-muted" x="497" y="156" width="200" height="9" rx="4.5" />
          <rect className="vibe-app-muted" x="497" y="172" width="150" height="9" rx="4.5" />
          <rect className="vibe-app-button" x="497" y="192" width="120" height="34" rx="17" />
          <text x="557" y="214" className="vibe-app-button-text vibe-app-button-small">İletişim</text>
          {[244, 314, 384].map((y, index) => (
            <g key={y}>
              <rect className="vibe-app-tile" x="497" y={y} width="206" height="60" rx="8" />
              <text x="513" y={y + 37} className="vibe-app-ink vibe-app-tile-label">Proje {index + 1}</text>
            </g>
          ))}
        </g>
        <g className="vibe-wall-audience-result">
          <rect x="745" y="40" width="150" height="36" rx="18" />
          <text x="820" y="64" className="vibe-wall-audience-result-name">{(working || 'Çalışıyor').toLocaleUpperCase('tr-TR')}</text>
          <text x="905" y="64" className="vibe-wall-audience-small vibe-wall-audience-left">{(signals[0] ?? 'Görünen sonuç').toLocaleLowerCase('tr-TR')}</text>
        </g>
        {reveal >= 2 && (
          <g className="vibe-wall-audience-questions">
            {questions.map(({ lines, text, anchor, side }) => {
              const lineStart = side === 'end' ? text[0] + 14 : text[0] - 14;
              return (
                <g key={lines.join(' ')}>
                  <path d={`M${lineStart} ${text[1] - 7} L${anchor[0]} ${anchor[1]}`} />
                  <circle cx={anchor[0]} cy={anchor[1]} r="6" />
                  <text x={text[0]} y={text[1]} textAnchor={side}>
                    {lines.map((line, index) => <tspan key={line} x={text[0]} dy={index === 0 ? 0 : 27}>{line}</tspan>)}
                  </text>
                </g>
              );
            })}
          </g>
        )}
      </svg>
      <p className="vibe-wall-audience-statement" aria-hidden={statement ? undefined : true}>{statement}</p>
    </div>
  );
}

function EngineeringAudienceVisual({ steps }: { steps: string[] }) {
  const flowStep = steps.find((step) => step.startsWith('Akış:'));
  const evidenceStep = steps.find((step) => step.startsWith('Üç kanıt noktası:'));
  const statementStep = steps.find((step) => step.startsWith('Son cümle:'));
  const flow = flowStep ? removeLabel(flowStep, 'Akış').split(/\s*→\s*/).filter(Boolean) : [];
  const evidence = evidenceStep ? removeLabel(evidenceStep, 'Üç kanıt noktası').split(/\s*,\s*/).filter(Boolean) : [];
  const statement = statementStep ? unquote(removeLabel(statementStep, 'Son cümle')) : '';
  const reveal = steps.length;
  // The same mobile-menu task matures: goal → change → evidence points the process must collect. Points stay open; no result is claimed.
  const [goal = 'Hedef', context = 'Bağlam', plan = 'Plan', implement = 'Uygula', test = 'Test', review = 'İnceleme', verify = 'Doğrula', git = 'Git'] = flow;
  const [changedFiles = 'değişen dosyalar', testResult = 'test sonucu', reviewResult = 'inceleme sonucu'] = evidence;
  const frameState = reveal >= 3 ? 'is-process' : 'is-missing';
  const frameNote = reveal >= 3 ? 'sürecin parçası' : reveal === 2 ? 'tek başına yetmez' : 'henüz yok';
  const points = [
    { key: 'files', show: reveal >= 2, cx: 930, cy: 64, label: changedFiles, note: `${implement} · ne değişti?`, lx: 946, ly: 28 },
    { key: 'test', show: reveal >= 3, cx: 1060, cy: 180, label: testResult, note: `${test} · komut ve çıktısı`, lx: 1076, ly: 176 },
    { key: 'review', show: reveal >= 3, cx: 1060, cy: 318, label: reviewResult, note: `${review} · ikinci göz`, lx: 1076, ly: 314 },
    { key: 'git', show: reveal >= 3, cx: 1060, cy: 432, label: git, note: 'izlenebilir kayıt', lx: 1076, ly: 440 },
  ];

  return (
    <div className={`engineering-audience engineering-audience--${reveal}`} data-reveal={reveal}>
      <svg className="engineering-audience-system" viewBox="0 0 1200 490" role="img" aria-label={`Aynı görev: mobil menü telefonda açılmıyor; kabul koşulu telefonda menünün açılması ve masaüstünün değişmemesi. ${goal}, ${context} ve ${plan} netleşir. ${reveal >= 2 ? `${implement}: ajan projede değişiklik yapar; ${changedFiles} ilk kanıt noktasıdır. ` : ''}${reveal >= 3 ? `${test}, ${review}, ${verify} ve ${git} sürecin kanıt noktalarıdır; burada sonuç gösterilmez. ` : ''}`}>
        <g className={`engineering-audience-frame ${frameState}`}>
          <rect x="470" y="64" width="590" height="368" rx="20" />
          <rect className="engineering-audience-legend" x="484" y="50" width="392" height="28" />
          <text x="496" y="71"><tspan className="engineering-audience-kicker">DOĞRULAMA KANITI</tspan><tspan className="engineering-audience-small" dx="10">{frameNote}</tspan></text>
        </g>

        <g className="engineering-audience-goal">
          <rect x="40" y="110" width="340" height="228" rx="14" />
          <text x="64" y="146" className="engineering-audience-kicker">{goal.toLocaleUpperCase('tr-TR')}</text>
          <text x="64" y="186" className="engineering-audience-title">Mobil menü telefonda</text>
          <text x="64" y="218" className="engineering-audience-title">açılmıyor.</text>
          <path className="engineering-audience-rule" d="M64 240 H356" />
          <text x="64" y="268" className="engineering-audience-kicker is-muted">KABUL KOŞULU</text>
          <text x="64" y="296" className="engineering-audience-body">Telefonda menü açılır;</text>
          <text x="64" y="322" className="engineering-audience-body">masaüstü değişmez.</text>
        </g>
        <g className="engineering-audience-prep">
          <rect x="40" y="356" width="160" height="44" rx="22" />
          <text x="120" y="385">{context}</text>
          <rect x="220" y="356" width="160" height="44" rx="22" />
          <text x="300" y="385">{plan}</text>
        </g>

        {reveal >= 2 && (
          <g className="engineering-audience-change">
            <path className="engineering-audience-flow" d="M380 224 H548 M548 224 l-13 -7 m13 7 l-13 7" />
            <text x="425" y="212" className="engineering-audience-flow-label">ajan</text>
            <rect className="engineering-audience-project" x="556" y="124" width="300" height="200" rx="12" />
            <text x="578" y="156" className="engineering-audience-kicker">PROJE</text>
            <rect className="engineering-audience-line" x="578" y="176" width="220" height="10" rx="5" />
            <rect className="engineering-audience-line is-changed" x="578" y="202" width="180" height="10" rx="5" />
            <rect className="engineering-audience-line is-changed" x="578" y="228" width="240" height="10" rx="5" />
            <rect className="engineering-audience-line" x="578" y="254" width="150" height="10" rx="5" />
            <rect className="engineering-audience-line" x="578" y="280" width="200" height="10" rx="5" />
            <text x="834" y="224" className="engineering-audience-mark">±</text>
            <text x="706" y="354" className="engineering-audience-caption">{implement} · ajan değişikliği yapar</text>
            <path className="engineering-audience-link" d="M830 124 L930 72" />
          </g>
        )}

        {reveal >= 3 && (
          <g className="engineering-audience-verify">
            <path className="engineering-audience-link" d="M856 250 L1052 184 M856 280 L1052 316" />
            <path className="engineering-audience-loop" d="M760 441 V474 H18 V224 H32 M32 224 l-12 -7 m12 7 l-12 7" />
            <circle className="engineering-audience-point" cx="760" cy="432" r="9" />
            <text x="778" y="462" className="engineering-audience-point-label">{verify}</text>
            <text x="852" y="462" className="engineering-audience-small">· kabule karşı kontrol</text>
          </g>
        )}

        {points.filter(({ show }) => show).map(({ key, cx, cy, label, note, lx, ly }) => (
          <g className="engineering-audience-evidence" key={key}>
            <circle className="engineering-audience-point" cx={cx} cy={cy} r="9" />
            <text x={lx} y={ly} className="engineering-audience-point-label">{label}</text>
            <text x={lx} y={ly + 22} className="engineering-audience-small">{note}</text>
          </g>
        ))}
      </svg>
      <p className="engineering-audience-statement" aria-hidden={statement ? undefined : true}>{statement}</p>
    </div>
  );
}

function BoundaryAudienceVisual({ steps }: { steps: string[] }) {
  const questionStep = steps.find((step) => step.startsWith('Soru:'));
  const noteStep = steps.find((step) => step.startsWith('Alt not:'));
  const question = questionStep ? unquote(removeLabel(questionStep, 'Soru')) : '';
  const reveal = steps.length;
  // One agent carries all three jobs; the checking loop returns to the same agent. Kept deliberately sparse.
  const balance = noteStep ? unquote(removeLabel(noteStep, 'Alt not')) : '';

  return (
    <div className={`boundary-audience boundary-audience--${reveal}`} data-reveal={reveal}>
      {question && <blockquote className="boundary-audience-question">{question}</blockquote>}
      <svg className="boundary-audience-system" viewBox="0 0 1200 380" role="img" aria-label="Tek ajan planlar, uygular ve kendi işini doğrular; üç iş aynı ajanda toplanır. Görev büyüdükçe bağımsız kontrol sınırlı kalabilir.">
        <g className="boundary-audience-load">
          <circle cx="600" cy="150" r="112" />
          <circle cx="600" cy="150" r="98" />
          <circle cx="600" cy="150" r="84" />
        </g>
        <circle className="boundary-audience-agent" cx="600" cy="150" r="70" />
        <text x="600" y="158" className="boundary-audience-agent-name">AJAN</text>

        <path className="boundary-audience-flow" d="M330 150 H480 M480 150 l-13 -7 m13 7 l-13 7" />
        <text x="310" y="158" className="boundary-audience-role is-end">planlar</text>
        <path className="boundary-audience-flow" d="M720 150 H870 M870 150 l-13 -7 m13 7 l-13 7" />
        <text x="890" y="158" className="boundary-audience-role">uygular</text>

        <path className="boundary-audience-self" d="M672 228 C740 318 460 318 528 228 M528 228 l2 15 m-2 -15 l13 7" />
        <text x="600" y="330" className="boundary-audience-role is-middle">kendi işini doğrular</text>
        <text x="600" y="366" className="boundary-audience-limit">Görev büyüdükçe bağımsız kontrol sınırlı kalabilir.</text>
      </svg>
      <p className="boundary-audience-balance" aria-hidden={balance ? undefined : true}>{balance}</p>
    </div>
  );
}

function OrchestrationAudienceVisual({ steps }: { steps: string[] }) {
  const flowStep = steps.find((step) => step.startsWith('Akış:'));
  const qaStep = steps.find((step) => step.startsWith('QA sonucu:'));
  const gitStep = steps.find((step) => step.startsWith('Git:'));
  const roles = flowStep ? removeLabel(flowStep, 'Akış').split(/\s*→\s*/).filter(Boolean) : [];
  const outcomes = qaStep ? removeLabel(qaStep, 'QA sonucu').split(/\s*\/\s*/u) : [];
  const git = gitStep ? removeLabel(gitStep, 'Git') : '';
  const reveal = steps.length;
  // One task travels a track; Analyst is an optional siding; QA opens two conditional routes; Git is the last stop.
  const [lead = 'Lead', analystStep = 'Analyst (gerektiğinde)', developer = 'Developer', qa = 'QA'] = roles;
  const analyst = analystStep.replace(/\s*\(.*\)\s*/u, '');
  const pass = outcomes.find((outcome) => outcome.startsWith('PASS')) ?? 'PASS → tamamla';
  const fail = outcomes.find((outcome) => outcome.startsWith('FAIL')) ?? "FAIL → Developer'a geri dön";
  const active = reveal >= 3 ? 'git' : reveal === 2 ? 'qa' : 'lead';
  const track = (traveled: boolean) => `orchestration-audience-track${traveled ? ' is-traveled' : ''}`;
  const station = (key: string) => `orchestration-audience-station${active === key ? ' is-active' : ''}`;
  const caption = reveal >= 3
    ? `Git — ${git}`
    : reveal === 2
      ? 'QA iki yoldan birini açar: tamamla ya da geri dön.'
      : `${lead} yönlendirir · ${developer} uygular · ${qa} bağımsız kontrol eder`;

  return (
    <div className={`orchestration-audience orchestration-audience--${reveal}`} data-reveal={reveal}>
      <svg className="orchestration-audience-map" viewBox="0 0 1200 440" role="img" aria-label={`Aynı mobil menü görevi rollerden geçer: ${lead} işi yönlendirip devreder; ${analyst} yalnız gerektiğinde araştırma veya inceleme için yan yoldan girer; ${developer} değişikliği uygular; ${qa} bağımsız kontrol eder. ${reveal >= 2 ? `Koşullu iki yol: ${pass}; ${fail}. ` : ''}${reveal >= 3 ? `${pass.split(/\s*→\s*/u)[0]} yolu Git'e bağlanır: ${git}.` : ''}`}>
        <g className="orchestration-audience-siding">
          <path d="M330 218 C345 150 370 110 400 110 M570 110 C600 110 615 165 615 208 M615 212 l-7 -12 m7 12 l7 -12" />
          <rect x="400" y="80" width="170" height="60" rx="30" />
          <text x="485" y="117" className="orchestration-audience-name">{analyst.toLocaleUpperCase('tr-TR')}</text>
          <text x="485" y="62" className="orchestration-audience-kicker">GEREKTİĞİNDE</text>
          <text x="485" y="168" className="orchestration-audience-note">araştırma / inceleme</text>
        </g>

        <path className={track(true)} d="M170 250 H205" />
        <path className={track(true)} d="M365 250 H560" />
        <text x="462" y="236" className="orchestration-audience-edge">devreder</text>
        <path className={track(reveal >= 2)} d="M720 250 H830" />

        {reveal >= 2 && (
          <g className={`orchestration-audience-fail${reveal >= 3 ? ' is-settled' : ''}`}>
            <path d="M870 282 V386 H700 V292 M700 290 l-7 12 m7 -12 l7 12" />
            <text x="785" y="414">{fail}</text>
          </g>
        )}
        {reveal >= 2 && (
          <g className={`orchestration-audience-pass${reveal >= 3 ? ' is-traveled' : ''}`}>
            <path d="M950 250 H1034 M1034 250 l-12 -8 m12 8 l-12 8" />
            <text x="995" y="234">{pass.split(/\s*→\s*/u)[0]}</text>
          </g>
        )}
        {reveal === 2 && <text x="995" y="276" className="orchestration-audience-kicker is-condition">KOŞULLU</text>}

        <g className="orchestration-audience-task">
          <rect x="30" y="228" width="140" height="44" rx="22" />
          <text x="100" y="256">GÖREV</text>
          <text x="100" y="298" className="orchestration-audience-note">mobil menü</text>
        </g>
        <g className={station('lead')}>
          <rect x="205" y="218" width="160" height="64" rx="32" />
          <text x="285" y="258" className="orchestration-audience-name">{lead.toLocaleUpperCase('tr-TR')}</text>
          <text x="285" y="314" className="orchestration-audience-note">yönlendirir · devreder</text>
        </g>
        <g className={station('developer')}>
          <rect x="560" y="218" width="160" height="64" rx="32" />
          <text x="640" y="258" className="orchestration-audience-name">{developer.toLocaleUpperCase('tr-TR')}</text>
          <text x="640" y="314" className="orchestration-audience-note">uygular</text>
        </g>
        <g className={station('qa')}>
          <rect x="830" y="218" width="120" height="64" rx="32" />
          <text x="890" y="258" className="orchestration-audience-name">{qa.toLocaleUpperCase('tr-TR')}</text>
          <text x="890" y="200" className="orchestration-audience-note">bağımsız kontrol</text>
        </g>
        {reveal >= 2 && (
          <g className={`${station('git')} is-end`}>
            <rect x="1040" y="218" width="140" height="64" rx="32" />
            <text x="1110" y="258" className="orchestration-audience-name">{reveal >= 3 ? 'GIT' : (pass.split(/\s*→\s*/u)[1] ?? 'tamamla').toLocaleUpperCase('tr-TR')}</text>
            {reveal >= 3 && <text x="1110" y="314" className="orchestration-audience-note">son kayıt noktası</text>}
          </g>
        )}
      </svg>
      <p className="orchestration-audience-caption">{caption}</p>
    </div>
  );
}

function ConceptualWorkflowAudienceVisual({ steps }: { steps: string[] }) {
  const questionStep = steps.find((step) => step.startsWith('Soru:'));
  const flowStep = steps.find((step) => step.startsWith('Görev →'));
  const toolsStep = steps.find((step) => step.startsWith('Araçlar /'));
  const outcomesStep = steps.find((step) => step.startsWith('FAIL →'));
  const question = questionStep ? unquote(removeLabel(questionStep, 'Soru')) : '';
  const reveal = steps.length;
  // Swimlanes: the same task chip changes owner lane by lane; conditional QA routes stay conditional. The real recording follows as the video step.
  const roles = flowStep ? flowStep.split(/\s*→\s*/u).filter(Boolean) : [];
  const [, lead = 'Lead', analystStep = 'gerektiğinde Analyst', developer = 'Developer'] = roles;
  const analyst = analystStep.replace(/^gerektiğinde\s+/u, '');
  const [toolNames = 'Araçlar / Terminal / değişiklik', qa = 'QA'] = toolsStep ? toolsStep.split(/\s*→\s*/u) : [];
  const tools = toolNames.split(/\s*\/\s*/u).filter(Boolean);
  const [fail = "FAIL → Developer'a dönüş", pass = 'PASS → tamamlanma / Git'] = outcomesStep ? outcomesStep.split(/\s*\|\s*/u) : [];
  const passTarget = pass.split(/\s*→\s*/u)[1] ?? 'tamamlanma / Git';
  const lanes = [
    { key: 'lead', name: lead, y: 70 },
    { key: 'analyst', name: analyst, y: 145, optional: true },
    { key: 'developer', name: developer, y: 225 },
    { key: 'qa', name: qa, y: 310 },
  ];
  const owner = reveal >= 3 ? 'qa' : reveal === 2 ? 'developer' : 'lead';
  const chip = { lead: [300, 70], developer: [680, 225], qa: [960, 310] }[owner];
  const caption = [
    'Odak ürün değil, süreç: tek modele kod yazdırmaktan geliştirme sürecini ajan rolleriyle işletmeye geçiş.',
    `${lead} görevi ${developer}'a devreder; ${analyst} yalnız gerektiğinde araya girer.`,
    `${developer} araçlarla değişikliği yapar ve işi bağımsız kontrol için ${qa}'ya bırakır.`,
    `${qa} iki koşullu yol açar: ${fail.replace('FAIL → ', 'FAIL ise ')}, ${pass.replace('PASS → ', 'PASS ise ')}.`,
  ][Math.min(reveal, 4) - 1];

  return (
    <div className={`workflow-audience workflow-audience--${reveal}`} data-reveal={reveal}>
      <div className="workflow-audience-concept-label" role="note">
        <span>KAVRAMSAL ŞEMA</span>
        <strong>gerçek kayıt bir sonraki adımda</strong>
      </div>
      {question && <blockquote className="workflow-audience-question">{question}</blockquote>}
      <svg className="workflow-audience-lanes" viewBox="0 0 1200 390" role="img" aria-label={`Kavramsal şema; gerçek kayıt bir sonraki adımda. Aynı görev rol kulvarları arasında el değiştirir. ${reveal >= 2 ? `${lead}, gerektiğinde ${analyst} üzerinden, ${developer}'a devreder. ` : ''}${reveal >= 3 ? `${developer}: ${tools.join(', ')}; ardından ${qa}. ` : ''}${reveal >= 4 ? `Koşullu yollar: ${fail}; ${pass}.` : ''}`}>
        {lanes.map(({ key, name, y, optional }) => (
          <g key={key} className={`workflow-audience-lane${optional ? ' is-optional' : ''}${owner === key ? ' is-owner' : ''}`}>
            <path d={`M170 ${y} H1180`} />
            <text x="20" y={y + 7} className="workflow-audience-lane-name">{name.toLocaleUpperCase('tr-TR')}</text>
            {optional && <text x="20" y={y + 29} className="workflow-audience-small">gerektiğinde</text>}
          </g>
        ))}

        <path className="workflow-audience-path" d="M170 70 H300" />
        {reveal >= 2 && (
          <g>
            <path className="workflow-audience-detour" d="M460 145 H560 V219 M560 221 l-7 -12 m7 12 l7 -12" />
            <circle className="workflow-audience-branch" cx="460" cy="145" r="6" />
            <text x="576" y="186" className="workflow-audience-small">araştırma / inceleme</text>
            <path className="workflow-audience-path" d="M300 70 H460 V225 H660" />
            <text x="448" y="186" className="workflow-audience-edge is-end">devreder</text>
          </g>
        )}
        {reveal >= 3 && (
          <g>
            <path className="workflow-audience-path" d="M660 225 H880 V310 H960" />
            {tools.slice(0, 3).map((tool, index) => {
              const x = [700, 775, 850][index];
              return (
                <g key={tool} className="workflow-audience-tick">
                  <circle cx={x} cy="225" r="7" />
                  <text x={x} y="206" className="workflow-audience-small is-center is-ink">{tool}</text>
                </g>
              );
            })}
          </g>
        )}
        {reveal >= 4 && (
          <g>
            <g className="workflow-audience-fail">
              <path d="M960 327 V364 H660 V231 M660 229 l-7 12 m7 -12 l7 12" />
              <text x="810" y="386">{fail}</text>
            </g>
            <g className="workflow-audience-pass">
              <path d="M1015 310 H1062 M1062 310 l-12 -8 m12 8 l-12 8" />
              <rect x="1068" y="286" width="118" height="48" rx="24" />
              <text x="1127" y="317">{passTarget.split(/\s*\/\s*/u).at(-1)?.toUpperCase()}</text>
              <text x="1127" y="358" className="workflow-audience-small is-center">{passTarget.split(/\s*\/\s*/u)[0]}</text>
              <text x="1038" y="292" className="workflow-audience-kicker">PASS</text>
            </g>
          </g>
        )}

        <g className="workflow-audience-chip">
          <rect x={chip[0] - 55} y={chip[1] - 17} width="110" height="34" rx="17" />
          <text x={chip[0]} y={chip[1] + 6}>GÖREV</text>
        </g>
      </svg>
      <p className="workflow-audience-caption">{caption}</p>
    </div>
  );
}

// One task runs through the system: person → task → context → model, with parts attached by what they do for that task.
const anatomyStageNodes = [
  { name: 'Bağlam', x: 390, y: 215, width: 140, height: 60 },
  { name: 'Talimatlar', x: 380, y: 92, width: 160, height: 60 },
  { name: 'Proje dosyaları', x: 370, y: 345, width: 180, height: 60 },
  { name: 'Araçlar', x: 760, y: 215, width: 130, height: 60 },
  { name: 'Terminal', x: 760, y: 345, width: 130, height: 60 },
  { name: 'Skill', x: 575, y: 92, width: 130, height: 60 },
  { name: 'MCP', x: 935, y: 215, width: 130, height: 60 },
  { name: 'Git', x: 215, y: 345, width: 130, height: 60 },
] as const;

const anatomyStageEdges = [
  { from: 'Sen', to: 'Görev', path: 'M190 245 H219' },
  { from: 'Görev', to: 'Model', path: 'M345 245 H566', when: (names: Set<string>) => !names.has('Bağlam') },
  { from: 'Görev', to: 'Bağlam', path: 'M345 245 H384' },
  { from: 'Bağlam', to: 'Model', path: 'M530 245 H566' },
  { from: 'Talimatlar', to: 'Bağlam', path: 'M460 152 V209' },
  { from: 'Proje dosyaları', to: 'Bağlam', path: 'M460 345 V281' },
  { from: 'Model', to: 'Araçlar', path: 'M688 234 H754' },
  { from: 'Araçlar', to: 'Model', path: 'M760 256 H694' },
  { from: 'Araçlar', to: 'Terminal', path: 'M825 275 V339' },
  { from: 'Terminal', to: 'Proje dosyaları', path: 'M760 375 H556', label: 'değişiklik', labelAt: [655, 364] },
  { from: 'Skill', to: 'Talimatlar', path: 'M575 122 H546' },
  { from: 'MCP', to: 'Araçlar', path: 'M935 245 H896' },
  { from: 'Proje dosyaları', to: 'Git', path: 'M370 375 H351' },
  { from: 'Git', to: 'Sen', path: 'M215 375 H115 V277', label: 'inceleme · onay', labelAt: [168, 430] },
] as const;

function AnatomyAudienceVisual({
  introduction,
  parts,
  equation,
}: {
  introduction: string;
  parts: Array<{ name: string; description: string; number: number; optional: boolean }>;
  equation?: string;
}) {
  const summary = Boolean(equation);
  const names = new Set<string>(['Sen', 'Görev', ...parts.map(({ name }) => name)]);
  const currentPart = summary ? undefined : parts.at(-1);
  const current = currentPart?.name;
  const optionalNames = new Set(parts.filter(({ optional }) => optional).map(({ name }) => name));
  const nodeClass = (name: string, optional = false) => `anatomy-audience-node${name === current ? ' is-current' : ''}${optional ? ' is-optional' : ''}`;
  const intro = introduction.split(/\s*Her satıra/u)[0];
  const [, agentLabel, workflowLabel] = (equation ?? 'Model ≠ Ajan ≠ İş akışı').split(/\s*≠\s*/u);
  const modelPart = parts.find(({ name }) => name === 'Model');
  const caption = summary
    ? equation
    : currentPart
      ? `${currentPart.name} — ${currentPart.description}`
      : intro;

  return (
    <div className={`anatomy-audience${summary ? ' is-summary' : ''}`} data-reveal={summary ? 11 : parts.length + 1}>
      <svg className="anatomy-audience-map" viewBox="0 0 1200 490" role="img" aria-label={`Aynı görev etrafında çalışan örnek ajan kurulumu. Görünen parçalar: ${[...names].join(', ')}. ${optionalNames.size ? `${[...optionalNames].join(', ')} kullanılıyorsa eklenir; zorunlu değildir. ` : ''}${summary ? `${equation}: model motor, ajan onu araç ve bağlamla çalıştıran ortam, iş akışı insan kontrolüyle birlikte bütün süreç.` : ''}`}>
        <defs>
          <marker id="anatomy-audience-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path className="anatomy-audience-arrow" d="M0 0 L10 5 L0 10 z" /></marker>
          <marker id="anatomy-audience-arrow-current" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path className="anatomy-audience-arrow is-current" d="M0 0 L10 5 L0 10 z" /></marker>
        </defs>
        {summary && (
          <g className="anatomy-audience-layers">
            <rect className="anatomy-audience-workflow" x="20" y="18" width="1160" height="462" rx="24" />
            <rect className="anatomy-audience-legend" x="36" y="4" width="360" height="28" />
            <text x="48" y="25"><tspan className="anatomy-audience-kicker is-workflow">{workflowLabel.toLocaleUpperCase('tr-TR')}</tspan><tspan className="anatomy-audience-small" dx="10">görev, ajan ve insan kontrolü</tspan></text>
            <rect className="anatomy-audience-agent" x="366" y="64" width="720" height="368" rx="18" />
            <rect className="anatomy-audience-legend" x="380" y="50" width="400" height="28" />
            <text x="392" y="71"><tspan className="anatomy-audience-kicker">{agentLabel.toLocaleUpperCase('tr-TR')}</tspan><tspan className="anatomy-audience-small" dx="10">modeli araç ve bağlamla çalıştırır</tspan></text>
          </g>
        )}
        <g className="anatomy-audience-links">
          {anatomyStageEdges.map((edge) => {
            if (!names.has(edge.from) || !names.has(edge.to)) return null;
            if ('when' in edge && !edge.when(names)) return null;
            const active = current === edge.from || current === edge.to;
            const optional = optionalNames.has(edge.from) || optionalNames.has(edge.to);
            return (
              <g key={`${edge.from}-${edge.to}`} className={`${active ? 'is-current' : ''}${optional ? ' is-optional' : ''}`}>
                <path d={edge.path} />
                {'label' in edge && <text x={edge.labelAt[0]} y={edge.labelAt[1]} className="anatomy-audience-edge-label">{edge.label}</text>}
              </g>
            );
          })}
        </g>
        <g className="anatomy-audience-nodes">
          <g className="anatomy-audience-node is-person">
            <rect x="40" y="213" width="150" height="64" rx="10" />
            <text x="115" y="243" className="anatomy-audience-name">SEN</text>
            <text x="115" y="266" className="anatomy-audience-note">hedef ve onay</text>
          </g>
          <g className="anatomy-audience-node is-task">
            <rect x="225" y="215" width="120" height="60" rx="10" />
            <text x="285" y="253" className="anatomy-audience-name">GÖREV</text>
          </g>
          {names.has('Model') && (
            <g className={nodeClass('Model')}>
              <circle cx="630" cy="245" r="60" />
              <text x="630" y="253" className="anatomy-audience-name is-model">MODEL</text>
            </g>
          )}
          {anatomyStageNodes.filter(({ name }) => names.has(name)).map(({ name, x, y, width, height }) => {
            const optional = optionalNames.has(name);
            return (
              <g key={name} className={nodeClass(name, optional)}>
                <rect x={x} y={y} width={width} height={height} rx="10" />
                <text x={x + width / 2} y={optional ? y + 28 : y + 38} className="anatomy-audience-name">{name}</text>
                {optional && <text x={x + width / 2} y={y + 49} className="anatomy-audience-note">kullanılıyorsa</text>}
              </g>
            );
          })}
          {summary && modelPart && <text x="630" y="328" className="anatomy-audience-note">{modelPart.description}</text>}
        </g>
      </svg>
      <p className={`anatomy-audience-caption${summary ? ' is-equation' : ''}`} aria-live="polite">
        {currentPart && <span className="anatomy-audience-tag">{currentPart.optional ? 'İSTEĞE BAĞLI' : String(currentPart.number).padStart(2, '0')}</span>}
        {caption}
      </p>
    </div>
  );
}

function AnatomyVisual({ steps }: { steps: string[] }) {
  const introduction = steps[0];
  const equationStep = steps.find((step) => step.startsWith('Alt cümle:'));
  const parts = steps
    .slice(1)
    .filter((step) => !step.startsWith('Alt cümle:'))
    .map((part, index) => {
      const [name, ...description] = part.split(' — ');
      return {
        name,
        description: description.join(' — '),
        number: index + 1,
        optional: ['Skill', 'MCP', 'Git'].includes(name),
      };
    });

  return (
    <AnatomyAudienceVisual
      introduction={introduction ?? ''}
      parts={parts}
      equation={equationStep ? unquote(removeLabel(equationStep, 'Alt cümle')) : undefined}
    />
  );
}

function FinalVisual({ steps }: { steps: string[] }) {
  const answer = steps[0]?.split(' — ');
  const trust = steps[1]?.split(' — ');
  const finalText = steps[2]?.match(/[“"](.+?)[”"]/u)?.[1];
  const [firstLine, secondLine] = finalText?.split(', ') ?? [];

  const reveal = steps.length;
  const stageRef = useFinalExit(reveal);
  const question = answer ? unquote(answer[0]) : '';
  const rawAnswer = answer ? answer.slice(1).join(' — ') : '';
  const shortAnswer = rawAnswer ? rawAnswer.charAt(0) + rawAnswer.slice(1).toLocaleLowerCase('tr-TR') : '';
  // The model core with Bağlam, Araçlar, Test, İnceleme and İnsan; reusable methods are covered in the speaker notes.
  // Reveal 3 renders only the closing line: no diagram, node or line is kept behind it.
  const sourceParts = trust ? trust.slice(1).join(' — ').split(/\s*\+\s*/).filter(Boolean) : [];
  const pick = (name: string) => sourceParts.find((part) => part === name) ?? name;
  const parts = [
    { name: pick('Bağlam'), note: 'sunulan bilgi', x: 190, y: 50, edge: 'M531 158 L400 88' },
    { name: pick('Araçlar'), note: 'işlem yapar', x: 800, y: 50, edge: 'M669 158 L800 88' },
    { name: pick('İnceleme'), note: 'ikinci göz', x: 190, y: 300, edge: 'M537 240 L400 338' },
    { name: pick('Test'), note: 'kanıt üretir', x: 800, y: 300, edge: 'M663 240 L800 338' },
    { name: pick('İnsan'), note: 'hedef · onay', x: 495, y: 318, edge: 'M600 273 V318' },
  ];
  return (
    <div className={`final-audience final-audience--${reveal}`} data-reveal={reveal}>
      <p className="final-audience-recap" aria-hidden={reveal === 2 ? undefined : true}>
        {question} <strong>{shortAnswer}</strong>
      </p>
      <div className="final-audience-stage" ref={stageRef}>
        {reveal === 1 && (
          <div className="final-audience-answer">
            <p>{question}</p>
            <strong>{shortAnswer}</strong>
          </div>
        )}
        {reveal === 2 && (
          <svg className="final-audience-system" viewBox="0 0 1200 420" role="img" aria-label={`Tek sistem: merkezde model; ${parts.map(({ name }) => name).join(', ')} ona bağlanır.`}>
            <rect className="final-audience-boundary" x="100" y="14" width="1000" height="394" rx="24" />
            <rect className="final-audience-legend" x="114" y="0" width="124" height="28" />
            <text x="128" y="21" className="final-audience-kicker">SİSTEM</text>
            {parts.map(({ name, edge }) => <path key={`${name}-edge`} className="final-audience-link" d={edge} />)}
            <circle className="final-audience-core" cx="600" cy="195" r="78" />
            <text x="600" y="206" className="final-audience-core-name">MODEL</text>
            {parts.map(({ name, note, x, y }) => (
              <g key={name} className="final-audience-part">
                <rect x={x} y={y} width="210" height="76" rx="12" />
                <text x={x + 105} y={y + 34} className="final-audience-part-name">{name}</text>
                <text x={x + 105} y={y + 59} className="final-audience-part-note">{note}</text>
              </g>
            ))}
          </svg>
        )}
        {reveal >= 3 && finalText && (
          <div className="final-audience-thesis" aria-label={finalText} data-motion-skip>
            <p><span>{firstLine},</span><strong>{secondLine}</strong></p>
            <small>Güvenilir sonuç, modelden çok sistemi ister.</small>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Scene 12, reveal 2 → 3: the system diagram is removed from the DOM, so a detached copy of it is kept and,
 * on that forward step only, its parts scatter outward and fade while the final sentence arrives.
 * The copy is removed when the animation ends or the next navigation cancels it.
 */
function useFinalExit(reveal: number) {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const snapshot = useRef<Element | null>(null);
  const entering = useEnteringReveal(reveal);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    const ghost = snapshot.current;
    snapshot.current = stage?.querySelector('.final-audience-system')?.cloneNode(true) as Element | null ?? null;
    if (!stage || !ghost || entering !== 3 || prefersReducedMotion()) return;
    ghost.setAttribute('aria-hidden', 'true');
    ghost.classList.add('final-audience-ghost');
    stage.prepend(ghost);
    const options = { duration: 480, easing: 'cubic-bezier(.4, 0, .2, 1)', fill: 'forwards' as FillMode };
    const animations: Animation[] = [ghost.animate([{ opacity: 1 }, { opacity: 0 }], options)];
    ghost.querySelectorAll<SVGGraphicsElement>('.final-audience-part').forEach((part) => {
      const box = part.getBBox();
      const dx = box.x + box.width / 2 - 600;
      const dy = box.y + box.height / 2 - 195;
      const length = Math.hypot(dx, dy) || 1;
      animations.push(part.animate([{ transform: 'none' }, { transform: `translate(${(dx / length) * 140}px, ${(dy / length) * 90}px)` }], options));
    });
    const core = ghost.querySelector<SVGElement>('.final-audience-core');
    if (core) {
      core.style.transformBox = 'fill-box';
      core.style.transformOrigin = 'center';
      animations.push(core.animate([{ transform: 'none' }, { transform: 'scale(.6)' }], options));
    }
    animations[0].onfinish = () => ghost.remove();
    return () => {
      animations.forEach((animation) => animation.cancel());
      ghost.remove();
    };
  }, [reveal, entering]);

  return stageRef;
}

function GenericVisual({ steps }: { steps: string[] }) {
  return (
    <ol className="reveal-list">
      {steps.map((step, index) => (
        <li key={`${index}-${step}`} className={index === steps.length - 1 ? 'is-current' : ''}>
          <span className="reveal-index">{String(index + 1).padStart(2, '0')}</span>
          <span>{step}</span>
        </li>
      ))}
    </ol>
  );
}

function SceneVideoReveal({ sceneNumber, videoPlayerRef }: { sceneNumber: number; videoPlayerRef: RefObject<HTMLVideoElement | null> }) {
  const video = getSceneVideo(sceneNumber);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlaybackError, setHasPlaybackError] = useState(false);

  useEffect(() => {
    const element = videoPlayerRef.current;
    if (!element) return;

    if (element.readyState > 0) element.currentTime = 0;
    setIsPlaying(false);
    setHasPlaybackError(false);
    return () => {
      element.pause();
      if (element.readyState > 0) element.currentTime = 0;
    };
  }, [video?.src, videoPlayerRef]);

  if (!video) return null;

  function togglePlayback() {
    const element = videoPlayerRef.current;
    if (!element) return;
    if (element.paused) {
      if (element.ended) element.currentTime = 0;
      void element.play().catch(() => setIsPlaying(false));
    } else {
      element.pause();
      setIsPlaying(false);
    }
  }

  return (
    <figure className="scene-video-reveal">
      <figcaption className="scene-video-kicker">
        <span className="scene-video-label">{video.kicker}</span>
        <span className="scene-video-instruction"><kbd>Space</kbd> oynat/duraklat · <kbd>→</kbd> devam</span>
        <span className="scene-video-actions">
          <span className="scene-video-duration">{video.duration}</span>
          <button
            className="scene-video-toggle"
            type="button"
            disabled={hasPlaybackError}
            onClick={togglePlayback}
            aria-label={isPlaying ? 'Videoyu duraklat' : 'Videoyu oynat'}
          >
            {isPlaying ? 'DURAKLAT' : 'OYNAT'}
          </button>
        </span>
      </figcaption>
      <div className="scene-video-frame">
        <video
          ref={videoPlayerRef}
          className="scene-video-player"
          src={video.src}
          poster={video.poster}
          muted
          playsInline
          preload="auto"
          aria-label={`${video.kicker} ekran kaydı`}
          onClick={togglePlayback}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
          onError={() => {
            setIsPlaying(false);
            setHasPlaybackError(true);
          }}
        />
      </div>
      {hasPlaybackError && <p className="scene-video-fallback" role="status">Video bu cihazda oynatılamadı; ekrandaki kareyle anlatmaya devam edin.</p>}
    </figure>
  );
}

export default function SceneVisual({ scene, visibleSteps, videoPlayerRef, sceneEntry = false }: SceneVisualProps) {
  const video = getSceneVideo(scene.number);
  const isVideoStep = Boolean(video && visibleSteps >= scene.screenSteps.length);
  // Scene 03 keeps its bespoke pilot motion; video steps keep the player untouched.
  const { rootRef, mode } = useSceneMotion<HTMLDivElement>(visibleSteps, sceneEntry, scene.number !== 3 && !isVideoStep);
  if (isVideoStep) {
    return <SceneVideoReveal sceneNumber={scene.number} videoPlayerRef={videoPlayerRef} />;
  }
  if (scene.number === 3) return <ContextAudienceVisual steps={scene.screenSteps.slice(0, visibleSteps)} sceneEntry={sceneEntry} />;

  return (
    <div className="scene-motion" ref={rootRef} data-motion={mode || undefined}>
      <div className="scene-aura" aria-hidden="true" />
      <div className="scene-motion-frame">
        <SceneVisualBody scene={scene} steps={scene.screenSteps.slice(0, visibleSteps)} />
      </div>
    </div>
  );
}

function SceneVisualBody({ scene, steps }: { scene: Scene; steps: string[] }) {
  switch (scene.number) {
    case 1:
      return <OpeningVisual steps={steps} />;
    case 2:
      return <JourneyAudienceVisual steps={steps} />;
    case 4:
      return <ComparisonAudienceVisual steps={steps} />;
    case 5:
      return <VibeCodingAudienceVisual steps={steps} />;
    case 6:
      return <VibeWallAudienceVisual steps={steps} />;
    case 7:
      return <AnatomyVisual steps={steps} />;
    case 8:
      return <EngineeringAudienceVisual steps={steps} />;
    case 9:
      return <BoundaryAudienceVisual steps={steps} />;
    case 10:
      return <OrchestrationAudienceVisual steps={steps} />;
    case 11:
      return <ConceptualWorkflowAudienceVisual steps={steps} />;
    case 12:
      return <FinalVisual steps={steps} />;
    default:
      return <GenericVisual steps={steps} />;
  }
}
