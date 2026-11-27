'use client';

import { Check, Pause, Play, RotateCcw, StepForward, UserCheck } from 'lucide-react';
import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from 'react';
import { scenarioDuration, scenarios as allScenarios } from './automation-scenarios';
import { usePrefersReducedMotion } from './use-reduced-motion';

type Status = 'idle' | 'playing' | 'paused';
const TICK = 80;

function timestamp(at: number) {
  const seconds = 2 + Math.round((at / 1000) * 7);
  return `09:14:${String(seconds).padStart(2, '0')}`;
}

function clamp(value: number) {
  return Math.min(1, Math.max(0, value));
}

export default function AutomationPipeline({
  ids,
  autoPlay = true,
}: {
  ids?: string[];
  autoPlay?: boolean;
}) {
  const scenarios = ids
    ? allScenarios.filter((scenario) => ids.includes(scenario.id))
    : allScenarios;
  const [index, setIndex] = useState(0);
  const [status, setStatus] = useState<Status>('idle');
  const [elapsed, setElapsed] = useState(0);
  const reduced = usePrefersReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const log = useRef<HTMLOListElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const statusRef = useRef<Status>('idle');
  const played = useRef(false);
  const baseId = useId();

  const scenario = scenarios[index];
  const duration = scenarioDuration(scenario);
  // With reduced motion, an unstarted run is presented as already complete.
  const staticComplete = reduced && status === 'idle';
  const time = staticComplete ? duration : elapsed;
  const started = staticComplete || status !== 'idle';
  const finished = started && time >= duration;
  const running = status === 'playing' && !finished;

  useEffect(() => {
    statusRef.current = running ? 'playing' : status;
  }, [running, status]);

  // Autoplay once in view; pause when scrolled away or the tab is hidden.
  useEffect(() => {
    const element = root.current;
    if (!element || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!played.current && autoPlay && !reduced) {
            played.current = true;
            setStatus('playing');
          }
        } else if (statusRef.current === 'playing') {
          setStatus('paused');
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(element);
    function onVisibility() {
      if (document.hidden && statusRef.current === 'playing') setStatus('paused');
    }
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [autoPlay, reduced]);

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => {
      setElapsed((value) => Math.min(value + TICK, duration));
    }, TICK);
    return () => window.clearInterval(timer);
  }, [running, duration]);

  const visible = started
    ? scenario.events.filter((event) => event.at <= time)
    : [];
  const activeNode = visible.length ? visible[visible.length - 1].node : -1;
  const firstAt = (node: number) =>
    scenario.events.find((event) => event.node === node)?.at ?? 0;
  const completed = finished ? scenario.nodes.length : Math.max(activeNode, 0);

  // Keep the newest log line in view without scrolling the page.
  useEffect(() => {
    const element = log.current;
    if (element) element.scrollTop = element.scrollHeight;
  }, [visible.length, index]);

  function select(next: number, focus = false) {
    setIndex(next);
    if (reduced) {
      setElapsed(scenarioDuration(scenarios[next]));
      setStatus('paused');
    } else {
      setElapsed(0);
      setStatus('playing');
    }
    if (focus) tabs.current[next]?.focus();
  }

  function onTabKey(event: KeyboardEvent<HTMLButtonElement>) {
    const last = scenarios.length - 1;
    const keys: Record<string, number> = {
      ArrowRight: index === last ? 0 : index + 1,
      ArrowLeft: index === 0 ? last : index - 1,
      Home: 0,
      End: last,
    };
    if (!(event.key in keys)) return;
    event.preventDefault();
    select(keys[event.key], true);
  }

  function togglePlay() {
    if (running) return setStatus('paused');
    if (finished) setElapsed(0);
    setStatus('playing');
  }

  function step() {
    const next = scenario.events.find((event) => event.at > time);
    setElapsed(status === 'idle' ? 0 : next ? next.at : duration);
    setStatus('paused');
  }

  function replay() {
    setElapsed(0);
    setStatus(reduced ? 'paused' : 'playing');
  }

  const statusLabel = finished
    ? 'Completed'
    : running
      ? 'Running'
      : status === 'paused'
        ? 'Paused'
        : 'Ready';
  const announcement = finished
    ? `${scenario.label} workflow complete.`
    : activeNode >= 0
      ? `Step ${activeNode + 1} of ${scenario.nodes.length}: ${scenario.nodes[activeNode].label}, ${scenario.nodes[activeNode].detail}.`
      : '';
  const multiple = scenarios.length > 1;
  const panelId = `${baseId}-panel`;

  return (
    <div className="pipeline" ref={root}>
      {multiple && (
        <div className="pipeline-tabs" role="tablist" aria-label="Automation examples">
          {scenarios.map((item, i) => (
            <button
              key={item.id}
              ref={(node) => {
                tabs.current[i] = node;
              }}
              id={`${baseId}-tab-${item.id}`}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-controls={panelId}
              tabIndex={i === index ? 0 : -1}
              onClick={() => select(i)}
              onKeyDown={onTabKey}
            >
              <span>0{i + 1}</span>
              {item.label}
            </button>
          ))}
        </div>
      )}

      <div
        className="pipeline-panel"
        id={panelId}
        role={multiple ? 'tabpanel' : undefined}
        aria-labelledby={multiple ? `${baseId}-tab-${scenario.id}` : undefined}
      >
        <p className="pipeline-summary">{scenario.summary}</p>

        <ol className="pipeline-track" aria-label={`${scenario.label} steps`}>
          {scenario.nodes.map((node, i) => {
            const Icon = node.icon;
            const state =
              finished || i < activeNode ? 'done' : i === activeNode ? 'active' : 'pending';
            const progress =
              !started || i === scenario.nodes.length - 1
                ? 0
                : clamp((time - firstAt(i)) / (firstAt(i + 1) - firstAt(i)));
            return (
              <li className="pipeline-node" data-state={state} key={node.label}>
                <span className="pipeline-icon">
                  <Icon size={21} strokeWidth={1.6} aria-hidden="true" />
                  {state === 'done' && (
                    <Check
                      className="pipeline-check"
                      size={11}
                      strokeWidth={3}
                      aria-hidden="true"
                    />
                  )}
                </span>
                <strong>{node.label}</strong>
                <span className="pipeline-detail">{node.detail}</span>
                {node.human && (
                  <span className="pipeline-human">
                    <UserCheck size={12} aria-hidden="true" /> Human check
                  </span>
                )}
                {i < scenario.nodes.length - 1 && (
                  <span
                    className="pipeline-link"
                    aria-hidden="true"
                    data-moving={progress > 0 && progress < 1 ? '' : undefined}
                    style={{ '--p': progress } as CSSProperties}
                  />
                )}
              </li>
            );
          })}
        </ol>

        <div className="pipeline-console">
          <div className="pipeline-console-bar">
            <span className="pipeline-dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span>run-log / {scenario.id}</span>
            <span
              className="pipeline-status"
              data-status={finished ? 'done' : running ? 'playing' : status}
            >
              {statusLabel}
            </span>
          </div>
          <ol className="pipeline-log" ref={log} aria-label="Automation run log">
            {!started && (
              <li className="pipeline-log-empty">Press play to run this workflow.</li>
            )}
            {visible.map((event) => (
              <li key={`${scenario.id}-${event.at}`}>
                <time>{timestamp(event.at)}</time>
                <span>{event.text}</span>
              </li>
            ))}
          </ol>
          <dl className="pipeline-stats">
            <div>
              <dt>Steps done</dt>
              <dd>
                {completed}/{scenario.nodes.length}
              </dd>
            </div>
            <div>
              <dt>Log entries</dt>
              <dd>{visible.length}</dd>
            </div>
            <div>
              <dt>Re-typing</dt>
              <dd>None</dd>
            </div>
          </dl>
        </div>

        <div className="pipeline-controls">
          <button type="button" className="pipeline-button is-primary" onClick={togglePlay}>
            {running ? (
              <>
                <Pause size={16} aria-hidden="true" /> Pause
              </>
            ) : (
              <>
                <Play size={16} aria-hidden="true" /> {finished ? 'Run again' : 'Play'}
              </>
            )}
          </button>
          <button type="button" className="pipeline-button" onClick={step} disabled={finished}>
            <StepForward size={16} aria-hidden="true" /> Next step
          </button>
          <button type="button" className="pipeline-button" onClick={replay}>
            <RotateCcw size={16} aria-hidden="true" /> Replay
          </button>
        </div>
        <p className="sr-only" aria-live="polite">
          {announcement}
        </p>
      </div>
      <p className="pipeline-note">
        Illustrative workflow with fictional names and amounts. Every automation
        we build is designed around your systems, with a person checking the
        steps that need one.
      </p>
    </div>
  );
}
