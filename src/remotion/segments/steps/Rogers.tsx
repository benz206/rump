import { useCurrentFrame } from 'remotion';
import { beats, opportunities, pitch, steps, ui } from '@/config/content';
import { sec } from '@/lib/timeline';
import { AppShell } from '../../shell/AppShell';
import { Avatar, Button, clamp, Counter, Cursor, Drawer, Fade, label, money, Pill, TypingDots } from '../../ui';
import { DashboardContent } from './Dashboard';

export function Rogers({showCursor=true}:{showCursor?:boolean}) {
  const frame=useCurrentFrame();
  const content=pitch.rogers;
  const chatting=frame>=sec(beats.rogers.ask);
  const saved=frame>=sec(beats.rogers.success);
  const amount=content.current-content.offer;
  const bar=clamp(frame,sec(beats.rogers.bars),sec(beats.rogers.barsEnd));
  return <AppShell nav={steps[3].nav}>
    <DashboardContent resolved rogersSaved={saved}/>
    {frame>=sec(beats.rogers.row)&&<>
      <div style={{position:'absolute',inset:0,background:'var(--bg)',opacity:0.45}}/>
      <Drawer at={beats.rogers.row} width={880}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',paddingBottom:23,borderBottom:'1px solid var(--line)',marginBottom:26}}>
          <div style={{display:'flex',gap:14,alignItems:'center'}}><Avatar name={opportunities[0].merchant} color={opportunities[0].avatarColor}/><div><div style={{fontSize:23,fontWeight:500}}>{opportunities[0].merchant}</div><div style={{fontFamily:'var(--font-mono),monospace',fontSize:13,color:'var(--muted)',marginTop:4}}>{opportunities[0].agent}</div></div></div>
          <Pill positive={saved}>{saved?ui.status.saved:chatting?ui.status.running:ui.status.found}</Pill>
        </div>
        {!chatting?<>
          <h1 style={{fontSize:43,fontWeight:500,letterSpacing:'-0.035em',lineHeight:1.16,margin:'0 0 45px'}}>{content.headline}</h1>
          <div style={{display:'grid',gap:31,marginBottom:44}}>{[content.current,content.benchmark,content.competitor].map((value,i)=><div key={content.planLabels[i]}><div style={{display:'flex',justifyContent:'space-between',fontSize:19,marginBottom:12}}><span>{content.planLabels[i]}</span><span style={{fontWeight:500}}>{money(value)}<span style={{fontSize:15,color:'var(--muted)',marginLeft:7}}>{pitch.labels.monthly}</span></span></div><div style={{height:31,background:'var(--bg)',borderRadius:5,overflow:'hidden'}}><div style={{height:'100%',width:`${value/content.current*bar*100}%`,background:i===0?'var(--negative)':i===1?'var(--ink)':'var(--muted)',borderRadius:5}}/></div></div>)}</div>
          <Button action="ask-retention">{content.cta} ↗</Button>
          <div style={{marginTop:25,color:'var(--muted)',fontSize:15}}>{pitch.labels.secure}</div>
        </>:<>
          <div style={{...label,marginBottom:19}}>{content.messages[0].who} ↔ {content.messages[1].who}</div>
          <div style={{display:'grid',gap:12}}>
            {content.messages.map((message,i)=>{
              const revealed=frame>=sec(message.at);
              const typing=frame>=sec(message.at-beats.typing)&&!revealed;
              if(!revealed&&!typing)return null;
              const rump=message.who===content.messages[0].who;
              return <Fade key={i} at={message.at-beats.typing} style={{marginLeft:rump?38:0,marginRight:rump?0:38}}>
                <div style={{fontSize:12,color:'var(--muted)',marginBottom:5,textAlign:rump?'right':'left'}}>{message.who}</div>
                <div style={{padding:typing?'2px 8px':'12px 17px',borderRadius:10,background:rump?'var(--bg)':'var(--surface)',border:'1px solid var(--line)',fontSize:18,lineHeight:1.35}}>{typing?<TypingDots/>:message.text}</div>
              </Fade>;
            })}
          </div>
          {saved&&<Fade at={beats.rogers.success} style={{position:'absolute',left:42,right:42,bottom:36,background:'var(--accent)',borderRadius:12,padding:'20px 25px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
            <div><div style={{fontSize:34,fontWeight:500,letterSpacing:'-0.04em'}}><Counter value={amount} prefix="$" at={beats.rogers.success} duration={beats.rogers.countEnd-beats.rogers.success}/><span style={{fontSize:20,letterSpacing:0}}> {pitch.labels.monthly} {pitch.labels.saved}.</span></div><div style={{marginTop:6,fontSize:15}}>{pitch.labels.approved}</div></div>
            <div style={{fontSize:30,fontWeight:500}}>{money(opportunities[0].annualSavings)}<span style={{fontSize:17,marginLeft:8}}>{pitch.labels.annual}</span> ✓</div>
          </Fade>}
        </>}
      </Drawer>
    </>}
    {showCursor&&<><Cursor x={390} y={475} at={beats.rogers.row}/><Cursor x={1030} y={622} at={beats.rogers.ask}/></>}
  </AppShell>;
}
