"use client";

import { useEffect } from "react";
import Lenis from "lenis";

declare global { interface Window { __lenis?: Lenis } }

/* Inertia scroll over the real document, so sticky stages, observers and scroll
   listeners keep working. Desktop only, and off for reduced motion. */
export function SmoothScroll() {
  useEffect(() => {
    // desktop pointers only: phones, tablets and touch laptops keep native scrolling
    const desktop = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 1025px)").matches;
    if (!desktop || window.matchMedia("(prefers-reduced-motion: reduce)").matches || window.__lenis) return;
    const nav = () => (window.innerWidth > 1100 ? 84 : 72);
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
      anchors: { offset: -nav() },
    });
    window.__lenis = lenis;
    let id = requestAnimationFrame(function raf(t) { lenis.raf(t); id = requestAnimationFrame(raf); });
    return () => { cancelAnimationFrame(id); lenis.destroy(); delete window.__lenis; };
  }, []);
  return null;
}
