"""Local V3 acceptance checks; requires the existing Python Playwright environment."""
import json, re, sys
from pathlib import Path
from playwright.sync_api import sync_playwright, expect

ROOT = Path(__file__).resolve().parents[1]
BASE = sys.argv[1] if len(sys.argv) > 1 else 'http://localhost:4173'
OUT = Path(sys.argv[2]).resolve() if len(sys.argv)>2 else ROOT / 'sources/replay-media'
OUT.mkdir(parents=True, exist_ok=True)
SHOTS = Path(sys.argv[3]).resolve() if len(sys.argv)>3 else ROOT / 'screenshots/replay-media'
SHOTS.mkdir(parents=True, exist_ok=True)
patterns = {
    'email': r'[\w.+%-]+@[\w.-]+\.[A-Za-z]{2,}',
    'user_path': r'(?i)(?:[a-z]:[\\/]+Users[\\/]+|/c/Users/|/Users/|/home/)[^\s/\\]+',
    'secret': r'(?i)(?:sk-[A-Za-z0-9_-]+|ghp_[A-Za-z0-9]+|Bearer\s+\S+|\b[a-f0-9]{32,}\b|\b[A-Za-z0-9+/]{64,}={0,2})',
}
report = {'privacy': {}, 'replays': [], 'videos': [], 'routes': {}, 'screenshots': [], 'errors': [], 'externalRequests': [], 'verticalLayout': []}
for path in sorted((ROOT / 'src/data/replays').glob('*.json')):
    raw = path.read_text(encoding='utf-8')
    report['privacy'][path.name] = {name: len(re.findall(pattern, raw)) for name, pattern in patterns.items()}
    assert not any(report['privacy'][path.name].values()), report['privacy']
    data = json.loads(raw)
    assert 60000 <= sum(x['durationMs'] for x in data['events']) <= 90000

def vertical_layout(page):
    # Check viewport plus every clipping ancestor, including the scrollable stage.
    return page.evaluate("""() => {
      const selectors = ['.transcript-replay', '.replay-player', '.replay-track', '.replay-source', '.replay-controls', '.official-demo-links', '.fallback-bar', '.speaker-notes summary'];
      const failures = []; const bounds = {};
      for (const selector of selectors) {
        const el = document.querySelector(selector);
        if (!el || el.getClientRects().length === 0) continue;
        const r = el.getBoundingClientRect(); let top = 0, bottom = innerHeight;
        for (let p = el.parentElement; p; p = p.parentElement) {
          if (/(auto|scroll|hidden|clip)/.test(getComputedStyle(p).overflowY)) {
            const pr = p.getBoundingClientRect(); top = Math.max(top, pr.top); bottom = Math.min(bottom, pr.bottom);
          }
        }
        bounds[selector] = {top:r.top,bottom:r.bottom,clipTop:top,clipBottom:bottom};
        if (r.top < top-1 || r.bottom > bottom+1) failures.push(selector);
      }
      return {failures,bounds};
    }""")

def state(page):
    return page.evaluate('() => [Number(new URLSearchParams(location.search).get("scene")), Number(new URLSearchParams(location.search).get("step"))]')

