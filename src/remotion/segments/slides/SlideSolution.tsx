import { AbsoluteFill, Freeze, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { beats, brand, pitch, screenUpdates, totalSavings } from '@/config/content';
import { getSegment, sec } from '@/lib/timeline';
import { clamp, Fade, label, money } from '../../ui';
import { SlideProblem } from './SlideProblem';

export function SlideSolution() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const entrance = clamp(frame, 0, sec(beats.enter));
  const morph = spring({ frame, fps, durationInFrames: sec(beats.solution.morph), config: { damping: 22 } });
  const blend = (from: number, to: number) => interpolate(morph, [0, 1], [from, to]);
  const savings = pitch.stats[0].value + (totalSavings() - pitch.stats[0].value) * morph;
  return <AbsoluteFill style={{ background: 'var(--bg)' }}>
    <AbsoluteFill style={{ opacity: 1 - entrance }}><Freeze frame={getSegment('slide-problem').duration - 1}><SlideProblem/></Freeze></AbsoluteFill>
    <AbsoluteFill style={{ opacity: entrance, padding: '58px 88px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span style={{ fontSize: 30, fontWeight: 650, letterSpacing: '-0.06em' }}>{brand.name}.</span><span style={label}>{pitch.label}</span></div>
      <Fade><h1 style={{ fontSize: 106, lineHeight: 1, letterSpacing: '-0.06em', fontWeight: 500, margin: '44px 0 22px' }}>{pitch.solution}</h1><p style={{ fontSize: 30, color: 'var(--muted)', maxWidth: 900, lineHeight: 1.25 }}>{pitch.subhead}</p></Fade>
      <div style={{ position: 'absolute', top: 365, left: 88, width: 1030, display: 'grid', gap: 24 }}>
        {screenUpdates.solution.map((bullet, i) => <Fade key={bullet.title} at={pitch.bullets[i].at} style={{ display: 'flex', gap: 24, padding:'24px 28px', border:'1px solid var(--line)',borderRadius:16,background:'var(--surface)' }}>
          <div style={{ border: '1px solid var(--line)', borderRadius: '50%', width: 58, height: 58, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight:600, color: 'var(--surface)', background:'var(--ink)', marginTop: 3 }}>{String(i + 1).padStart(2, '0')}</div>
          <div><div style={{ fontSize: 36, fontWeight: 550, letterSpacing: '-0.02em' }}>{bullet.title}</div><p style={{ fontSize: 23, lineHeight: 1.35, color: 'var(--muted)', margin: '6px 0 0', maxWidth: 850 }}>{bullet.body}</p></div>
        </Fade>)}
      </div>
      <div style={{ position: 'absolute', bottom: 45, left: 88, right: 88, borderTop: '1px solid var(--line)', paddingTop: 22, display: 'flex', justifyContent: 'space-between', fontSize: 18, color: 'var(--muted)' }}><span>{brand.tagline}</span><span>{pitch.labels.secure}</span></div>
    </AbsoluteFill>
    <div style={{ position: 'absolute', left: blend(88, 1212), top: blend(290, 376), width: blend(572, 620), height: blend(202, 380), border: '1px solid var(--line)', borderRadius: 12, background: morph > 0.5 ? 'var(--accent)' : 'var(--surface)', padding: '28px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'center', transform: `rotate(${blend(0, -2)}deg)` }}>
      <div style={{ ...label, color: 'var(--ink)', opacity: morph, marginBottom: 20 }}>{pitch.labels.savings}</div>
      <div style={{ fontSize: blend(72, 128), fontWeight: 500, letterSpacing: '-0.065em', lineHeight: 1 }}>{money(savings)}</div>
      <div style={{ fontSize: 25, marginTop: 16, opacity: morph }}>{pitch.labels.annual}</div>
    </div>
  </AbsoluteFill>;
}
