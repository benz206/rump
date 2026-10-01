import { beats, pitch, steps } from '@/config/content';
import { AppShell } from '../../shell/AppShell';
import { Avatar, Fade, Heading, LoadingGate, label, panel } from '../../ui';

export function Library() {
  const step = steps.find(item => item.id === 'step-library')!;
  return <AppShell nav={step.nav}><Heading title={step.title} /><LoadingGate until={beats.typing}><div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>{pitch.library.categories.map((category, index) => <Fade key={category} at={beats.typing + index * beats.enter} style={{ ...panel, padding: 0, overflow: 'hidden', height: 440 + (index % 2) * 65 }}><div style={{ height: 220, background: 'var(--line)', position: 'relative', overflow: 'hidden' }}><div style={{ position: 'absolute', width: 230, height: 230, border: '1px solid var(--muted)', borderRadius: index % 2 ? 12 : '50%', transform: `rotate(${index * 20}deg)`, left: 65, top: 48 }} /><div style={{ position: 'absolute', width: 125, height: 125, border: '1px solid var(--muted)', borderRadius: index % 2 ? '50%' : 12, left: 25, top: 80 }} /></div><div style={{ padding: 28 }}><h2 style={{ fontSize: 28, lineHeight: 1.25 }}>{category}</h2><div style={{ ...label, marginTop: 30, fontSize: 13, display: 'flex', alignItems: 'center', gap: 12 }}><Avatar name={pitch.library.sources[index % pitch.library.sources.length]} />{pitch.library.sources[index % pitch.library.sources.length]}</div></div></Fade>)}</div></LoadingGate></AppShell>;
}
