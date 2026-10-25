import {notFound} from 'next/navigation';
import {ProjectDetail} from '@/components/portfolio/project-detail';
export function generateStaticParams(){return Array.from({length:12},(_,i)=>({slug:`project-${i+1}`}))}
export const metadata={title:'Project 1'};
export default async function Project({params}:{params:Promise<{slug:string}>}){const {slug}=await params;if(!/^project-([1-9]|1[0-2])$/.test(slug))notFound();return <main id="main" className="project-page"><ProjectDetail/></main>}
