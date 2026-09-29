"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Pause, Play } from "lucide-react";
import StaggeredText from "@/components/staggered-text";
import { Clamp } from "@/components/site/ui";

const pillars = [
  { tag: "Familiar faces", title: "Your space, understood.", body: "A regular team that learns your layout, preferences, and the details that matter to your business." },
  { tag: "Clear communication", title: "Someone who answers.", body: "A direct point of contact who coordinates the work and takes responsibility when something needs attention." },
  { tag: "Consistent care", title: "A standard worth keeping.", body: "A tailored cleaning scope, owner oversight, and ongoing conversations about how your service is working." },
];

const CYCLE = 7000;
const EASE = [0.22, 1, 0.36, 1] as const;

export default function About4() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const cycling = !paused && !reduce;

  // auto-advance with a progress ring; stops for reduced motion or once the visitor takes control
  useEffect(() => {
    if (!cycling) return;
    const start = Date.now();
    const id = setInterval(() => {
      const p = Math.min((Date.now() - start) / CYCLE, 1);
      setProgress(p);
      if (p >= 1) { setDir(1); setActive((a) => (a + 1) % pillars.length); }
    }, 50);
    return () => clearInterval(id);
  }, [active, cycling]);

  const select = (i: number, focus = false) => {
    const n = (i + pillars.length) % pillars.length;
    setDir(n >= active ? 1 : -1);
    setActive(n);
    setProgress(0);
    setPaused(true);
    if (focus) tabs.current[n]?.focus();
  };

  const onKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    const map: Record<string, number> = { ArrowDown: active + 1, ArrowRight: active + 1, ArrowUp: active - 1, ArrowLeft: active - 1, Home: 0, End: pillars.length - 1 };
    if (e.key in map) { e.preventDefault(); select(map[e.key], true); }
  };

  const p = pillars[active];
  const off = reduce ? 0 : 40;
  const ring = cycling ? progress : 1;

  return (
    <section id="standards" aria-labelledby="std-h" className="section">
      <div className="container">
        <header className="head-block">
          <h2 id="std-h" className="display-l">
            <StaggeredText as="span" text="Clean desks. Clear expectations." segmentBy="words" direction="bottom" blur={false} delay={40} duration={0.7} />
          </h2>
          <p className="lede">The reminders. The missed corners. The same conversation, again. Your cleaning arrangement should take work off your plate.</p>
        </header>

        <div className="grid items-center gap-[var(--s-5)] lg:grid-cols-3 lg:gap-[var(--s-6)]">
          {/* values list */}
          <div role="tablist" aria-label="Our standards" aria-orientation="vertical" className="order-2 flex flex-col gap-[var(--s-1)] lg:order-1 lg:gap-[var(--s-3)]">
            {pillars.map((it, i) => (
              <button
                key={it.tag}
                ref={(el) => { tabs.current[i] = el; }}
                id={`std-tab-${i}`}
                role="tab"
                type="button"
                aria-selected={active === i}
                aria-controls="std-panel"
                tabIndex={active === i ? 0 : -1}
                onClick={() => select(i)}
                onKeyDown={onKey}
                className={`min-h-[44px] text-left font-[family-name:var(--display)] text-[length:var(--fs-d-m)] leading-[1.1] transition-colors duration-300 lg:text-[length:var(--fs-d-l)] ${active === i ? "text-[var(--ink)]" : "text-[var(--taupe)] hover:text-[var(--slate)]"}`}
              >
                {it.tag}
              </button>
            ))}
          </div>

          {/* image + progress */}
          <div className="order-1 grid gap-[var(--s-2)] lg:order-2">
            <figure className="relative aspect-[3/2] w-full overflow-hidden bg-[var(--cream)] lg:mx-auto lg:aspect-[3/4] lg:max-w-[384px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/spaces/professional-office.jpg" alt="Light-filled office workbench beside tall windows" loading="lazy" className="h-full w-full object-cover" />
            </figure>
            <div className="flex items-center justify-between gap-[var(--s-2)] lg:mx-auto lg:w-full lg:max-w-[384px]">
              <span className="eyebrow">Our standards {String(active + 1).padStart(2, "0")} / {String(pillars.length).padStart(2, "0")}</span>
              {!reduce && (
                <button
                  type="button"
                  onClick={() => setPaused(!paused)}
                  aria-pressed={paused}
                  aria-label={paused ? "Play automatic rotation" : "Pause automatic rotation"}
                  className="relative grid h-11 w-11 place-items-center text-[var(--ink)]"
                >
                  <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 100 100" aria-hidden="true">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="var(--line)" strokeWidth="4" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke="var(--ink)" strokeWidth="4" strokeDasharray={`${ring * 251.3} 251.3`} />
                  </svg>
                  {paused ? <Play className="lucide" size={14} strokeWidth={1.75} aria-hidden="true" /> : <Pause className="lucide" size={14} strokeWidth={1.75} aria-hidden="true" />}
                </button>
              )}
            </div>
          </div>

          {/* detail panel */}
          <div id="std-panel" role="tabpanel" aria-labelledby={`std-tab-${active}`} className="order-3 overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active}
                initial={{ x: dir * off }}
                animate={{ x: 0 }}
                exit={{ x: -dir * off }}
                transition={{ duration: reduce ? 0 : 0.3, ease: EASE }}
                className="grid gap-[var(--s-2)]"
              >
                <span className="eyebrow">{p.tag}</span>
                <h3 className="display-m">{p.title}</h3>
                <Clamp>{p.body}</Clamp>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
