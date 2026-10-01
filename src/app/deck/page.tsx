import { redirect } from 'next/navigation';
export default async function Page({searchParams}:{searchParams:Promise<Record<string,string|string[]|undefined>>}) {
 const params=await searchParams; const query=new URLSearchParams();
 for(const [key,value] of Object.entries(params)) if(typeof value==='string') query.set(key,value);
 if(query.has('step')) {query.set('from','step-'+query.get('step'));query.delete('step');}
 redirect('/present'+(query.size?'?'+query.toString():''));
}
