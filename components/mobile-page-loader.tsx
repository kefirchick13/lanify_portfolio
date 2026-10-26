'use client';

import {useEffect, useRef, useState} from 'react';
import {usePathname} from 'next/navigation';
import {flushSync} from 'react-dom';
import {assets} from '@/lib/portfolio';

/** Covers initial entry and route changes; never intercepts hash or external links. */
export function MobilePageLoader(){
 const pathname = usePathname();
 const [visible, setVisible] = useState(true);
 const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
 const videoRef = useRef<HTMLVideoElement>(null);
 useEffect(()=>{setVisible(true);},[pathname]);
 useEffect(()=>{
  if(!visible) return;
  if(!matchMedia('(max-width:700px)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches){
   setVisible(false);
   return;
  }
  let cancelled=false;
  if(timer.current) clearTimeout(timer.current);
  // Exit safely when loading fails or the device blocks autoplay.
  timer.current=setTimeout(()=>setVisible(false),8000);
  const video=videoRef.current;
  if(video){
   video.muted=true;
   video.playbackRate=1.5;
   void video.play().then(()=>{
    if(cancelled) return;
    if(timer.current) clearTimeout(timer.current);
    timer.current=setTimeout(()=>setVisible(false),2200);
   }).catch(()=>{if(!cancelled) setVisible(false);});
  }
  return ()=>{cancelled=true;if(timer.current) clearTimeout(timer.current);};
 },[pathname,visible]);
 useEffect(()=>{
  const handleClick = (event:MouseEvent)=>{
   if(!matchMedia('(max-width:700px)').matches || event.button!==0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.defaultPrevented) return;
   const link = event.target instanceof Element ? event.target.closest('a[href]') : null;
   if(!(link instanceof HTMLAnchorElement) || link.hasAttribute('download') || (link.target && link.target!=='_self')) return;
   const url = new URL(link.href);
   if(url.origin!==location.origin || url.pathname.replace(/\/$/,'')===location.pathname.replace(/\/$/,'')) return;
   flushSync(()=>setVisible(true));
   if(timer.current) clearTimeout(timer.current);
   // A failed or cancelled navigation must not leave the screen blocked.
   timer.current = setTimeout(()=>setVisible(false), 8000);
  };
  document.addEventListener('click',handleClick,true);
  return ()=>document.removeEventListener('click',handleClick,true);
 },[]);
 useEffect(()=>{
  if(!visible || !matchMedia('(max-width:700px)').matches) return;
  const previous = document.body.style.overflow;
  document.body.style.overflow='hidden';
  return ()=>{document.body.style.overflow=previous;};
 },[visible,pathname]);
 return visible ? <div className="mobile-page-loader" role="status" aria-label="Loading page"><div className="ornament" aria-hidden="true"><video ref={videoRef} src={assets.ornamentVideo} autoPlay muted loop playsInline preload="auto" onLoadedMetadata={event=>{event.currentTarget.playbackRate=1.5;}} onError={()=>setVisible(false)}/></div></div> : null;
}
