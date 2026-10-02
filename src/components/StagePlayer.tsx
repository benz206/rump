'use client';
import { useEffect, useRef, useState } from 'react';
import { Player, type PlayerRef } from '@remotion/player';
import { RumpPitch } from '@/remotion/compositions/RumpPitch';
import { Segment } from '@/remotion/compositions/Segment';
import { beatFrames, getSegment, lineAtFrame, sec, segmentAtFrame, segments } from '@/lib/timeline';
import { narration, pitch, script, timing, video } from '@/config/content';
export default function StagePlayer({studio=false}:{studio?:boolean}) {
 const [query]=useState(()=>new URLSearchParams(window.location.search));
 const initial=getSegment(query.get('from')??'slide-problem');
 const library=query.get('from')==='step-library';
 const [frame,setFrame]=useState(initial.from);
 const [hood,setHood]=useState(query.get('hood')==='1');
 const [captions,setCaptions]=useState(query.get('captions')==='1');
 const [presenter,setPresenter]=useState(false);
 const [narrating,setNarrating]=useState(false);
 const [elapsed,setElapsed]=useState(0);
 const ref=useRef<PlayerRef>(null);
 const autoplay=useRef(query.get('autoplay')==='1');
 const target=useRef<number|null>(null);
 const started=useRef<number|null>(null);
 const initialSeconds=useRef(initial.from/video.fps);
 useEffect(()=>{
  const player=ref.current;if(!player)return;
  const onFrame=({detail}:{detail:{frame:number}})=>{
   if(target.current!==null&&detail.frame>=target.current){const beat=target.current;target.current=null;player.pause();player.seekTo(beat);setFrame(beat);return;}
   setFrame(detail.frame);
  };
  const onPlay=()=>{if(started.current===null)started.current=performance.now();};
  player.addEventListener('frameupdate',onFrame);player.addEventListener('play',onPlay);
  if(player.isPlaying())onPlay();
  const keyboard=(event:KeyboardEvent)=>{
   if(event.target instanceof HTMLElement && (['INPUT','TEXTAREA','SELECT'].includes(event.target.tagName)||event.target.isContentEditable))return;
   const f=player.getCurrentFrame();
   const seek=(next:number)=>{target.current=null;autoplay.current=false;player.pause();player.seekTo(next);setFrame(next);};
   switch(event.key.toLowerCase()){
    case 'arrowright':case ' ':event.preventDefault();autoplay.current=false;target.current=beatFrames.find(b=>b>f)??sec(video.seconds)-1;player.play();break;
    case 'arrowleft':event.preventDefault();seek([...beatFrames].reverse().find(b=>b<f)??0);break;
    case 'r':seek(0);started.current=null;initialSeconds.current=0;setElapsed(0);break;
    case 'a':autoplay.current=!autoplay.current;target.current=null;if(autoplay.current)player.play();else player.pause();break;
    case 'u':setHood(v=>!v);break;
    case 'c':setCaptions(v=>!v);break;
    case 'p':setPresenter(v=>!v);break;
    case 'f':if(player.isFullscreen())player.exitFullscreen();else player.requestFullscreen();break;
   }
  };
  window.addEventListener('keydown',keyboard);
  const clock=window.setInterval(()=>{if(started.current!==null)setElapsed((performance.now()-started.current)/1000+initialSeconds.current);},timing.clockMs);
  return()=>{player.removeEventListener('frameupdate',onFrame);player.removeEventListener('play',onPlay);window.removeEventListener('keydown',keyboard);window.clearInterval(clock);};
 },[]);
 const current=lineAtFrame(frame);const next=script.find(line=>line.at>frame/video.fps);
 const selected=segmentAtFrame(frame);
 return <div style={{height:'100vh',background:'var(--ink)',color:'var(--surface)',display:'flex',flexDirection:'column',overflow:'hidden'}}>
 {!library&&!narrating&&<button data-demo-action="play-narration" onClick={()=>{const player=ref.current;if(!player)return;target.current=null;autoplay.current=true;player.seekTo(initial.from);player.unmute();player.play();setNarrating(true);}} style={{position:'fixed',right:20,top:20,zIndex:100,border:0,borderRadius:8,padding:'12px 18px',background:'var(--accent)',color:'var(--ink)',fontWeight:600,cursor:'pointer'}}>{narration.play}</button>}
 {studio&&<header style={{padding:'16px 24px',display:'flex',justifyContent:'space-between',fontSize:14}}><strong>{pitch.labels.player}</strong><span data-testid="frame">{pitch.labels.frame} {frame} / {sec(video.seconds)}</span></header>}
 <div style={{flex:1,minHeight:0,display:'flex',alignItems:'center',justifyContent:'center'}}>
 <Player initiallyMuted acknowledgeRemotionLicense ref={ref} component={library?Segment:RumpPitch} inputProps={{showHood:hood,showCaptions:captions,showCursor:true,...(library?{segmentId:'step-library'}:{})}} durationInFrames={library?initial.duration:sec(video.seconds)} compositionWidth={video.width} compositionHeight={video.height} fps={video.fps} initialFrame={initial.from} autoPlay={query.get('autoplay')==='1'} controls={studio} clickToPlay={false} spaceKeyToPlayOrPause={false} moveToBeginningWhenEnded={false} style={{width:'100%',maxHeight:'100%',aspectRatio:`${video.width}/${video.height}`}}/>
 </div>
 {studio&&<nav style={{padding:16,display:'flex',gap:8,flexWrap:'wrap'}}>{segments.map(segment=><button key={segment.id} onClick={()=>{target.current=null;autoplay.current=false;ref.current?.pause();ref.current?.seekTo(segment.from);}} style={{border:0,borderRadius:5,padding:'8px 12px',background:selected.id===segment.id?'var(--accent)':'var(--surface)',color:'var(--ink)',fontSize:12}}>{segment.id}</button>)}</nav>}
 {presenter&&<aside data-testid="presenter" style={{position:'fixed',bottom:20,left:20,right:20,padding:20,background:elapsed-frame/video.fps>timing.behindSeconds?'var(--negative)':'var(--ink)',border:'1px solid var(--muted)',zIndex:100,fontSize:16}}><strong>{pitch.labels.presenter} · {selected.id} · {elapsed.toFixed(1)} / {(frame/video.fps).toFixed(1)}s</strong><p>{pitch.labels.current}: {current.line}</p><p>{pitch.labels.next}: {next?.line??pitch.labels.end}</p><small>{pitch.labels.controls}</small></aside>}
 </div>;
}
