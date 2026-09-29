"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Building2, Check, Recycle, ShowerHead } from "lucide-react";
import StaggeredText from "@/components/staggered-text";

interface Features4Props {
  autoPlay?: boolean;
  autoPlayDelay?: number;
}

const tabs = [
  { icon: Building2, title: "Reception & shared areas", description: "Accessible surfaces, entry glass and floors reviewed against the example scope.", items: ["Accessible surfaces", "Entry glass", "Floors"] },
  { icon: ShowerHead, title: "Washrooms & kitchen", description: "Agreed fixtures, counters and floor areas reviewed.", items: ["Agreed fixtures", "Counters", "Floor areas"] },
  { icon: Recycle, title: "Waste & recycling", description: "Bins emptied and liners replaced where included.", items: ["Bins emptied", "Liners replaced where included"] },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export function Features4({ autoPlay = false, autoPlayDelay = 6000 }: Features4Props) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const [touched, setTouched] = useState(false);
  const btns = useRef<(HTMLButtonElement | null)[]>([]);

  // optional autoplay: off for reduced motion and after the visitor picks a tab
  useEffect(() => {
    if (!autoPlay || reduce || touched) return;
    const id = setInterval(() => { setDir(1); setActive((a) => (a + 1) % tabs.length); }, autoPlayDelay);
    return () => clearInterval(id);
  }, [autoPlay, autoPlayDelay, reduce, touched]);

  const select = (i: number, focus = false) => {
    const n = (i + tabs.length) % tabs.length;
    setDir(n >= active ? 1 : -1);
    setActive(n);
    setTouched(true);
    if (focus) btns.current[n]?.focus();
  };

  const onKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    const map: Record<string, number> = { ArrowDown: active + 1, ArrowRight: active + 1, ArrowUp: active - 1, ArrowLeft: active - 1, Home: 0, End: tabs.length - 1 };
    if (e.key in map) { e.preventDefault(); select(map[e.key], true); }
  };

  const tab = tabs[active];
  const ActiveIcon = tab.icon;
  const off = reduce ? 0 : 40;

  return (
    <section aria-labelledby="notes-h" className="section">
      <div className="container">
        <header className="head-block">
          <h2 id="notes-h" className="display-l">
            <StaggeredText as="span" text="Cleaned. Checked. Communicated." segmentBy="words" direction="bottom" blur={false} delay={40} duration={0.7} />
          </h2>
          <p className="lede">Know what’s been agreed. Know who to reach. And have a clear conversation about the work completed and anything that needs attention.</p>
        </header>

        <div className="grid grid-cols-1 gap-[var(--s-2)] lg:grid-cols-12">
          <div role="tablist" aria-label="Example service notes" aria-orientation="vertical" className="flex flex-col gap-[var(--s-2)] lg:col-span-4">
            {tabs.map((t, i) => {
              const Icon = t.icon;
              const on = active === i;
              return (
                <button
                  key={t.title}
                  ref={(el) => { btns.current[i] = el; }}
                  id={`notes-tab-${i}`}
                  role="tab"
                  type="button"
                  aria-selected={on}
                  aria-controls="notes-panel"
                  tabIndex={on ? 0 : -1}
                  onClick={() => select(i)}
                  onKeyDown={onKey}
                  className={`pinwheel flex min-h-[44px] flex-1 items-start gap-[var(--s-2)] border p-[var(--s-3)] text-left transition-colors duration-300 ${on ? "border-[var(--ink)] bg-[var(--white)]" : "border-[var(--line)] bg-[var(--cream)]"}`}
                >
                  <span className={`grid h-10 w-10 shrink-0 place-items-center transition-colors duration-300 ${on ? "bg-[var(--ink)] text-[var(--white)]" : "bg-[var(--paper)] text-[var(--ink)]"}`}>
                    <Icon className="lucide" size={20} strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <span className="grid min-w-0 gap-[var(--s-0)]">
                    <span className="h3 text-[var(--ink)]">{t.title}</span>
                    <span className="line-clamp-2 text-[length:var(--fs-sm)] text-[var(--muted)]">{t.description}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <div id="notes-panel" role="tabpanel" aria-labelledby={`notes-tab-${active}`} className="flex overflow-hidden border border-[var(--line)] bg-[var(--white)] lg:col-span-8">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active}
                initial={{ x: dir * off }}
                animate={{ x: 0 }}
                exit={{ x: -dir * off }}
                transition={{ duration: reduce ? 0 : 0.3, ease: EASE }}
                className="flex-1 p-[var(--s-3)] md:p-[var(--s-5)]"
              >
                <span className="mb-[var(--s-3)] inline-grid h-16 w-16 place-items-center bg-[var(--green)] text-[var(--ink)]">
                  <ActiveIcon className="lucide" size={32} strokeWidth={1.5} aria-hidden="true" />
                </span>
                <h3 className="display-m mb-[var(--s-2)]">{tab.title}</h3>
                <p className="body mb-[var(--s-4)]">{tab.description}</p>
                <ul role="list" className="grid gap-[var(--s-2)]">
                  {tab.items.map((item) => (
                    <li key={item} className="flex items-start gap-[var(--s-2)] bg-[var(--paper)] p-[var(--s-2)]">
                      <span className="grid h-6 w-6 shrink-0 place-items-center bg-[var(--ink)] text-[var(--white)]" aria-hidden="true">
                        <Check className="lucide" size={14} strokeWidth={2.5} />
                      </span>
                      <span className="font-medium text-[var(--slate)]">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <p className="fineprint">Sample content, not an actual visit, live portal or response-time guarantee. Format and frequency are agreed for your site.</p>
      </div>
    </section>
  );
}

export default Features4;
