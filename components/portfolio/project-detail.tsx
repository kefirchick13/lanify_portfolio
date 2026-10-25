import {content} from '@/lib/portfolio';
import {Rule} from './primitives';

export function ProjectDetail(){return <article className="project-detail"><div className="project-receipt-panel"><div className="project-receipt"><h1>PROJECT 1</h1><div className="project-receipt-lines">{content.projectReceipt.map((line,i)=>/^[=\-\s]+$/.test(line)?<Rule key={i} double={line.includes('=')}/>:<p key={i}>{line}</p>)}</div><p className="project-total">0000000.00</p></div></div><div className="project-detail-placeholder" role="img" aria-label="Project 1"/></article>}
