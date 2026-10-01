import { AbsoluteFill, Sequence, useCurrentFrame } from 'remotion';
import { segments, sec } from '@/lib/timeline';
import { video } from '@/config/content';
import { Segment, type PitchProps } from './Segment';
export function RumpPitch(props:PitchProps){const frame=useCurrentFrame();return <AbsoluteFill>{segments.map(segment=><Sequence key={segment.id} from={segment.from} durationInFrames={segment.duration}><Segment segmentId={segment.id} {...props}/></Sequence>)}{frame>=segments.find(segment=>segment.id==='step-connect')!.from&&frame<segments.find(segment=>segment.id==='wrapped')!.from&&<div style={{position:'absolute',left:0,top:0,height:4,width:`${frame/sec(video.seconds)*100}%`,background:'var(--accent)',zIndex:90}}/>}</AbsoluteFill>}
