"""Current dist offline regression; does not rebuild or modify an accepted USB."""
import hashlib,json,sys,urllib.request
from pathlib import Path
from playwright.sync_api import sync_playwright,expect
BASE=sys.argv[1] if len(sys.argv)>1 else 'http://localhost:8020'
ROOT=Path(__file__).resolve().parents[1]
report={'routes':{},'media':[],'errors':[],'external':[],'failedResponses':[]}
with sync_playwright() as pw:
    browser=pw.chromium.launch(headless=True,channel='msedge')
    ctx=browser.new_context(viewport={'width':1366,'height':768})
    def isolate(r):
        if r.request.url.startswith(BASE+'/') or r.request.url.startswith(('data:','blob:')):r.continue_()
        else:report['external'].append(r.request.url);r.abort()
    ctx.route('**/*',isolate)
    page=ctx.new_page();page.on('pageerror',lambda e:report['errors'].append(str(e)))
    page.on('response',lambda r:report['failedResponses'].append([r.url,r.status]) if r.status>=400 else None)
    page.goto(BASE+'/')
    assert page.evaluate("async()=>{try{await fetch('https://offline-probe.invalid/');return false}catch{return true}}")
    report['external'].clear();report['blockProbe']='PASS'
    def state():return page.evaluate('()=>[Number(new URLSearchParams(location.search).get("scene")),Number(new URLSearchParams(location.search).get("step"))]')
    for view in ['presenter','audience']:
        suffix='&view=audience' if view=='audience' else ''
        page.goto(BASE+'/?scene=1&step=1'+suffix);seen=[state()]
        for _ in range(60):
            page.keyboard.press('ArrowRight');s=state()
            if s==seen[-1]:break
            seen.append(s)
        assert len(seen)==53 and seen[-1]==[12,4]
        for _ in range(69):page.keyboard.press('ArrowLeft')
        assert state()==[1,1];report['routes'][view]=53
        page.goto(BASE+'/?scene=12&step=3'+suffix)
        assert all(s in page.locator('.screen-content').text_content() for s in ['91d6f34','9aee045'])
        for scene,step,kind in [(4,5,'video'),(5,4,'video'),(8,4,'short'),(11,5,'short'),(8,4,'fallback'),(11,5,'fallback')]:
            page.goto(f'{BASE}/?scene={scene}&step={step}'+(suffix if kind!='fallback' else ''))
            if kind=='fallback':
                page.get_by_role('button',name='Uzun kaydı aç (fallback)').click()
                if view=='audience':page.locator('.fullscreen-button').evaluate('(e)=>e.click()')
            else:assert page.locator('.fallback-bar').count()==(1 if view=='presenter' and scene in (8,11) else 0)
            page.wait_for_function('()=>document.querySelector("video")?.readyState>=2 && !document.querySelector("video").seeking')
            page.wait_for_timeout(250)
            info=page.locator('video').evaluate('(v)=>({src:v.src,poster:v.poster,duration:v.duration})')
            assert info['src'].startswith(BASE+'/')
            with urllib.request.urlopen(urllib.request.Request(info['src'],headers={'Range':'bytes=0-1023'}),timeout=10) as r:
                assert r.status==206 and len(r.read())==1024
            if info['poster']:
                with urllib.request.urlopen(info['poster'],timeout=10) as r:assert r.status==200
            page.keyboard.press('Space');page.wait_for_timeout(350)
            assert page.locator('video').evaluate('(v)=>!v.paused')
            page.keyboard.press('Space');assert page.locator('video').evaluate('(v)=>v.paused')
            if kind=='fallback':
                page.keyboard.press('ArrowRight');assert state()==[scene,step]
                assert page.locator('.transcript-replay').count()==1
            report['media'].append({'view':view,'scene':scene,'kind':kind,**info,'rangePlayPause':'PASS'})
    for scene in (8,11):
        page.goto(f'{BASE}/?scene={scene}&step=2')
        page.get_by_role('button',name='Uzun kaydı aç (fallback)').click()
        page.get_by_role('button',name='Ana rotaya dön').focus()
        page.keyboard.press('Space')
        assert state()==[scene,2] and page.locator('.scene-video-reveal').count()==0
        page.get_by_role('button',name='Uzun kaydı aç (fallback)').click()
        page.keyboard.press('r');assert state()==[scene,1] and page.locator('.scene-video-reveal').count()==0
        page.get_by_role('button',name='Uzun kaydı aç (fallback)').click()
        page.keyboard.press('j');assert state()==[scene+1,1] and page.locator('.scene-video-reveal').count()==0
    report['earlyStepReturnAndReset']='PASS: same step 2, Space return action, R, J'
    browser.close()
assert not report['external'] and not report['errors'] and not report['failedResponses'],report
archive=ROOT/'backup/Sunum-v3-usb-20261002-accepted-r3.zip'
report['acceptedUsbSha256']=hashlib.sha256(archive.read_bytes()).hexdigest()
assert report['acceptedUsbSha256']=='99beda7b159f41f9071188319eb9cac088a6d31778cdbd60ce69b7a7da8873f2'
(ROOT/'sources/fallback-route/offline-verification.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print('PASS: 53 states x 2, six media x 2, offline blocking, range/poster/playback, fallback return; accepted USB unchanged')
