"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Phone } from "lucide-react";
import { Logo } from "./logo";
import { links } from "./links";
import { Cta, Tumble } from "./cta";

/* Menu numerals hang in a gutter left of each word (Aria Noir). */
const NUMERALS = ["I", "II", "III", "IV", "V", "VI"];
const STEP_MS = 22;

/* `base` prefixes the in-page links so the nav works from other routes too ("/" on /report). */
export function Nav({ base = "" }: { base?: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const bar = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  // hairline once scrolled; the progress bar under the nav tracks the page
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.current?.style.setProperty("--p", String(max > 0 ? Math.min(1, window.scrollY / max) : 0));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);

  // open: focus the first destination, lock the page (gutter held so nothing shifts),
  // Escape closes, Tab stays inside the sheet, widening past the breakpoint closes it
  useEffect(() => {
    if (!open) return;
    panel.current?.querySelector<HTMLElement>("a[href]")?.focus();
    const root = document.documentElement;
    root.style.scrollbarGutter = "stable";
    root.style.overflow = "hidden";
    window.__lenis?.stop();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); return; }
      if (e.key !== "Tab") return;
      const f = panel.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      if (!f?.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    const mq = window.matchMedia("(min-width: 1101px)");
    const onMq = () => mq.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      root.style.overflow = "";
      root.style.scrollbarGutter = "";
      window.__lenis?.start();
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open]);

  const close = () => setOpen(false);

  /* Items rise in a beat apart on open. On close they hold while the sheet lifts away,
     then snap back once it is gone, so the next open has something to rise from. */
  const rise = (i: number): CSSProperties => ({
    opacity: open ? 1 : 0,
    transform: open ? "none" : "translateY(0.8em)",
    transition: open
      ? `opacity .85s var(--ease) ${120 + i * STEP_MS * 3}ms, transform .85s var(--ease) ${120 + i * STEP_MS * 3}ms`
      : "opacity 0s linear .45s, transform 0s linear .45s",
  });

  return (
    <header className={`nav ${scrolled || open ? "is-scrolled" : ""} ${open ? "is-open" : ""}`}>
      <div className="wrap nav-bar">
        <div className="nav-side">
          <button type="button" className="nav-burger" aria-label={open ? "Close" : "Menu"} aria-expanded={open} aria-controls="menu" onClick={() => setOpen(!open)}>
            <span aria-hidden="true" /><span aria-hidden="true" /><span aria-hidden="true" />
          </button>
          <ul className="nav-links">
            {links.map((l) => <li key={l.href}><a className="u" href={base + l.href}>{l.label}</a></li>)}
          </ul>
        </div>

        <a className="nav-logo" href={base || "#"} aria-label="Luminari Cleaning, home" onClick={close}><Logo /></a>

        <div className="nav-side end">
          <Cta href={base + "#walkthrough"} className="nav-cta">Get started</Cta>
          <a className="nav-call" href="tel:+18482857711" aria-label="Call Luminari, (848) 285-7711"><Phone strokeWidth={1.5} /></a>
        </div>
      </div>

      <div className="progress" ref={bar} aria-hidden="true"><i /></div>

      {/* The sheet: always mounted, inert when closed. It drops from under the header,
          four fifths of the screen; the rest is the page under frosted glass, which closes it. */}
      <div id="menu" ref={panel} className="sheet" data-open={open} inert={!open} aria-hidden={!open}>
        <button type="button" className="sheet-glass" aria-label="Close" tabIndex={-1} onClick={close} />
        <div className="sheet-panel">
          <nav aria-label="Menu" className="sheet-nav">
            <ul className="sheet-list">
              {links.map((l, i) => (
                <li key={l.href} style={rise(i)}>
                  <span className="sheet-num" aria-hidden="true">{NUMERALS[i]}</span>
                  <a className="menu-link" href={base + l.href} onClick={close} aria-label={l.label}><Tumble>{l.label}</Tumble></a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="sheet-foot" style={rise(links.length)}>
            <span className="eyebrow">Get in touch</span>
            <a className="u" href="mailto:Admin@luminaricleaning.com">Admin@luminaricleaning.com</a>
            <Cta href={base + "#walkthrough"} onClick={close}>Get started</Cta>
          </div>
        </div>
      </div>
    </header>
  );
}
