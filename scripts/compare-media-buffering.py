"""Compare native video with the React player; no application changes or external traffic."""
import json
from pathlib import Path
from playwright.sync_api import sync_playwright
BASE='http://127.0.0.1:4173';cases=[]
with sync_playwright() as p:
 b=p.chromium.launch(headless=True,channel='msedge')
 for scene,step in [(8,4),(11,5)]:
  for kind in ['app','native']:
   ctx=b.new_context();page=ctx.new_page();page.goto(f'{BASE}/?scene={scene}&step={step}')
   page.wait_for_function('()=>document.querySelector("video")?.readyState>=2 && !document.querySelector("video").seeking')
   src=page.locator('video').get_attribute('src')
   if kind=='native':
    # Keep the same localhost origin and use a document without React listeners.
    page.route(BASE+'/native-probe',lambda r:r.fulfill(status=200,content_type='text/html',body=f'<video muted playsinline preload="metadata" src="{src}"></video>'))
    page.goto(BASE+'/native-probe')
    page.wait_for_function('()=>document.querySelector("video").readyState>=1')
   page.evaluate('''()=>{window.events=[];let v=document.querySelector('video');for(let type of ['waiting','playing','pause','ended','error'])v.addEventListener(type,()=>window.events.push({event:type,ms:performance.now(),time:v.currentTime,paused:v.paused,ready:v.readyState,buffered:Array.from({length:v.buffered.length},(_,i)=>[v.buffered.start(i),v.buffered.end(i)])}));v.currentTime=0;v.playbackRate=4;v.play()}''')
   page.wait_for_timeout(8000)
   cases.append({'scene':scene,'kind':kind,'rate':4,'events':page.evaluate('window.events'),'final':page.locator('video').evaluate('(v)=>({time:v.currentTime,paused:v.paused,ready:v.readyState,error:v.error?.code})')})
   ctx.close()
 b.close()
Path('sources/media-diagnosis/native-comparison.json').write_text(json.dumps(cases,indent=2)+'\n',encoding='utf-8')
for c in cases:print(c['scene'],c['kind'],c['final'],'waiting',sum(e['event']=='waiting' for e in c['events']))
