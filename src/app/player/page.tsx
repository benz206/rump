'use client';
import dynamic from 'next/dynamic';
import { pitch } from '@/config/content';
const StagePlayer=dynamic(()=>import('@/components/StagePlayer'),{ssr:false,loading:()=> <div>{pitch.labels.loading}</div>});
export default function PlayerPage(){return <StagePlayer studio/>}
