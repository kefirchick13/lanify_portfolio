import {notFound} from 'next/navigation';
import {SketchDetail} from '@/components/portfolio/gallery';
import {content} from '@/lib/portfolio';
export function generateStaticParams(){return content.sketches.map(({slug})=>({slug}))}
export const metadata={title:'Thorn heart'};
export default async function Sketch({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const sketch=content.sketches.find(item=>item.slug===slug);if(!sketch)notFound();return <main id="main" className="gallery-page"><SketchDetail sketch={sketch}/></main>}
