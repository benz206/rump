import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
await mkdir('screenshots',{recursive:true});
const browser=await chromium.launch({headless:true,channel:'chrome'});
const page=await browser.newPage({viewport:{width:1920,height:1080}});
const issues=[];
page.on('pageerror',error=>issues.push(error.message));
page.on('console',message=>{if(['error','warning'].includes(message.type()))issues.push(message.text());});
const base='http://127.0.0.1:3000';
try {
 await page.goto(`${base}/deck?autoplay=1`);
 const order=['slide-problem','slide-solution','slide-doorway','step-connect','step-scan','step-dashboard','step-rogers','step-notion','step-flight','step-rapidfire','wrapped'];
 for(const id of order){
  await page.locator(`[data-screen="${id}"]`).waitFor({timeout:25000});
  console.log(`Autoplay reached ${id}`);
 }
 await page.getByText('Time is money. Save both.',{exact:true}).first().waitFor();
 await page.screenshot({path:'screenshots/wrapped.png'});
 await page.goto(`${base}/present?from=step-dashboard&hood=1&captions=1`);
 await page.locator('[data-testid="hood"]').waitFor();
 await page.locator('[data-testid="captions"]').waitFor();
 await page.keyboard.press('p');await page.locator('[data-testid="presenter"]').waitFor();
 await page.keyboard.press('u');await page.locator('[data-testid="hood"]').waitFor({state:'hidden'});
 await page.keyboard.press('c');await page.locator('[data-testid="captions"]').waitFor({state:'hidden'});
 await page.keyboard.press('ArrowRight');
 await page.locator('[data-screen="step-rogers"]').waitFor({timeout:12000});
 await page.waitForTimeout(700);
 assert.equal(await page.locator('[data-screen="step-rogers"]').count(),1);
 await page.keyboard.press('ArrowLeft');await page.locator('[data-screen="step-dashboard"]').waitFor();
 await page.keyboard.press('r');await page.locator('[data-screen="slide-problem"]').waitFor();
 await page.goto(`${base}/player`);
 await page.getByRole('button',{name:'step-flight',exact:true}).click();
 await page.locator('[data-screen="step-flight"]').waitFor();
 await page.setViewportSize({width:1440,height:900});
 assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 await page.screenshot({path:'screenshots/player-1440.png'});
 await page.getByRole('button',{name:'Play with narration',exact:true}).click();
 await page.getByRole('button',{name:'Play with narration',exact:true}).waitFor({state:'hidden'});
 await page.waitForFunction(()=>Array.from(document.querySelectorAll('audio')).some(audio=>audio.currentSrc.includes('jessica-aligned.wav')&&!audio.paused&&!audio.muted&&audio.volume>0&&audio.currentTime>0));
 assert.deepEqual(issues,[]);
 await writeFile('screenshots/verification.json',JSON.stringify({passed:true,consoleIssues:issues,checks:['90-second full autoplay','end card','beat playback','previous and reset','hood and captions','presenter','studio seeking','1440px layout','narration starts unmuted after user gesture']},null,2));
 console.log('Browser verification passed. No console warnings or errors.');
} finally {if(issues.length)console.error(issues);await browser.close();}
