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
  const questionsStep = steps.find((step) => step.startsWith('Sorular:'));
  const signalsStep = steps.find((step) => step.startsWith('İki ayrı işaret:'));
  const headline = headlineStep ? unquote(removeLabel(headlineStep, 'Büyük ifade')) : '';
  const [working, assurance] = headline.split(/\s*≠\s*/u);
  const questions = questionsStep ? removeLabel(questionsStep, 'Sorular').split(/(?<=\?)\s*/u).filter(Boolean) : [];
  const signals = signalsStep ? removeLabel(signalsStep, 'İki ayrı işaret').split(/\s*\/\s*/u).map(unquote) : [];

  return (
    <div className={`vibe-wall-audience vibe-wall-audience--${steps.length}`} data-reveal={steps.length}>
      {headline && (
        <div className="vibe-wall-audience-thesis" aria-label={headline}>
          <strong>{working}</strong><span>≠</span><strong>{assurance}</strong>
        </div>
      )}
      {questions.length > 0 && (
        <ol className="vibe-wall-audience-questions" aria-label="Görünen sonucun yanıtlamadığı sorular">
          {questions.map((question, index) => (
            <li key={`${question}-${index}`}><span>{String(index + 1).padStart(2, '0')}</span><p>{question}</p></li>
          ))}
        </ol>
      )}
      {signals.length > 0 && (
        <div className="vibe-wall-audience-signals" aria-label="Görünen sonuç ve doğrulama kanıtı">
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

function EngineeringAudienceVisual({ steps }: { steps: string[] }) {
  const flowStep = steps.find((step) => step.startsWith('Akış:'));
  const evidenceStep = steps.find((step) => step.startsWith('Üç kanıt noktası:'));
  const statementStep = steps.find((step) => step.startsWith('Son cümle:'));
  const flow = flowStep ? removeLabel(flowStep, 'Akış').split(/\s*→\s*/).filter(Boolean) : [];
  const evidence = evidenceStep ? removeLabel(evidenceStep, 'Üç kanıt noktası').split(/\s*,\s*/).filter(Boolean) : [];
  const statement = statementStep ? unquote(removeLabel(statementStep, 'Son cümle')) : '';
  const [formula, result] = statement.split(/\s*=\s*/u);
  const [change, proof] = (result ?? '').split(/\s*\+\s*/u);

  return (
    <div className={`engineering-audience engineering-audience--${steps.length}`} data-reveal={steps.length}>
      {flow.length > 0 && (
        <section aria-label="Hedeften Git'e çalışma akışı">
          <span className="primitive-label">ÇALIŞMA AKIŞI</span>
          <AudienceRoute items={flow} label="Hedeften Git'e sekiz adım" className="engineering-audience-route" />
        </section>
      )}
      {evidence.length > 0 && (
        <section className="engineering-audience-evidence" aria-label="Değişen dosyalar, test ve review kanıtı">
          <span className="primitive-label">KANIT NOKTALARI</span>
          <ol>{evidence.map((point, index) => <li key={point}><span>{String(index + 1).padStart(2, '0')}</span>{point}</li>)}</ol>
        </section>
      )}
      {statement && (
        <div className="engineering-audience-equation" aria-label={statement}>
          <strong>{formula}</strong><span>=</span><span>{change}</span><span>+</span><strong>{proof}</strong>
        </div>
      )}
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

const anatomyStageNodes = [
  { name: 'Model', x: 350, y: 240, width: 210, height: 76, optional: false },
  { name: 'Context', x: 350, y: 95, width: 210, height: 76, optional: false },
  { name: 'Project files', x: 40, y: 95, width: 210, height: 76, optional: false },
  { name: 'Instructions', x: 40, y: 240, width: 210, height: 76, optional: false },
  { name: 'Tools', x: 690, y: 240, width: 185, height: 76, optional: false },
  { name: 'Terminal', x: 690, y: 95, width: 185, height: 76, optional: false },
  { name: 'Skill', x: 40, y: 420, width: 185, height: 72, optional: true },
  { name: 'MCP', x: 365, y: 420, width: 185, height: 72, optional: true },
  { name: 'Git', x: 690, y: 420, width: 185, height: 72, optional: true },
] as const;

const anatomyStageEdges = [
  { from: 'Project files', to: 'Context', path: 'M250 133 H350', optional: false },
  { from: 'Instructions', to: 'Context', path: 'M250 278 C300 278 300 133 350 133', optional: false },
  { from: 'Context', to: 'Model', path: 'M455 171 V240', optional: false },
  { from: 'Model', to: 'Tools', path: 'M560 278 H690', optional: false },
  { from: 'Tools', to: 'Terminal', path: 'M782 240 V171', optional: false },
  { from: 'Skill', to: 'Instructions', path: 'M132 420 V316', optional: true },
  { from: 'MCP', to: 'Tools', path: 'M458 420 C520 375 620 355 690 278', optional: true },
  { from: 'Git', to: 'Project files', path: 'M690 456 C690 525 25 525 25 133 H40', optional: true },
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
  const revealedNames = new Set(parts.map(({ name }) => name));
  const summary = Boolean(equation);
  const currentPart = summary ? undefined : parts.at(-1);
  const stateFor = (name: string) => !revealedNames.has(name)
    ? 'is-pending'
    : name === currentPart?.name ? 'is-current' : 'is-revealed';

  return (
    <div className={`anatomy-audience${summary ? ' is-summary' : ''}`} data-reveal={summary ? 11 : parts.length + 1}>
      <p className="anatomy-audience-intro">{introduction}</p>
      <div className="anatomy-audience-layout">
        <svg className="anatomy-audience-map" viewBox="0 0 1000 550" role="img" aria-label="Örnek kurulum bileşenlerini ve aralarındaki ilişkileri gösteren kavramsal sistem haritası">
          <g className="anatomy-audience-links" fill="none" strokeLinecap="square">
            {anatomyStageEdges.map(({ from, to, path, optional }) => {
              const visible = revealedNames.has(from) && revealedNames.has(to);
              const active = currentPart && (currentPart.name === from || currentPart.name === to);
              return (
                <path
                  key={`${from}-${to}`}
                  d={path}
                  className={`${visible ? 'is-revealed' : 'is-pending'}${active ? ' is-current' : ''}${optional ? ' is-optional' : ''}`}
                />
              );
            })}
          </g>
          <g className="anatomy-audience-nodes">
            {anatomyStageNodes.map(({ name, x, y, width, height, optional }) => {
              const part = parts.find((candidate) => candidate.name === name);
              const state = summary ? 'is-revealed' : stateFor(name);
              return (
                <g key={name} className={`anatomy-audience-node ${state}${optional ? ' is-optional' : ''}`} transform={`translate(${x} ${y})`}>
                  <rect width={width} height={height} />
                  {part && <text className="anatomy-audience-index" x="14" y="27">{String(part.number).padStart(2, '0')}</text>}
                  <text className="anatomy-audience-name" x={part ? 43 : 16} y={optional ? 35 : 45}>{name}</text>
                  {optional && part && <text className="anatomy-audience-optional" x="14" y="57">İSTEĞE BAĞLI</text>}
                </g>
              );
            })}
          </g>
        </svg>
        <aside className="anatomy-audience-focus" aria-live="polite">
          {summary ? (
            <>
              <span className="primitive-label">SİSTEM ÖZETİ</span>
              <h2>{equation}</h2>
            </>
          ) : currentPart ? (
            <>
              <span className="primitive-label">{currentPart.optional ? 'İSTEĞE BAĞLI ÖRNEK' : `BİLEŞEN ${String(currentPart.number).padStart(2, '0')}`}</span>
              <h2>{currentPart.name}</h2>
              <p>{currentPart.description}</p>
            </>
          ) : (
            <>
              <span className="primitive-label">ÖRNEK KURULUM</span>
              <h2>Agent bileşenleri</h2>
            </>
          )}
        </aside>
      </div>
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
