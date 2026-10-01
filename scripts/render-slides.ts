import { mkdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
mkdirSync('out/slides',{recursive:true});
for(const [id,frame] of [['slide-problem',420],['slide-solution',345],['slide-doorway',6]] as const){
 const result=spawnSync('bunx',['remotion','still','Segment',`out/slides/${id}.png`,`--props=${JSON.stringify({segmentId:id})}`,`--frame=${frame}`,...process.argv.slice(2)],{stdio:'inherit'});
 if(result.status!==0)process.exit(result.status??1);
}
