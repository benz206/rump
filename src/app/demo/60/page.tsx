'use client';
import dynamic from 'next/dynamic';
import { pitch } from '@/config/content';
const ShortDemoPlayer=dynamic(()=>import('@/components/ShortDemoPlayer'),{ssr:false,loading:()=> <div style={{height:'100vh',display:'grid',placeItems:'center'}}>{pitch.labels.loading}</div>});
export default function Demo60(){return <ShortDemoPlayer/>}
