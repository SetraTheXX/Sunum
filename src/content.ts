export interface Scene {
  number: number;
  title: string;
  purpose: string;
  takeaway: string;
  screenSteps: string[];
  speakerNotes: string[];
  videoNotes: string[];
  liveDemo: string[];
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
  if (!titleMatch) throw new Error('Sahne belgesinde numaralı başlık bulunamadı.');

  const sections = sectionsOf(markdown);
  const section = (name: string) => sections.get(name) ?? [];
  const plainText = (name: string) => contentBlocks(section(name)).join(' ');
  const paragraphs = (name: string) => section(name)
    .join('\n')
    .trim()
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return {
    number: Number(titleMatch[1]),
    title: titleMatch[2].trim(),
    purpose: plainText('Ana fikir'),
    takeaway: plainText('İzleyicinin bu sahneden çıkarken anlayacağı tek şey'),
    screenSteps: contentBlocks(section('Ekranda')),
    speakerNotes: paragraphs('Konuşmacı'),
    videoNotes: paragraphs('Video'),
    liveDemo: paragraphs('Canlı demo'),
    transition: plainText('Geçiş'),
  };
}

export const scenes = Object.entries(markdownFiles)
  .map(([, markdown]) => parseScene(markdown))
  .sort((left, right) => left.number - right.number);

if (scenes.length !== 12 || scenes.some((scene, index) => scene.number !== index + 1)) {
  throw new Error('Sunum akışı, 01–12 arasındaki 12 sahneyi içermelidir.');
}
