"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Pause, Play } from "lucide-react";
import { Tumble } from "./cta";

/* =====================================================================
   OPENING — a copy of the original site's scroll opening. A sticky full
   screen: three slate shutters lift at different speeds as you scroll,
   the first message fades up and away, the second arrives with the CTAs.
   --progress (0→1) is scroll progress through the section.
   ===================================================================== */
export function Opening() {
  const sec = useRef<HTMLElement>(null);
  const msg = useRef<HTMLDivElement>(null);
  const rev = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sec.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const travel = el.offsetHeight - window.innerHeight;
      const p = Math.max(0, Math.min(1, -r.top / Math.max(1, travel)));
      el.style.setProperty("--progress", String(p));
      const second = p > 0.6;
      msg.current?.setAttribute("aria-hidden", String(second));
      if (rev.current) { rev.current.inert = !second; rev.current.setAttribute("aria-hidden", String(!second)); }
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    const mode = () => {
      el.classList.toggle("scroll-enhanced", !reduce.matches);
      if (reduce.matches) msg.current?.removeAttribute("aria-hidden"); else update();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    reduce.addEventListener("change", mode);
    mode();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); reduce.removeEventListener("change", mode); };
  }, []);

  // "Skip to website" and the cue jump straight past the opening to the hero
  const skip = (e: React.MouseEvent) => {
    const t = document.getElementById("website");
    if (!t) return;
    e.preventDefault();
    if (window.__lenis) window.__lenis.scrollTo(t, { immediate: true });
    else t.scrollIntoView({ behavior: "instant" });
    t.focus({ preventScroll: true });
    history.replaceState(null, "", "#website");
  };

  return (
    <section ref={sec} className="scroll-opening scroll-enhanced" aria-label="Discover Luminari Cleaning">
      <div className="scroll-stage">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="opening-workplace" src="/images/spaces/office-studio.jpg" alt="" fetchPriority="high" />
        <div className="opening-shade" aria-hidden="true" />
        <div className="opening-shutters" aria-hidden="true"><span /><span /><span /></div>
        <div ref={msg} className="opening-message">
          <p className="og-eyebrow">Commercial cleaning · Toronto &amp; Vaughan</p>
          <div className="opening-emblem" aria-hidden="true"><i /><i /><i /></div>
          <h2>A clean space.<br />A clearer mind.</h2>
          <p className="opening-lead">Leave the details with us.</p>
        </div>
        <div ref={rev} className="opening-reveal" aria-hidden="true">
          <span className="og-eyebrow">The Luminari standard</span>
          <p>Ready for<br /><em>what’s next.</em></p>
          <a className="og-button cream" href="#website" onClick={skip} aria-label="Step inside">
            <Tumble>Step inside</Tumble><ArrowUpRight strokeWidth={1.5} aria-hidden="true" />
          </a>
        </div>
        <div className="opening-bottom">
          <a href="#website" className="scroll-cue" onClick={skip}>Scroll to reveal <ArrowDown strokeWidth={1.5} aria-hidden="true" /></a>
          <a href="#website" className="opening-skip" onClick={skip}>Skip to website <ArrowUpRight strokeWidth={1.5} aria-hidden="true" /></a>
        </div>
      </div>
    </section>
  );
}

/* =====================================================================
   HERO — a copy of the original site's hero: slate panel, the photo on the
   right, the headline rising line by line, the standard card, the bottom bar.
   ===================================================================== */
export function Hero() {
  return (
    <section className="og-hero" id="website" tabIndex={-1} aria-labelledby="hero-h">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="og-hero-image" src="/images/workplace.jpg" alt="Sunlit contemporary workplace with meeting tables and greenery" fetchPriority="high" />
      <div className="og-hero-content">
        <p className="og-eyebrow"><span className="og-dot" /> Commercial janitorial · Toronto &amp; Vaughan</p>
        <h1 id="hero-h" className="main-hero-headline">
          <span style={{ ["--i" as string]: 0 }}>Tomorrow’s</span>
          <span style={{ ["--i" as string]: 1 }}>first impression.</span>
          <span style={{ ["--i" as string]: 2 }}>Handled tonight.</span>
        </h1>
        <p className="og-hero-copy">Commercial and residential cleaning that takes the details off your list. Familiar people. A clear scope. A workplace ready for the day ahead.</p>
        <div className="og-actions">
          <a className="og-button cream" href="#walkthrough" aria-label="Request an assessment"><Tumble>Request an assessment</Tumble><ArrowUpRight strokeWidth={1.5} aria-hidden="true" /></a>
          <a className="og-text-link" href="/report">Read the report <ArrowUpRight strokeWidth={1.5} aria-hidden="true" /></a>
        </div>
      </div>
      <div className="og-hero-note">
        <span className="og-eyebrow">The Luminari standard</span>
        <strong>The details.<br />Taken care of.</strong>
        <span>01 / CLEAN &nbsp; 02 / CHECK &nbsp; 03 / COMMUNICATE</span>
      </div>
      <div className="og-hero-bottom">
        <span>Clean spaces. Clear expectations.</span>
        <a href="#spaces">Discover our care <ArrowDown strokeWidth={1.5} aria-hidden="true" /></a>
      </div>
    </section>
  );
}

/* =====================================================================
   CLIENT LOGOS — an endless, slow drift. Pauses on hover, on focus, and
   with the button (motion that runs longer than 5s needs a pause).
   ===================================================================== */
export function LogoMarquee({ logos }: { logos: { src: string; alt: string }[] }) {
  const [paused, setPaused] = useState(false);
  return (
    <div className={`marq ${paused ? "paused" : ""}`}>
      <div className="marq-window">
        <div className="marq-track">
          {[0, 1].map((copy) => (
            <ul key={copy} aria-hidden={copy === 1 || undefined}>
              {logos.map((l) => (
                <li key={l.src}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/images/clients-mono/${l.src}.png`} alt={copy === 0 ? l.alt : ""} loading="lazy" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
      <button type="button" className="marq-pause" aria-pressed={paused} onClick={() => setPaused(!paused)}>
        {paused ? <Play strokeWidth={1.5} aria-hidden="true" /> : <Pause strokeWidth={1.5} aria-hidden="true" />}
        {paused ? "Resume logo movement" : "Pause logo movement"}
      </button>
    </div>
  );
}
