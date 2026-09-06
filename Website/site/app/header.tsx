'use client';

import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import Image from 'next/image';

const links = [['Services', '#services'], ['About', '#about'], ['Process', '#process'], ['Contact', '#contact']];

export default function Header() {
  const disclosure = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    const element = disclosure.current;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' && element?.open) {
        element.open = false;
        element.querySelector('summary')?.focus();
      }
    }
    element?.addEventListener('keydown', onKeyDown);
    return () => element?.removeEventListener('keydown', onKeyDown);
  }, []);
  return <header className="site-header"><div className="container header-inner">
    <a href="#main" className="brand" aria-label="RM Software home"><span className="logo-crop"><Image src="/images/logo.jpeg" width={1536} height={1024} alt="RM Software" priority unoptimized /></span></a>
    <nav className="desktop-nav" aria-label="Main navigation">{links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav>
    <a href="#contact" className="button button-primary header-cta">Let’s talk <ArrowUpRight size={17} /></a>
    <details className="mobile-nav" ref={disclosure}>
      <summary aria-label="Toggle navigation"><Menu className="menu-open" size={24} /><X className="menu-close" size={24} /></summary>
      <nav aria-label="Mobile navigation">{links.map(([label, href]) => <a key={href} href={href} onClick={() => { if (disclosure.current) disclosure.current.open = false; document.querySelector(href)?.querySelector('h2')?.focus({ preventScroll: true }); }}>{label}<ArrowUpRight size={18} /></a>)}</nav>
    </details>
  </div></header>;
}
