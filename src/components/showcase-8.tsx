"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import StaggeredText from "@/components/staggered-text";
import { Clamp } from "@/components/site/ui";

const services = [
  ["Everyday care", "Recurring janitorial", "Reliable cleaning for offices and shared commercial spaces, with a regular schedule and a scope built around your business."],
  ["Ready for service", "Restaurant cleaning", "Dining areas, guest washrooms and agreed service spaces, cleaned around your operating schedule."],
  ["A home, cared for", "Residential contracts", "Recurring cleaning for homes and apartments, with a schedule and scope agreed around your household or property."],
  ["A better workday", "Office cleaning", "Workstations, meeting rooms, washrooms and kitchens, ready for the people who use them."],
  ["A thorough reset", "Deep cleaning", "A focused clean for built-up dust, overlooked corners and areas that need more attention than the daily routine."],
  ["Ready for the next chapter", "Post-construction cleaning", "After the work is finished, prepare your space for use with a cleaning scope tailored to the project."],
  ["A fresh start", "Move-in & move-out cleaning", "Prepare a space for its next occupants, or leave it ready for handover, with a clearly agreed checklist."],
] as const;

const pad = (n: number) => String(n).padStart(2, "0");
const navBtn =
  "grid h-11 w-11 place-items-center border border-[var(--ink)] text-[var(--ink)] transition-colors duration-300 enabled:hover:bg-[var(--ink)] enabled:hover:text-[var(--white)] disabled:border-[var(--line)] disabled:text-[var(--muted)]";

export function Showcase8() {
  const reduceMotion = useReducedMotion();
  const trackRef = useRef<HTMLUListElement>(null);
  const frameRef = useRef(0);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const readScroll = useCallback(() => {
    const node = trackRef.current;
    if (!node) return;
    const max = node.scrollWidth - node.clientWidth;
    const left = node.scrollLeft;
    setProgress(max > 0 ? Math.min(1, Math.max(0, left / max)) : 1);
    setCanPrev(left > 8);
    setCanNext(left < max - 8);
    const cards = Array.from(node.children) as HTMLElement[];
    if (!cards.length) return;
    const start = cards[0].offsetLeft;
    let nearest = 0;
    let smallest = Infinity;
    cards.forEach((card, i) => {
      const d = Math.abs(card.offsetLeft - start - left);
      if (d < smallest) { smallest = d; nearest = i; }
    });
    if (max - left < 8) nearest = cards.length - 1;
    setActive(nearest);
  }, []);

  const handleScroll = () => {
    cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(readScroll);
  };

  useEffect(() => {
    frameRef.current = requestAnimationFrame(readScroll);
    window.addEventListener("resize", readScroll);
    return () => {
      window.removeEventListener("resize", readScroll);
      cancelAnimationFrame(frameRef.current);
    };
  }, [readScroll]);

  const step = (direction: number) => {
    const node = trackRef.current;
    if (!node) return;
    const cards = Array.from(node.children) as HTMLElement[];
    if (!cards.length) return;
    const start = cards[0].offsetLeft;
    const left = node.scrollLeft;
    const offsets = cards.map((c) => c.offsetLeft - start);
    let target: number | undefined;
    if (direction < 0) {
      for (let i = offsets.length - 1; i >= 0; i--) if (offsets[i] < left - 8) { target = offsets[i]; break; }
      target ??= 0;
    } else {
      for (let i = 0; i < offsets.length; i++) if (offsets[i] > left + 8) { target = offsets[i]; break; }
      target ??= node.scrollWidth - node.clientWidth;
    }
    node.scrollTo({ left: target, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <section id="services" aria-labelledby="services-h" className="section tint overflow-hidden">
      <div className="container">
        <div className="head-row">
          <div className="head-block">
            <h2 id="services-h" className="display-l">
              <StaggeredText as="span" text="One less thing on your list." segmentBy="words" direction="bottom" blur={false} delay={40} duration={0.7} />
            </h2>
            <p className="lede">A regular clean. A thorough reset. A fresh start. Choose the care your space needs.</p>
          </div>

          <div className="flex items-center gap-[var(--s-1)]">
            <button type="button" onClick={() => step(-1)} disabled={!canPrev} aria-label="Previous service" aria-controls="services-track" className={navBtn}>
              <ChevronLeft className="lucide" size={18} strokeWidth={1.75} aria-hidden="true" />
            </button>
            <button type="button" onClick={() => step(1)} disabled={!canNext} aria-label="Next service" aria-controls="services-track" className={navBtn}>
              <ChevronRight className="lucide" size={18} strokeWidth={1.75} aria-hidden="true" />
            </button>
          </div>
        </div>

        <ul
          id="services-track"
          ref={trackRef}
          onScroll={handleScroll}
          role="list"
          aria-label="Our services"
          tabIndex={0}
          className="-mx-[var(--gutter)] flex snap-x snap-mandatory gap-[var(--s-3)] overflow-x-auto overscroll-x-contain px-[var(--gutter)] py-[var(--s-0)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {services.map(([tag, title, body], i) => (
            <li
              key={title}
              className="pinwheel flex w-[78vw] max-w-[400px] shrink-0 snap-start scroll-ml-[var(--gutter)] flex-col border border-[var(--line)] bg-[var(--white)] sm:w-[360px]"
            >
              <div className="relative flex aspect-[4/3] flex-col justify-between bg-[var(--cream)] p-[var(--s-3)]">
                <span className="chip self-start">{tag}</span>
                <span aria-hidden="true" className="font-[family-name:var(--display)] text-[length:var(--fs-d-xl)] leading-none text-[var(--ink)]">
                  {pad(i + 1)}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-[var(--s-2)] p-[var(--s-3)]">
                <h3 className="h3">{title}</h3>
                <Clamp>{body}</Clamp>
                <a className="textlink mt-auto gap-[var(--s-1)] self-start" href="#walkthrough" aria-label={`Request a walkthrough for ${title}`}>
                  Request a walkthrough <ChevronRight className="lucide" size={16} strokeWidth={1.75} aria-hidden="true" />
                </a>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-[var(--s-4)] flex items-center gap-[var(--s-3)]">
          <div className="relative h-[2px] flex-1 overflow-hidden bg-[var(--line)]" aria-hidden="true">
            <div
              className="absolute inset-0 origin-left bg-[var(--ink)] transition-transform duration-300"
              style={{ transform: `scaleX(${progress})` }}
            />
          </div>
          <p className="eyebrow" aria-live="polite">
            <span className="sr-only">Service </span>
            <span className="text-[var(--ink)]">{pad(active + 1)}</span>
            <span className="text-[var(--muted)]"> / {pad(services.length)}</span>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Showcase8;
