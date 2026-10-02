import { Img, staticFile, useCurrentFrame } from 'remotion';
import { beats, pitch, screenUpdates, steps } from '@/config/content';
import { sec } from '@/lib/timeline';
import { AppShell } from '../../shell/AppShell';
import { Button, Cursor, Heading, Pill } from '../../ui';

export function Connect({showCursor=true}:{showCursor?:boolean}) {
  const frame=useCurrentFrame();
  const connected=pitch.sources.filter((_,i)=>frame>=sec(beats.connect.start+i*beats.connect.stagger+beats.connect.spinner)).length;
  return <AppShell nav={steps[0].nav} connected={connected}>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:18}}>
      <Heading title={steps[0].title}/>
      <Button action="connect-all">{pitch.labels.connect} ↗</Button>
    </div>
    <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:20}}>
      {pitch.sources.map((source,i)=>{
        const start=sec(beats.connect.start+i*beats.connect.stagger);
        const done=frame>=start+sec(beats.connect.spinner);
        const running=frame>=start&&!done;
        return <div key={source.name} style={{height:188,padding:'28px 30px',border:'1px solid var(--line)',borderRadius:12,background:'var(--surface)'}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
            <div style={{display:'flex',alignItems:'center',gap:15}}><Img src={staticFile(`icons/${screenUpdates.sourceIcons[i]}`)} style={{width:48,height:48,objectFit:'contain',borderRadius:10}}/><span style={{fontSize:24,fontWeight:500}}>{source.name}</span></div>
            {done?<span style={{color:'var(--positive)',fontSize:27}}>✓</span>:running?<span style={{width:24,height:24,border:'2px solid var(--line)',borderTopColor:'var(--ink)',borderRadius:'50%',transform:`rotate(${frame*24}deg)`}}/>:<span style={{color:'var(--muted)',fontSize:22}}>+</span>}
          </div>
          <div style={{marginTop:30,fontSize:19,color:done?'var(--ink)':'var(--muted)'}}>{done?source.stat:running?pitch.labels.connecting:pitch.labels.connectSingle}</div>
          <div style={{marginTop:12,fontSize:14,color:'var(--positive)',opacity:done?1:0}}>{pitch.labels.connected}</div>
        </div>;
      })}
    </div>
    <div style={{marginTop:28,display:'flex',alignItems:'center',gap:14}}><Pill positive>✓ {pitch.labels.secure}</Pill></div>
    {showCursor&&<Cursor x={1500} y={90} at={beats.connect.click}/>}
  </AppShell>;
}
