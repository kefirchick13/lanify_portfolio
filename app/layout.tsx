import type {Metadata} from 'next';
import './globals.css';
import {SiteChrome} from '@/components/site-chrome';
import {SiteFooter} from '@/components/portfolio/site-footer';
export const metadata:Metadata={title:{default:'LANIFY — Sava Belinsky',template:'%s / LANIFY'},description:'Sava Belinsky — portfolio.'};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en" data-scroll-behavior="smooth"><body><a className="skip-link" href="#main">Skip to content</a><SiteChrome/><div className="site-shell">{children}<SiteFooter/></div></body></html>}
