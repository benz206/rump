import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from 'remotion';
import { segments, sec } from '@/lib/timeline';
import { narration, video } from '@/config/content';
import { Segment, type PitchProps } from './Segment';
export function RumpPitch(props:PitchProps){const frame=useCurrentFrame();return <AbsoluteFill><Audio src={staticFile(narration.file)}/>{segments.map(segment=><Sequence key={segment.id} from={segment.from} durationInFrames={segment.duration}><Segment segmentId={segment.id} {...props}/></Sequence>)}{frame>=segments.find(segment=>segment.id==='step-connect')!.from&&frame<segments.find(segment=>segment.id==='wrapped')!.from&&<div style={{position:'absolute',left:0,top:0,height:4,width:`${frame/sec(video.seconds)*100}%`,background:frame>=segments.find(segment=>segment.id==='step-flight')!.from&&frame<segments.find(segment=>segment.id==='step-rapidfire')!.from?'var(--ink)':'var(--accent)',zIndex:90}}/>}</AbsoluteFill>}
