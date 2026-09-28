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
    const [executionQuestion, reliabilityQuestion] = cautionText.split(' ile ');
    const separation = reliabilityQuestion?.match(/(.+?)\s+(ayrı sorulardır\.?$)/u);

    return (
      <div className={`opening-audience opening-audience--${steps.length}`} data-reveal={steps.length}>
        {questionText && (
          <blockquote className="opening-audience-question">
            <span className="primitive-label">AÇILIŞ SORUSU</span>
            <p>{questionText}</p>
          </blockquote>
        )}
        {requestText && (
          <div className="opening-audience-request">
            <span className="primitive-label">İSTEK ÖRNEĞİ</span>
            <blockquote>{requestText}</blockquote>
          </div>
        )}
        {sequenceParts.length > 0 && (
          <section className="opening-audience-sequence" aria-label="İstekten çalışan sonuca örnek sıra">
            <span className="primitive-label">ÇALIŞMA SIRASI</span>
            <ol>
              {sequenceParts.map((part, index) => (
                <li key={`${part}-${index}`} className={index === sequenceParts.length - 1 ? 'is-current' : ''}>
                  <span className="opening-audience-index">{String(index + 1).padStart(2, '0')}</span>
                  <span>{part}</span>
                </li>
              ))}
            </ol>
          </section>
        )}
        {cautionText && (
          <aside className="opening-audience-check" aria-label={cautionText}>
            <span className="primitive-label">AYRI SORULAR</span>
            <div>
              <p>{executionQuestion}</p>
              <p>{separation?.[1] ? `${separation[1].charAt(0).toUpperCase()}${separation[1].slice(1)}` : reliabilityQuestion}</p>
            </div>
            <span className="opening-audience-separation">{separation?.[2] ?? ''}</span>
          </aside>
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
      return <EvolutionVisual steps={steps} />;
    case 3:
      return <ModelContextVisual steps={steps} />;
    case 4:
      return <ComparisonVisual steps={steps} />;
    case 5:
      return <VibeCodingVisual steps={steps} />;
    case 6:
      return <VibeWallVisual steps={steps} />;
    case 7:
      return <AnatomyVisual steps={steps} audienceMode={audienceMode} />;
    case 8:
      return <EngineeringVisual steps={steps} />;
    case 10:
      return <OrchestrationVisual steps={steps} />;
    case 12:
      return <FinalVisual steps={steps} audienceMode={audienceMode} />;
    default:
      return <GenericVisual steps={steps} />;
  }
}
