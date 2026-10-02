import { useCurrentFrame } from 'remotion';
import { beats, opportunities, pitch, screenUpdates, steps } from '@/config/content';
import { sec } from '@/lib/timeline';
import { AppShell } from '../../shell/AppShell';
import { Counter, Cursor, Pill, Skeleton, TypingDots, clamp, label, panel } from '../../ui';

export function Flight({ showCursor = true }: { showCursor?: boolean }) {
  const frame = useCurrentFrame();
  const content = pitch.flight;
  const copy = screenUpdates.flight;
  const timing = beats.flight;
  const step = steps.find(item => item.id === 'step-flight')!;
  const saving = opportunities.find(item => item.id === 'flight')!;
  const drafted = frame >= sec(timing.status);
  const drafting = frame >= sec(timing.type);
  return <AppShell nav={step.nav}>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:26}}>
      <div><h1 style={{fontSize:32,fontWeight:600,letterSpacing:'-0.03em',margin:'0 0 10px'}}>{copy.title}</h1><p style={{fontSize:19,color:'var(--muted)',margin:0}}>{copy.subtitle}</p></div>
      <button data-demo-action="draft-claim" style={{background:'var(--ink)',color:'var(--surface)',border:0,borderRadius:9,padding:'16px 24px',fontSize:19,fontWeight:600}}>{content.cta}</button>
    </div>
    <div style={{display:'flex',gap:22,alignItems:'center',borderBottom:'1px solid var(--line)',paddingBottom:18,marginBottom:24}}><strong style={{fontSize:18}}>{copy.tab}</strong><Pill>{copy.source}</Pill></div>
    <div style={{display:'grid',gridTemplateColumns:'560px 1fr',gap:24}}>
      <div style={{display:'grid',gap:18}}>
        <div style={{...panel,padding:26,height:174}}><div style={{...label,marginBottom:18}}>{content.emailLabel}</div>{frame<sec(timing.email)?<div style={{display:'grid',gap:14}}><Skeleton/><Skeleton width="80%"/></div>:<><strong style={{fontSize:21}}>{saving.merchant}</strong><p style={{fontSize:20,lineHeight:1.45,marginTop:12}}>{content.email}</p></>}</div>
        <div style={{...panel,padding:26,height:154}}><div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}><strong style={{fontSize:24}}>{copy.flight}</strong><span style={{background:'var(--amber-soft)',color:'var(--amber)',padding:'7px 12px',borderRadius:20,fontSize:16}}>{copy.delay}</span></div><div style={{fontSize:25,marginTop:15}}>{copy.route}</div><div style={{fontSize:16,color:'var(--muted)',marginTop:10}}>{copy.date} · {content.booking}</div></div>
        <div style={{...panel,padding:26,height:270}}><div style={{...label,marginBottom:18}}>{content.ruleLabel}</div>{frame<sec(timing.rules)?<div style={{display:'grid',gap:16}}><Skeleton/><Skeleton/><Skeleton width="75%"/></div>:<><div style={{display:'grid',gap:14}}>{copy.rules.map(rule=><div key={rule} style={{fontSize:19}}><span style={{color:'var(--positive)',marginRight:12}}>✓</span>{rule}</div>)}</div><p style={{fontSize:15,color:'var(--muted)',margin:'20px 0 0'}}>{copy.assumption}</p></>}</div>
      </div>
      <div style={{...panel,padding:30,height:634,display:'flex',flexDirection:'column'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',paddingBottom:22,borderBottom:'1px solid var(--line)'}}><strong style={{fontSize:23}}>{copy.request}</strong><Pill positive={drafted}>{drafted?content.status:drafting?copy.drafting:copy.awaiting}</Pill></div>
        <div style={{fontSize:17,color:'var(--muted)',padding:'20px 0'}}>{copy.to}</div>
        <div style={{flex:1,fontSize:20,lineHeight:1.55}}>{!drafting?<div style={{display:'flex',alignItems:'center',gap:10,color:'var(--muted)'}}>{copy.gathering}<TypingDots/></div>:<><span style={{whiteSpace:'pre-wrap'}}>{content.letter.slice(0,Math.floor(content.letter.length*clamp(frame,sec(timing.type),sec(timing.typeEnd))))}</span>{!drafted&&<span style={{opacity:Math.floor(frame/copy.caretEvery)%2}}>▌</span>}</>}</div>
        <div style={{borderTop:'1px solid var(--line)',paddingTop:20,display:'flex',alignItems:'center',justifyContent:'space-between'}}><div><div style={{...label,fontSize:12}}>{copy.eligible}</div><div style={{fontSize:48,fontWeight:600,letterSpacing:'-0.04em',marginTop:6}}><Counter value={saving.annualSavings} at={timing.status} duration={timing.countEnd-timing.status} prefix="$"/></div></div><div style={{textAlign:'right'}}><div style={{fontSize:18}}>{copy.approval}</div><div style={{fontSize:13,color:'var(--muted)',marginTop:10}}>{copy.audit}</div></div></div>
      </div>
    </div>
    <div style={{fontSize:16,color:drafted?'var(--positive)':'var(--muted)',marginTop:20,opacity:drafted?1:0}}>{copy.end}</div>
    {showCursor&&<div style={{'--accent':'var(--ink)'} as React.CSSProperties}><Cursor x={1480} y={66} at={timing.click}/></div>}
  </AppShell>;
}
