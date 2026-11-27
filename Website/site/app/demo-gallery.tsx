'use client';

import Link from '@/app/site-link';
import Image from 'next/image';
import { ArrowUpRight, Check, Maximize2, X } from 'lucide-react';
import { useEffect, useRef, useState, type PointerEvent } from 'react';
import { flushSync } from 'react-dom';
import DeviceFrame from './device-frame';
import { demoCategories, type Demo } from './demos-data';

type Category = (typeof demoCategories)[number]['id'];

export default function DemoGallery({ demos }: { demos: Demo[] }) {
  const [filter, setFilter] = useState<Category>('all');
  const [selected, setSelected] = useState<Demo | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const motionOk = useRef(false);

  useEffect(() => {
    motionOk.current = window.matchMedia(
      '(hover: hover) and (prefers-reduced-motion: no-preference)',
    ).matches;
  }, []);

  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    if (selected && !element.open) element.showModal();
    function onClose() {
      setSelected(null);
      opener.current?.focus();
    }
    function onClick(event: MouseEvent) {
      if (event.target === element) element?.close();
    }
    element.addEventListener('close', onClose);
    element.addEventListener('click', onClick);
    return () => {
      element.removeEventListener('close', onClose);
      element.removeEventListener('click', onClick);
    };
  }, [selected]);

  function choose(id: Category) {
    const doc = document as Document & {
      startViewTransition?: (callback: () => void) => unknown;
    };
    if (doc.startViewTransition && motionOk.current) {
      doc.startViewTransition(() => flushSync(() => setFilter(id)));
    } else {
      setFilter(id);
    }
  }

  function tilt(event: PointerEvent<HTMLElement>) {
    if (!motionOk.current) return;
    const card = event.currentTarget;
    const box = card.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;
    card.style.setProperty('--ry', `${(x * 6).toFixed(2)}deg`);
    card.style.setProperty('--rx', `${(-y * 6).toFixed(2)}deg`);
  }

  function resetTilt(event: PointerEvent<HTMLElement>) {
    event.currentTarget.style.setProperty('--rx', '0deg');
    event.currentTarget.style.setProperty('--ry', '0deg');
  }

  const shown = demos.filter((demo) => filter === 'all' || demo.category === filter);

  return (
    <>
      <fieldset className="demo-filters">
        <legend className="sr-only">Filter concepts</legend>
        {demoCategories.map((category) => (
          <button
            type="button"
            key={category.id}
            aria-pressed={filter === category.id}
            onClick={() => choose(category.id)}
          >
            {category.label}
          </button>
        ))}
      </fieldset>
      <p className="sr-only" aria-live="polite">
        Showing {shown.length} concept{shown.length === 1 ? '' : 's'}.
      </p>

      <ul className="demo-grid">
        {shown.map((demo) => (
          <li
            key={demo.slug}
            className={`demo-card demo-card-${demo.frame}`}
            style={{ viewTransitionName: `demo-${demo.slug}` }}
          >
            <article>
              <div className="demo-card-visual" onPointerMove={tilt} onPointerLeave={resetTilt}>
                <DeviceFrame demo={demo} sizes="(max-width: 900px) 100vw, 50vw" />
              </div>
              <div className="demo-card-body">
                <p className="section-kicker">{demo.industry}</p>
                <h3>{demo.title}</h3>
                <p>{demo.summary}</p>
                <ul className="demo-automations" aria-label="Automations included">
                  {demo.automations.map((item) => (
                    <li key={item}>
                      <Check size={15} aria-hidden="true" /> {item}
                    </li>
                  ))}
                </ul>
                <div className="demo-card-actions">
                  <button
                    type="button"
                    className="demo-open"
                    onClick={(event) => {
                      opener.current = event.currentTarget;
                      setSelected(demo);
                    }}
                  >
                    <Maximize2 size={15} aria-hidden="true" /> View larger
                    <span className="sr-only">: {demo.title}</span>
                  </button>
                  <Link className="editorial-link" href={`/services/${demo.serviceSlug}/`}>
                    Related service <ArrowUpRight size={16} />
                  </Link>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        className="demo-lightbox"
        aria-labelledby="demo-lightbox-title"
      >
        {selected && (
          <div className="demo-lightbox-inner">
            <div className="demo-lightbox-head">
              <div>
                <p className="section-kicker">
                  Concept · {selected.industry}
                </p>
                <h3 id="demo-lightbox-title">{selected.title}</h3>
              </div>
              <button
                type="button"
                className="demo-lightbox-close"
                onClick={() => dialog.current?.close()}
                aria-label="Close preview"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>
            <div className={`demo-lightbox-image is-${selected.frame}`}>
              <Image
                src={selected.image.src}
                alt={selected.image.alt}
                width={selected.image.width}
                height={selected.image.height}
                sizes="90vw"
              />
            </div>
            <p className="demo-lightbox-note">
              A concept design for a fictional business, created to show what
              we can build. It is not client work.
            </p>
          </div>
        )}
      </dialog>
    </>
  );
}
