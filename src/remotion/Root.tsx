import { Composition } from 'remotion';
import { video } from '@/config/content';
import { getSegment, sec } from '@/lib/timeline';
import { RumpPitch } from './compositions/RumpPitch';
import { RumpDemo } from './compositions/RumpDemo';
import { Segment, defaults } from './compositions/Segment';
export function RemotionRoot(){const size={width:video.width,height:video.height,fps:video.fps};return <><Composition id="RumpPitch" component={RumpPitch} durationInFrames={sec(video.seconds)} {...size} defaultProps={defaults}/><Composition id="RumpDemo" component={RumpDemo} durationInFrames={sec(video.seconds-video.demoStart)} {...size} defaultProps={defaults}/><Composition id="Segment" component={Segment} durationInFrames={getSegment('slide-problem').duration} {...size} defaultProps={{...defaults,segmentId:'slide-problem'}} calculateMetadata={({props})=>({durationInFrames:getSegment(String(props.segmentId)).duration})}/></>}
