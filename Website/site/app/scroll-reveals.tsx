'use client';

import { useEffect } from 'react';

export default function ScrollReveals() {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;

    const targets = document.querySelectorAll('main [data-reveal]');
    if (!targets.length) return;

    const motion = window.matchMedia('(prefers-reduced-motion: no-preference)');
    const pending = new Set(targets);
    const observer = new IntersectionObserver((entries) => {
      for (const { target, isIntersecting } of entries) {
        if (!isIntersecting || !motion.matches) continue;
        target.setAttribute('data-entered', '');
        pending.delete(target);
        observer.unobserve(target);
      }
    });

    function syncPreference() {
      observer.disconnect();
      if (motion.matches) {
        pending.forEach((target) => observer.observe(target));
      } else {
        targets.forEach((target) => target.removeAttribute('data-entered'));
      }
    }

    syncPreference();
    motion.addEventListener('change', syncPreference);
    return () => {
      observer.disconnect();
      motion.removeEventListener('change', syncPreference);
      targets.forEach((target) => target.removeAttribute('data-entered'));
    };
  }, []);

  return null;
}
