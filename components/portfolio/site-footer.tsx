import Link from 'next/link';
import {content} from '@/lib/portfolio';

export function SiteFooter(){return <footer className="site-footer" id="contact" data-footer="true">
 <div className="footer-body">
  <div className="footer-links">
   <nav aria-label="Portfolio"><p>*my works</p><Link href="/sketches/">sketches</Link><Link href="/design/">design</Link></nav>
   <nav aria-label="Social networks"><p>*social networks</p><a href="https://t.me/lanify_rn">telegram</a><a href="https://www.instagram.com/lanify__rn/">instagram</a><a href="https://www.behance.net/">behance</a><a href="mailto:kefrciksekov@gmail.com">mail</a></nav>
  </div>
  <p className="footer-headline">{content.footerHeadline}</p>
  <hr/>
  <p className="footer-description">{content.footerBody}</p>
 </div>
 <div className="footer-signature" aria-label="Portfolio"><span aria-hidden="true">PORTFOLIO</span></div>
 </footer>}
