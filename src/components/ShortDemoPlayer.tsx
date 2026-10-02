'use client';
import { useRef, useState } from 'react';
import { Player, type PlayerRef } from '@remotion/player';
import { shortDemo, video } from '@/config/content';
import { sec } from '@/lib/timeline';
import { Rump60 } from '@/remotion/compositions/Rump60';
import { defaults } from '@/remotion/compositions/Segment';

export default function ShortDemoPlayer() {
 const ref=useRef<PlayerRef>(null);
 const [query]=useState(()=>new URLSearchParams(window.location.search));
 const [started,setStarted]=useState(false);
 return <main style={{height:'100vh',background:'var(--ink)',display:'flex',alignItems:'center',justifyContent:'center'}}>
  {!started&&<button data-demo-action="play-narration" onClick={()=>{ref.current?.seekTo(0);ref.current?.unmute();ref.current?.play();setStarted(true);}} style={{position:'fixed',right:20,top:20,zIndex:100,border:0,borderRadius:8,padding:'12px 18px',background:'var(--accent)',color:'var(--ink)',fontWeight:600,cursor:'pointer'}}>{shortDemo.play}</button>}
  <Player ref={ref} initiallyMuted acknowledgeRemotionLicense component={Rump60} inputProps={{...defaults,showCaptions:query.get('captions')==='1',showHood:query.get('hood')==='1'}} durationInFrames={sec(shortDemo.seconds)} compositionWidth={video.width} compositionHeight={video.height} fps={video.fps} autoPlay={query.get('autoplay')==='1'} controls moveToBeginningWhenEnded={false} style={{width:'100%',maxHeight:'100%',aspectRatio:`${video.width}/${video.height}`}}/>
 </main>;
}
