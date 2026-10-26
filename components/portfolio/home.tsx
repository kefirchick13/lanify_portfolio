import {assets,content} from '@/lib/portfolio';
import {Tag} from '@/components/tag';
import {MaterialsGuide,ApproachGuide,WorkflowGuide,Ornament,SectionHeading} from './primitives';
import {LoopVideo} from './loop-video';
import {ProjectCard} from './project-card';

function Biography(){return <h1 className="biography"><strong>Hi, I’m Sava Belinsky.</strong><br/>I’m fullstack <strong>designer/artist</strong> from Saint-Petersburg, <strong>Russia.</strong> My <strong>purpose</strong> is creating creative, fancy projects from scratch or leading existing buisnesses to </h1>}
function Hero(){return <section className="home-hero" aria-label="About me">
 <Biography/>
 <div className="hero-composition">
  <img className="hero-grain" src={assets.grain} alt="" width="731" height="415" fetchPriority="high"/>
  <p className="hero-make">make it <strong>better.</strong><span className="hero-dots" aria-hidden="true"><span>.</span><span>.</span></span></p>
  <div className="hero-space" aria-hidden="true"/>
  <h2 className="hero-skills-title"><span className="hero-most"><span aria-hidden="true">*</span>most</span><span className="hero-skilled">skilled in</span></h2>
 </div>
 </section>}
function Materials(){return <section className="materials" aria-labelledby="materials-title">
 <h2 id="materials-title" className="decorated-heading"><span aria-hidden="true"/>I CAN WORK WITH<span aria-hidden="true"/></h2>
 <ol>{content.materials.map((item,i)=><li key={item}><span className="material-number">{String(i+1).padStart(2,'0')}</span><span>{item}</span></li>)}</ol>
 </section>}
function Disciplines(){return <section className="disciplines" aria-label="Skills and materials">
 <div className="portrait-column"><img className="portrait-texture" src={assets.portrait} alt="" width="1086" height="1448" loading="lazy"/></div>
 <ul className="skills-list">{content.skills.map((label,i)=><li key={`${label}-${i}`}><Tag size="large">{label}</Tag></li>)}</ul>
 <div className="skills-guide-stem" aria-hidden="true"/><div className="materials-route"><MaterialsGuide/></div><div className="materials-column"><Materials/></div>
 </section>}
function Approach(){return <section className="approach" aria-labelledby="approach-title">
 <div className="approach-copy"><h2 id="approach-title">{content.approachTitle}</h2><div className="approach-statements">{content.approach.map(text=><p key={text}>{text}</p>)}</div><p className="approach-total">0.00</p></div>
 <div className="approach-visual"><figure><LoopVideo src={assets.studioVideo} poster={assets.studio}/><figcaption>{content.caption}</figcaption></figure><ApproachGuide/></div>
 </section>}
function WorkflowRow({start,end}:{start:number;end:number}){return <div className={`workflow-row workflow-row-${start===0?'first':'last'}`}>{content.workflow.slice(start,end).map(step=><section className="workflow-step" key={step.number}><h3><span>{step.number}</span> {step.title}</h3><ul>{step.items.map(item=><li key={item}>{item}</li>)}</ul></section>)}</div>}
function Workflow(){return <section className="workflow" aria-labelledby="workflow-title">
 <SectionHeading><span id="workflow-title">WORKFLOW</span></SectionHeading>
 <WorkflowRow start={0} end={3}/>
 <div className="workflow-interlude"><WorkflowGuide/><LoopVideo src={assets.processVideo} poster={assets.process}/></div>
 <WorkflowRow start={3} end={6}/><Ornament/>
 </section>}
export function HomeContent(){return <>
 <Hero/><Disciplines/><Approach/><Workflow/>
 <section className="home-projects" aria-labelledby="home-projects-title"><h2 id="home-projects-title">PORTFOLIO</h2><div className="project-grid">{content.projects.slice(0,3).map(project=><ProjectCard key={project.slug} project={project}/>)}</div></section>
 </>}
