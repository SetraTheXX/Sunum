export interface Scene {
  number: number;
  title: string;
  duration: string;
  required: boolean;
  purpose: string;
  takeaway: string;
  screenSteps: string[];
  speakerNotes: string[];
  transition: string;
}

const markdownFiles = import.meta.glob('../scenes/[0-9][0-9]-*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

function cleanInlineMarkdown(text: string): string {
  return text
    .trim()
    .replace(/^[-*+]\s+|^\d+\.\s+/, '')
    .replace(/^>\s?/, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1');
}

function sectionsOf(markdown: string): Map<string, string[]> {
  const sections = new Map<string, string[]>();
  let currentSection = '';

  for (const line of markdown.replace(/\r/g, '').split('\n')) {
    const heading = line.match(/^##\s+(.+)$/);
    if (heading) {
      currentSection = heading[1].trim();
      sections.set(currentSection, []);
      continue;
    }
    if (currentSection) sections.get(currentSection)?.push(line);
  }

  return sections;
}

function contentBlocks(lines: string[]): string[] {
  const blocks: string[] = [];
  let paragraph: string[] = [];

  const flushParagraph = () => {
    if (!paragraph.length) return;
    blocks.push(cleanInlineMarkdown(paragraph.join(' ')));
    paragraph = [];
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      flushParagraph();
      continue;
    }

    if (/^(?:[-*+]\s+|\d+\.\s+)/.test(trimmed)) {
      flushParagraph();
      blocks.push(cleanInlineMarkdown(trimmed));
      continue;
    }

    if (/^```/.test(trimmed)) {
      flushParagraph();
      continue;
    }

    paragraph.push(trimmed);
  }

  flushParagraph();
  return blocks.filter(Boolean);
}

function parseScene(markdown: string): Scene {
  const titleMatch = markdown.match(/^#\s+(\d{2})\s+[—-]\s+(.+)$/m);
  const statusMatch = markdown.match(/^\*\*Durum:\*\*\s*(.+)$/m);
  const durationMatch = markdown.match(/^\*\*Tahmini süre:\*\*\s*(.+)$/m);
  if (!titleMatch) throw new Error('Sahne belgesinde numaralı başlık bulunamadı.');

  const sections = sectionsOf(markdown);
  const section = (name: string) => sections.get(name) ?? [];
  const plainText = (name: string) => contentBlocks(section(name)).join(' ');
  const speakerText = section('Konuşmacı').join('\n').trim();

  return {
    number: Number(titleMatch[1]),
    title: titleMatch[2].trim(),
    duration: durationMatch?.[1].trim() ?? '—',
    required: statusMatch?.[1].startsWith('Must') ?? true,
    purpose: plainText('Amaç'),
    takeaway: plainText('İzleyicinin bu sahneden çıkarken anlayacağı tek şey'),
    screenSteps: contentBlocks(section('Ekranda')),
    speakerNotes: speakerText
      .split(/\n\s*\n/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean),
    transition: plainText('Geçiş'),
  };
}

export const scenes = Object.entries(markdownFiles)
  .map(([, markdown]) => parseScene(markdown))
  .sort((left, right) => left.number - right.number);

export function scenesForMode(mode: 30 | 45 | 60): Scene[] {
  return mode === 30 ? scenes.filter((scene) => scene.required) : scenes;
}

if (scenes.length !== 12 || scenes.some((scene, index) => scene.number !== index + 1)) {
  throw new Error('30 dakikalık rota, 01–12 arasındaki 12 sahneyi içermelidir.');
}
