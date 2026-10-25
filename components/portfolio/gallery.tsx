'use client';

import Link from 'next/link';
import {useEffect,useRef,useState} from 'react';
import type {MouseEvent} from 'react';
import {content,type Sketch} from '@/lib/portfolio';
import {Tag} from '@/components/tag';
import {ProjectCard} from './project-card';
import {EmptyGallery} from './empty-gallery';
import {Ornament,Rule,ScrollHint} from './primitives';

function GalleryHeading({sketches,split=false}:{sketches:boolean;split?:boolean}){return <header className="gallery-heading"><h1>{sketches?'ARTWORKS':'DESIGN CASES'}</h1><Rule/><p>{sketches&&split?content.sketchIntro:content.intro}</p><Rule/></header>}
function FilterBar({year,onChange}:{year:string|null;onChange:(year:string|null)=>void}){return <div className="filter-bar"><div className="year-filters" aria-label="Filter by year">{['2026','2025','2024'].map(value=><button type="button" key={value} aria-pressed={year===value} onClick={()=>onChange(year===value?null:value)}><Tag>{value}</Tag></button>)}</div><ScrollHint/></div>}
export function DesignGallery(){const [year,setYear]=useState<string|null>(null);const projects=content.projects.filter(p=>!year||p.year===year);return <><GalleryHeading sketches={false}/><FilterBar year={year} onChange={setYear}/><div className="project-grid">{projects.length===0&&<EmptyGallery year={year} onReset={()=>setYear(null)}/>}{projects.map(project=><ProjectCard key={project.slug} project={project}/>)}</div><span className="sr-only" role="status">{projects.length} projects</span><Ornament/></>}
export function SketchReceipt({sketch}:{sketch:Sketch}){return <section className="sketch-receipt" aria-label="Sketch information"><Rule double/><p>ARTWORKS / TATTOO SKETCH</p><Rule/><dl><div><dt>SKETCH NO.</dt><dd>{sketch.number}</dd></div><div><dt>TITLE</dt><dd>{sketch.title.toUpperCase()}</dd></div><div><dt>YEAR</dt><dd><Tag>{sketch.year}</Tag></dd></div></dl><Rule double/></section>}
export function SketchGallery({initialSlug}:{initialSlug?:string}){
 const [year,setYear]=useState<string|null>(null);
 const [selected,setSelected]=useState<string|null>(initialSlug??null);
 const [hovered,setHovered]=useState<string|null>(null);
 const lastTrigger=useRef<HTMLAnchorElement|null>(null);
 const sketch=content.sketches.find(item=>item.slug===selected);
 const items=content.sketches.filter(item=>!year||item.year===year);
 const close=()=>{setSelected(null);lastTrigger.current?.focus()};
 useEffect(()=>{const escape=(event:KeyboardEvent)=>{if(event.key==='Escape'){setSelected(null);lastTrigger.current?.focus()}};window.addEventListener('keydown',escape);return()=>window.removeEventListener('keydown',escape)},[]);
 const open=(event:MouseEvent<HTMLAnchorElement>,item:Sketch)=>{
  if(!matchMedia('(min-width: 701px)').matches||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
  event.preventDefault();lastTrigger.current=event.currentTarget;setSelected(previous=>previous===item.slug?null:item.slug);
 };
 return <><div className={`artwork-browser${sketch?' is-split':''}`}>
  <div className="artwork-catalog"><GalleryHeading sketches split={Boolean(sketch)}/><FilterBar year={year} onChange={value=>{setYear(value);setSelected(null);setHovered(null)}}/>
   <div className="sketch-grid">{items.length===0&&<EmptyGallery year={year} onReset={()=>{setYear(null);setSelected(null);setHovered(null)}}/>}{items.map(item=><Link href={`/sketches/${item.slug}/`} key={item.slug} className={`sketch-card ${(hovered??selected)===item.slug?'is-emphasized':''}`} onClick={event=>open(event,item)} onPointerEnter={()=>setHovered(item.slug)} onPointerLeave={()=>setHovered(null)} onFocus={()=>setHovered(item.slug)} onBlur={()=>setHovered(null)} aria-label={`${item.title.toUpperCase()}, ${item.year}`} aria-current={selected===item.slug?'true':undefined}>
    {item.image?<img src={item.image} alt={item.title.toUpperCase()} className="sketch-visual" loading="lazy"/>:<div className="sketch-placeholder" aria-hidden="true"/>}<div className="sketch-label"><span className="sketch-number">{item.number}</span><h2>{item.title}</h2><span className="sketch-year">{item.year}</span></div>
   </Link>)}</div><span className="sr-only" role="status">{items.length} sketches</span>
  </div>
  {sketch&&<aside className="sketch-preview" aria-label={sketch.title.toUpperCase()}><div className="sketch-preview-image"><button type="button" onClick={close} className="preview-close" aria-label="Close sketch">×</button>{sketch.image?<img src={sketch.image} alt={sketch.title.toUpperCase()} className="sketch-visual"/>:<div className="sketch-placeholder" role="img" aria-label={sketch.title.toUpperCase()}/>}</div><h2>{sketch.title.toUpperCase()}</h2><SketchReceipt sketch={sketch}/></aside>}
 </div><Ornament/></>;
}
export function SketchDetail({sketch}:{sketch:Sketch}){return <><div className="sketch-detail-wide"><SketchGallery initialSlug={sketch.slug}/></div><article className="sketch-detail-narrow"><header className="sketch-detail-heading"><h1>SKETCHES/{sketch.title.toUpperCase()}</h1><span>NO. {sketch.number}</span></header>{sketch.image?<img src={sketch.image} alt={sketch.title.toUpperCase()} className="sketch-visual sketch-detail-image"/>:<div className="sketch-placeholder sketch-detail-image" role="img" aria-label={sketch.title.toUpperCase()}/>}<SketchReceipt sketch={sketch}/><div className="sketch-back"><Link href="/sketches/">← Back to gallery</Link><span>SKETCHES</span></div></article></>}
