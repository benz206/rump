import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { beats, cashFlow, opportunities, script, totalSavings, video } from '../src/config/content';
import { segments, sec } from '../src/lib/timeline';
assert.equal(totalSavings(),3153);
assert.equal(cashFlow.fixed+cashFlow.subscriptions+cashFlow.fees+cashFlow.optional,cashFlow.monthly);
assert.equal(segments.reduce((sum,s)=>sum+s.duration,0),sec(video.seconds));
assert.equal(segments.length,11);
assert.equal(new Set(opportunities.map(o=>o.id)).size,opportunities.length);
assert.equal(beats.wrapped.cards.at(-1),7);
const goal=readFileSync('docs/GOAL.md','utf8');
const expected=goal.split('\n').filter(line=>/^\| \d:\d\d to/.test(line)).map(line=>line.split('|').at(-2)!.trim().replace(/^"|"$/g,''));
assert.deepEqual(script.map(line=>line.line),expected,'Spoken script must remain verbatim');
for(let i=0;i<script.length;i++){
 const line=script[i];assert(!line.line.includes('—'));assert(i===0||line.at>script[i-1].at);
 const seconds=(script[i+1]?.at??video.seconds)-line.at;
 const pace=Math.round(line.line.split(/\s+/).length/seconds*60);
 if(pace>180)console.warn(`Pace warning: ${line.screen} at ${line.at}s: ${pace} words/min. Script preserved.`);
}
console.log(`Content passed: ${segments.length} segments, ${sec(video.seconds)} frames, $${totalSavings()} savings. Script matches GOAL.md exactly.`);
