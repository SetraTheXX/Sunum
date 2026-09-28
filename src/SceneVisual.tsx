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
  const definitions = [
    { label: 'MODEL', prefix: 'Model' },
    { label: 'PROMPT', prefix: 'Prompt' },
    { label: 'CONTEXT', prefix: 'Context' },
  ].flatMap(({ label, prefix }) => {
    const step = steps.find((candidate) => candidate.startsWith(`${prefix}:`));
    return step ? [{ label, description: unquote(removeLabel(step, prefix)) }] : [];
  });
  const sourceStep = steps.find((step) => step.startsWith('Context masası:'));
  const sources = sourceStep ? removeLabel(sourceStep, 'Context masası').split(/\s*\+\s*/).filter(Boolean) : [];
  const limitStep = steps.find((step) => step.startsWith('Alt cümle:'));
  const limit = limitStep ? unquote(removeLabel(limitStep, 'Alt cümle')) : '';

  return (
    <div className={`context-audience context-audience--${steps.length}`} data-reveal={steps.length}>
      {definitions.length > 0 && (
        <ol className="context-audience-definitions" aria-label="Model, prompt ve context ayrımı">
          {definitions.map(({ label, description }, index) => (
            <li className={index === definitions.length - 1 ? 'is-current' : ''} key={label}>
              <span className="primitive-label">{label}</span>
              <p>{description}</p>
            </li>
          ))}
        </ol>
      )}
      {sources.length > 0 && (
        <section className="context-audience-workbench" aria-label="Context masasına giren kaynaklar">
          <figure><img src={contextDeskArtwork} alt="İlgili bilgilerin çalışma masasına eklenmesini gösteren kavramsal çizim." /></figure>
          <div className="context-audience-sources">
            <span className="primitive-label">CONTEXT MASASI</span>
            <ul>{sources.map((source, index) => <li key={`${source}-${index}`}>{source}</li>)}</ul>
          </div>
        </section>
      )}
      {limit && (
        <blockquote className="context-audience-limit">
          <span className="primitive-label">ALT CÜMLE</span>
          <p>{limit}</p>
        </blockquote>
      )}
    </div>
  );
}

function ComparisonAudienceVisual({ steps }: { steps: string[] }) {
  const chatbotStep = steps.find((step) => step.startsWith('Chatbot:'));
  const agentStep = steps.find((step) => step.startsWith('Coding agent:'));
  const toolsStep = steps.find((step) => step.startsWith('Araç örnekleri:'));
  const noteStep = steps.find((step) => step.startsWith('Alt not:'));
  const chatbot = chatbotStep ? removeLabel(chatbotStep, 'Chatbot').split(/\s*→\s*/).filter(Boolean) : [];
  const agent = agentStep ? removeLabel(agentStep, 'Coding agent').split(/\s*→\s*/).filter(Boolean) : [];
  const tools = toolsStep ? removeLabel(toolsStep, 'Araç örnekleri').split(/\s*,\s*/).filter(Boolean) : [];
  const note = noteStep ? unquote(removeLabel(noteStep, 'Alt not')) : '';

  return (
    <div className={`comparison-audience comparison-audience--${steps.length}`} data-reveal={steps.length}>
      {chatbot.length > 0 && (
        <section className="comparison-audience-chatbot" aria-label="Chatbot akışı">
          <span className="primitive-label">CHATBOT</span>
          <AudienceRoute items={chatbot} label="Kullanıcıdan modele ve cevaba" />
        </section>
      )}
      {agent.length > 0 && (
        <section className="comparison-audience-agent" aria-label="Coding agent araç döngüsü">
          <span className="primitive-label">CODING AGENT</span>
          <AudienceRoute items={agent} label="Agent ve araç döngüsü" />
          {agent.length >= 6 && <span className="comparison-audience-return" aria-hidden="true">SONUÇ ↶ MODEL</span>}
        </section>
      )}
      {tools.length > 0 && (
        <aside className="comparison-audience-tools">
          <span className="primitive-label">ARAÇ ÖRNEKLERİ</span>
          <ul>{tools.map((tool) => <li key={tool}>{tool}</li>)}</ul>
        </aside>
      )}
      {note && (
        <blockquote className="comparison-audience-note">
          <span className="primitive-label">AYRIM</span>
          <p>{note}</p>
        </blockquote>
      )}
    </div>
  );
}

function VibeCodingAudienceVisual({ steps }: { steps: string[] }) {
  const requestStep = steps.find((step) => step.startsWith('Örnek istekler:'));
  const requests = requestStep ? removeLabel(requestStep, 'Örnek istekler').split(/\s*→\s*/).map(unquote) : [];
  const resultsVisible = steps.some((step) => step.startsWith('Her istekten sonra'));
  const noteStep = steps.find((step) => step.startsWith('Etiket:'));
  const note = noteStep ? unquote(removeLabel(noteStep, 'Etiket')) : '';
  const resultLabels = ['İlk sürüm görünür olur', 'Koyu tema görünür olur', 'Mobil düzen görünür olur'];
  const visibleRequests = resultsVisible ? requests : requests.slice(0, 1);

  return (
    <div className={`vibe-coding-audience vibe-coding-audience--${steps.length}`} data-reveal={steps.length}>
      {visibleRequests.length > 0 && (
        <ol className="vibe-coding-audience-prompts" aria-label="Üç örnek istek ve görünür değişiklik">
          {visibleRequests.map((request, index) => (
            <li key={`${request}-${index}`}>
              <span className="vibe-coding-audience-index">{String(index + 1).padStart(2, '0')}</span>
              <blockquote>{request}</blockquote>
              {resultsVisible && (
                <p className="vibe-coding-audience-result">
                  <span className="primitive-label">GÖRÜNÜR DEĞİŞİKLİK</span>
                  {resultLabels[index]}
                </p>
              )}
            </li>
          ))}
        </ol>
      )}
      {note && <p className="vibe-coding-audience-note">{note}</p>}
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
