import json,sys
from pathlib import Path
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[1];OUT=ROOT/'sources/general-quality';SHOTS=ROOT/'screenshots/general-quality'
BASE=sys.argv[1] if len(sys.argv)>1 else 'http://localhost:4173'
report={'states':[],'notes':{},'errors':[],'failedResponses':[],'external':[]}
with sync_playwright() as pw:
 browser=pw.chromium.launch(headless=True,channel='msedge');ctx=browser.new_context()
 ctx.on('request',lambda r: report['external'].append(r.url) if not r.url.startswith((BASE,'data:','blob:')) else None)
 page=ctx.new_page();page.on('pageerror',lambda e:report['errors'].append(str(e)));page.on('response',lambda r:report['failedResponses'].append([r.url,r.status]) if r.status>=400 else None)
 counts={};page.goto(BASE+'/?scene=1&step=1')
 def state():return page.evaluate('() => [Number(new URLSearchParams(location.search).get("scene")),Number(new URLSearchParams(location.search).get("step"))]')
 seen=[state()]
 for _ in range(60):
  page.keyboard.press('ArrowRight');cur=state()
  if cur==seen[-1]:break
  seen.append(cur)
 assert len(seen)==53,seen
 for n,step in seen:counts[n]=max(counts.get(n,0),step)
 for n,count in counts.items():
  page.goto(f'{BASE}/?scene={n}&step=1')
  notes=page.locator('.notes-body').text_content();assert notes.strip();report['notes'][n]=notes
 for width,height in [(1366,768),(1920,1080)]:
  page.set_viewport_size({'width':width,'height':height})
  for view in ['presenter','audience']:
   for n,count in counts.items():
    for step in range(1,count+1):
     page.goto(f'{BASE}/?scene={n}&step={step}'+('&view=audience' if view=='audience' else ''))
     page.locator('.speaker-notes').evaluate('(e)=>e.open=false');page.wait_for_timeout(950)
     item=page.evaluate('''() => {
       const el=document.querySelector('.screen-content'),r=el.getBoundingClientRect(),s=document.querySelector('.scene-stage').getBoundingClientRect();
       return {text:el.innerText,screenTop:r.top,screenBottom:r.bottom,stageTop:s.top,stageBottom:s.bottom,horizontalOverflow:document.documentElement.scrollWidth>innerWidth,verticalClip:r.top<s.top-1||r.bottom>s.bottom+1};
     }''')
     item.update(scene=n,step=step,view=view,width=width);report['states'].append(item)
     representative={4:4,5:3,8:3,11:4}.get(n,count)
     if step==representative or (n==12 and step==3):page.screenshot(path=str(SHOTS/f'{n:02}-{step}-{view}-{width}.png'))
    print(f'{width} {view} scene {n} complete',flush=True)
 browser.close()
(OUT/'route-audit.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print('cases',len(report['states']),'clips',[(x['scene'],x['step'],x['view'],x['width']) for x in report['states'] if x['verticalClip']])
assert not report['errors'] and not report['failedResponses'] and not report['external']
assert not any(x['horizontalOverflow'] for x in report['states'])
assert not any(x['verticalClip'] for x in report['states'])
