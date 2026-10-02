"use client";

import { useEffect, useRef } from "react";
import { Logo } from "./logo";

/* The closing flourish: when the wordmark scrolls into view the mark builds itself bar by bar,
   the C draws closed, and a light passes across the name. Replays on hover. */
export function FooterLogo({ base = "" }: { base?: string }) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.classList.add("armed");
    const play = () => {
      el.classList.remove("go");
      void el.offsetWidth;
      el.classList.add("go");
    };
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { play(); io.disconnect(); } }, { threshold: 0.6 });
    io.observe(el);
    el.addEventListener("mouseenter", play);
    return () => { io.disconnect(); el.removeEventListener("mouseenter", play); };
  }, []);

  return (
    <a ref={ref} className="footer-logo" href={base || "#"} aria-label="Luminari Cleaning, home">
      <Logo />
    </a>
  );
}
