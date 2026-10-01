import { useCurrentFrame } from 'remotion';
import { beats, opportunities, pitch, steps } from '@/config/content';
import { sec } from '@/lib/timeline';
import { AppShell } from '../../shell/AppShell';
import { Avatar, Button, Counter, Cursor, Fade, Heading, Pill, Skeleton, Typewriter, clamp, label, panel } from '../../ui';

export function Flight({ showCursor = true }: { showCursor?: boolean }) {
  const frame = useCurrentFrame();
  const content = pitch.flight;
  const timing = beats.flight;
  const step = steps.find(item => item.id === 'step-flight')!;
  const saving = opportunities.find(item => item.id === 'flight')!;
  const lift = clamp(frame, sec(timing.lift), sec(timing.lift + beats.enter));
  return <AppShell nav={step.nav}>
    <Heading title={content.title} eyebrow={saving.agent} />
    <div style={{ display: 'grid', gridTemplateColumns: '620px 1fr', gap: 30 }}>
      <div>
        <div style={{ ...panel, padding: 32, minHeight: 230, transform: `translateY(${-8 * lift}px)` }}><div style={{ ...label, marginBottom: 24 }}>{content.emailLabel}</div>{frame < sec(timing.email) ? <><Skeleton height={26} /><div style={{ marginTop: 14 }}><Skeleton height={54} /></div></> : <Fade at={timing.email}><div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}><Avatar name={saving.merchant} color={saving.avatarColor} /><span style={{ fontSize: 21 }}>{saving.merchant}</span><span style={{ color: 'var(--muted)', marginLeft: 'auto', fontSize: 17 }}>{content.booking}</span></div><p style={{ fontSize: 27, lineHeight: 1.3, marginBottom: 0 }}>{content.email}</p></Fade>}</div>
        <Fade at={timing.rules} duration={timing.rulesEnd - timing.rules} style={{ ...panel, padding: 32, marginTop: 22 }}><div style={{ ...label, marginBottom: 18 }}>{content.ruleLabel}</div><div style={{ fontSize: 25, lineHeight: 1.45, marginBottom: 25 }}>{content.rules}</div><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><Pill positive>{pitch.labels.ready}</Pill><Button action="draft-claim">{content.cta}</Button></div></Fade>
        <Fade at={timing.status} style={{ background: 'var(--accent)', borderRadius: 12, padding: '24px 32px', marginTop: 22, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}><span style={{ fontSize: 65, fontWeight: 500, letterSpacing: '-0.05em' }}><Counter value={saving.annualSavings} at={timing.status} duration={timing.countEnd - timing.status} prefix="$" /></span><span style={{ fontSize: 18 }}>{pitch.labels.savings}</span></Fade>
      </div>
      <div style={{ ...panel, minHeight: 660, padding: 40, display: 'flex', flexDirection: 'column' }}><div style={{ ...label, paddingBottom: 26, borderBottom: '1px solid var(--line)' }}>{content.claimLabel}</div><div style={{ flex: 1, paddingTop: 32, fontSize: 23, lineHeight: 1.6 }}>{frame < sec(timing.type) ? <div style={{ display: 'grid', gap: 20 }}><Skeleton width="55%" /><Skeleton /><Skeleton /><Skeleton width="80%" /><Skeleton /><Skeleton width="65%" /></div> : <Typewriter text={content.letter} at={timing.type} end={timing.typeEnd} />}</div><Fade at={timing.status} style={{ paddingTop: 24, borderTop: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: 12 }}><span style={{ color: 'var(--positive)', fontSize: 24 }}>✓</span><span style={{ fontSize: 20 }}>{content.status}</span></Fade></div>
    </div>
    {showCursor && <Cursor x={555} y={655} at={timing.click} />}
  </AppShell>;
}
