"""Local V3 acceptance checks; requires the existing Python Playwright environment."""
import json, re, sys
from pathlib import Path
from playwright.sync_api import sync_playwright, expect

ROOT = Path(__file__).resolve().parents[1]
BASE = sys.argv[1] if len(sys.argv) > 1 else 'http://localhost:4173'
OUT = ROOT / 'sources/v3'
OUT.mkdir(parents=True, exist_ok=True)
SHOTS = ROOT / 'screenshots/v3'
SHOTS.mkdir(parents=True, exist_ok=True)
patterns = {
    'email': r'[\w.+%-]+@[\w.-]+\.[A-Za-z]{2,}',
    'user_path': r'(?i)(?:[a-z]:[\\/]+Users[\\/]+|/c/Users/|/Users/|/home/)[^\s/\\]+',
    'secret': r'(?i)(?:sk-[A-Za-z0-9_-]+|ghp_[A-Za-z0-9]+|Bearer\s+\S+|\b[a-f0-9]{32,}\b|\b[A-Za-z0-9+/]{64,}={0,2})',
}
report = {'privacy': {}, 'replays': [], 'videos': [], 'routes': {}, 'screenshots': [], 'errors': [], 'externalRequests': []}
for path in sorted((ROOT / 'src/data/replays').glob('*.json')):
    raw = path.read_text(encoding='utf-8')
    report['privacy'][path.name] = {name: len(re.findall(pattern, raw)) for name, pattern in patterns.items()}
    assert not any(report['privacy'][path.name].values()), report['privacy']
    data = json.loads(raw)
    assert 60000 <= sum(x['durationMs'] for x in data['events']) <= 90000

def state(page):
    return page.evaluate('() => [Number(new URLSearchParams(location.search).get("scene")), Number(new URLSearchParams(location.search).get("step"))]')

