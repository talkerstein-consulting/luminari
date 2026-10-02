"use client";

import { useEffect, useRef } from "react";
import { ArrowDown } from "lucide-react";
import { Cta } from "./cta";

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
    let dollied = false;
    let timer = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const travel = el.offsetHeight - window.innerHeight;
      const p = Math.max(0, Math.min(1, -r.top / Math.max(1, travel)));
      el.style.setProperty("--progress", String(p));
      const second = p > 0.6;
      if (second && !reduce.matches && !dollied) {
        // the room starts moving as the message lands; after 3s, on to the next slide
        dollied = true;
        el.classList.add("dolly");
        timer = window.setTimeout(() => {
          const t = document.getElementById("website");
          if (t && parseFloat(el.style.getPropertyValue("--progress")) > 0.5) {
            if (window.__lenis) window.__lenis.scrollTo(t, { duration: 1.4 });
            else t.scrollIntoView({ behavior: "smooth" });
          }
        }, 3000);
      } else if (p < 0.5 && dollied) {
        dollied = false;
        window.clearTimeout(timer);
        el.classList.remove("dolly");
      }
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
    return () => { cancelAnimationFrame(raf); window.clearTimeout(timer); window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); reduce.removeEventListener("change", mode); };
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
    <section ref={sec} className="scroll-opening scroll-enhanced dark" aria-label="Discover Luminari Cleaning">
      <div className="scroll-stage">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="opening-workplace" src="/images/spaces/office-studio.jpg" alt="" fetchPriority="high" />
        <div className="opening-shade" aria-hidden="true" />
        <div className="opening-shutters" aria-hidden="true"><span /><span /><span /></div>
        <div ref={msg} className="opening-message">
          <p className="eyebrow">Commercial cleaning · Toronto &amp; Vaughan</p>
          <div className="opening-emblem" aria-hidden="true"><i /><i /><i /></div>
          <h1 className="h1">A clean space.<br />A clearer mind.</h1>
          <p className="lede opening-lead">Leave the details with us.</p>
        </div>
        <div ref={rev} className="opening-reveal" aria-hidden="true">
          <span className="eyebrow">The Luminari standard</span>
          <p className="h1">Ready for<br /><em>what’s next.</em></p>
          <Cta href="#website" onClick={skip}>Step inside</Cta>
        </div>
        <div className="opening-bottom">
          <a href="#website" className="scroll-cue" onClick={skip}>Scroll to reveal <ArrowDown strokeWidth={1.5} aria-hidden="true" /></a>
        </div>
      </div>
    </section>
  );
}

/* =====================================================================
   CLIENT LOGOS — an endless, slow drift. Pauses on hover and on focus.
   ===================================================================== */
export function LogoMarquee({ logos }: { logos: { src: string; alt: string }[] }) {
  return (
    <div className="marq">
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
    </div>
  );
}
