import { Composition } from 'remotion';
import { shortDemo, video } from '@/config/content';
import { getSegment, sec } from '@/lib/timeline';
import { RumpPitch } from './compositions/RumpPitch';
import { Rump60 } from './compositions/Rump60';
import { RumpDemo } from './compositions/RumpDemo';
import { Segment, defaults } from './compositions/Segment';
export function RemotionRoot(){const size={width:video.width,height:video.height,fps:video.fps};return <><Composition id="Rump60" component={Rump60} durationInFrames={sec(shortDemo.seconds)} {...size} defaultProps={defaults}/><Composition id="RumpPitch" component={RumpPitch} durationInFrames={sec(video.seconds)} {...size} defaultProps={defaults}/><Composition id="RumpDemo" component={RumpDemo} durationInFrames={sec(video.seconds-video.demoStart)} {...size} defaultProps={defaults}/><Composition id="Segment" component={Segment} durationInFrames={getSegment('slide-problem').duration} {...size} defaultProps={{...defaults,segmentId:'slide-problem'}} calculateMetadata={({props})=>({durationInFrames:getSegment(String(props.segmentId)).duration})}/></>}
