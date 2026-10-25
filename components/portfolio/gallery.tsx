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
function getSketchNumber(item:Sketch,list:Sketch[] = content.sketches){const index=list.findIndex(entry=>entry.slug===item.slug);return index===-1? '00': String(index + 1).padStart(2,'0');}
export function DesignGallery(){const [year,setYear]=useState<string|null>(null);const projects=content.projects.filter(p=>!year||p.year===year);return <><GalleryHeading sketches={false}/><FilterBar year={year} onChange={setYear}/><div className="project-grid">{projects.length===0&&<EmptyGallery year={year} onReset={()=>setYear(null)}/>}{projects.map(project=><ProjectCard key={project.slug} project={project}/>)}</div><span className="sr-only" role="status">{projects.length} projects</span><Ornament/></>}
export function SketchReceipt({sketch,number}:{sketch:Sketch;number?:string}){const sketchNumber=number ?? getSketchNumber(sketch);return <section className="sketch-receipt" aria-label="Sketch information"><Rule double/><p>ARTWORKS / TATTOO SKETCH</p><Rule/><dl><div><dt>SKETCH NO.</dt><dd>{sketchNumber}</dd></div><div><dt>TITLE</dt><dd>{sketch.title.toUpperCase()}</dd></div><div><dt>YEAR</dt><dd><Tag>{sketch.year}</Tag></dd></div></dl><Rule double/></section>}
export function SketchGallery({initialSlug}:{initialSlug?:string}){
 const [year,setYear]=useState<string|null>(null);
 const [selected,setSelected]=useState<string|null>(initialSlug??null);
 const [hovered,setHovered]=useState<string|null>(null);
 const [lightboxOpen,setLightboxOpen]=useState(false);
 const lastTrigger=useRef<HTMLAnchorElement|null>(null);
 const sketch=content.sketches.find(item=>item.slug===selected);
 const items=content.sketches.filter(item=>!year||item.year===year);
 const close=()=>{setSelected(null);setLightboxOpen(false);lastTrigger.current?.focus()};
 const openLightbox=()=>{if(sketch&&sketch.image){setLightboxOpen(true)}};
 useEffect(()=>{const escape=(event:KeyboardEvent)=>{if(event.key==='Escape'){setLightboxOpen(false);if(!selected){lastTrigger.current?.focus()}}};window.addEventListener('keydown',escape);return()=>window.removeEventListener('keydown',escape)},[selected]);
 const open=(event:MouseEvent<HTMLAnchorElement>,item:Sketch)=>{
  if(!matchMedia('(min-width: 701px)').matches||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
  event.preventDefault();lastTrigger.current=event.currentTarget;setSelected(previous=>previous===item.slug?null:item.slug);
 };
 return <><div className={`artwork-browser${sketch?' is-split':''}`}>
  <div className="artwork-catalog"><GalleryHeading sketches split={Boolean(sketch)}/><FilterBar year={year} onChange={value=>{setYear(value);setSelected(null);setHovered(null);setLightboxOpen(false)}}/>
   <div className="sketch-grid">{items.length===0&&<EmptyGallery year={year} onReset={()=>{setYear(null);setSelected(null);setHovered(null);setLightboxOpen(false)}}/>}{items.map(item=><Link href={`/sketches/${item.slug}/`} key={item.slug} className={`sketch-card ${(hovered??selected)===item.slug?'is-emphasized':''}`} onClick={event=>open(event,item)} onPointerEnter={()=>setHovered(item.slug)} onPointerLeave={()=>setHovered(null)} onFocus={()=>setHovered(item.slug)} onBlur={()=>setHovered(null)} aria-label={`${item.title.toUpperCase()}, ${item.year}`} aria-current={selected===item.slug?'true':undefined}>
    {item.image?<img src={item.image} alt={item.title.toUpperCase()} className="sketch-visual" loading="lazy"/>:<div className="sketch-placeholder" aria-hidden="true"/>}<div className="sketch-label"><span className="sketch-number">{getSketchNumber(item, items)}</span><h2>{item.title}</h2><span className="sketch-year">{item.year}</span></div>
   </Link>)}</div><span className="sr-only" role="status">{items.length} sketches</span>
  </div>
  {sketch&&<aside className="sketch-preview" aria-label={sketch.title.toUpperCase()}><div className="sketch-preview-image"><button type="button" onClick={close} className="preview-close" aria-label="Close sketch"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6L18 18M18 6L6 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg></button><button type="button" onClick={openLightbox} className="preview-open-link" aria-label={`Open ${sketch.title.toUpperCase()} in full size`}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 3H3v5M3 3l6 6M16 21h5v-5M21 21l-6-6M16 3h5v5M21 3l-6 6M8 21H3v-5M3 21l6-6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg></button>{sketch.image?<img src={sketch.image} alt={sketch.title.toUpperCase()} className="sketch-visual"/>:<div className="sketch-placeholder" role="img" aria-label={sketch.title.toUpperCase()}/>}</div><h2>{sketch.title.toUpperCase()}</h2><SketchReceipt sketch={sketch} number={getSketchNumber(sketch, items)}/></aside>}
 </div>{lightboxOpen&&sketch&&sketch.image&&<div className="sketch-lightbox" role="dialog" aria-modal="true" aria-label={`${sketch.title.toUpperCase()} preview`} onClick={()=>setLightboxOpen(false)}><div className="sketch-lightbox-shell" onClick={event=>event.stopPropagation()}><button type="button" className="lightbox-close" aria-label="Close full-size preview" onClick={()=>setLightboxOpen(false)}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6L18 18M18 6L6 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg></button><img src={sketch.image} alt={sketch.title.toUpperCase()} className="sketch-lightbox-media" /></div></div>}<Ornament/></>;
}
export function SketchDetail({sketch}:{sketch:Sketch}){const number=getSketchNumber(sketch);return <><div className="sketch-detail-wide"><SketchGallery initialSlug={sketch.slug}/></div><article className="sketch-detail-narrow"><header className="sketch-detail-heading"><h1>SKETCHES/{sketch.title.toUpperCase()}</h1><span>NO. {number}</span></header>{sketch.image?<img src={sketch.image} alt={sketch.title.toUpperCase()} className="sketch-visual sketch-detail-image"/>:<div className="sketch-placeholder sketch-detail-image" role="img" aria-label={sketch.title.toUpperCase()}/>}<SketchReceipt sketch={sketch} number={number}/><div className="sketch-back"><Link href="/sketches/">← Back to gallery</Link><span>SKETCHES</span></div></article></>}
