"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Check, ChevronDown, ChevronRight, LoaderCircle, Pause, Play, Search, SearchX, X } from "lucide-react";
import StaggeredText from "@/components/staggered-text";

/* ---------- Button: word roll + chevron → check on press ---------- */
type ButtonProps = {
  children: string;
  href?: string;
  variant?: "primary" | "secondary";
  disabledMessage?: string;
  className?: string;
  pinned?: boolean;
  type?: "submit";
  state?: "idle" | "loading" | "done";
};

export function Button({ children, href = "#", variant = "primary", disabledMessage, className = "", pinned, type, state = "idle" }: ButtonProps) {
  const [pressed, setPressed] = useState(false);
  const [msg, setMsg] = useState("");
  const disabled = Boolean(disabledMessage);

  const onClick = (e: React.MouseEvent) => {
    if (disabled) { e.preventDefault(); setMsg(disabledMessage!); return; }
    if (type) return; // the form owns loading/done state
    setPressed(true);
    setTimeout(() => setPressed(false), 1200);
  };

  const words = children.split(/\s+/);
  const cls = `button ${variant} ${pressed || state === "done" ? "is-pressed" : ""} ${state === "loading" ? "is-loading" : ""} ${className}`;
  const Tag = type ? "button" : "a";
  return (
    <>
      <Tag
        {...(type ? { type } : { href })}
        onClick={onClick}
        aria-label={children}
        aria-disabled={disabled || undefined}
        data-primary={variant === "primary" && !pinned ? "" : undefined}
        className={cls}
      >
        <span className="label" aria-hidden="true">
          {words.map((w, i) => (
            <span key={i} className="w"><span className="w-in" style={{ ["--i" as string]: i }} data-t={w}>{w}</span></span>
          ))}
        </span>
        <span className="ic" aria-hidden="true">
          <ChevronRight className="lucide ic-rest" strokeWidth={1.75} />
          <Check className="lucide ic-done" strokeWidth={1.75} />
          <LoaderCircle className="lucide ic-load" strokeWidth={1.75} />
        </span>
      </Tag>
      {msg && disabled && <p className="btn-msg" role="alert">{msg}</p>}
    </>
  );
}

/* ---------- Nav: search slides open, menu → X, drawer slides ---------- */
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

export function Nav() {
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState("");
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => { if (search) input.current?.focus(); }, [search]);

  // hide on scroll down, reveal on scroll up; compact once past the hero
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - last) < 8) return; // ignore scroll-anchoring nudges
      setHidden(y > 400 && y > last && !menu && !search);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [menu, search]);

  // current section keeps its underline wiped in
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive("#" + e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    links.forEach((l) => { const el = document.querySelector(l.href); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);

  const q = query.trim().toLowerCase();
  const results = q ? services.filter((s) => s.toLowerCase().includes(q)) : [];
  const closeSearch = () => { setSearch(false); setQuery(""); };

  return (
    <header className={`nav-wrap ${hidden ? "is-hidden" : ""}`}>
      <div className="container">
        <nav className="nav" aria-label="Primary">
          <a className="logo" href="#top" aria-label="Luminari Cleaning, home"><b>LUMINARI</b><span>CLEANING</span></a>
          <ul className="nav-links">
            {links.map((l) => (
              <li key={l.href}><a className="wipe-link" href={l.href} aria-current={active === l.href ? "location" : undefined}>{l.label}</a></li>
            ))}
          </ul>
          <div className="nav-tools">
            <div className={`search ${search ? "open" : ""}`}>
              <input
                ref={input} type="search" placeholder="Search services" aria-label="Search services"
                aria-controls="search-results" aria-expanded={Boolean(q)}
                tabIndex={search ? 0 : -1} value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Escape" && closeSearch()}
              />
              <button className="icon-btn" aria-label={search ? "Close search" : "Open search"} aria-expanded={search} onClick={() => (search ? closeSearch() : setSearch(true))}>
                {search ? <X className="lucide" strokeWidth={1.75} /> : <Search className="lucide" strokeWidth={1.75} />}
              </button>
            </div>
            <Button href="#contact" variant="secondary">Let’s talk</Button>
            <button className="icon-btn burger" aria-label="Menu" aria-expanded={menu} aria-controls="drawer" onClick={() => setMenu(!menu)}><span /></button>
          </div>
        </nav>

        <div id="search-results" className={`search-panel ${q ? "open" : ""}`} aria-live="polite">
          <div>
            {results.length > 0 ? (
              <ul>{results.map((r) => <li key={r}><a className="wipe-link" href="#services" onClick={closeSearch}>{r}</a></li>)}</ul>
            ) : (
              <div className="search-empty">
                <SearchX className="lucide" strokeWidth={1.75} />
                <div><strong className="h3">No matching services</strong><p className="body">Try “office” or “deep clean”, or tell us about your space.</p></div>
                <a className="textlink" href="#contact" onClick={closeSearch}>Request a walkthrough</a>
              </div>
            )}
          </div>
        </div>

        <div id="drawer" className={`drawer ${menu ? "open" : ""}`}>
          <div>
            <ul key={String(menu)}>
              {[...links, { label: "Let’s talk", href: "#contact" }].map((l, i) => (
                <li key={l.href}>
                  <a href={l.href} onClick={() => setMenu(false)} aria-current={active === l.href ? "location" : undefined}>
                    {menu ? <StaggeredText as="span" text={l.label} segmentBy="words" direction="bottom" blur={false} delay={40 + i * 60} duration={0.6} /> : l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ---------- Accordion (slides) ---------- */
export function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState(0);
  return (
    <div>
      {items.map((it, i) => (
        <div key={it.q} className={`acc-item ${open === i ? "open" : ""}`}>
          <button className="acc-btn" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
            {it.q}<ChevronDown className="lucide" strokeWidth={1.75} />
          </button>
          <div className="acc-panel"><div><p className="body">{it.a}</p></div></div>
        </div>
      ))}
    </div>
  );
}

/* ---------- Clamp to 4 lines + read more ---------- */
export function Clamp({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [over, setOver] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => { const p = ref.current; if (p) setOver(p.scrollHeight > p.clientHeight + 1); }, []);
  return (
    <>
      <p ref={ref} className={`body clamp ${open ? "expanded" : ""}`}>{children}</p>
      {over && (
        <button type="button" className="textlink read-more" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setOpen(!open); }}>
          {open ? "Read less" : "Read more"}
        </button>
      )}
    </>
  );
}

/* ---------- Logo marquee with pause control ---------- */
export function LogoMarquee({ logos }: { logos: { src: string; alt: string }[] }) {
  const [paused, setPaused] = useState(false);
  const row = [...logos, ...logos];
  return (
    <>
      <div className={`marquee ${paused ? "paused" : ""}`}>
        <div className="marquee-track">
          {row.map((l, i) => <div key={i} aria-hidden={i >= logos.length || undefined}><img src={l.src} alt={i < logos.length ? l.alt : ""} /></div>)}
        </div>
      </div>
      <button className="textlink" onClick={() => setPaused(!paused)} aria-pressed={paused}>
        {paused ? <Play className="lucide" strokeWidth={1.75} /> : <Pause className="lucide" strokeWidth={1.75} />}&nbsp;{paused ? "Play logo movement" : "Pause logo movement"}
      </button>
    </>
  );
}

/* ---------- Pinned conversion CTA + page loader ---------- */
export function PageChrome() {
  const [show, setShow] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem("lum-loaded") === "1"; } catch {}
    const done = () => { setLoaded(true); try { sessionStorage.setItem("lum-loaded", "1"); } catch {} };
    const t = setTimeout(done, seen || document.readyState === "complete" ? 0 : 400);
    const visible = new Set<Element>();
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
      setShow(visible.size === 0);
    });
    document.querySelectorAll("[data-primary]").forEach((b) => io.observe(b));
    return () => { clearTimeout(t); io.disconnect(); };
  }, []);

  return (
    <>
      <div className={`page-loader ${loaded ? "done" : ""}`} aria-hidden="true"><span className="loader-logo">LUMINARI<span className="fill">LUMINARI</span></span></div>
      <div className={`pinned ${show ? "show" : ""}`}>
        <Button href="#walkthrough" pinned>Request a walkthrough</Button>
      </div>
    </>
  );
}

