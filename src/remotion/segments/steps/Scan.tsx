import { useCurrentFrame } from 'remotion';
import { beats, pitch, steps } from '@/config/content';
import { sec } from '@/lib/timeline';
import { AppShell } from '../../shell/AppShell';
import { clamp, Fade, Heading, label, panel, TypingDots } from '../../ui';

export function Scan() {
  const frame=useCurrentFrame();
  const current=Math.min(pitch.scanHeadlines.length-1,Math.floor(frame/sec(beats.scan.headline)));
  const nodes=pitch.scanPipeline;
  const progress=clamp(frame,sec(beats.scan.nodeStart),sec(beats.scan.nodeStart+beats.scan.nodeEvery*(nodes.length-1)));
  return <AppShell nav={steps[1].nav}>
    <Heading title={pitch.scanHeadlines[current]}/>
    <div style={{height:5,background:'var(--line)',borderRadius:6,marginBottom:36,overflow:'hidden'}}><div style={{height:'100%',width:`${progress*100}%`,background:'var(--ink)'}}/></div>
    <div style={{display:'grid',gridTemplateColumns:'1.3fr 1fr',gap:26}}>
      <div style={{...panel,height:622,padding:32}}>
        <div style={{...label,display:'flex',alignItems:'center',gap:12,marginBottom:25}}><span style={{width:7,height:7,borderRadius:9,background:'var(--positive)'}}/>{pitch.labels.activity}</div>
        {pitch.logs.map((line,i)=><Fade key={line} at={beats.scan.logStart+i*beats.scan.logEvery} style={{fontFamily:'var(--font-mono),monospace',fontSize:16,lineHeight:1.7,padding:'9px 0',borderBottom:'1px solid var(--line)',color:i===pitch.logs.length-1?'var(--positive)':'var(--ink)'}}>{line}</Fade>)}
        <TypingDots/>
      </div>
      <div style={{...panel,height:622,padding:32}}>
        <div style={{...label,marginBottom:25}}>{pitch.labels.pipeline}</div>
        {nodes.map((node,i)=>{
          const active=frame>=sec(beats.scan.nodeStart+i*beats.scan.nodeEvery);
          return <div key={node} style={{display:'flex',gap:22,height:76,alignItems:'flex-start'}}>
            <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}><div style={{width:36,height:36,display:'grid',placeItems:'center',border:'1px solid var(--line)',background:active?'var(--accent)':'var(--bg)',borderRadius:9,fontSize:18}}>{active?'✓':String(i+1).padStart(2,'0')}</div>{i<nodes.length-1&&<div style={{height:40,width:1,background:'var(--line)'}}/>}</div>
            <div style={{paddingTop:8,fontSize:21,color:active?'var(--ink)':'var(--muted)',fontWeight:active?500:400}}>{node}</div>
          </div>;
        })}
      </div>
    </div>
  </AppShell>;
}
