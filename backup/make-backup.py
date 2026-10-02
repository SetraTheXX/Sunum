"""Builds backup/Sunum-final-backup.zip from tracked sources, dist/ and the four scene videos.

Only an explicit allowlist is packed: no .git, node_modules, .vercel, .env or local tool folders.
Run from the repo root after `npm run build`:  python backup/make-backup.py
"""
import hashlib
import argparse
import os
import re
import zipfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--output', default='Sunum-final-backup.zip', help='New ZIP filename inside backup/; existing files are never overwritten.')
args = parser.parse_args()
if os.path.basename(args.output) != args.output or not args.output.lower().endswith('.zip'):
    parser.error('--output must be a ZIP filename, without directories')
OUT = os.path.join(ROOT, 'backup', args.output)
PREFIX = 'Sunum-final-backup/'

FILES = [
    'index.html', 'package.json', 'package-lock.json', 'tsconfig.json', 'vite.config.ts',
    'README.md', 'FINAL_KONUSMA_AKISI.md', 'DESIGN_PRINCIPLES.md',
    'Sifirdan_Agentic_Yazilim_Gelistirme_Sunum_PRD.md', 'Sifirdan_Agentic_Yazilim_Gelistirme_Sunum_Roadmap.md',
    'scripts/git-history.mjs', 'scripts/verify-replay-media.py', 'scripts/verify-usb-v3.py',
    'demo/README.md', 'demo/reset.ps1', 'demo/serve.ps1',
    'sources/phase-11/rehearsal-sheet.md',
]
DIRS = ['src', 'scenes', 'dist', 'assets/video-posters', 'demo/template']
VIDEOS = [
    'assets/video-drafts/scene-04-chatbot-final-20260928.mp4',
    'assets/video-drafts/scene-05-codex-cli-draft-20260928.mp4',
    'assets/video-drafts/scene-08-codex-app-draft-20260928.mp4',
    'assets/video-drafts/scene-11-vi3ecode-draft-20260928.mp4',
]
REPLAYS = [
    'assets/replays/scene08-real-final-20261002.mp4',
    'assets/replays/scene11-real-readable-20261002.mp4',
]
VIDEO_NAMES = {
    VIDEOS[0]: 'scene-04-chatbot.mp4',
    VIDEOS[1]: 'scene-05-terminal-ajani.mp4',
    VIDEOS[2]: 'scene-08-masaustu-ajan.mp4',
    VIDEOS[3]: 'scene-11-ajan-takimi.mp4',
}
EXTRA = ['backup/README-OFFLINE.txt', 'backup/VERCEL-URL.txt', 'backup/Start-Sunum.bat']
OFFLINE = ['backup/offline/serve.ps1']
BLOCKED = ('.env', '.vercel', 'node_modules', '.git')

# This deck emits one entry JS and one CSS; reject accumulated outputs before packing.
with open(os.path.join(ROOT, 'dist', 'index.html'), encoding='utf-8') as entry:
    referenced = set(re.findall(r'(?:src|href)="/([^"?#]+\.(?:js|css))"', entry.read()))
emitted = {os.path.relpath(os.path.join(base, name), os.path.join(ROOT, 'dist')).replace('\\', '/')
           for base, _, names in os.walk(os.path.join(ROOT, 'dist'))
           for name in names if name.endswith(('.js', '.css'))}
if not referenced or emitted != referenced:
    raise SystemExit('dist contains unreferenced JS/CSS; create a clean build before packaging')


def add(zf, src, arc):
    parts = arc.replace('\\', '/').split('/')
    assert not any(p.startswith(BLOCKED) for p in parts), arc
    zf.write(os.path.join(ROOT, src), PREFIX + arc)


with zipfile.ZipFile(OUT, 'x', zipfile.ZIP_DEFLATED) as zf:
    for f in FILES:
        add(zf, f, f)
    for d in DIRS:
        for base, _, names in os.walk(os.path.join(ROOT, d)):
            for name in sorted(names):
                rel = os.path.relpath(os.path.join(base, name), ROOT).replace('\\', '/')
                add(zf, rel, rel)
    # The app build reads videos from assets/video-drafts; videos/ holds the same four files under readable names.
    for v in VIDEOS:
        add(zf, v, v)
        add(zf, v, 'videos/' + VIDEO_NAMES[v])
    for replay in REPLAYS:
        add(zf, replay, replay)
    for e in EXTRA:
        add(zf, e, os.path.basename(e))
    for o in OFFLINE:
        add(zf, o, 'offline/' + os.path.basename(o))
    # Hash list for the launcher files so the copy on the USB stick can be checked against this build.
    sums = ''.join(f"{hashlib.sha256(open(os.path.join(ROOT, f), 'rb').read()).hexdigest()}  {name}\r\n"
                   for f, name in [('backup/Start-Sunum.bat', 'Start-Sunum.bat'), ('backup/offline/serve.ps1', 'offline/serve.ps1')])
    zf.writestr(PREFIX + 'offline/SHA256SUMS.txt', sums)

with zipfile.ZipFile(OUT) as zf:
    names = zf.namelist()
digest = hashlib.sha256(open(OUT, 'rb').read()).hexdigest()
print(f'{OUT}\n{len(names)} entries, {os.path.getsize(OUT) / 1e6:.1f} MB, sha256 {digest}')
