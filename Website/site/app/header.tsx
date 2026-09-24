'use client';
import Link from '@/app/site-link';

import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import Image from 'next/image';

const links = [
  ['What we do', '/#what-we-do'],
  ['Why us', '/#why-us'],
  ['How we work', '/#process'],
  ['Our people', '/#people'],
];

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
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand" aria-label="RM Software home">
          <span className="logo-crop">
            <Image
              src="/images/rmsoftware-logo-transparent.png"
              width={1536}
              height={1024}
              alt="RM Software"
              priority
              unoptimized
            />
          </span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map(([label, href]) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
        </nav>
        <Link href="/contact/" className="button button-primary header-cta">
          Start a conversation <ArrowUpRight size={17} />
        </Link>
        <details className="mobile-nav" ref={disclosure}>
          <summary aria-label="Toggle navigation">
            <Menu className="menu-open" size={24} />
            <X className="menu-close" size={24} />
          </summary>
          <nav aria-label="Mobile navigation">
            {[...links, ['Start a conversation', '/contact/']].map(
              ([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => {
                    if (disclosure.current) disclosure.current.open = false;
                    if (
                      href.startsWith('/#') &&
                      window.location.pathname === '/'
                    )
                      document
                        .getElementById(href.slice(2))
                        ?.querySelector('h2')
                        ?.focus({ preventScroll: true });
                  }}
                >
                  {label}
                  <ArrowUpRight size={18} />
                </Link>
              ),
            )}
          </nav>
        </details>
      </div>
    </header>
  );
}
