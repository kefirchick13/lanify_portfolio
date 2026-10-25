import type { ReactNode } from 'react';

export function Tag({children,size='medium'}:{children:ReactNode;size?:'large'|'medium'|'small'}){
 return <span className={`ui-tag ui-tag-${size}`}>{children}</span>;
}