with sync_playwright() as pw:
    browser = pw.chromium.launch(headless=True, channel='msedge')
    ctx = browser.new_context(viewport={'width':1366,'height':768})
    ctx.on('request', lambda r: report['externalRequests'].append(r.url) if not r.url.startswith(BASE) and not r.url.startswith(('data:', 'blob:')) else None)
    ctx.on('page', lambda p: p.on('pageerror', lambda e: report['errors'].append(str(e))))
    page = ctx.new_page()
    # Encoded media plays through the real browser decoder at 4x speed.
    for scene,step,duration in ((8,4,24.5),(11,5,34)):
        timed = page
        timed.goto(f'{BASE}/?scene={scene}&step={step}')
        timed.wait_for_function('() => document.querySelector(".replay-player")?.readyState >= 2')
        timed.wait_for_function('() => document.querySelector("video").currentTime > document.querySelector("video").duration - .2 && !document.querySelector("video").seeking')
        timed.evaluate('() => document.querySelector("video").playbackRate=4')
        timed.bring_to_front()
        timed.wait_for_timeout(1000)
        timed.keyboard.press('Space')
        expect(timed.locator('.transcript-replay')).to_have_attribute('data-playing','true')
        try:
            timed.wait_for_function('() => document.querySelector("video").ended', timeout=60000)
        except Exception:
            print(timed.locator('video').evaluate('(v)=>({scene:location.search,time:v.currentTime,paused:v.paused,rate:v.playbackRate,ready:v.readyState,error:v.error?.message})'),flush=True)
            raise
        assert abs(timed.evaluate('() => document.querySelector("video").duration')-duration)<.1
        report['replays'].append(f'{scene}: complete browser playback {duration}s PASS (4x)')
        print(f'Playback {scene} PASS',flush=True)
    for view in ('presenter','audience'):
        q = '&view=audience' if view == 'audience' else ''
        page.goto(BASE+'/?scene=1&step=1'+q)
        seen = [state(page)]
        for _ in range(60):
            page.keyboard.press('ArrowRight')
            cur = state(page)
            if cur == seen[-1]: break
            seen.append(cur)
        assert len(seen) == 53 and seen[-1] == [12,4], (view,seen)
        # Reverse route includes each internal replay event; no new deck state.
        for _ in range(69): page.keyboard.press('ArrowLeft')
        assert state(page) == [1,1]
        report['routes'][view] = len(seen)
        for scene, step in ((8,4),(11,5)):
            page.goto(f'{BASE}/?scene={scene}&step={step}{q}')
            replay = page.locator('.transcript-replay')
            page.wait_for_function('() => document.querySelector("video")?.readyState >= 2 && document.querySelector("video").currentTime > 20')
            last = int(replay.get_attribute('data-event'))
            expect(replay).to_have_attribute('data-playing','false')
            assert page.locator('.official-demo-links a').count() == (2 if view == 'presenter' else 0)
            page.keyboard.press('Space')
            expect(replay).to_have_attribute('data-event','0')
            expect(replay).to_have_attribute('data-playing','true')
            page.wait_for_timeout(300)
            page.keyboard.press('Space')
            expect(replay).to_have_attribute('data-playing','false')
            page.keyboard.press('ArrowRight'); expect(replay).to_have_attribute('data-event','1')
            page.keyboard.press('ArrowLeft'); expect(replay).to_have_attribute('data-event','0')
            page.reload(); expect(replay).to_have_attribute('data-event', str(last))
            for width,height in ((1920,1080),(1366,768)):
                page.set_viewport_size({'width':width,'height':height})
                page.locator('.speaker-notes').evaluate('(el) => el.open = false')
                page.locator('.scene-stage').evaluate('(el) => el.scrollTop = 0')
                page.locator('.replay-track button').nth(3 if scene==8 else 4).click()
                page.wait_for_timeout(500)
                shot = SHOTS / f'scene-{scene}-{view}-{width}.png'
                page.screenshot(path=str(shot),full_page=True)
                report['screenshots'].append(str(shot.relative_to(ROOT)))
                assert page.evaluate('() => document.documentElement.scrollWidth <= innerWidth'), 'horizontal overflow'
                layout = vertical_layout(page)
                report['verticalLayout'].append({'scene':scene,'view':view,'width':width,**layout})
                assert not layout['failures'], (scene,view,width,layout)
                if scene == 11:
                    page.locator('.replay-track button').nth(5).click()
                    page.wait_for_timeout(500)
                    constraint = SHOTS / f'scene-{scene}-{view}-{width}-qa-constraint.png'
                    page.screenshot(path=str(constraint))
                    report['screenshots'].append(str(constraint.relative_to(ROOT)))
                    assert not vertical_layout(page)['failures']
                if scene == 8 and view == 'presenter' and width == 1366:
                    oversized = page.add_style_tag(content='.replay-player {max-height:none!important;height:650px!important}')
                    assert '.replay-player' in vertical_layout(page)['failures'], 'negative clipping control did not fail'
                    oversized.evaluate('(el) => el.remove()')
                    report['verticalNegativeControl'] = 'Oversized video correctly rejected'

            page.emulate_media(reduced_motion='reduce')
            page.keyboard.press('Space'); page.wait_for_timeout(50)
            assert page.evaluate('() => document.getAnimations().filter(a=>a.playState==="running").length') == 0
            page.keyboard.press('j'); page.wait_for_timeout(300)
            assert page.locator('.transcript-replay').count()==0
            assert page.evaluate('() => document.getAnimations().filter(a=>a.playState==="running").length') == 0
            page.emulate_media(reduced_motion='no-preference')
            report['replays'].append(f'{view}-{scene}: Space, arrows, reload, reduced-motion, exit PASS')
        def load_video(scene,step):
            page.goto(f'{BASE}/?scene={scene}&step={step}'+(q if scene in (4,5) else ''))
            if scene in (8,11):
                page.get_by_role('button',name='Uzun kaydı aç (fallback)').click()
                if view=='audience': page.locator('.fullscreen-button').evaluate('(e)=>e.click()')
        for scene,step in ((4,5),(5,4),(8,4),(11,5)):
            load_video(scene,step)
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
                load_video(scene,step)
                page.locator('.scene-link').nth(5).focus()
                page.keyboard.press('Enter'); assert state(page)==[6,1]
                load_video(scene,step)
                page.locator('body').click(position={'x':2,'y':2})
            page.keyboard.press('ArrowRight')
            if scene in (8,11):
                assert state(page)==[scene,step] and page.locator('.transcript-replay').count()==1
                page.keyboard.press('ArrowRight')
            assert state(page) == [scene+1,1]
            focus = ', scene-list focus' if view == 'presenter' else ''
            report['videos'].append(f'{view}-{scene}: Space/body/button/click, arrows{focus} PASS')
    for scene,step in ((8,4),(11,5)):
        page.goto(f'{BASE}/?scene={scene}&step={step}')
        page.get_by_role('button',name='Uzun kaydı aç (fallback)').focus()
        page.keyboard.press('Space')
        assert page.locator('.scene-video-reveal').count()==1
        page.keyboard.press('ArrowLeft')
        assert state(page)==[scene,step] and page.locator('.transcript-replay').count()==1
        page.get_by_role('button',name='Uzun kaydı aç (fallback)').click()
        page.get_by_role('button',name='Ana rotaya dön').click()
        assert state(page)==[scene,step] and page.locator('.transcript-replay').count()==1
        page.get_by_role('button',name='Uzun kaydı aç (fallback)').click()
        page.reload()
        assert page.locator('.scene-video-reveal').count()==0
        report.setdefault('fallbackReturn',[]).append(f'{scene}: Space selection, left/right, explicit return, reload PASS')
    browser.close()
assert not report['errors'] and not report['externalRequests'], report
(OUT/'verification.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(json.dumps(report,ensure_ascii=False,indent=2))
