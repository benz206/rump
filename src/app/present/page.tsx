'use client';
import dynamic from 'next/dynamic';
import { pitch } from '@/config/content';
const StagePlayer=dynamic(()=>import('@/components/StagePlayer'),{ssr:false,loading:()=> <div style={{height:'100vh',display:'grid',placeItems:'center'}}>{pitch.labels.loading}</div>});
export default function Present(){return <StagePlayer/>}
