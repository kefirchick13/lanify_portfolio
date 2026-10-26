'use client';

import {useEffect, useRef, useState} from 'react';

export function LoopVideo({src,poster}:{src:string;poster:string}){
 const ref=useRef<HTMLVideoElement>(null);
 const [blocked,setBlocked]=useState(false);
 const play=()=>{
  const video=ref.current;
  if(!video) return;
  video.muted=true;
  void video.play().then(()=>setBlocked(false)).catch(()=>setBlocked(true));
 };
 useEffect(()=>{
  play();
  const retry=()=>play();
  document.addEventListener('touchstart',retry,{passive:true});
  return ()=>document.removeEventListener('touchstart',retry);
 },[]);
 return <div className="loop-video">
  <video ref={ref} src={src} poster={poster} autoPlay muted loop playsInline preload="auto" onCanPlay={play}/>
  {blocked && <button className="video-play" onClick={play} aria-label="Play video">▶</button>}
 </div>;
}
