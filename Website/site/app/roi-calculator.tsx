'use client';

import Link from '@/app/site-link';
import { ArrowUpRight } from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';
import { usePrefersReducedMotion } from './use-reduced-motion';

const shares = [30, 50, 70];
const WEEKS = 46;

function useAnimatedNumber(target: number) {
  const [value, setValue] = useState(target);
  const current = useRef(target);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const from = current.current;
    if (reduced || from === target) {
      current.current = target;
      return;
    }
    const start = performance.now();
    let frame = 0;
    function tick(now: number) {
      const t = Math.min(1, (now - start) / 550);
      const eased = 1 - (1 - t) ** 3;
      const next = from + (target - from) * eased;
      current.current = next;
      setValue(next);
      if (t < 1) frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, reduced]);

  return reduced ? target : value;
}

const number = new Intl.NumberFormat('en-ZA', { maximumFractionDigits: 0 });

export default function RoiCalculator() {
  const id = useId();
  const [hours, setHours] = useState(8);
  const [people, setPeople] = useState(3);
  const [rate, setRate] = useState(250);
  const [share, setShare] = useState(50);

  const yearlyHours = hours * people * WEEKS * (share / 100);
  const yearlyValue = yearlyHours * rate;
  const shownHours = useAnimatedNumber(yearlyHours);
  const shownValue = useAnimatedNumber(yearlyValue);
  const workDays = Math.round(yearlyHours / 8);

  const fields = [
    {
      key: 'hours',
      label: 'Hours per person, per week, on repetitive tasks',
      value: hours,
      set: setHours,
      min: 1,
      max: 30,
      step: 1,
      display: `${hours} h`,
    },
    {
      key: 'people',
      label: 'People doing this work',
      value: people,
      set: setPeople,
      min: 1,
      max: 40,
      step: 1,
      display: String(people),
    },
    {
      key: 'rate',
      label: 'Average cost per hour (R)',
      value: rate,
      set: setRate,
      min: 100,
      max: 1500,
      step: 25,
      display: `R ${number.format(rate)}`,
    },
  ];

  return (
    <div className="roi">
      <div className="roi-inputs">
        {fields.map((field) => (
          <div className="roi-field" key={field.key}>
            <div className="roi-field-head">
              <label htmlFor={`${id}-${field.key}`}>{field.label}</label>
              <output htmlFor={`${id}-${field.key}`}>{field.display}</output>
            </div>
            <input
              id={`${id}-${field.key}`}
              type="range"
              min={field.min}
              max={field.max}
              step={field.step}
              value={field.value}
              onChange={(event) => field.set(Number(event.target.value))}
              style={{
                backgroundSize: `${((field.value - field.min) / (field.max - field.min)) * 100}% 100%`,
              }}
            />
          </div>
        ))}
        <fieldset className="roi-share">
          <legend>Share of that work that could be automated</legend>
          <div>
            {shares.map((value) => (
              <label key={value} data-checked={share === value || undefined}>
                <input
                  type="radio"
                  name={`${id}-share`}
                  value={value}
                  checked={share === value}
                  onChange={() => setShare(value)}
                />
                {value}%
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="roi-result" aria-live="polite">
        <p className="section-kicker">Your estimate</p>
        <div className="roi-figure">
          <span>{number.format(shownHours)}</span>
          <small>hours returned to your team each year</small>
        </div>
        <div className="roi-figure roi-figure-value">
          <span>R {number.format(shownValue)}</span>
          <small>estimated value of that time each year</small>
        </div>
        <p className="roi-days">
          That is roughly <strong>{number.format(workDays)} working days</strong>{' '}
          your people could spend on customers and work that needs their
          judgement.
        </p>
        <p className="roi-disclaimer">
          An estimate based only on your inputs and {WEEKS} working weeks a
          year. It is not a quote or a promised result.
        </p>
        <Link
          className="button button-primary"
          href="/contact/?service=Business%20Process%20Automation"
        >
          Discuss what could be automated <ArrowUpRight size={18} />
        </Link>
      </div>
    </div>
  );
}
