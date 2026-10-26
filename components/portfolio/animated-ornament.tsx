'use client';

import {useEffect, useState} from 'react';
import {assets} from '@/lib/portfolio';

export function AnimatedOrnament({playbackRate=1}:{playbackRate?:number}){
 const [animate, setAnimate] = useState(false);
 useEffect(()=>{
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const update = ()=>setAnimate(!preference.matches);
  update();
  preference.addEventListener('change', update);
  return ()=>preference.removeEventListener('change', update);
 },[]);
 return <div className="ornament" aria-hidden="true">
  <img src={assets.ornament} alt="" loading="lazy" width="2360" height="1640"/>
  {animate && <video src={assets.ornamentVideo} autoPlay muted loop playsInline preload="metadata" onLoadedMetadata={event=>{event.currentTarget.playbackRate=playbackRate;}} onError={()=>setAnimate(false)}/>}
 </div>;
}
