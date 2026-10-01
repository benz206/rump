import assert from 'node:assert/strict';
import { beats, video } from '../src/config/content';
import { beatFrames, lineAtFrame, sec, segments } from '../src/lib/timeline';
assert.deepEqual(beatFrames,[0,450,810,840,990,1200,1380,1740,1950,2190,2400]);
for(const segment of segments){
 assert.equal(lineAtFrame(segment.from).screen,segment.id);
 assert.equal(lineAtFrame(segment.from+segment.duration-1).screen,segment.id);
}
assert.equal(sec(video.seconds-video.demoStart),1890);
assert(sec(beats.rogers.success)<segments.find(s=>s.id==='step-rogers')!.duration);
console.log('Timeline boundaries and render durations passed.');
