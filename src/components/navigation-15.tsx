"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "motion/react";
import { ChevronRight, Search, SearchX, X } from "lucide-react";
import { Button } from "@/components/site/ui";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const links = [
  { label: "Our services", href: "#services" },
  { label: "Our standards", href: "#standards" },
  { label: "Specialties", href: "#spaces" },
  { label: "About us", href: "#people" },
];

const services = [
  "Recurring janitorial", "Office cleaning", "Restaurant cleaning", "Residential contracts",
  "Deep cleaning", "Post-construction cleaning", "Move-in & move-out cleaning", "School cleaning",
];

const ic = { className: "lucide", strokeWidth: 1.75 };

export default function Navigation15() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [hidden, setHidden] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const reduce = useReducedMotion();
  const current = hovered ?? active;

  useEffect(() => { if (search) input.current?.focus(); }, [search]);

  // hide on scroll down, reveal on scroll up (8px threshold)
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - last) < 8) return;
      setHidden(y > 400 && y > last && !open && !search);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open, search]);

  // current section drives the sliding underline when not hovering
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive("#" + e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    links.forEach((l) => { const el = document.querySelector(l.href); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);

  // drawer: Escape closes, body scroll locked, closes when widening to desktop
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); };
  }, [open]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 961px)");
    const onChange = (e: MediaQueryListEvent) => { if (e.matches) setOpen(false); };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const q = query.trim().toLowerCase();
  const results = q ? services.filter((s) => s.toLowerCase().includes(q)) : [];
  const closeSearch = () => { setSearch(false); setQuery(""); };

  const stagger: Variants = { hidden: {}, visible: { transition: { staggerChildren: reduce ? 0 : 0.06, delayChildren: reduce ? 0 : 0.2 } } };
  const item: Variants = {
    hidden: { x: reduce ? 0 : "100%" },
    visible: { x: 0, transition: { duration: reduce ? 0 : 0.45, ease: EASE } },
  };

  return (
    <header className={`nav-wrap ${hidden ? "is-hidden" : ""}`}>
      <div className="container">
        <nav className="nav" aria-label="Primary">
          <a className="logo" href="#top" aria-label="Luminari Cleaning, home"><b>LUMINARI</b><span>CLEANING</span></a>

          <ul className="nav-links" onMouseLeave={() => setHovered(null)}>
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="relative"
                  onMouseEnter={() => setHovered(l.href)}
                  onFocus={() => setHovered(l.href)}
                  onBlur={() => setHovered(null)}
                  aria-current={active === l.href ? "location" : undefined}
                >
                  {l.label}
                  {current === l.href && (
                    <motion.span
                      layoutId="nav15-line"
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-px bg-[var(--u-hover)]"
                      transition={{ duration: reduce ? 0 : 0.3, ease: EASE }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          <div className="nav-tools">
            <div className={`search ${search ? "open" : ""}`}>
              <input
                ref={input} type="search" placeholder="Search services" aria-label="Search services"
                aria-controls="nav15-results"
                tabIndex={search ? 0 : -1} value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Escape" && closeSearch()}
              />
              <button type="button" className="icon-btn" aria-label={search ? "Close search" : "Open search"} aria-expanded={search} onClick={() => (search ? closeSearch() : setSearch(true))}>
                {search ? <X {...ic} /> : <Search {...ic} />}
              </button>
            </div>
            <Button href="#walkthrough" variant="secondary">Let’s talk</Button>
            <button
              type="button" className="icon-btn burger"
              aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="nav15-drawer"
              onClick={() => { setOpen(!open); closeSearch(); }}
            ><span /></button>
          </div>
        </nav>

        <div id="nav15-results" className={`search-panel ${q ? "open" : ""}`} aria-live="polite">
          <div>
            {results.length > 0 ? (
              <ul>{results.map((r) => <li key={r}><a className="wipe-link" href="#services" onClick={closeSearch}>{r}</a></li>)}</ul>
            ) : (
              <div className="search-empty">
                <SearchX {...ic} />
                <div><strong className="h3">No matching services</strong><p className="body">Try “office” or “deep clean”, or tell us about your space.</p></div>
                <a className="textlink" href="#walkthrough" onClick={closeSearch}>Request a walkthrough</a>
              </div>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="nav15-drawer"
            role="dialog" aria-modal="true" aria-label="Menu"
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ duration: reduce ? 0 : 0.5, ease: EASE }}
            className="fixed inset-x-0 bottom-0 top-[72px] z-30 overflow-y-auto overflow-x-hidden bg-[var(--paper)] min-[961px]:hidden"
          >
            <div className="container flex min-h-full flex-col py-[var(--s-4)]">
              <span className="eyebrow">Menu</span>
              <motion.ul initial="hidden" animate="visible" variants={stagger} className="mt-[var(--s-2)] grid list-none p-0">
                {links.map((l) => (
                  <li key={l.href} className="overflow-hidden border-b border-[var(--line)]">
                    <motion.a
                      variants={item} href={l.href} onClick={() => setOpen(false)}
                      aria-current={active === l.href ? "location" : undefined}
                      className="display-m flex min-h-[44px] items-center justify-between py-[var(--s-2)] text-[var(--ink)] no-underline transition-colors duration-300 hover:text-[var(--slate)] aria-[current]:text-[var(--slate)]"
                    >
                      {l.label}
                      <ChevronRight {...ic} />
                    </motion.a>
                  </li>
                ))}
              </motion.ul>
              <div className="mt-auto grid gap-[var(--s-2)] pt-[var(--s-5)]">
                <span className="eyebrow">Get in touch</span>
                <a className="textlink justify-self-start" href="mailto:Admin@luminaricleaning.com">Admin@luminaricleaning.com</a>
                <div className="cta-group" onClick={() => setOpen(false)}>
                  <Button href="#walkthrough">Let’s talk</Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
