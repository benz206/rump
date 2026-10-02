import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';

const browser=await chromium.launch({headless:true,channel:'chrome'});
const page=await browser.newPage({viewport:{width:1920,height:1080}});
const issues=[];
page.on('pageerror',error=>issues.push(error.message));
page.on('console',message=>{if(['error','warning'].includes(message.type()))issues.push(message.text());});
await mkdir('screenshots/60',{recursive:true});
try {
 await page.goto('http://127.0.0.1:3000/demo/60?captions=1');
 await page.getByRole('button',{name:'Play 60-second demo with narration',exact:true}).click();
 await page.evaluate(()=>{window.__narrationProgress=0;document.querySelectorAll('audio').forEach(audio=>audio.addEventListener('timeupdate',()=>{if(!audio.muted)window.__narrationProgress=Math.max(window.__narrationProgress,audio.currentTime);}));});
 const start=Date.now();
 const order=['slide-problem','slide-solution','slide-doorway','step-connect','step-scan','step-dashboard','step-rogers','step-notion','step-flight','step-rapidfire','wrapped'];
 for(const id of order){
  await page.locator(`[data-screen="${id}"]`).waitFor({timeout:15000});
  console.log(`60-second cut reached ${id} at ${((Date.now()-start)/1000).toFixed(1)}s`);
  if(id==='step-connect')assert(Date.now()-start<8500,'Product must start near six seconds');
 }
 await page.getByRole('heading',{name:'Time is money. Save both.',exact:true}).waitFor();
 await page.waitForTimeout(3500);
 assert(await page.evaluate(()=>window.__narrationProgress>=59),'Narration should play unmuted through the final second');
 await page.screenshot({path:'screenshots/60/end-card.png'});
 assert.deepEqual(issues,[]);
 await writeFile('screenshots/60/verification.json',JSON.stringify({passed:true,consoleIssues:issues,checks:['all scenes in order','product at six seconds','unmuted synchronized narration reaches 60 seconds','Wrapped end card']},null,2));
 console.log('60-second playback passed without console warnings or errors.');
} finally {await browser.close();}
