import { useCurrentFrame } from 'remotion';
import { beats, opportunities, pitch, steps } from '@/config/content';
import { sec } from '@/lib/timeline';
import { AppShell } from '../../shell/AppShell';
import { Avatar, Fade, Heading, Pill, Skeleton, TypingDots, clamp, label, money, panel } from '../../ui';

export function Notion() {
  const frame = useCurrentFrame();
  const content = pitch.notion;
  const timing = beats.notion;
  const step = steps.find(item => item.id === 'step-notion')!;
  const saving = opportunities.find(item => item.id === 'notion')!;
  const heat = clamp(frame, sec(timing.heatmap), sec(timing.heatmapEnd));
  const phone = clamp(frame, sec(timing.phone), sec(timing.phone + beats.enter));
  return <AppShell nav={step.nav}>
    <Heading title={step.title} eyebrow={saving.agent} />
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: 46 }}>
      <Fade duration={timing.drawer} style={{ ...panel, height: 680, padding: 38 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}><Avatar name={content.title} /><div><h2 style={{ fontSize: 30, marginBottom: 7 }}>{content.title}</h2><div style={{ fontSize: 19, color: 'var(--muted)' }}>{content.subtitle}</div></div><div style={{ marginLeft: 'auto' }}><Pill>{frame >= sec(timing.messages[2]) ? pitch.labels.approved : pitch.labels.found}</Pill></div></div>
        <div style={{ ...label, marginTop: 48, marginBottom: 24 }}>{pitch.labels.usage}</div>
        {content.features.map((feature, index) => <div key={feature} style={{ marginBottom: 27 }}><div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 18, marginBottom: 12 }}><span>{feature}</span><span style={{ color: 'var(--muted)', fontSize: 15 }}>{pitch.labels.zero}</span></div><div style={{ display: 'grid', gridTemplateColumns: `repeat(${content.days / 2}, 1fr)`, gap: 5 }}>{Array.from({ length: content.days / 2 }, (_, day) => <div key={day} style={{ height: 16, borderRadius: 3, background: 'var(--line)', opacity: day / (content.days / 2) < heat ? 1 : 0.2 + index * 0.03 }} />)}</div></div>)}
        <div style={{ borderTop: '1px solid var(--line)', paddingTop: 30, display: 'flex', alignItems: 'end', justifyContent: 'space-between' }}><div><div style={label}>{pitch.labels.savings}</div><div style={{ fontSize: 68, letterSpacing: '-0.05em', marginTop: 8 }}>{money(saving.annualSavings)}<span style={{ fontSize: 24, color: 'var(--muted)', letterSpacing: 0 }}> {pitch.labels.annual}</span></div></div><div style={{ width: 95, height: 8, background: 'var(--accent)', marginBottom: 13 }} /></div>
      </Fade>
      <div style={{ height: 680, position: 'relative' }}>
        {frame < sec(timing.phone) && <div style={{ ...panel, margin: '70px 34px', opacity: 0.6 }}><Skeleton height={54} /><div style={{ marginTop: 25 }}><Skeleton height={150} /></div><div style={{ marginTop: 25 }}><Skeleton height={80} /></div></div>}
        <div style={{ position: 'absolute', top: 0, right: 12, width: 314, height: 680, opacity: phone, transform: `translateX(${120 * (1 - phone)}px)`, background: 'var(--surface)', border: '7px solid var(--ink)', borderRadius: 48, overflow: 'hidden', padding: '18px 14px 22px' }}>
          <div style={{ width: 92, height: 25, borderRadius: 20, background: 'var(--ink)', margin: '0 auto 20px' }} />
          <div style={{ textAlign: 'center', paddingBottom: 14, borderBottom: '1px solid var(--line)', fontSize: 20 }}><div style={{ marginBottom: 10 }}><Avatar name={pitch.labels.phone} /></div>{pitch.labels.phone}</div>
          <div style={{position:'absolute',bottom:9,left:'35%',width:'30%',height:5,borderRadius:5,background:'var(--ink)'}} />
          <div style={{ paddingTop: 18, display: 'flex', flexDirection: 'column', gap: 14 }}>{content.messages.map((message, index) => {
            const at = timing.messages[index];
            if (frame < sec(at - beats.typing)) return null;
            const mine = index === 1;
            return <div key={message} style={{ alignSelf: mine ? 'flex-end' : 'flex-start', maxWidth: '94%', borderRadius: 18, padding: '12px 14px', background: mine ? 'var(--message)' : 'var(--phone)', color: mine ? 'var(--surface)' : 'var(--ink)', fontSize: 17, lineHeight: 1.4 }}>{frame < sec(at) ? <TypingDots /> : message}</div>;
          })}</div>
        </div>
      </div>
    </div>
    <Fade at={timing.chips} style={{ marginTop: 28, display: 'flex', alignItems: 'center', gap: 16 }}><span style={label}>{pitch.labels.similar}</span>{content.similar.map(item => <Pill key={item}>{item}</Pill>)}</Fade>
  </AppShell>;
}
