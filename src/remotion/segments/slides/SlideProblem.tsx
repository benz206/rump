import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { beats, brand, pitch } from '@/config/content';
import { sec } from '@/lib/timeline';
import { clamp, Counter, Fade, label } from '../../ui';

export function SlideProblem() {
  const frame = useCurrentFrame();
  const highlightOrder = [1, 0, 3, 4];
  const activeHighlight = beats.problem.highlights.findLastIndex(at => frame >= sec(at));
  return <AbsoluteFill style={{ background: 'var(--bg)', padding: '58px 88px', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', right: 18, top: -frame * 0.4, opacity: 0.035, fontFamily: 'monospace', fontSize: 34, lineHeight: 2.6, transform: 'rotate(-8deg)', pointerEvents: 'none' }}>
      {[...pitch.ticker, ...pitch.ticker].map((line, i) => <div key={i}>{line}</div>)}
    </div>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
      <span style={{ fontSize: 30, fontWeight: 650, letterSpacing: '-0.06em' }}>{brand.name}.</span>
      <span style={label}>{pitch.label}</span>
    </div>
    <Fade duration={beats.problem.headline}>
      <h1 style={{ fontSize: 70, letterSpacing: '-0.055em', lineHeight: 1.06, fontWeight: 500, maxWidth: 1250, margin: '32px 0' }}>{pitch.problem.split(/(?<=\.)\s+/).map(line => <span key={line} style={{ display: 'block' }}>{line}</span>)}</h1>
    </Fade>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, position: 'absolute', top: 290, left: 88, right: 88 }}>
      {pitch.stats.map((stat, i) => {
        const at = beats.problem.tileStart + i * beats.problem.stagger;
        const highlighted = highlightOrder[activeHighlight] === i;
        const mark = activeHighlight < 0 ? 0 : clamp(frame, sec(beats.problem.highlights[activeHighlight]), sec(beats.problem.highlights[activeHighlight] + beats.enter));
        return <Fade key={stat.caption} at={at} style={{ height: 202, background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 12, padding: '18px 26px', overflow: 'hidden' }}>
          <div style={{ fontSize: 72, letterSpacing: '-0.06em', lineHeight: 1, fontWeight: 500, position: 'relative', display: 'inline-block' }}>
            {highlighted && <span style={{ position: 'absolute', left: -7, right: -9, bottom: 2, height: 28, background: 'var(--accent)', transform: `scaleX(${mark}) rotate(-2deg)`, transformOrigin: 'left center' }}/>}
            <span style={{ position: 'relative' }}><Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} at={at} duration={beats.problem.count}/></span>
          </div>
          <div style={{ fontSize: 21, lineHeight: 1.2, marginTop: 10, maxWidth: 470 }}>{stat.caption}</div>
          <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 9 }}>{stat.source}</div>
        </Fade>;
      })}
    </div>
    <Fade at={beats.problem.footer} style={{ position: 'absolute', bottom: 50, left: 88, right: 88, borderTop: '1px solid var(--line)', paddingTop: 22, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <span style={{ fontSize: 22 }}>{pitch.mobileNote}</span>
      <span style={{ fontSize: 14, color: 'var(--muted)' }}>{pitch.mobileSource}</span>
    </Fade>
  </AbsoluteFill>;
}
