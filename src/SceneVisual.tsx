import { Fragment } from 'react';
import type { Scene } from './content';

const journeyArtwork = new URL('../assets/phase-4/v2/journey-v2.svg', import.meta.url).href;
const contextDeskArtwork = new URL('../assets/phase-4/v2/context-desk-v2.svg', import.meta.url).href;
const anatomyArtwork = new URL('../assets/phase-4/v2/agent-anatomy-v2.svg', import.meta.url).href;

interface SceneVisualProps {
  scene: Scene;
  visibleSteps: number;
  audienceMode: boolean;
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

function FlowDiagram({ text }: { text: string }) {
  const parts = text.split(/\s*→\s*/).filter(Boolean);

  return (
    <div className="flow-diagram" role="list">
      {parts.map((part, index) => (
        <Fragment key={`${part}-${index}`}>
          {index > 0 && <span className="flow-arrow" aria-hidden="true">→</span>}
          <span className="flow-node" role="listitem">{part}</span>
        </Fragment>
      ))}
    </div>
  );
}

function OpeningVisual({ steps, audienceMode }: { steps: string[]; audienceMode: boolean }) {
  const question = steps.find((step) => step.startsWith('Büyük soru:'));
  const request = steps.find((step) => step.startsWith('Ardından tek istek:'));
  const sequence = steps.find((step) => step.startsWith('Basit sıra:'));
  const caution = steps.find((step) => step.startsWith('Alt mesaj:'));

  if (audienceMode) {
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

  return (
    <div className="opening-grid">
      <div className="opening-primary">
        {question && (
          <blockquote className="opening-quote">
            <span className="primitive-label">AÇILIŞ SORUSU</span>
            <p>{quotedText(removeLabel(question, 'Büyük soru'))}</p>
          </blockquote>
        )}
        {request && (
          <div className="terminal-block" aria-label="Örnek istek">
            <span className="terminal-label">İSTEK ÖRNEĞİ</span>
            <code><span aria-hidden="true">&gt;</span> {quotedText(removeLabel(request, 'Ardından tek istek'))}</code>
          </div>
        )}
      </div>
      <div className="opening-secondary">
        {sequence && (
          <div className="opening-flow">
            <span className="primitive-label">AKIŞ</span>
            <FlowDiagram text={removeLabel(sequence, 'Basit sıra')} />
          </div>
        )}
        {caution && (
          <aside className="opening-callout">
            <span className="primitive-label">AYRI SORULAR</span>
            <p>{removeLabel(caution, 'Alt mesaj')}</p>
          </aside>
        )}
      </div>
    </div>
  );
}

function EvolutionVisual({ steps }: { steps: string[] }) {
  const headings = steps.find((step) => step.startsWith('Üç başlık:'));
  const outputs = steps.find((step) => step.startsWith('Alt satırlar:'));
  const note = steps.find((step) => step.startsWith('Not:'));
  const stages = headings ? removeLabel(headings, 'Üç başlık').split(/\s*→\s*/).filter(Boolean) : [];
  const details = outputs ? removeLabel(outputs, 'Alt satırlar').split(/\s*→\s*/).filter(Boolean) : [];

  return (
    <div className="evolution-visual">
      <ol className="evolution-stages" aria-label="Üç çalışma biçimi">
        {stages.map((stage, index) => (
          <li key={`${stage}-${index}`}>
            <span className="evolution-index">{String(index + 1).padStart(2, '0')}</span>
            <h2>{stage}</h2>
            {details[index] && <p>{details[index]}</p>}
          </li>
        ))}
      </ol>
      {stages.length > 0 && (
        <figure className="evolution-artwork">
          <img src={journeyArtwork} alt="" />
        </figure>
      )}
      {note && <p className="evolution-note">{removeLabel(note, 'Not')}</p>}
    </div>
  );
}

function ModelContextVisual({ steps }: { steps: string[] }) {
  const definitions = [
    { label: 'MODEL', prefix: 'Model' },
    { label: 'PROMPT', prefix: 'Prompt' },
    { label: 'CONTEXT', prefix: 'Context' },
  ].flatMap(({ label, prefix }) => {
    const step = steps.find((candidate) => candidate.startsWith(`${prefix}:`));
    return step ? [{ label, description: unquote(removeLabel(step, prefix)) }] : [];
  });
  const contextStep = steps.find((step) => step.startsWith('Context masası:'));
  const sources = contextStep
    ? removeLabel(contextStep, 'Context masası').split(/\s*\+\s*/).filter(Boolean)
    : [];
  const limit = steps.find((step) => step.startsWith('Alt cümle:'));

  return (
    <div className="model-context-visual">
      <div className="context-definitions">
        {definitions.map(({ label, description }) => (
          <section className="context-definition" key={label}>
            <span className="primitive-label">{label}</span>
            <p>{description}</p>
          </section>
        ))}
      </div>
      {sources.length > 0 && (
        <div className="context-workbench">
          <figure className="context-artwork">
            <img src={contextDeskArtwork} alt="Prompt ve ilgili bilgilerin modelle ilişkisini gösteren çizim." />
          </figure>
          <section className="context-source-panel" aria-label="Context'e giren bilgiler">
            <span className="primitive-label">CONTEXT MASASI</span>
            <ul>
              {sources.map((source) => <li key={source}>{source}</li>)}
            </ul>
          </section>
        </div>
      )}
      {limit && <p className="context-limit">{unquote(removeLabel(limit, 'Alt cümle'))}</p>}
    </div>
  );
}

function ComparisonVisual({ steps }: { steps: string[] }) {
  const chatbot = steps.find((step) => step.startsWith('Chatbot:'));
  const agent = steps.find((step) => step.startsWith('Coding agent:'));
  const supportingNotes = steps.filter((step) =>
    step.startsWith('Araç örnekleri:') || step.startsWith('Alt not:'),
  );

  return (
    <div className="comparison-visual">
      <div className={`comparison-plate${agent ? ' has-agent' : ''}`}>
        {chatbot && (
          <section className="comparison-column" aria-label="Chatbot akışı">
            <h2>CHATBOT</h2>
            <FlowDiagram text={removeLabel(chatbot, 'Chatbot')} />
          </section>
        )}
        {agent && (
          <section className="comparison-column" aria-label="Coding agent akışı">
            <h2>CODING AGENT</h2>
            <FlowDiagram text={removeLabel(agent, 'Coding agent')} />
          </section>
        )}
      </div>
      {supportingNotes.length > 0 && (
        <div className="comparison-notes">
          {supportingNotes.map((note) => <p key={note}>{note}</p>)}
        </div>
      )}
    </div>
  );
}

function VibeCodingVisual({ steps }: { steps: string[] }) {
  const requestStep = steps.find((step) => step.startsWith('Örnek istekler:'));
  const requests = requestStep
    ? removeLabel(requestStep, 'Örnek istekler').split(/\s*→\s*/).map(unquote)
    : [];
  const resultsVisible = steps.some((step) => step.startsWith('Her istekten sonra'));
  const note = steps.find((step) => step.startsWith('Etiket:'));
  const resultLabels = ['İlk sürüm görünür olur', 'Koyu tema görünür olur', 'Mobil düzen görünür olur'];

  return (
    <div className="vibe-coding-visual">
      {requests.length > 0 && (
        <ol className="vibe-request-sequence" aria-label="Örnek fikirden prototipe istek akışı">
          {requests.map((request, index) => (
            <li className="vibe-request" key={`${request}-${index}`}>
              <span className="vibe-request-index">{String(index + 1).padStart(2, '0')}</span>
              <blockquote>{request}</blockquote>
              {resultsVisible && (
                <p className="vibe-visible-change">
                  <span className="primitive-label">GÖRÜNÜR DEĞİŞİKLİK</span>
                  {resultLabels[index] ?? 'Yeni bir sonuç görünür olur'}
                </p>
              )}
            </li>
          ))}
        </ol>
      )}
      {note && <p className="vibe-example-note">{unquote(removeLabel(note, 'Etiket'))}</p>}
    </div>
  );
}

function VibeWallVisual({ steps }: { steps: string[] }) {
  const headline = steps.find((step) => step.startsWith('Büyük ifade:'));
  const questionsStep = steps.find((step) => step.startsWith('Sorular:'));
  const signalsStep = steps.find((step) => step.startsWith('İki ayrı işaret:'));
  const questions = questionsStep
    ? removeLabel(questionsStep, 'Sorular').split(/(?<=\?)\s*/).filter(Boolean)
    : [];
  const signals = signalsStep
    ? removeLabel(signalsStep, 'İki ayrı işaret').split(/\s*\/\s*/).map(unquote)
    : [];

  return (
    <div className="vibe-wall-visual">
      <div className="vibe-wall-hero">
        {headline && <h2>{unquote(removeLabel(headline, 'Büyük ifade'))}</h2>}
      </div>
      {questions.length > 0 && (
        <ul className="vibe-wall-questions" aria-label="Görünen sonucun yanıtlamadığı sorular">
          {questions.map((question, index) => <li key={`${question}-${index}`}>{question}</li>)}
        </ul>
      )}
      {signals.length > 0 && (
        <div className="vibe-wall-signals" aria-label="Sonuç ile doğrulama kanıtı arasındaki ayrım">
          <section>
            <span className="primitive-label">GÖZLEM</span>
            <h3>{signals[0]}</h3>
            <p>Ekranın açılması, tek başına değişikliğin doğruluğunu göstermez.</p>
          </section>
          <section>
            <span className="primitive-label">KONTROL</span>
            <h3>{signals[1]}</h3>
            <p>Dosya farkı, test sonucu ve review birlikte daha iyi kanıt oluşturur.</p>
          </section>
        </div>
      )}
    </div>
  );
}

function EngineeringVisual({ steps }: { steps: string[] }) {
  const flow = steps.find((step) => step.startsWith('Akış:'));
  const evidenceStep = steps.find((step) => step.startsWith('Üç kanıt noktası:'));
  const evidence = evidenceStep
    ? removeLabel(evidenceStep, 'Üç kanıt noktası').split(/\s*,\s*/).filter(Boolean)
    : [];
  const statement = steps.find((step) => step.startsWith('Son cümle:'));

  return (
    <div className="engineering-visual">
      {flow && (
        <section className="engineering-sequence" aria-label="Hedeften Git'e çalışma akışı">
          <span className="primitive-label">ÇALIŞMA AKIŞI</span>
          <FlowDiagram text={removeLabel(flow, 'Akış')} />
        </section>
      )}
      {evidence.length > 0 && (
        <section className="engineering-evidence-section" aria-label="Üç doğrulanabilir kanıt noktası">
          <span className="primitive-label">KANIT NOKTALARI</span>
          <ol className="engineering-evidence">
            {evidence.map((point, index) => (
              <li key={`${point}-${index}`}>
                <span className="engineering-evidence-index">{String(index + 1).padStart(2, '0')}</span>
                <span>{point}</span>
              </li>
            ))}
          </ol>
        </section>
      )}
      {statement && <p className="engineering-statement">{unquote(removeLabel(statement, 'Son cümle'))}</p>}
    </div>
  );
}

function OrchestrationVisual({ steps }: { steps: string[] }) {
  const flow = steps.find((step) => step.startsWith('Akış:'));
  const roles = flow ? removeLabel(flow, 'Akış').split(/\s*→\s*/).filter(Boolean) : [];
  const qaStep = steps.find((step) => step.startsWith('QA sonucu:'));
  const outcomes = qaStep
    ? removeLabel(qaStep, 'QA sonucu').split(/\s*\/\s*/).map((outcome) => {
      const [status, ...target] = outcome.split(/\s*→\s*/);
      return { status, target: target.join(' → '), failed: status?.startsWith('FAIL') ?? false };
    })
    : [];
  const gitStep = steps.find((step) => step.startsWith('Git:'));

  return (
    <div className="orchestration-visual">
      {roles.length > 0 && (
        <section className="orchestration-route-section" aria-label="Handoff rolleri">
          <span className="primitive-label">ROL AKIŞI</span>
          <div className="orchestration-route" role="list">
            {roles.map((role, index) => {
              const conditional = role.includes('(gerektiğinde)');
              const name = conditional ? role.replace(/\s*\(gerektiğinde\)/, '') : role;
              return (
                <Fragment key={`${role}-${index}`}>
                  {index > 0 && <span className="orchestration-arrow" aria-hidden="true">→</span>}
                  <span className={`orchestration-role${conditional ? ' is-conditional' : ''}`} role="listitem">
                    <span>{name}</span>
                    {conditional && <span className="orchestration-condition">gerektiğinde</span>}
                  </span>
                </Fragment>
              );
            })}
          </div>
        </section>
      )}
      {outcomes.length > 0 && (
        <section className="orchestration-outcome-section" aria-label="QA sonucu ve geri dönüş yolu">
          <span className="primitive-label">QA SONUCU</span>
          <ul className="orchestration-outcomes">
            {outcomes.map(({ status, target, failed }) => (
              <li key={status} className={failed ? 'is-fail' : 'is-pass'}>
                <span className="orchestration-status">{status}</span>
                <span className="orchestration-outcome-arrow" aria-hidden="true">{failed ? '↶' : '→'}</span>
                <span>{target}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
      {gitStep && (
        <aside className="orchestration-git-note">
          <span className="primitive-label">GIT</span>
          <p>{removeLabel(gitStep, 'Git')}</p>
        </aside>
      )}
    </div>
  );
}

function AudienceRoute({
  items,
  activeIndex = -1,
  className = '',
  label,
}: {
  items: string[];
  activeIndex?: number;
  className?: string;
  label: string;
}) {
  return (
    <ol className={`audience-route audience-route--${items.length}${className ? ` ${className}` : ''}`} aria-label={label}>
      {items.map((item, index) => (
        <li className={index === activeIndex ? 'is-current' : ''} key={`${item}-${index}`}>
          <span className="audience-route-index">{String(index + 1).padStart(2, '0')}</span>
          <span className="audience-route-name">{item}</span>
        </li>
      ))}
    </ol>
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
    { tool: 'Agent ilgili dosyayı bulur, değiştirir ve farkı gösterir.', human: 'Değişikliği inceler, kabul eder veya düzeltirsin.', result: 'Elinde incelenecek bir değişiklik var.' },
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

function ContextAudienceVisual({ steps }: { steps: string[] }) {
  const sourceStep = steps.find((step) => step.startsWith('Context masası:'));
  const sources = sourceStep ? removeLabel(sourceStep, 'Context masası').split(/\s*\+\s*/).filter(Boolean).slice(1) : [];
  const limitStep = steps.find((step) => step.startsWith('Alt cümle:'));
  const limit = limitStep ? unquote(removeLabel(limitStep, 'Alt cümle')) : '';
  const reveal = steps.length;
  // The boundary widens as information is placed on the desk; source anchors stay fixed.
  const boundary = reveal === 3 ? { x: 440, y: 95, width: 400, height: 280 } : reveal === 4 ? { x: 300, y: 50, width: 680, height: 380 } : { x: 262, y: 22, width: 742, height: 428 };
  const linked = [
    { dot: [420, 140], edge: [544, 193], label: [322, 112, 'start'] },
    { dot: [900, 140], edge: [739, 199], label: [960, 112, 'end'] },
    { dot: [900, 330], edge: [739, 271], label: [900, 372, 'middle'] },
    { dot: [390, 330], edge: [541, 271], label: [390, 372, 'middle'] },
  ] as const;
  const visibleSources = sources.slice(0, reveal >= 5 ? 4 : reveal === 4 ? 3 : 0);

  return (
    <div className={`context-audience context-audience--${reveal}`} data-reveal={reveal}>
      <svg className="context-audience-system" viewBox="0 0 1200 470" role="img" aria-label={`Model: metni işleyen motor. ${reveal >= 2 ? 'Prompt: bu turdaki istek, ayrı bir girişten gelir. ' : ''}${reveal >= 3 ? 'Context: bu istekte modele sunulan bilginin sınırı. ' : ''}${visibleSources.length ? `Sınırın içine bağlanan bilgiler: ${visibleSources.join(', ')}. ` : ''}${reveal >= 5 ? 'Araç çıktısı araçla eklendi; sunulmayan bilgi sınırın dışında kalır ve görünmez.' : ''}`}>
        {reveal >= 3 && (
          <g className="context-audience-boundary">
            <rect x={boundary.x} y={boundary.y} width={boundary.width} height={boundary.height} rx="18" />
            <text x={boundary.x + 22} y={boundary.y + 7}>
              <tspan className="context-audience-kicker">CONTEXT</tspan>
              <tspan className="context-audience-small" dx="12">bu istekte sunulan bilgi</tspan>
            </text>
          </g>
        )}
        {reveal >= 2 && (
          <g className="context-audience-prompt">
            <text x="40" y="172" className="context-audience-kicker">PROMPT</text>
            <text x="40" y="205" className="context-audience-caption">Bu turdaki istek</text>
            <path d="M40 235 H525" />
            <path d="M525 235 l-14 -8 m14 8 l-14 8" />
          </g>
        )}
        {visibleSources.length > 0 && (
          <g className="context-audience-sources">
            {visibleSources.map((source, index) => {
              const { dot, edge, label } = linked[index];
              return (
                <g className={index === 3 ? 'context-audience-tool' : undefined} key={source}>
                  <path d={`M${dot[0]} ${dot[1]} L${edge[0]} ${edge[1]}`} />
                  <circle cx={dot[0]} cy={dot[1]} r="7" />
                  <text x={label[0]} y={label[1]} textAnchor={label[2]}>{source}</text>
                  {index === 3 && <text x={label[0]} y={label[1] + 27} textAnchor={label[2]} className="context-audience-small">araçla eklendi</text>}
                </g>
              );
            })}
          </g>
        )}
        <g className="context-audience-engine">
          <circle className="context-audience-engine-outer" cx="640" cy="235" r="105" />
          <circle className="context-audience-engine-inner" cx="640" cy="235" r="92" />
          <text x="640" y="229" className="context-audience-engine-name">MODEL</text>
          <text x="640" y="260" className="context-audience-engine-detail">Metni işler, çıktı üretir</text>
        </g>
        {reveal >= 5 && (
          <g className="context-audience-outside">
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
      <svg className="comparison-audience-system" viewBox="0 0 1200 470" role="img" aria-label={`Aynı istek iki çalışma biçiminde. Chatbot: istek modele gider, cevap sana döner; kopyalayıp projeye uygulayan sensin. ${reveal >= 2 ? 'Coding agent: istek agent ortamına gider; model araç çağırır, izinli araç projede değişiklik yapar, sonuç modele dönüp tekrar değerlendirilir. Hedef, izin ve son kontrol sende kalır. ' : ''}${tools.length ? `İzinli araç örnekleri: ${tools.join(', ')}. ` : ''}${reveal >= 4 ? 'Model aynı; onu projede çalıştıran ortam farklı.' : ''}`}>
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
            <text x="40" y="262" className="comparison-audience-kicker">CODING AGENT</text>
            <rect className="comparison-audience-person" x="40" y="300" width="120" height="64" rx="10" />
            <text x="100" y="340" className="comparison-audience-node">SEN</text>
            <text x="100" y="392" className="comparison-audience-small">hedef, izin ve</text>
            <text x="100" y="416" className="comparison-audience-small">son kontrol sende</text>
            <rect className={`comparison-audience-harness${reveal >= 4 ? ' is-emphasized' : ''}`} x="296" y="276" width="484" height="166" rx="14" />
            <text x="316" y="302" className="comparison-audience-kicker comparison-audience-harness-name">AGENT / HARNESS</text>
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
    { lines: ['Review edildi mi?'], text: [790, 396], anchor: [725, 390], side: 'start' },
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
  const [goal = 'Hedef', context = 'Context', plan = 'Plan', implement = 'Implement', test = 'Test', review = 'Review', verify = 'Verify', git = 'Git'] = flow;
  const [changedFiles = 'değişen dosyalar', testResult = 'test sonucu', reviewResult = 'review sonucu'] = evidence;
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
      <svg className="engineering-audience-system" viewBox="0 0 1200 490" role="img" aria-label={`Aynı görev: mobil menü telefonda açılmıyor; kabul koşulu telefonda menünün açılması ve masaüstünün değişmemesi. ${goal}, ${context} ve ${plan} netleşir. ${reveal >= 2 ? `${implement}: agent projede değişiklik yapar; ${changedFiles} ilk kanıt noktasıdır. ` : ''}${reveal >= 3 ? `${test}, ${review}, ${verify} ve ${git} sürecin kanıt noktalarıdır; burada sonuç gösterilmez. ` : ''}`}>
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
            <text x="425" y="212" className="engineering-audience-flow-label">agent</text>
            <rect className="engineering-audience-project" x="556" y="124" width="300" height="200" rx="12" />
            <text x="578" y="156" className="engineering-audience-kicker">PROJE</text>
            <rect className="engineering-audience-line" x="578" y="176" width="220" height="10" rx="5" />
            <rect className="engineering-audience-line is-changed" x="578" y="202" width="180" height="10" rx="5" />
            <rect className="engineering-audience-line is-changed" x="578" y="228" width="240" height="10" rx="5" />
            <rect className="engineering-audience-line" x="578" y="254" width="150" height="10" rx="5" />
            <rect className="engineering-audience-line" x="578" y="280" width="200" height="10" rx="5" />
            <text x="834" y="224" className="engineering-audience-mark">±</text>
            <text x="706" y="354" className="engineering-audience-caption">{implement} · agent değişikliği yapar</text>
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
  const note = noteStep ? unquote(removeLabel(noteStep, 'Alt not')) : '';
  const responsibilities = question.match(/Planlayan, yapan ve doğrulayan/u)?.[0].split(/,\s*|\s+ve\s+/u) ?? [];

  return (
    <div className={`boundary-audience boundary-audience--${steps.length}`} data-reveal={steps.length}>
      {question && <blockquote className="boundary-audience-question">{question}</blockquote>}
      {responsibilities.length > 0 && (
        <section className="boundary-audience-single" aria-label="Tek agent ile planlama, yapma ve doğrulama sorusu">
          <span className="primitive-label">AYNI İŞ ÇEVRİMİ</span>
          <AudienceRoute items={responsibilities} label="Planlayan, yapan ve doğrulayan" activeIndex={steps.length === 1 ? 1 : -1} />
        </section>
      )}
      {note && <aside className="boundary-audience-note">{note}</aside>}
    </div>
  );
}

function OrchestrationAudienceVisual({ steps }: { steps: string[] }) {
  const flowStep = steps.find((step) => step.startsWith('Akış:'));
  const qaStep = steps.find((step) => step.startsWith('QA sonucu:'));
  const gitStep = steps.find((step) => step.startsWith('Git:'));
  const roles = flowStep ? removeLabel(flowStep, 'Akış').split(/\s*→\s*/).filter(Boolean) : [];
  const outcomes = qaStep
    ? removeLabel(qaStep, 'QA sonucu').split(/\s*\/\s*/u).map((outcome) => {
      const [status, ...target] = outcome.split(/\s*→\s*/u);
      return { status, target: target.join(' → '), failed: status?.startsWith('FAIL') ?? false };
    })
    : [];
  const git = gitStep ? removeLabel(gitStep, 'Git') : '';

  return (
    <div className={`orchestration-audience orchestration-audience--${steps.length}`} data-reveal={steps.length}>
      {roles.length > 0 && (
        <section aria-label="Lead, Analyst, Developer ve QA handoff sırası">
          <span className="primitive-label">HANDOFF SIRASI</span>
          <AudienceRoute items={roles} label="Handoff rolleri" className="orchestration-audience-route" />
        </section>
      )}
      {outcomes.length > 0 && (
        <section className="orchestration-audience-outcomes" aria-label="QA sonucuna göre iki yol">
          <span className="primitive-label">QA SONUCU</span>
          <ul>{outcomes.map(({ status, target, failed }) => (
            <li className={failed ? 'is-fail' : 'is-pass'} key={status}>
              <strong>{status}</strong><span aria-hidden="true">{failed ? '↶' : '→'}</span><p>{target}</p>
            </li>
          ))}</ul>
        </section>
      )}
      {git && (
        <aside className="orchestration-audience-git">
          <span className="primitive-label">GIT</span><p>{git}</p>
        </aside>
      )}
    </div>
  );
}

function ConceptualWorkflowAudienceVisual({ steps }: { steps: string[] }) {
  const questionStep = steps.find((step) => step.startsWith('Soru:'));
  const flowStep = steps.find((step) => step.startsWith('Görev →'));
  const toolsStep = steps.find((step) => step.startsWith('Tools /'));
  const outcomesStep = steps.find((step) => step.startsWith('FAIL →'));
  const question = questionStep ? unquote(removeLabel(questionStep, 'Soru')) : '';
  const roles = flowStep ? flowStep.split(/\s*→\s*/u).filter(Boolean) : [];
  const [toolNames = '', qaName = ''] = toolsStep ? toolsStep.split(/\s*→\s*/u) : [];
  const tools = toolNames.split(/\s*\/\s*/u).filter(Boolean);
  const outcomes = outcomesStep ? outcomesStep.split(/\s*\|\s*/u).map((outcome) => {
    const [status, ...target] = outcome.split(/\s*→\s*/u);
    return { status, target: target.join(' → '), failed: status?.startsWith('FAIL') ?? false };
  }) : [];

  return (
    <div className={`workflow-audience workflow-audience--${steps.length}`} data-reveal={steps.length}>
      <div className="workflow-audience-concept-label" role="note">
        <span>KAVRAMSAL WORKFLOW</span>
        <strong>AUTHENTIC Vİ3ECODE EVIDENCE YOK</strong>
      </div>
      {question && <blockquote className="workflow-audience-question">{question}</blockquote>}
      {roles.length > 0 && (
        <section className="workflow-audience-roles" aria-label="Görev ve rol akışı">
          <span className="primitive-label">ROL AKIŞI · KAVRAMSAL ŞEMA</span>
          <AudienceRoute items={roles} label="Görevden Developer'a rol akışı" />
        </section>
      )}
      {tools.length > 0 && (
        <section className="workflow-audience-tools" aria-label="Kavramsal Tools, Terminal, değişiklik ve QA aşaması">
          <span className="primitive-label">ÇALIŞMA ADIMI · KAVRAMSAL</span>
          <ol>{tools.map((tool, index) => <li key={tool}><span>{String(index + 1).padStart(2, '0')}</span>{tool}</li>)}</ol>
          <span className="workflow-audience-tools-arrow" aria-hidden="true">→</span>
          <strong>{qaName}</strong>
        </section>
      )}
      {outcomes.length > 0 && (
        <section className="workflow-audience-outcomes" aria-label="Kavramsal QA dönüşleri">
          <span className="primitive-label">KAVRAMSAL QA DÖNÜŞÜ</span>
          <ul>{outcomes.map(({ status, target, failed }) => (
            <li className={failed ? 'is-fail' : 'is-pass'} key={status}>
              <strong>{status}</strong><span aria-hidden="true">{failed ? '↶' : '→'}</span><p>{target}</p>
            </li>
          ))}</ul>
        </section>
      )}
    </div>
  );
}

// One task runs through the system: person → task → context → model, with parts attached by what they do for that task.
const anatomyStageNodes = [
  { name: 'Context', x: 390, y: 215, width: 140, height: 60 },
  { name: 'Instructions', x: 380, y: 92, width: 160, height: 60 },
  { name: 'Project files', x: 380, y: 345, width: 160, height: 60 },
  { name: 'Tools', x: 760, y: 215, width: 130, height: 60 },
  { name: 'Terminal', x: 760, y: 345, width: 130, height: 60 },
  { name: 'Skill', x: 575, y: 92, width: 130, height: 60 },
  { name: 'MCP', x: 935, y: 215, width: 130, height: 60 },
  { name: 'Git', x: 215, y: 345, width: 130, height: 60 },
] as const;

const anatomyStageEdges = [
  { from: 'Sen', to: 'Görev', path: 'M190 245 H219' },
  { from: 'Görev', to: 'Model', path: 'M345 245 H566', when: (names: Set<string>) => !names.has('Context') },
  { from: 'Görev', to: 'Context', path: 'M345 245 H384' },
  { from: 'Context', to: 'Model', path: 'M530 245 H566' },
  { from: 'Instructions', to: 'Context', path: 'M460 152 V209' },
  { from: 'Project files', to: 'Context', path: 'M460 345 V281' },
  { from: 'Model', to: 'Tools', path: 'M688 234 H754' },
  { from: 'Tools', to: 'Model', path: 'M760 256 H694' },
  { from: 'Tools', to: 'Terminal', path: 'M825 275 V339' },
  { from: 'Terminal', to: 'Project files', path: 'M760 375 H546', label: 'değişiklik', labelAt: [650, 364] },
  { from: 'Skill', to: 'Instructions', path: 'M575 122 H546' },
  { from: 'MCP', to: 'Tools', path: 'M935 245 H896' },
  { from: 'Project files', to: 'Git', path: 'M380 375 H351' },
  { from: 'Git', to: 'Sen', path: 'M215 375 H115 V277', label: 'review · onay', labelAt: [168, 430] },
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
  const [, agentLabel, workflowLabel] = (equation ?? 'Model ≠ Agent ≠ Workflow').split(/\s*≠\s*/u);
  const modelPart = parts.find(({ name }) => name === 'Model');
  const caption = summary
    ? equation
    : currentPart
      ? `${currentPart.name} — ${currentPart.description}`
      : intro;

  return (
    <div className={`anatomy-audience${summary ? ' is-summary' : ''}`} data-reveal={summary ? 11 : parts.length + 1}>
      <svg className="anatomy-audience-map" viewBox="0 0 1200 490" role="img" aria-label={`Aynı görev etrafında çalışan örnek agent kurulumu. Görünen parçalar: ${[...names].join(', ')}. ${optionalNames.size ? `${[...optionalNames].join(', ')} kullanılıyorsa eklenir; zorunlu değildir. ` : ''}${summary ? `${equation}: model motor, agent onu araç ve bağlamla çalıştıran ortam, workflow insan kontrolüyle birlikte bütün süreç.` : ''}`}>
        <defs>
          <marker id="anatomy-audience-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path className="anatomy-audience-arrow" d="M0 0 L10 5 L0 10 z" /></marker>
          <marker id="anatomy-audience-arrow-current" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path className="anatomy-audience-arrow is-current" d="M0 0 L10 5 L0 10 z" /></marker>
        </defs>
        {summary && (
          <g className="anatomy-audience-layers">
            <rect className="anatomy-audience-workflow" x="20" y="18" width="1160" height="462" rx="24" />
            <rect className="anatomy-audience-legend" x="36" y="4" width="360" height="28" />
            <text x="48" y="25"><tspan className="anatomy-audience-kicker is-workflow">{workflowLabel.toLocaleUpperCase('tr-TR')}</tspan><tspan className="anatomy-audience-small" dx="10">görev, agent ve insan kontrolü</tspan></text>
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

function AnatomyVisual({ steps, audienceMode }: { steps: string[]; audienceMode: boolean }) {
  const introduction = steps[0];
  const equationStep = steps.find((step) => step.startsWith('Alt cümle:'));
  const parts = steps
    .slice(1)
    .filter((step) => !step.startsWith('Alt cümle:'))
    .map((part, index) => {
      const [name, ...description] = part.split(' — ');
      return {
        part,
        name,
        description: description.join(' — '),
        number: index + 1,
        optional: ['Skill', 'MCP', 'Git'].includes(name),
      };
    });
  const exampleParts = parts.filter((part) => !part.optional);
  const optionalParts = parts.filter((part) => part.optional);
  const currentPartNumber = parts.at(-1)?.number;

  if (audienceMode) {
    return (
      <AnatomyAudienceVisual
        introduction={introduction ?? ''}
        parts={parts}
        equation={equationStep ? unquote(removeLabel(equationStep, 'Alt cümle')) : undefined}
      />
    );
  }

  const renderParts = (items: typeof parts, className: string) => (
    <ol className={`anatomy-map ${className}`}>
      {items.map(({ part, name, description, number, optional }) => (
        <li key={part} className={`${number === currentPartNumber ? 'is-current' : ''}${optional ? ' is-optional' : ''}`}>
          <span className="anatomy-index">{String(number).padStart(2, '0')}</span>
          <div>
            <h3>{name}</h3>
            <p>{description}</p>
          </div>
        </li>
      ))}
    </ol>
  );

  return (
    <div className="anatomy-visual">
      {introduction && <p className="anatomy-intro">{introduction}</p>}
      {exampleParts.length > 0 && (
        <section className="anatomy-group" aria-label="Örnek kurulum parçaları">
          <div className="anatomy-group-heading">
            <span className="primitive-label">ÖRNEK KURULUM</span>
            <h2>Çalışma parçaları</h2>
          </div>
          {renderParts(exampleParts, 'anatomy-map--example')}
        </section>
      )}
      {optionalParts.length > 0 && (
        <section className="anatomy-group anatomy-group--optional" aria-label="İsteğe bağlı örnek bileşenler">
          <div className="anatomy-group-heading">
            <span className="primitive-label">İSTEĞE BAĞLI ÖRNEKLER</span>
            <h2>İhtiyaca göre eklenir</h2>
          </div>
          {renderParts(optionalParts, 'anatomy-map--optional')}
        </section>
      )}
      {equationStep && (
        <div className="anatomy-summary">
          <p className="anatomy-equation">{unquote(removeLabel(equationStep, 'Alt cümle'))}</p>
          <img
            className="anatomy-diagram"
            src={anatomyArtwork}
            alt="Şematik agent anatomisi: dosyalar ve talimatlar context'e, model araçlar ve terminalle çalışır; sonuçlar context'e döner. Skill, MCP ve Git isteğe bağlıdır."
            width="1320"
            height="760"
          />
        </div>
      )}
    </div>
  );
}

function FinalVisual({ steps, audienceMode }: { steps: string[]; audienceMode: boolean }) {
  const answer = steps[0]?.split(' — ');
  const trust = steps[1]?.split(' — ');
  const finalText = steps[2]?.match(/[“"](.+?)[”"]/u)?.[1];
  const [firstLine, secondLine] = finalText?.split(', ') ?? [];

  if (audienceMode) {
    const systemParts = trust ? trust.slice(1).join(' — ').split(/\s*\+\s*/).filter(Boolean) : [];
    return (
      <div className={`final-audience final-audience--${steps.length}`} data-reveal={steps.length}>
        {answer && (
          <div className="final-audience-answer">
            <span className="primitive-label">{unquote(answer[0])}</span>
            <strong>{answer.slice(1).join(' — ')}</strong>
          </div>
        )}
        {trust && (
          <section className="final-audience-system" aria-label={trust.join(' ')}>
            <span className="primitive-label">{unquote(trust[0])}</span>
            <ol>
              {systemParts.map((part, index) => (
                <li key={`${part}-${index}`}>
                  {index > 0 && <span className="final-audience-plus" aria-hidden="true">+</span>}
                  <span>{part}</span>
                </li>
              ))}
            </ol>
          </section>
        )}
        {finalText && (
          <div className="final-audience-thesis" aria-label={finalText}>
            <span>{firstLine},</span>
            <strong>{secondLine}</strong>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="final-visual">
      {answer && (
        <div className="final-answer">
          <p>{unquote(answer[0])}</p>
          <strong>{answer.slice(1).join(' — ')}</strong>
        </div>
      )}
      {trust && (
        <div className="final-support">
          <p>{unquote(trust[0])}</p>
          <strong>{trust.slice(1).join(' — ')}</strong>
        </div>
      )}
      {finalText && (
        <div className="final-statement" aria-label={finalText}>
          <span>{firstLine},</span>
          <strong> {secondLine}</strong>
        </div>
      )}
    </div>
  );
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

export default function SceneVisual({ scene, visibleSteps, audienceMode }: SceneVisualProps) {
  const steps = scene.screenSteps.slice(0, visibleSteps);

  switch (scene.number) {
    case 1:
      return <OpeningVisual steps={steps} audienceMode={audienceMode} />;
    case 2:
      return audienceMode ? <JourneyAudienceVisual steps={steps} /> : <EvolutionVisual steps={steps} />;
    case 3:
      return audienceMode ? <ContextAudienceVisual steps={steps} /> : <ModelContextVisual steps={steps} />;
    case 4:
      return audienceMode ? <ComparisonAudienceVisual steps={steps} /> : <ComparisonVisual steps={steps} />;
    case 5:
      return audienceMode ? <VibeCodingAudienceVisual steps={steps} /> : <VibeCodingVisual steps={steps} />;
    case 6:
      return audienceMode ? <VibeWallAudienceVisual steps={steps} /> : <VibeWallVisual steps={steps} />;
    case 7:
      return <AnatomyVisual steps={steps} audienceMode={audienceMode} />;
    case 8:
      return audienceMode ? <EngineeringAudienceVisual steps={steps} /> : <EngineeringVisual steps={steps} />;
    case 9:
      return audienceMode ? <BoundaryAudienceVisual steps={steps} /> : <GenericVisual steps={steps} />;
    case 10:
      return audienceMode ? <OrchestrationAudienceVisual steps={steps} /> : <OrchestrationVisual steps={steps} />;
    case 11:
      return audienceMode ? <ConceptualWorkflowAudienceVisual steps={steps} /> : <GenericVisual steps={steps} />;
    case 12:
      return <FinalVisual steps={steps} audienceMode={audienceMode} />;
    default:
      return <GenericVisual steps={steps} />;
  }
}
