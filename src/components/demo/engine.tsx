"use client";

// Tiny timeline engine for the product demos. A demo is a list of steps; each step
// lasts `d` ms and may move the cursor to a `[data-demo="…"]` target and click it.
// The demo renders from the current step index, so every state is declarative:
// `s >= 3` shows the answer, `s === 2` is typing, and so on.
//
// The app UI is drawn at a fixed design size and scaled to fit, so cursor targets
// are measured in design pixels. Playback runs only while the demo is on screen,
// restarts whenever it becomes active, and reduced-motion users get one still frame.
import { createContext, useContext, useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";

export const DEMO_W = 720;
export const DEMO_H = 520;

export type Step = {
  /** Duration in ms */
  d: number;
  /** data-demo id the cursor travels to at the start of this step */
  cursor?: string;
  /** Press after arriving; the result shows on the next step */
  click?: boolean;
  /** Hide the cursor during this step */
  hide?: boolean;
};

const MOVE_MS = 700;
const FADE_MS = 450;

const RM = "(prefers-reduced-motion: reduce)";
function subscribeReducedMotion(cb: () => void) {
  const mq = window.matchMedia(RM);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
function useReducedMotion() {
  return useSyncExternalStore(subscribeReducedMotion, () => window.matchMedia(RM).matches, () => false);
}

/** Current step index, advancing on a timer while `playing`; loops with a fade. */
function useTimeline(steps: Step[], playing: boolean) {
  const [state, setState] = useState({ s: 0, fading: false, playing: false });
  // Restart from the top each time playback starts (state adjusted during render)
  if (state.playing !== playing) setState({ s: 0, fading: false, playing });

  useEffect(() => {
    if (!playing) return;
    const { s } = state;
    let fade: ReturnType<typeof setTimeout> | undefined;
    const t = setTimeout(() => {
      if (s < steps.length - 1) return setState((v) => ({ ...v, s: s + 1 }));
      setState((v) => ({ ...v, fading: true }));
      fade = setTimeout(() => setState((v) => ({ ...v, s: 0, fading: false })), FADE_MS);
    }, steps[s].d);
    return () => {
      clearTimeout(t);
      if (fade) clearTimeout(fade);
    };
  }, [state, playing, steps]);

  return state;
}

// Milliseconds into the current step; typing, streaming and progress derive from it.
const Clock = createContext(0);

/** Text typed out while `running`; complete once `done`. */
export function useTyped(text: string, running: boolean, done: boolean, cps = 32) {
  const t = useContext(Clock);
  if (done) return text;
  return running ? text.slice(0, Math.floor((t * cps) / 1000)) : "";
}

/** Number of tokens (words + spaces) revealed while streaming an answer. */
export function useStream(text: string, running: boolean, done: boolean, wps = 26) {
  const t = useContext(Clock);
  const total = text.split(/(\s+)/).length;
  if (done) return total;
  return running ? Math.min(total, Math.floor((t * wps) / 1000) * 2) : 0;
}

/** Counts 0 → max, one per `every` ms, while running (progress bars). */
export function useTicks(running: boolean, done: boolean, every: number, max: number) {
  const t = useContext(Clock);
  if (done) return max;
  return running ? Math.min(max, Math.floor(t / every)) : 0;
}

/** Renders the first `count` tokens of `text`, each new word fading in. */
export function Streamed({ text, count }: { text: string; count: number }) {
  const tokens = text.split(/(\s+)/);
  return (
    <>
      {tokens.slice(0, count).map((t, i) =>
        /\s/.test(t) ? t : (
          <span key={i} className="demo-word">
            {t}
          </span>
        ),
      )}
    </>
  );
}

/** Blinking text caret */
export function Caret() {
  return <span className="demo-caret" aria-hidden />;
}

type Point = { x: number; y: number };

export function Demo({
  steps,
  still,
  active = true,
  label,
  children,
  onProgress,
}: {
  steps: Step[];
  /** Step shown as a still frame for reduced motion */
  still: number;
  active?: boolean;
  label: string;
  children: (s: number) => ReactNode;
  onProgress?: (p: { s: number; total: number }) => void;
}) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  const [inView, setInView] = useState(false);
  const reduce = useReducedMotion();
  const playing = active && inView && !reduce;
  const timeline = useTimeline(steps, playing);
  const s = reduce ? still : timeline.s;
  const fading = timeline.fading;

  const [pos, setPos] = useState<Point>({ x: DEMO_W * 0.78, y: DEMO_H * 0.86 });
  const [visible, setVisible] = useState(false);
  const [press, setPress] = useState(0);

  // Step clock: updated from a timer callback, reset whenever the step changes
  const [tick, setTick] = useState({ s: -1, t: 0 });
  const stepRef = useRef({ s: 0, start: 0 });
  useEffect(() => {
    stepRef.current = { s, start: performance.now() };
  }, [s]);
  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      const { s, start } = stepRef.current;
      setTick({ s, t: performance.now() - start });
    }, 33);
    return () => clearInterval(id);
  }, [playing]);
  const t = tick.s === s ? tick.t : 0;

  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setScale(e.contentRect.width / DEMO_W));
    ro.observe(el);
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => {
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  useEffect(() => onProgress?.({ s, total: steps.length }), [s, steps.length, onProgress]);

  // Cursor: travel to this step's target, then press
  useLayoutEffect(() => {
    if (reduce) return;
    const step = steps[s];
    let pressTimer: ReturnType<typeof setTimeout> | undefined;
    const raf = requestAnimationFrame(() => {
      if (s === 0) setPos({ x: DEMO_W * 0.78, y: DEMO_H * 0.86 });
      if (s === 0 || step.hide) setVisible(false);
      if (!step.cursor) return;
      const root = innerRef.current;
      const target = root?.querySelector<HTMLElement>(`[data-demo="${step.cursor}"]`);
      if (!root || !target || !scale) return;
      const r = target.getBoundingClientRect();
      const o = root.getBoundingClientRect();
      setPos({
        x: (r.left - o.left + Math.min(r.width / 2, 40)) / scale,
        y: (r.top - o.top + r.height / 2) / scale,
      });
      setVisible(true);
      if (step.click) pressTimer = setTimeout(() => setPress((p) => p + 1), MOVE_MS + 80);
    });
    return () => {
      cancelAnimationFrame(raf);
      if (pressTimer) clearTimeout(pressTimer);
    };
  }, [s, steps, scale, reduce]);

  return (
    <div
      ref={outerRef}
      role="img"
      aria-label={label}
      className="relative w-full select-none"
      style={{ aspectRatio: `${DEMO_W} / ${DEMO_H}` }}
    >
      <div
        ref={innerRef}
        aria-hidden
        className="font-app absolute left-0 top-0 origin-top-left text-neutral-900 antialiased"
        style={{ width: DEMO_W, height: DEMO_H, transform: `scale(${scale})`, opacity: scale ? 1 : 0 }}
      >
        <div className="h-full transition-opacity duration-[450ms]" style={{ opacity: fading ? 0 : 1 }}>
          <Clock.Provider value={t}>{children(s)}</Clock.Provider>
        </div>

        {/* Cursor */}
        <div
          className="pointer-events-none absolute left-0 top-0 z-[200] will-change-transform"
          style={{
            transform: `translate(${pos.x}px, ${pos.y}px)`,
            transition: `transform ${MOVE_MS}ms cubic-bezier(0.55, 0.05, 0.25, 1), opacity 300ms`,
            opacity: visible && !fading && !reduce ? 1 : 0,
          }}
        >
          {press > 0 && <span key={press} className="demo-ripple" />}
          <svg
            key={`c${press}`}
            width="22"
            height="22"
            viewBox="0 0 24 24"
            className={`-translate-x-[3px] -translate-y-[2px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)] ${press ? "demo-press" : ""}`}
          >
            <path
              d="M5 3.5v15.2c0 .5.6.8 1 .4l3.6-3.4 2.4 5.4c.2.4.6.6 1 .4l1.9-.8c.4-.2.6-.6.4-1l-2.4-5.3 4.9-.4c.5 0 .8-.7.4-1L6 3.1c-.4-.3-1 0-1 .4Z"
              fill="#171717"
              stroke="#fff"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
