"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import StaggeredText from "@/components/staggered-text";

interface Step {
  id: number;
  title: string;
  description: string;
}

interface About2Props {
  /** Show previous/next chevron controls under the timeline. */
  displayNavigation?: boolean;
  /** Auto-advance interval in ms. Disabled under reduced motion and after any user interaction. 0 turns it off. */
  autoAdvanceMs?: number;
}

const STEPS: Step[] = [
  { id: 1, title: "Tell us about your space", description: "Share your facility, schedule, and what you’d like handled." },
  { id: 2, title: "Walk through the details", description: "We review the areas, access, expectations, and current needs." },
  { id: 3, title: "Agree on your program", description: "Receive a tailored scope and quote, with inclusions made clear." },
  { id: 4, title: "Settle into a better routine", description: "Your team gets to know the space, with ongoing communication." },
];

const EASE = [0.22, 1, 0.36, 1] as const;
const num = (i: number) => String(i + 1).padStart(2, "0");

export default function About2({ displayNavigation = true, autoAdvanceMs = 10000 }: About2Props = {}) {
  const reduce = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [interacted, setInteracted] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduce || interacted || paused || !autoAdvanceMs) return;
    const id = setInterval(() => setActiveIndex((p) => (p + 1) % STEPS.length), autoAdvanceMs);
    return () => clearInterval(id);
  }, [reduce, interacted, paused, autoAdvanceMs]);

  const go = useCallback((i: number) => {
    setInteracted(true);
    setActiveIndex(Math.max(0, Math.min(STEPS.length - 1, i)));
  }, []);

  const entry = STEPS[activeIndex];
  const slide = {
    initial: { y: reduce ? 0 : "100%" },
    animate: { y: 0 },
    exit: { y: reduce ? 0 : "-100%" },
    transition: { duration: reduce ? 0 : 0.3, ease: EASE },
  };

  return (
    <section
      className="section tight"
      aria-labelledby="proc-h"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="container">
        <div className="head-block">
          <h2 id="proc-h" className="display-l">
            <StaggeredText as="span" text="A clear start. A better routine." segmentBy="words" direction="bottom" blur={false} delay={40} duration={0.7} />
          </h2>
        </div>

        {/* Content card: text slides in from below, out through the top. */}
        <div id="proc-panel" className="bg-[var(--cream)] p-[var(--s-3)] sm:p-[var(--s-5)]">
          <div className="grid grid-cols-1 items-center gap-[var(--s-4)] lg:grid-cols-2 lg:gap-[var(--s-5)]">
            <div className="flex flex-col gap-[var(--s-2)]">
              <div className="overflow-hidden">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span key={`e-${entry.id}`} className="eyebrow" {...slide}>
                    Step {num(activeIndex)} of {num(STEPS.length - 1)}
                  </motion.span>
                </AnimatePresence>
              </div>
              <div className="overflow-hidden">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div key={`c-${entry.id}`} className="grid gap-[var(--s-1)]" {...slide}>
                    <h3 className="display-m">{entry.title}</h3>
                    <p className="body">{entry.description}</p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
            {/* Typographic numeral in place of the placeholder image */}
            <div className="hidden overflow-hidden lg:flex lg:justify-end" aria-hidden="true">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span key={`n-${entry.id}`} className="display-xl text-[var(--slate)]" {...slide}>
                  {num(activeIndex)}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Timeline: one button per step (number, marker, title), progress line wipes across. */}
        <div className="mt-[var(--s-5)]">
          <div className="relative">
            <div className="pointer-events-none absolute left-0 right-0 top-[calc(var(--s-5)-var(--s-0)/2)] h-px bg-[var(--line)]" aria-hidden="true" />
            <motion.div
              className="pointer-events-none absolute left-0 top-[calc(var(--s-5)-var(--s-0)/2)] h-px bg-[var(--ink)]"
              aria-hidden="true"
              initial={false}
              animate={{ width: `${(activeIndex / STEPS.length) * 100}%` }}
              transition={{ duration: reduce ? 0 : 0.4, ease: EASE }}
            />
            <ol className="relative m-0 grid list-none grid-cols-4 p-0">
              {STEPS.map((s, i) => {
                const isActive = i === activeIndex;
                const isPassed = i <= activeIndex;
                return (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => go(i)}
                      aria-controls="proc-panel"
                      aria-current={isActive ? "step" : undefined}
                      aria-label={`Step ${num(i)}: ${s.title}`}
                      className="flex min-h-[44px] w-full flex-col items-start gap-[var(--s-1)] pr-[var(--s-2)] text-left"
                    >
                      <span className={`font-[family-name:var(--display)] text-[length:var(--fs-d-m)] leading-none transition-colors duration-300 ${isActive ? "text-[var(--ink)]" : "text-[var(--muted)]"}`}>
                        {num(i)}
                      </span>
                      <span
                        className={`block h-[var(--s-2)] w-[var(--s-2)] border transition-colors duration-300 ${isPassed ? "border-[var(--ink)] bg-[var(--ink)]" : "border-[var(--line)] bg-[var(--paper)]"}`}
                        aria-hidden="true"
                      />
                      <span className={`hidden text-[length:var(--fs-sm)] font-semibold transition-colors duration-300 md:block ${isActive ? "text-[var(--ink)]" : "text-[var(--muted)]"}`}>
                        {s.title}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>

          {displayNavigation && (
            <div className="mt-[var(--s-3)] flex justify-end gap-[var(--s-1)]">
              <button
                type="button"
                onClick={() => go(activeIndex - 1)}
                disabled={activeIndex === 0}
                aria-label="Previous step"
                className="flex h-[44px] w-[44px] items-center justify-center border border-[var(--line)] text-[var(--ink)] transition-colors duration-300 hover:border-[var(--ink)] disabled:cursor-not-allowed disabled:text-[var(--muted)] disabled:hover:border-[var(--line)]"
              >
                <ChevronLeft className="lucide" strokeWidth={1.75} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => go(activeIndex + 1)}
                disabled={activeIndex === STEPS.length - 1}
                aria-label="Next step"
                className="flex h-[44px] w-[44px] items-center justify-center border border-[var(--line)] text-[var(--ink)] transition-colors duration-300 hover:border-[var(--ink)] disabled:cursor-not-allowed disabled:text-[var(--muted)] disabled:hover:border-[var(--line)]"
              >
                <ChevronRight className="lucide" strokeWidth={1.75} aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
