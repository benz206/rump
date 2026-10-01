import { useCurrentFrame, spring } from 'remotion';
import { steps, pipeline, pitch, ui, video, beats } from '@/config/content';
import { sec } from '@/lib/timeline';
import { label } from '../ui';
export function UnderTheHood({id}:{id:string}) {
 const f=useCurrentFrame(); const step=steps.find(s=>s.id===id);
 const active=id==='wrapped'?6:id==='step-scan'?Math.min(3,Math.floor(Math.max(0,f-sec(beats.scan.nodeStart))/sec(beats.scan.nodeEvery))):pipeline.indexOf(step?.underTheHood.layer??'Connectors');
 return <aside data-testid="hood" style={{position:'absolute',top:0,right:0,bottom:0,width:660,padding:40,background:'var(--surface)',borderLeft:'1px solid var(--line)',zIndex:60,transform:`translateX(${(1-spring({frame:f,fps:video.fps,config:{damping:24}}))*12}px)`,boxShadow:'-20px 0 80px #11111116'}}>
 <div style={label}>{pitch.labels.hood}</div><h2 style={{fontSize:32,margin:'14px 0 24px'}}> {step?.title??pitch.wrapped.eyebrow}</h2>
 {pipeline.map((layer,i)=><div key={layer} style={{padding:'12px 18px',marginBottom:7,border:'1px solid var(--line)',borderRadius:8,background:i===active||(active===4&&i===5)?'var(--bg)':'var(--surface)',fontSize:18,fontWeight:i===active?600:400}}><span style={{color:i===active?'var(--positive)':'var(--muted)',marginRight:14}}>{i===active?'●':'○'}</span>{layer}</div>)}
 <h3 style={{...label,marginTop:24}}>{pitch.labels.privacy}</h3><p style={{fontSize:15,lineHeight:1.45,color:'var(--muted)'}}>{ui.privacy}</p><p style={{fontSize:15,lineHeight:1.45,borderTop:'1px solid var(--line)',paddingTop:18}}>{step?.underTheHood.body??pitch.wrapped.found}</p>
 </aside>;
}
