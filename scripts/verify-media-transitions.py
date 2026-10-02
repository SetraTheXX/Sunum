"""Repeat Space/view/fallback transitions and collect media state on the current build."""
import json,sys
from pathlib import Path
from playwright.sync_api import sync_playwright,expect
BASE=sys.argv[1] if len(sys.argv)>1 else 'http://127.0.0.1:4173'
report={'cases':[],'errors':[]}
with sync_playwright() as p:
 b=p.chromium.launch(headless=True,channel='msedge');report['browser']=b.version
 ctx=b.new_context(viewport={'width':1366,'height':768});page=ctx.new_page()
 page.on('pageerror',lambda e:report['errors'].append(str(e)))
 for iteration in range(3):
  for scene,step in [(8,4),(11,5)]:
   for kind in ['short','fallback']:
    page.goto(f'{BASE}/?scene={scene}&step={step}')
    if kind=='fallback':page.get_by_role('button',name='Uzun kaydı aç (fallback)').click()
    page.wait_for_function('()=>document.querySelector("video")?.readyState>=2 && !document.querySelector("video").seeking')
    page.wait_for_timeout(300);page.keyboard.press('Space')
    page.wait_for_function('()=>!document.querySelector("video").paused && document.querySelector("video").currentTime>0')
    page.evaluate('()=>window.syncVideo=document.querySelector("video")')
    before=page.locator('video').evaluate('(v)=>v.currentTime')
    page.locator('.fullscreen-button').evaluate('(e)=>e.click()')
    page.wait_for_timeout(400)
    assert page.evaluate('()=>document.querySelector("video")===window.syncVideo && !window.syncVideo.paused && window.syncVideo.currentTime>= '+str(before))
    assert page.locator('.presentation-shell').get_attribute('class').endswith('is-audience-mode')
    if kind=='fallback':assert page.locator('.fallback-bar').count()==0
    page.locator('.audience-exit').click();page.wait_for_timeout(200)
    assert page.evaluate('()=>document.querySelector("video")===window.syncVideo && !window.syncVideo.paused')
    page.keyboard.press('Space');assert page.locator('video').evaluate('(v)=>v.paused')
    if kind=='short':
     page.locator('.replay-track button').first.click()
     page.keyboard.press('ArrowRight');expect(page.locator('.transcript-replay')).to_have_attribute('data-event','1')
    else:
     page.get_by_role('button',name='Ana rotaya dön').click()
     assert page.locator('.transcript-replay').count()==1
     assert page.evaluate('()=>window.syncVideo.paused && !window.syncVideo.isConnected')
    page.keyboard.press('j')
    assert page.locator('video').count()==0
    assert page.evaluate('()=>window.syncVideo.paused && !window.syncVideo.isConnected')
    report['cases'].append({'iteration':iteration,'scene':scene,'kind':kind,'spaceViewsReturnExit':'PASS'})
 # A pending play cancelled by a deliberate second Space must not show an error.
 page.route('**/*.mp4',lambda r:(page.wait_for_timeout(700),r.continue_()))
 page.goto(BASE+'/?scene=8&step=4',wait_until='domcontentloaded');page.locator('.replay-heading button').wait_for()
 page.keyboard.press('Space');page.keyboard.press('Space');page.wait_for_timeout(1800)
 assert page.locator('video').evaluate('(v)=>v.paused')
 assert 'Video açılamadı' not in page.locator('.replay-source').text_content()
 report['pendingPlayCancel']='PASS'
 b.close()
assert not report['errors'],report
Path('sources/media-diagnosis/transitions.json').write_text(json.dumps(report,indent=2)+'\n',encoding='utf-8')
print('PASS: 12 repeated short/fallback cycles; Space, Presenter/Audience same video, return, chapters, scene exit, pending play cancellation')
