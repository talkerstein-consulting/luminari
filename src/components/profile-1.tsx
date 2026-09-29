"use client";

import { motion, useReducedMotion } from "motion/react";
import StaggeredText from "@/components/staggered-text";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Profile1() {
  const reduce = useReducedMotion();
  // Slide only: each line rises inside its own clipped row. No fade, no scale.
  const rise = (delay: number) => ({
    initial: { y: reduce ? 0 : "100%" },
    whileInView: { y: 0 },
    viewport: { once: true },
    transition: { duration: reduce ? 0 : 0.6, delay: reduce ? 0 : delay, ease: EASE },
  });

  return (
    <section id="people" className="section tint" aria-labelledby="people-h">
      <div className="container">
        <div className="head-block">
          <h2 id="people-h" className="display-l">
            <StaggeredText as="span" text="A name you know. Someone you can reach." segmentBy="words" direction="bottom" blur={false} delay={40} duration={0.7} />
          </h2>
        </div>

        <div className="mx-auto w-full max-w-[560px]">
          <article className="border border-[var(--line)] bg-[var(--white)] p-[var(--s-1)]" aria-label="Betzalel Zrihen, Owner">
            {/* Cover band: solid ink, no gradient, no photo */}
            <div className="relative h-[var(--s-7)] bg-[var(--ink)] sm:h-[calc(var(--s-7)+var(--s-5))]">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 border-[length:var(--s-1)] border-[var(--white)]">
                <span className="monogram" aria-hidden="true">BZ</span>
              </div>
            </div>

            <div className="px-[var(--s-3)] pb-[var(--s-4)] pt-[calc(var(--s-6)+var(--s-1))] text-center">
              <div className="overflow-hidden">
                <motion.span className="eyebrow" {...rise(0.1)}>Owner, Luminari Cleaning</motion.span>
              </div>
              <div className="mt-[var(--s-1)] overflow-hidden">
                <motion.h3 className="display-m" {...rise(0.18)}>Betzalel Zrihen</motion.h3>
              </div>
              <div className="mt-[var(--s-3)] overflow-hidden">
                <motion.p className="quote" {...rise(0.26)}>Good service starts with taking responsibility.</motion.p>
              </div>
              <div className="overflow-hidden">
                <motion.p className="body mx-auto mt-[var(--s-3)]" {...rise(0.34)}>
                  Betzalel coordinates client communication, checks in on the work, and stays involved when something needs attention. Behind every clean is a team learning your space, following your agreed scope, and keeping the details in view.
                </motion.p>
              </div>
              <div className="mt-[var(--s-2)] overflow-hidden">
                <motion.p className="quote-cite flex flex-wrap items-center justify-center gap-[var(--s-1)]" {...rise(0.42)}>
                  <span>Toronto</span><span aria-hidden="true">·</span><span>Vaughan</span><span aria-hidden="true">·</span><span>Greater Toronto Area</span>
                </motion.p>
              </div>
              <div className="mt-[var(--s-2)] flex justify-center">
                <a className="textlink" href="#walkthrough">Talk to Betzalel</a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
