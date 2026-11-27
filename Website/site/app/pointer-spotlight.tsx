'use client';

import { useEffect } from 'react';

// Moves a soft glow with the pointer across [data-spotlight] sections.
export default function PointerSpotlight() {
  useEffect(() => {
    const query = window.matchMedia(
      '(hover: hover) and (prefers-reduced-motion: no-preference)',
    );
    if (!query.matches) return;
    const targets = [...document.querySelectorAll<HTMLElement>('[data-spotlight]')];
    let frame = 0;
    const cleanups = targets.map((element) => {
      function move(event: PointerEvent) {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          const box = element.getBoundingClientRect();
          element.style.setProperty('--mx', `${event.clientX - box.left}px`);
          element.style.setProperty('--my', `${event.clientY - box.top}px`);
          element.style.setProperty('--spot', '1');
        });
      }
      function leave() {
        element.style.setProperty('--spot', '0');
      }
      element.addEventListener('pointermove', move, { passive: true });
      element.addEventListener('pointerleave', leave);
      return () => {
        element.removeEventListener('pointermove', move);
        element.removeEventListener('pointerleave', leave);
      };
    });
    return () => {
      cancelAnimationFrame(frame);
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return null;
}
