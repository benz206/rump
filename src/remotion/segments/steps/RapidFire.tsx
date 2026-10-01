import { useCurrentFrame } from 'remotion';
import { beats, opportunities, pitch, steps } from '@/config/content';
import { sec } from '@/lib/timeline';
import { AppShell } from '../../shell/AppShell';
import { Cursor, Heading, Skeleton, clamp, label, money, panel } from '../../ui';

export function RapidFire({ showCursor = true }: { showCursor?: boolean }) {
  const frame = useCurrentFrame();
  const content = pitch.rapid;
  const timing = beats.rapid;
  const step = steps.find(item => item.id === 'step-rapidfire')!;
  const sum = content.cards.reduce((total, card, index) => total + ('opportunity' in card && frame >= sec(timing.start + index * timing.stagger) ? (opportunities.find(item => item.id === card.opportunity)?.annualSavings ?? 0) * clamp(frame, sec(timing.start + index * timing.stagger), sec(timing.start + index * timing.stagger + timing.flip)) : 0), 0);
  return <AppShell nav={step.nav}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}><Heading title={content.title} /><div style={{ textAlign: 'right' }}><div style={label}>{pitch.labels.savings}</div><div style={{ fontSize: 52, letterSpacing: '-0.05em', borderBottom: '6px solid var(--accent)' }}>+{money(sum)}</div></div></div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 13, marginBottom: 28 }}><span style={{ color: 'var(--muted)', fontSize: 18, marginRight: 8 }}>{content.label}</span>{content.values.map((value, index) => {
      const selected = index === 0 || (index === 1 && frame >= sec(timing.click));
      return <button key={value} tabIndex={-1} data-demo-action={index === 1 ? 'select-sustainability' : undefined} style={{ padding: '12px 19px', fontSize: 17, borderRadius: 25, border: '1px solid var(--line)', background: selected ? 'var(--ink)' : 'var(--surface)', color: selected ? 'var(--surface)' : 'var(--muted)' }}>{selected ? '✓ ' : '+ '}{value}</button>;
    })}</div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18 }}>
      {content.cards.map((card, index) => {
        const at = timing.start + index * timing.stagger;
        const progress = clamp(frame, sec(at), sec(at + timing.flip));
        const saving = 'opportunity' in card ? opportunities.find(item => item.id === card.opportunity) : undefined;
        return <div key={card.title} style={{ ...panel, height: 302, padding: 25, position: 'relative', overflow: 'hidden' }}>
          {progress === 0 ? <div style={{ display: 'grid', gap: 24, opacity: 0.7 }}><Skeleton width="55%" height={24} /><Skeleton height={85} /><Skeleton width="45%" height={45} /></div> : <div style={{ opacity: progress, transform: `perspective(800px) rotateY(${(1 - progress) * 45}deg)`, transformOrigin: 'left', height: '100%', display: 'flex', flexDirection: 'column' }}><div style={{ ...label, fontSize: 12, marginBottom: 14 }}>{saving?.agent ?? content.values[index === 5 ? 3 : index === 6 ? 1 : 0]}</div><h2 style={{ fontSize: 25, letterSpacing: '-0.025em', marginBottom: 12 }}>{card.title}</h2><p style={{ fontSize: 17, lineHeight: 1.45, color: 'var(--muted)', marginBottom: 12 }}>{card.body}</p>
            {index === 6 && <div style={{ display: 'grid', gap: 6 }}>{content.greener.map(item => <div key={item} style={{ display: 'flex', gap: 8, fontSize: 13, alignItems: 'center' }}><span style={{ color: 'var(--positive)', whiteSpace: 'nowrap', fontSize: 8 }}>●●●</span>{item}</div>)}</div>}
            {index === 7 && <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>{content.priorities.map(item => <span key={item} style={{ borderBottom: '1px solid var(--line)', fontSize: 12, paddingBottom: 4 }}>{item}</span>)}</div>}
            <div style={{ marginTop: 'auto' }}>{saving ? <div style={{ fontSize: 43, letterSpacing: '-0.04em' }}>{money(saving.annualSavings)}<span style={{ fontSize: 17, letterSpacing: 0, color: 'var(--muted)' }}>{saving.type === 'Recurring' ? ` ${pitch.labels.annual}` : ''}</span></div> : <div style={{ fontSize: 12, lineHeight: 1.4, color: 'var(--muted)' }}>{index === 5 && <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 9 }}><span style={{ width: 32, height: 18, borderRadius: 18, background: 'var(--line)', padding: 3 }}><span style={{ display: 'block', width: 12, height: 12, borderRadius: 12, background: 'var(--surface)' }} /></span>{pitch.labels.off}</div>}{'note' in card && card.note}</div>}</div>
          </div>}
        </div>;
      })}
    </div>
    {showCursor && <Cursor x={544} y={181} at={timing.click} />}
  </AppShell>;
}
