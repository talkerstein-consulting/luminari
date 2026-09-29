"use client";

import { motion, useAnimationFrame, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import { useState } from "react";

type Logo = { src: string; alt: string };

const defaultLogos: Logo[] = [
  { src: "/images/clients/unger-law.jpg", alt: "Unger Law" },
  { src: "/images/clients/king-capital.jpg", alt: "King Capital Mortgage Investment Corporation" },
  { src: "/images/clients/studio-180.jpg", alt: "Studio 180 Design" },
  { src: "/images/clients/qmw.jpg", alt: "QMW Corp." },
  { src: "/images/clients/zucker.jpg", alt: "Zucker Jewish Academy Toronto" },
  { src: "/images/clients/inkas.jpg", alt: "INKAS" },
  { src: "/images/clients/mark-unger.jpg", alt: "Dr. Mark Unger" },
  { src: "/images/clients/ateret-torah.jpg", alt: "Ateret Torah Learning Center" },
  { src: "/images/clients/arikta.jpg", alt: "ARIKTA" },
];

const Marquee = ({ items, direction = "left", speed = 1.5 }: { items: Logo[]; direction?: "left" | "right"; speed?: number }) => {
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const xPercent = useMotionValue(direction === "left" ? 0 : -50);
  const x = useTransform(xPercent, (v) => `${v}%`);

  useAnimationFrame((_, delta) => {
    if (paused || reduce) return;
    const moveBy = (speed * delta) / 1000;
    const v = xPercent.get();
    if (direction === "left") xPercent.set(v - moveBy <= -50 ? 0 : v - moveBy);
    else xPercent.set(v + moveBy >= 0 ? -50 : v + moveBy);
  });

  if (reduce) {
    return (
      <ul className="flex list-none flex-wrap items-center gap-[var(--s-4)] p-0">
        {items.map((l) => <li key={l.src}><img src={l.src} alt={l.alt} className="h-[48px] w-auto object-contain" /></li>)}
      </ul>
    );
  }

  return (
    <div
      className="marquee flex w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {[0, 1].map((copy) => (
        <motion.ul
          key={copy}
          aria-hidden={copy === 1 || undefined}
          className="flex min-w-full shrink-0 list-none items-center justify-around gap-[var(--s-5)] p-0 pr-[var(--s-5)]"
          style={{ x }}
        >
          {items.map((l) => (
            <li key={l.src} className="shrink-0">
              <img src={l.src} alt={copy === 0 ? l.alt : ""} className="h-[48px] w-auto object-contain" />
            </li>
          ))}
        </motion.ul>
      ))}
    </div>
  );
};

export function SocialProof9({ logos = defaultLogos }: { logos?: Logo[] }) {
  const mid = Math.ceil(logos.length / 2);
  return (
    <section className="section tight overflow-hidden bg-[var(--white)]" aria-labelledby="sp9-h">
      <div className="container grid items-center gap-[var(--s-4)] min-[861px]:grid-cols-[auto_minmax(0,1fr)] min-[861px]:gap-[var(--s-6)]">
        <h2 id="sp9-h" className="display-l">Trusted by.</h2>
        <div className="grid min-w-0 gap-[var(--s-3)]">
          <Marquee items={logos.slice(0, mid)} direction="left" />
          <Marquee items={logos.slice(mid)} direction="right" />
        </div>
      </div>
    </section>
  );
}

export default SocialProof9;
