import { AbsoluteFill, Audio, Freeze, staticFile, useCurrentFrame } from 'remotion';
import { shortDemo } from '@/config/content';
import { getSegment, sec } from '@/lib/timeline';
import { Segment, type PitchProps } from './Segment';

export function Rump60(props:PitchProps) {
 const frame=useCurrentFrame();
 const scene=[...shortDemo.scenes].reverse().find(scene=>frame>=sec(scene.at))!;
 const original=getSegment(scene.id);
 const local=frame-sec(scene.at);
 const sourceFrame=Math.min(original.duration-1,Math.floor(local*original.duration/sec(scene.until-scene.at)));
 const cue=[...shortDemo.cues].reverse().find(cue=>frame>=sec(cue.at));
 return <AbsoluteFill>
  <Audio src={staticFile(shortDemo.file)}/>
  <Freeze frame={sourceFrame}><Segment key={scene.id} {...props} segmentId={scene.id} showCaptions={false}/></Freeze>
  {props.showCaptions&&cue&&<div data-testid="captions" style={{position:'absolute',bottom:36,left:300,right:100,textAlign:'center',zIndex:80}}><span style={{display:'inline-block',background:'var(--ink)',color:'var(--surface)',padding:'14px 24px',borderRadius:8,fontSize:24,lineHeight:1.4}}>{cue.line}</span></div>}
 </AbsoluteFill>;
}
