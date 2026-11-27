'use client';

import { FileText, Globe, MessageCircle, Receipt } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const messages = [
  { icon: Globe, title: 'New enquiry captured', meta: 'Website form · just now' },
  { icon: FileText, title: 'Quote Q-1042 drafted', meta: 'From your price list' },
  { icon: Receipt, title: 'Invoice INV-2291 sent', meta: 'Synced to accounting' },
  { icon: MessageCircle, title: 'Client updated on WhatsApp', meta: 'Delivered ✓' },
];

// Decorative: the same workflow is explained in text in the automation section.
export default function HeroAutomationFeed() {
  const [tick, setTick] = useState(2);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let timer = 0;
    let inView = false;
    function sync() {
      window.clearInterval(timer);
      if (inView && !document.hidden) {
        timer = window.setInterval(() => setTick((value) => value + 1), 2800);
      }
    }
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      sync();
    });
    observer.observe(element);
    document.addEventListener('visibilitychange', sync);
    return () => {
      window.clearInterval(timer);
      observer.disconnect();
      document.removeEventListener('visibilitychange', sync);
    };
  }, []);

  const cards = [tick - 2, tick - 1, tick];

  return (
    <div className="hero-feed" ref={root} aria-hidden="true">
      <span className="hero-feed-label">
        <i /> Automation running
      </span>
      {cards.map((n, position) => {
        const message = messages[n % messages.length];
        const Icon = message.icon;
        return (
          <div className="hero-feed-card" data-position={position} key={n}>
            <span className="hero-feed-icon">
              <Icon size={17} strokeWidth={1.8} />
            </span>
            <span>
              <strong>{message.title}</strong>
              <small>{message.meta}</small>
            </span>
          </div>
        );
      })}
    </div>
  );
}
