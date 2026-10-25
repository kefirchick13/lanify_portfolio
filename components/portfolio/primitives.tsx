import type {ReactNode} from 'react';
import {AnimatedOrnament} from './animated-ornament';
import {ScrollArrow} from '@/components/scroll-arrow';

export function Rule({double=false}:{double?:boolean}){return <div className={`rule${double?' rule-double':''}`} aria-hidden="true"/>}
export function SectionHeading({children}:{children:ReactNode}){return <h2 className="section-heading"><span aria-hidden="true">*</span>{children}</h2>}
export function Ornament(){return <AnimatedOrnament/>}
/** Decorative routes have independent legs so every stroke stays 2 CSS pixels. */
export function MaterialsGuide(){return <div className="materials-guide" aria-hidden="true"><i className="guide-in"/><i className="guide-cross"/><i className="guide-out"/><i className="guide-tail-solid"/><i className="guide-tail-dashed"/></div>}
export function ApproachGuide(){return <div className="approach-guide" aria-hidden="true"><i className="guide-in"/><i className="guide-cross"/><i className="guide-out"/><i className="guide-tail-dashed"/></div>}
export function WorkflowGuide(){return <><div className="workflow-video-guide" aria-hidden="true"/><div className="workflow-video-tail" aria-hidden="true"><i className="guide-tail-solid"/><i className="guide-tail-dashed"/></div></>}

export function ScrollHint(){return <span className="scroll-hint">SCROLL THE SHEET <span className="scroll-hint-icon"><ScrollArrow/></span></span>}
