import { Sequence } from 'remotion';
import { video } from '@/config/content';
import { sec } from '@/lib/timeline';
import { RumpPitch } from './RumpPitch';
import type { PitchProps } from './Segment';
export function RumpDemo(props:PitchProps){return <Sequence from={-sec(video.demoStart)}><RumpPitch {...props}/></Sequence>}
