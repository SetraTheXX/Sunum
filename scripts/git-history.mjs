// Builds src/data/gitHistory.json from this repository's real Git history (runs before dev/build).
// Privacy: author e-mails are never requested; any e-mail-like text and secret-like strings are masked.
// Where Git or the history is unavailable (e.g. a shallow CI checkout), the committed JSON is kept as is.
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const out = resolve(root, 'src/data/gitHistory.json');

// Milestones and the two real diff excerpts shown on screen.
const milestones = ['v1-sunum-final', 'v2-motion-demo'];
const snippetSources = [
  { sha: '9aee045', file: 'src/App.tsx', note: 'Klavye: odaktaki düğmede sunum kısayolları devre dışı' },
  { sha: '91d6f34', file: 'scenes/08-agentic-engineering.md', match: /^[-+]Adım [45] — Video/, note: 'İnceleme: video adımı numarası düzeltildi' },
];

const EMAIL = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g;
const SECRET = /(sk-[A-Za-z0-9]{16,}|ghp_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,}|AKIA[0-9A-Z]{16}|xox[bp]-[A-Za-z0-9-]+)/g;
const clean = (text) => text.replace(EMAIL, '[e-posta]').replace(SECRET, '[gizli]');
const git = (...args) => execFileSync('git', args, { cwd: root, encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 });

function keepExisting(reason) {
  console.log(`git-history: ${reason}; ${existsSync(out) ? 'keeping the committed file' : 'no data file written'}.`);
  process.exit(0);
}

let raw;
try {
  if (git('rev-parse', '--is-shallow-repository').trim() === 'true') keepExisting('shallow checkout');
  // %x1f separates fields; %(trailers) gives co-author names only (valueonly, e-mails stripped below).
  raw = git('log', '--reverse', '--numstat', '--format=%x1e%h%x1f%aI%x1f%an%x1f%s%x1f%(trailers:key=Co-Authored-By,valueonly,separator=%x1d)');
} catch {
  keepExisting('git unavailable');
}

const tagOf = new Map();
for (const name of milestones) {
  try {
    const sha = git('rev-parse', '--short=7', `${name}^{}`).trim();
    const message = git('tag', '-l', '--format=%(contents:subject)', name).trim();
    tagOf.set(sha, { name, message: clean(message) });
  } catch {
    // A missing tag is simply not shown.
  }
}

let insertions = 0;
let deletions = 0;
const touched = new Set();
const commits = raw.split('\x1e').filter((chunk) => chunk.trim()).map((chunk) => {
  const [header, ...stat] = chunk.split('\n');
  const [sha, date, author, subject, trailers] = header.split('\x1f');
  let added = 0;
  let removed = 0;
  let files = 0;
  for (const line of stat) {
    const [a, d, file] = line.split('\t');
    if (!file) continue;
    files += 1;
    touched.add(file);
    added += Number(a) || 0;
    removed += Number(d) || 0;
  }
  insertions += added;
  deletions += removed;
  const type = subject.match(/^(feat|fix|docs|test|style|chore|refactor)(\(|:)/)?.[1] ?? 'değişiklik';
  return {
    sha,
    date,
    author: clean(author),
    coAuthors: (trailers ?? '').split('\x1d').map((name) => clean(name.replace(/<[^>]*>/g, '').trim())).filter(Boolean),
    subject: clean(subject),
    type,
    insertions: added,
    deletions: removed,
    files,
    lines: insertions - deletions,
    tag: tagOf.get(sha)?.name ?? null,
  };
});

function snippet({ sha, file, match, note }) {
  try {
    const diff = git('show', '--format=', '--unified=1', sha, '--', file).split('\n');
    const body = diff.filter((line) => /^[-+ ]/.test(line) && !/^(\+\+\+|---) /.test(line));
    const start = match ? Math.max(0, body.findIndex((line) => match.test(line))) : Math.max(0, body.findIndex((line) => /^[-+]/.test(line)) - 1);
    // Up to four lines from the change; blank context lines at the end are dropped.
    const picked = body.slice(start, start + 4);
    while (picked.length && !picked.at(-1).trim()) picked.pop();
    const lines = picked.map((line) => clean(line.length > 96 ? `${line.slice(0, 95)}…` : line));
    return { sha, file, note, lines };
  } catch {
    return null;
  }
}

const data = {
  source: 'git log (yerel depo)',
  generated: commits.at(-1)?.date ?? null,
  first: commits[0]?.date ?? null,
  last: commits.at(-1)?.date ?? null,
  totals: { commits: commits.length, insertions, deletions, files: touched.size },
  milestones: [...tagOf.entries()].map(([sha, tag]) => ({ ...tag, sha })),
  commits,
  snippets: snippetSources.map(snippet).filter(Boolean),
};

const text = `${JSON.stringify(data, null, 2)}\n`;
if (EMAIL.test(text.replace(/\[e-posta\]/g, ''))) throw new Error('git-history: e-mail left in output');
mkdirSync(dirname(out), { recursive: true });
if (!existsSync(out) || readFileSync(out, 'utf8') !== text) writeFileSync(out, text);
console.log(`git-history: ${commits.length} commits, +${insertions} −${deletions}, ${touched.size} files, ${data.milestones.length} milestones.`);
