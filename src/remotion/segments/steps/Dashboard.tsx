import { useCurrentFrame } from 'remotion';
import { beats, cashFlow, opportunities, pitch, steps, totalSavings, ui } from '@/config/content';
import { sec } from '@/lib/timeline';
import { AppShell } from '../../shell/AppShell';
import { Avatar, clamp, Counter, Fade, label, LoadingGate, money, Pill } from '../../ui';

export function DashboardContent({resolved=false,rogersSaved=false}:{resolved?:boolean;rogersSaved?:boolean}) {
  const frame=useCurrentFrame();
  const chart=resolved?1:clamp(frame,sec(beats.dashboard.chartStart),sec(beats.dashboard.chartEnd));
  const values=[cashFlow.fixed,cashFlow.subscriptions,cashFlow.fees,cashFlow.optional];
  const colors=['var(--ink)','var(--muted)','var(--line)','var(--negative)'];
  return <>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:24}}>
      <div><div style={label}>{pitch.labels.savings}</div><div style={{fontSize:76,letterSpacing:'-0.06em',lineHeight:1.12,fontWeight:500,marginTop:8}}><span style={{boxShadow:'inset 0 -13px var(--accent)'}}>{resolved?money(totalSavings()):<Counter value={totalSavings()} prefix="$" at={beats.dashboard.loading} duration={beats.dashboard.countEnd-beats.dashboard.loading}/>}</span><span style={{fontSize:27,letterSpacing:0,color:'var(--muted)',marginLeft:17}}>{pitch.labels.annual}</span></div></div>
      <Pill positive>✓ {pitch.labels.ready}</Pill>
    </div>
    <Fade at={resolved?-beats.enter:beats.dashboard.statsStart} duration={resolved?beats.enter:beats.dashboard.statsEnd-beats.dashboard.statsStart} style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:18,marginBottom:20}}>
      {[[pitch.labels.outflow,cashFlow.monthly],[pitch.labels.fixed,cashFlow.fixed],[pitch.labels.discretionary,cashFlow.monthly-cashFlow.fixed]].map(([name,value])=><div key={name} style={{background:'var(--surface)',border:'1px solid var(--line)',borderRadius:10,padding:'19px 24px'}}><div style={{fontSize:15,color:'var(--muted)',marginBottom:7}}>{name}</div><div style={{fontSize:34,fontWeight:500,letterSpacing:'-0.035em'}}>{money(Number(value))}<span style={{fontSize:15,color:'var(--muted)',marginLeft:9}}>{pitch.labels.monthly}</span></div></div>)}
    </Fade>
    <div style={{marginBottom:23}}><svg width="100%" height="13" viewBox="0 0 1500 13" preserveAspectRatio="none" style={{display:'block',borderRadius:4,overflow:'hidden'}}>{values.map((value,i)=><rect key={i} x={values.slice(0,i).reduce((a,b)=>a+b,0)/cashFlow.monthly*1500} width={value/cashFlow.monthly*1500*chart} height={13} fill={colors[i]}/>)}</svg><div style={{display:'flex',gap:30,marginTop:10}}>{values.map((value,i)=><div key={i} style={{fontSize:14,color:'var(--muted)',display:'flex',alignItems:'center',gap:8}}><span style={{width:7,height:7,background:colors[i],borderRadius:2}}/>{pitch.labels.breakdown[i]} <span style={{color:'var(--ink)'}}>{money(value)}</span></div>)}</div></div>
    <div style={{background:'var(--surface)',border:'1px solid var(--line)',borderRadius:12,overflow:'hidden'}}>
      <div style={{fontSize:21,fontWeight:500,padding:'17px 23px',borderBottom:'1px solid var(--line)'}}>{pitch.labels.opportunities}<span style={{fontSize:14,color:'var(--muted)',marginLeft:12}}>{opportunities.length}</span></div>
      <div style={{display:'grid',gridTemplateColumns:'2fr 0.7fr 1.2fr 0.7fr 0.6fr',padding:'10px 23px',fontSize:12,color:'var(--muted)',borderBottom:'1px solid var(--line)',textTransform:'uppercase',letterSpacing:'0.07em'}}><span>{pitch.labels.merchant}</span><span/><span>{pitch.labels.agent}</span><span>{pitch.labels.amount}</span><span>{pitch.labels.status}</span></div>
      {opportunities.map((item,i)=><Fade key={item.id} at={resolved?-beats.enter:beats.dashboard.rows+i*beats.dashboard.rowStagger} style={{display:'grid',gridTemplateColumns:'2fr 0.7fr 1.2fr 0.7fr 0.6fr',alignItems:'center',padding:'7px 23px',height:43,borderBottom:i<opportunities.length-1?'1px solid var(--line)':undefined,fontSize:15}}>
        <div data-demo-action={item.id==='rogers'?'open-rogers':undefined} style={{display:'flex',gap:13,alignItems:'center'}}><div style={{transform:'scale(0.68)',transformOrigin:'left center',width:29,height:29,display:'flex',alignItems:'center'}}><Avatar name={item.merchant} color={item.avatarColor}/></div><span>{item.title}</span></div><span style={{fontSize:12,color:'var(--muted)'}}>{item.type}</span><span style={{fontFamily:'var(--font-mono),monospace',fontSize:12,color:'var(--muted)'}}>{item.agent}</span><span style={{fontWeight:500}}>{money(item.annualSavings)}</span><span style={{color:rogersSaved&&i===0?'var(--positive)':'var(--muted)',fontSize:13}}>{rogersSaved&&i===0?'✓ '+ui.status.saved:ui.status.found}</span>
      </Fade>)}
    </div>
  </>;
}

export function Dashboard() {return <AppShell nav={steps[2].nav}><LoadingGate until={beats.dashboard.loading}><DashboardContent/></LoadingGate></AppShell>;}
