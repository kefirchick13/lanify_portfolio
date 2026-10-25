import Link from 'next/link';
import type {Project} from '@/lib/portfolio';

export function ProjectCard({project}:{project:Project}){return <Link href={`/design/${project.slug}/`} className="project-card">
 <span className="project-card-rail" aria-hidden="true"><span>*</span></span>
 <div className="project-card-content"><div className="project-placeholder" aria-hidden="true"/>
  <h3>{project.title}</h3><p>{project.description}</p>
 </div>
 </Link>}
