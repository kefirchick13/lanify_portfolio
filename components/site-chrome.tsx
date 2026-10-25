'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import type {MouseEvent} from 'react';

/** Shared opening curtain: remount on navigation so every page opens the same way. */
export function SiteChrome(){
 const pathname=usePathname();
 const navItems=[
  {href:'/',label:'me',active:pathname==='/'},
  {href:'/sketches/',label:'sketches',active:pathname.startsWith('/sketches')},
  {href:'/design/',label:'designs',active:pathname.startsWith('/design')},
 ];
 const goToContact=(event:MouseEvent<HTMLAnchorElement>)=>{
  const footer=Array.from(document.querySelectorAll<HTMLElement>('[data-footer]')).find(element=>element.getClientRects().length>0);
  if(footer){event.preventDefault();footer.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}
 };
 return <div key={pathname} className="site-reveal">
  <header className="reveal-header" role="banner">
   <div className="reveal-header-surface" aria-hidden="true"/>
   <Link href="/" className="reveal-brand" aria-label="LANIFY — home">LANIFY</Link>
   <nav className="reveal-nav" aria-label="Main navigation">
    {navItems.map(item=><Link key={item.label} href={item.href} className={`navigation-link ${item.active?'nav-active':''}`} aria-current={item.active?'page':undefined}>{item.label}</Link>)}
    <a href="#contact" className="navigation-link" onClick={goToContact}>contact</a>
   </nav>
  </header>
  <div className="reveal-bottom" aria-hidden="true"><span>PORTFOLIO</span></div>
 </div>;
}
