import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { registry } from '../segments/registry';
import { UnderTheHood } from '../shell/UnderTheHood';
import { lineAtFrame, getSegment } from '@/lib/timeline';
import { inter, mono } from '../fonts';
import '../remotion.css';
export type PitchProps = {showHood:boolean;showCaptions:boolean;showCursor:boolean};
export const defaults:PitchProps = {showHood:false,showCaptions:false,showCursor:true};
export function Segment({segmentId='slide-problem',showHood=false,showCaptions=false,showCursor=true}:Partial<PitchProps>&{segmentId?:string}){
 const frame=useCurrentFrame(); const Component=registry[segmentId];
 return <AbsoluteFill className="rump-composition" data-screen={segmentId} style={{background:'var(--bg)',fontFamily:inter.fontFamily,'--font-jetbrains':mono.fontFamily,'--font-mono':mono.fontFamily} as React.CSSProperties}>
 <Component showCursor={showCursor}/>
 {showHood&&!segmentId.startsWith('slide-')&&<UnderTheHood id={segmentId}/>}
 {showCaptions&&<div data-testid="captions" style={{position:'absolute',bottom:36,left:300,right:100,textAlign:'center',zIndex:80}}><span style={{display:'inline-block',background:'var(--ink)',color:'var(--surface)',padding:'14px 24px',borderRadius:8,fontSize:24,lineHeight:1.4}}>{lineAtFrame(frame+getSegment(segmentId).from).line}</span></div>}
 </AbsoluteFill>;
}
