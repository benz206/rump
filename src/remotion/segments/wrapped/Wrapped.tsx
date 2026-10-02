import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { beats, brand, cashFlow, opportunities, pitch, totalSavings } from '@/config/content';
import { sec } from '@/lib/timeline';
import { clamp } from '../../ui';

export function Wrapped() {
  const frame = useCurrentFrame();
  const index = beats.wrapped.cards.reduce((current, at, i) => frame >= sec(at) ? i : current, 0);
  const progress = clamp(frame, sec(beats.wrapped.cards[index]), sec(beats.wrapped.cards[index] + beats.enter));
  const final = index === beats.wrapped.cards.length - 1;
  const dark = index % 2 === 1 || final;
  const amount = index === 0 ? cashFlow.monthly * 12 : index === 1 ? totalSavings() : opportunities.find(item => item.id === 'flight')!.annualSavings;
  return <AbsoluteFill style={{ background: dark ? 'var(--ink)' : 'var(--accent)', color: dark ? 'var(--surface)' : 'var(--ink)', padding: '72px 100px', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', width: 900, height: 900, borderRadius: '50%', border: `1px solid ${dark ? 'var(--surface)' : 'var(--ink)'}`, opacity: 0.12, right: -220, top: -230, transform: `scale(${1 + progress * 0.15})` }} /><div style={{ position: 'absolute', width: 740, height: 740, borderRadius: '50%', border: `1px solid ${dark ? 'var(--surface)' : 'var(--ink)'}`, opacity: 0.12, right: -140, top: -150 }} />
    <div style={{ fontSize: 42, fontWeight: 600, letterSpacing: '-0.02em', opacity: 1 }}>{pitch.wrapped.eyebrow} <span style={{ float: 'right' }}>{cashFlow.year}</span></div>
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', opacity: progress, transform: `translateY(${30 * (1 - progress)}px)` }}>
      {final ? <><div style={{ color: 'var(--accent)', fontSize: 200, lineHeight: 1, fontWeight: 600, letterSpacing: '-0.07em', marginBottom: 44 }}>{brand.name}.</div><h1 style={{ fontSize: 86, letterSpacing: '-0.04em', fontWeight: 500, maxWidth: 1100, lineHeight: 1.15 }}>{brand.tagline}</h1></> : <><h1 style={{ maxWidth: 1350, fontSize: index === 3 ? 58 : 65, lineHeight: 1.12, fontWeight: 500, letterSpacing: '-0.04em', marginBottom: 38 }}>{pitch.wrapped.labels[index]}</h1><div style={{ fontSize: index === 4 ? 185 : 240, lineHeight: 1, letterSpacing: '-0.065em', fontWeight: 500, color: dark ? 'var(--accent)' : 'var(--ink)' }}>{index < 3 ? `$${amount.toLocaleString('en-US')}` : index === 3 ? pitch.notion.unusedDays : `${cashFlow.coreShare}% / ${100 - cashFlow.coreShare}%`}</div><div style={{ marginTop: 35, fontSize: 32, opacity: 0.75 }}>{index === 1 ? pitch.wrapped.found : index === 3 ? pitch.wrapped.unused : index === 4 ? pitch.wrapped.share : ''}</div></>}
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 20 }}><span style={{ opacity: 0.65 }}>{final ? `${pitch.labels.team} ${brand.team.join(' · ')}` : brand.tagline}</span><div style={{ display: 'flex', gap: 10 }}>{beats.wrapped.cards.map((at, i) => <span key={at} style={{ width: i === index ? 54 : 12, height: 8, borderRadius: 8, background: dark ? 'var(--surface)' : 'var(--ink)', opacity: i === index ? 1 : 0.25 }} />)}</div></div>
  </AbsoluteFill>;
}