/* ---------- Walkthrough form: disabled → loading → done ---------- */
const emailOk = (v: string) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v);

export function WalkthroughForm() {
  const [f, setF] = useState({ name: "", email: "", company: "", service: "" });
  const [emailTouched, setEmailTouched] = useState(false);
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const valid = Boolean(f.name.trim() && emailOk(f.email) && f.service);
  const emailBad = emailTouched && f.email !== "" && !emailOk(f.email);
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setF({ ...f, [k]: e.target.value });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    setState("loading");
    const body = encodeURIComponent(`Name: ${f.name}\nCompany: ${f.company || "-"}\nService: ${f.service}\nEmail: ${f.email}`);
    setTimeout(() => {
      window.location.href = `mailto:Admin@luminaricleaning.com?subject=${encodeURIComponent("Walkthrough request")}&body=${body}`;
      setState("done");
    }, 500);
  };

  return (
    <form id="walkthrough" className="form" onSubmit={submit} noValidate>
      <div className="field"><label htmlFor="w-name">Your name</label><input id="w-name" autoComplete="name" value={f.name} onChange={set("name")} required /></div>
      <div className={`field ${emailBad ? "error" : ""}`}>
        <label htmlFor="w-email">Work email</label>
        <input id="w-email" type="email" autoComplete="email" value={f.email} onChange={set("email")} onBlur={() => setEmailTouched(true)} aria-invalid={emailBad} aria-describedby="w-email-hint" required />
        <span id="w-email-hint" className="hint" hidden={!emailBad}>Enter a complete email address.</span>
      </div>
      <div className="field"><label htmlFor="w-co">Company (optional)</label><input id="w-co" autoComplete="organization" value={f.company} onChange={set("company")} /></div>
      <div className="field">
        <label htmlFor="w-svc">Service</label>
        <select id="w-svc" value={f.service} onChange={set("service")} required>
          <option value="">Select a service</option>
          {services.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>
      <div className="field full">
        {state === "done" ? (
          <p className="notice" role="status"><Check className="lucide" strokeWidth={1.75} /> Your email app should open with the request ready. Nothing is sent until you press send.</p>
        ) : (
          <div className="cta-group">
            <Button type="submit" state={state} disabledMessage={valid ? undefined : "Add your name, a complete work email and a service to continue."}>Request a walkthrough</Button>
          </div>
        )}
      </div>
    </form>
  );
}
