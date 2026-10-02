"""Verify the extracted USB build through its Windows launcher with external page traffic blocked."""
import hashlib, json, re, sys, urllib.request, zipfile
from pathlib import Path
from playwright.sync_api import sync_playwright, expect

ROOT = Path(__file__).resolve().parents[1]
BASE = sys.argv[1]
EXTRACT = Path(sys.argv[2]) / 'Sunum-final-backup'
ZIP = Path(sys.argv[3]).resolve() if len(sys.argv) > 3 else ROOT / 'backup/Sunum-v3-usb-20261002.zip'
OUT = Path(sys.argv[4]).resolve() if len(sys.argv) > 4 else ROOT / 'sources/v3-usb'
OUT.mkdir(parents=True, exist_ok=True)
with zipfile.ZipFile(ZIP) as z:
    assert z.testzip() is None
    inventory = [{'path':x.filename, 'bytes':x.file_size, 'sha256':hashlib.sha256(z.read(x)).hexdigest()} for x in z.infolist()]
    for item in inventory:
        assert not any(part.startswith(('.git','.env','.vercel','.claude','.codex','node_modules')) for part in Path(item['path']).parts)
        assert hashlib.sha256((EXTRACT.parent/item['path']).read_bytes()).hexdigest() == item['sha256']
(OUT/'contents.json').write_text(json.dumps(inventory,indent=2)+'\n',encoding='utf-8')
report = {'zip':ZIP.name,'sha256':hashlib.sha256(ZIP.read_bytes()).hexdigest(),'bytes':ZIP.stat().st_size,'entries':len(inventory),'archiveCRC':'PASS','extractedHashes':'PASS','base':BASE,'routes':{},'videos':[],'replays':[],'errors':[],'failedResponses':[],'externalPageRequests':[]}
for line in (EXTRACT/'offline/SHA256SUMS.txt').read_text().splitlines():
    digest,name=line.split(None,1)
    assert hashlib.sha256((EXTRACT/name.strip()).read_bytes()).hexdigest()==digest
report['launcherHashes']='PASS'
with sync_playwright() as pw:
    browser=pw.chromium.launch(headless=True,channel='msedge')
    ctx=browser.new_context(viewport={'width':1366,'height':768})
    def isolated(route):
        if route.request.url.startswith(BASE+'/') or route.request.url.startswith(('data:','blob:')): route.continue_()
        else:
            report['externalPageRequests'].append(route.request.url)
            route.abort()
    ctx.route('**/*',isolated)
    page=ctx.new_page()
    page.on('pageerror',lambda e:report['errors'].append(str(e)))
    page.on('response',lambda r:report['failedResponses'].append([r.url,r.status]) if r.status>=400 else None)
    page.goto(BASE+'/')
    # Independent block probe: do not change the computer's network settings.
    assert page.evaluate("async () => {try {await fetch('https://offline-probe.invalid/'); return false;} catch {return true;}}")
    report['blockProbe']='PASS'
    report['externalPageRequests'].clear()
    def state(): return page.evaluate('() => [Number(new URLSearchParams(location.search).get("scene")),Number(new URLSearchParams(location.search).get("step"))]')
    for view in ('presenter','audience'):
        suffix='&view=audience' if view=='audience' else ''
        page.goto(BASE+'/?scene=1&step=1'+suffix)
        seen=[state()]
        for _ in range(60):
            page.keyboard.press('ArrowRight'); current=state()
            if current==seen[-1]:break
            seen.append(current)
        assert len(seen)==53 and seen[-1]==[12,4]
        report['routes'][view]=53
        for _ in range(69):page.keyboard.press('ArrowLeft')
        assert state()==[1,1]
        page.goto(BASE+'/?scene=12&step=3'+suffix)
        evidence=page.locator('.screen-content').text_content()
        assert '91d6f34' in evidence and '9aee045' in evidence
        report['metaFinal']='PASS: both real diff references present'
        for scene,step in ((8,4),(11,5)):
            page.goto(f'{BASE}/?scene={scene}&step={step}{suffix}')
            assert 'Gerçek oturumdan kısaltılmıştır' in page.locator('.transcript-replay').text_content()
            assert page.locator('.fallback-bar').count()==(1 if view=='presenter' else 0)
            page.wait_for_function('() => document.querySelector("video")?.readyState>=2',timeout=15000)
            media=page.locator('video').evaluate('(v) => ({src:v.src,duration:v.duration})')
            assert media['src'].startswith(BASE+'/') and media['duration']>0
            req=urllib.request.Request(media['src'],headers={'Range':'bytes=0-1023'})
            with urllib.request.urlopen(req) as response:
                assert response.status==206 and len(response.read())==1024 and response.headers['Content-Type']=='video/mp4'
            page.keyboard.press('Space');page.wait_for_timeout(100)
            expect(page.locator('.transcript-replay')).to_have_attribute('data-playing','true')
            page.keyboard.press('Space')
            expect(page.locator('.transcript-replay')).to_have_attribute('data-playing','false')
            report['replays'].append({'view':view,'scene':scene,'src':media['src'],'duration':media['duration'],'range206':'PASS','playPause':'PASS'})
        for scene,step in ((4,5),(5,4),(8,4),(11,5)):
            page.goto(f'{BASE}/?scene={scene}&step={step}'+(suffix if scene in (4,5) else ''))
            if scene in (8,11):
                page.get_by_role('button',name='Uzun kaydı aç (fallback)').click()
                if view=='audience':page.locator('.fullscreen-button').evaluate('(e)=>e.click()')
            page.wait_for_function('() => document.querySelector("video")?.readyState>=2',timeout=15000)
            media=page.locator('video').evaluate('(v) => ({src:v.src,poster:v.poster})')
            assert media['src'].startswith(BASE+'/') and media['poster'].startswith(BASE+'/')
            req=urllib.request.Request(media['src'],headers={'Range':'bytes=0-1023'})
            with urllib.request.urlopen(req) as response:
                assert response.status==206 and len(response.read())==1024 and response.headers['Content-Type']=='video/mp4'
            with urllib.request.urlopen(media['poster']) as response: assert response.status==200 and response.headers['Content-Type']=='image/png'
            page.keyboard.press('Space');page.wait_for_timeout(300)
            assert page.locator('video').evaluate('(v)=>!v.paused && v.currentTime>0')
            page.keyboard.press('Space')
            assert page.locator('video').evaluate('(v)=>v.paused')
            report['videos'].append({'view':view,'scene':scene,'src':media['src'],'poster':media['poster'],'range206':'PASS','playPause':'PASS'})
            if scene in (8,11):
                page.keyboard.press('ArrowRight')
                assert state()==[scene,step] and page.locator('.transcript-replay').count()==1
                page.keyboard.press('ArrowRight');assert state()==[scene+1,1]
                report.setdefault('fallbackReturn',[]).append(f'{view}-{scene}: same step then next scene PASS')
    browser.close()
assert not report['errors'] and not report['failedResponses'] and not report['externalPageRequests'],report
(OUT/'verification.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(json.dumps(report,ensure_ascii=False,indent=2))
