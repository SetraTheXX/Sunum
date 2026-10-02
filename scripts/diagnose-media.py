"""Record media events and isolate early-Space/metadata races without changing network settings."""
import json,sys
from pathlib import Path
from playwright.sync_api import sync_playwright
BASE=sys.argv[1] if len(sys.argv)>1 else 'http://127.0.0.1:4173'
OUT=Path(sys.argv[2]) if len(sys.argv)>2 else Path('sources/media-diagnosis/before.json')
report={'cases':[],'errors':[]}
with sync_playwright() as p:
 b=p.chromium.launch(headless=True,channel='msedge');report['browser']=b.version
 for scene,step in [(8,4),(11,5)]:
  for early in [True,False]:
   for iteration in range(3):
    ctx=b.new_context();page=ctx.new_page();page.on('pageerror',lambda e:report['errors'].append(str(e)))
    page.add_init_script('''window.mediaEvents=[]; for(const type of ['loadedmetadata','seeking','seeked','play','playing','waiting','stalled','pause','ended','error']) document.addEventListener(type,e=>{let v=e.target;if(v instanceof HTMLVideoElement) window.mediaEvents.push({event:type,ms:performance.now(),time:v.currentTime,paused:v.paused,ready:v.readyState,network:v.networkState,buffered:Array.from({length:v.buffered.length},(_,i)=>[v.buffered.start(i),v.buffered.end(i)]),error:v.error?.code})},true)''')
    if early:
     def delay(r):page.wait_for_timeout(800);r.continue_()
     page.route('**/*.mp4',delay)
    page.goto(f'{BASE}/?scene={scene}&step={step}',wait_until='domcontentloaded')
    page.locator('.replay-heading button').wait_for()
    if not early:page.wait_for_function('()=>document.querySelector("video").currentTime>20 && !document.querySelector("video").seeking')
    initial=page.locator('video').evaluate('(v)=>({time:v.currentTime,ready:v.readyState})')
    page.keyboard.press('Space');page.wait_for_timeout(3000)
    final=page.locator('video').evaluate('(v)=>({time:v.currentTime,paused:v.paused,ready:v.readyState,ended:v.ended,error:v.error?.code,ui:document.querySelector(".transcript-replay").dataset.playing})')
    report['cases'].append({'scene':scene,'early':early,'iteration':iteration,'initial':initial,'final':final,'events':page.evaluate('window.mediaEvents')})
    print(scene,early,iteration,final,flush=True);ctx.close()
 b.close()
OUT.write_text(json.dumps(report,indent=2)+'\n',encoding='utf-8')