with sync_playwright() as pw:
    browser = pw.chromium.launch(headless=True, channel='msedge')
    ctx = browser.new_context(viewport={'width':1366,'height':768})
    ctx.on('request', lambda r: report['externalRequests'].append(r.url) if not r.url.startswith(BASE) and not r.url.startswith(('data:', 'blob:')) else None)
    ctx.on('page', lambda p: p.on('pageerror', lambda e: report['errors'].append(str(e))))
    page = ctx.new_page()
    # Advance the real event timers using Playwright's virtual clock.
    for scene,step in ((8,4),(11,5)):
        timed = ctx.new_page()
        timed.clock.install()
        timed.goto(f'{BASE}/?scene={scene}&step={step}')
        timed.clock.run_for(100)
        data = json.loads((ROOT/f'src/data/replays/scene{scene:02}.json').read_text(encoding='utf-8'))
        timed.keyboard.press('Space')
        timed.clock.run_for(100)
        for index,item in enumerate(data['events']):
            expect(timed.locator('.transcript-replay')).to_have_attribute('data-event', str(index))
            timed.clock.run_for(item['durationMs'] + 20)
        expect(timed.locator('.transcript-replay')).to_have_attribute('data-playing', 'false')
        report['replays'].append(f'{scene}: complete timed playback {sum(x["durationMs"] for x in data["events"])/1000}s PASS (virtual clock)')
        timed.close()
    for view in ('presenter','audience'):
        q = '&view=audience' if view == 'audience' else ''
        page.goto(BASE+'/?scene=1&step=1'+q)
        seen = [state(page)]
        for _ in range(60):
            page.keyboard.press('ArrowRight')
            cur = state(page)
            if cur == seen[-1]: break
            seen.append(cur)
        assert len(seen) == 55 and seen[-1] == [12,4], (view,seen)
        # Reverse route includes each internal replay event; no new deck state.
        for _ in range(69): page.keyboard.press('ArrowLeft')
        assert state(page) == [1,1]
        report['routes'][view] = len(seen)
        for scene, step in ((8,4),(11,5)):
            page.goto(f'{BASE}/?scene={scene}&step={step}{q}')
            replay = page.locator('.transcript-replay')
            last = int(replay.get_attribute('data-event'))
            assert replay.get_attribute('data-playing') == 'false'
            assert page.locator('.official-demo-links a').count() == (2 if view == 'presenter' else 0)
            page.keyboard.press('Space')
            assert replay.get_attribute('data-event') == '0' and replay.get_attribute('data-playing') == 'true'
            page.wait_for_timeout(300)
            page.keyboard.press('Space')
            assert replay.get_attribute('data-playing') == 'false'
            page.keyboard.press('ArrowRight'); assert replay.get_attribute('data-event') == '1'
            page.keyboard.press('ArrowLeft'); assert replay.get_attribute('data-event') == '0'
            page.reload(); assert replay.get_attribute('data-event') == str(last)
            for width,height in ((1920,1080),(1366,768)):
                page.set_viewport_size({'width':width,'height':height})
                page.locator('.replay-track button').nth(3 if scene==8 else 3).click()
                page.wait_for_timeout(300)
                shot = SHOTS / f'scene-{scene}-{view}-{width}.png'
                page.screenshot(path=str(shot),full_page=True)
                report['screenshots'].append(str(shot.relative_to(ROOT)))
                assert page.evaluate('() => document.documentElement.scrollWidth <= innerWidth'), 'horizontal overflow'
            page.emulate_media(reduced_motion='reduce')
            page.keyboard.press('Space'); page.wait_for_timeout(50)
            assert page.evaluate('() => document.getAnimations().filter(a=>a.playState==="running").length') == 0
            page.keyboard.press('j'); page.wait_for_timeout(300)
            assert page.locator('.transcript-replay').count()==0
            assert page.evaluate('() => document.getAnimations().filter(a=>a.playState==="running").length') == 0
            page.emulate_media(reduced_motion='no-preference')
            report['replays'].append(f'{view}-{scene}: Space, arrows, reload, reduced-motion, exit PASS')
        for scene,step in ((4,5),(5,4),(8,5),(11,6)):
            page.goto(f'{BASE}/?scene={scene}&step={step}{q}')
            page.wait_for_function('() => document.querySelector("video")?.readyState >= 2')
            page.keyboard.press('Space'); page.wait_for_timeout(350)
            assert page.evaluate('() => !document.querySelector("video").paused && document.querySelector("video").currentTime>0')
            page.keyboard.press('Space'); assert page.evaluate('() => document.querySelector("video").paused')
            page.locator('.scene-video-toggle').focus()
            page.keyboard.press('Space'); page.wait_for_timeout(100)
            assert page.evaluate('() => !document.querySelector("video").paused')
            page.keyboard.press('Space'); assert page.evaluate('() => document.querySelector("video").paused')
            page.locator('video').click(); page.wait_for_timeout(100)
            assert page.evaluate('() => !document.querySelector("video").paused')
            page.keyboard.press('Space'); assert page.evaluate('() => document.querySelector("video").paused')
            if view == 'presenter':
                page.locator('.scene-link').nth(scene-1).focus()
                page.keyboard.press('Space'); assert state(page) == [scene,1]
                page.goto(f'{BASE}/?scene={scene}&step={step}{q}')
                page.locator('.scene-link').nth(5).focus()
                page.keyboard.press('Enter'); assert state(page)==[6,1]
                page.goto(f'{BASE}/?scene={scene}&step={step}{q}')
                page.locator('body').click(position={'x':2,'y':2})
            page.keyboard.press('ArrowRight'); assert state(page) == [scene+1,1]
            focus = ', scene-list focus' if view == 'presenter' else ''
            report['videos'].append(f'{view}-{scene}: Space/body/button/click, arrows{focus} PASS')
    browser.close()
assert not report['errors'] and not report['externalRequests'], report
(OUT/'verification.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(json.dumps(report,ensure_ascii=False,indent=2))
