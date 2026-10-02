"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import { Check, ChevronDown } from "lucide-react";
import { Tumble } from "./cta";

/* ---------- Reveal: rises into place once, the first time it enters view ---------- */
export function Reveal({ as: Tag = "div", className = "", delay = 0, children, ...rest }: {
  as?: ElementType; className?: string; delay?: number; children: ReactNode; [k: string]: unknown;
}) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); io.disconnect(); }
    }, { rootMargin: "0px 0px -8% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const Comp = Tag as "div"; // any tag; typed as div so ref/props check
  return (
    <Comp ref={ref as React.RefObject<HTMLDivElement>} className={`rv ${inView ? "in" : ""} ${className}`} style={{ ["--d" as string]: `${delay}ms` }} {...rest}>
      {children}
    </Comp>
  );
}

/* ---------- FAQ accordion ---------- */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="faq">
      {items.map((it, i) => {
        const on = open === i;
        return (
          <div key={it.q} className={`faq-item ${on ? "open" : ""}`}>
            <h3>
              <button type="button" id={`faq-b${i}`} aria-expanded={on} aria-controls={`faq-p${i}`} onClick={() => setOpen(on ? -1 : i)}>
                <span>{it.q}</span><i aria-hidden="true" />
              </button>
            </h3>
            <div id={`faq-p${i}`} role="region" aria-labelledby={`faq-b${i}`} className="faq-panel">
              <div><p>{it.a}</p></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ---------- Walkthrough form: opens a ready-to-send email ---------- */
const services = [
  "Recurring janitorial", "Office cleaning", "Restaurant cleaning", "Residential contracts",
  "Deep cleaning", "Post-construction cleaning", "Move-in & move-out cleaning", "School cleaning",
];
const emailOk = (v: string) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v);

export function WalkthroughForm() {
  const [f, setF] = useState({ name: "", email: "", company: "", service: "" });
  const [tried, setTried] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const blur = (k: string) => () => setTouched((t) => ({ ...t, [k]: true }));
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setF({ ...f, [k]: e.target.value });
  const bad = { name: !f.name.trim(), email: !emailOk(f.email), service: !f.service };
  const valid = !bad.name && !bad.email && !bad.service;

  // Send through the site first; if that isn't configured or fails, open a ready-made email.
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTried(true);
    if (!valid || sending) return;
    setSending(true);
    const r = await fetch("/api/walkthrough", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(f) }).catch(() => null);
    setSending(false);
    if (r?.ok) { setDone(true); return; }
    const body = encodeURIComponent(`Name: ${f.name}\nCompany: ${f.company || "-"}\nService: ${f.service}\nEmail: ${f.email}`);
    window.location.href = `mailto:Admin@luminaricleaning.com?subject=${encodeURIComponent("Walkthrough request")}&body=${body}`;
    setDone(true);
  };

  if (done) {
    return (
      <p className="form-done" role="status">
        <Check strokeWidth={1.5} aria-hidden="true" />
        Your email app should open with the request ready. Nothing is sent until you press send.
      </p>
    );
  }

  const err = (k: keyof typeof bad) => (tried || touched[k]) && bad[k];
  return (
    <form id="walkthrough" className="form" onSubmit={submit} noValidate>
      <label className={`field ${err("name") ? "err" : ""}`}>
        <span>Your name</span>
        <input autoComplete="name" value={f.name} onChange={set("name")} onBlur={blur("name")} aria-invalid={err("name") || undefined} required />
      </label>
      <label className={`field ${err("email") ? "err" : ""}`}>
        <span>Work email</span>
        <input type="email" autoComplete="email" value={f.email} onChange={set("email")} onBlur={blur("email")} aria-invalid={err("email") || undefined} aria-describedby="w-email-hint" required />
        <em id="w-email-hint" className="hint" hidden={!((tried || touched.email) && f.email !== "" && bad.email)}>Enter a complete email address.</em>
      </label>
      <label className="field">
        <span>Company <em>(optional)</em></span>
        <input autoComplete="organization" value={f.company} onChange={set("company")} />
      </label>
      <div className={`field ${err("service") ? "err" : ""}`}>
        <span id="w-svc-label">Service</span>
        <Dropdown labelId="w-svc-label" placeholder="Select a service" options={services} value={f.service}
          onChange={(v) => setF({ ...f, service: v })} onClose={blur("service")} />
      </div>
      <div className="form-foot">
        <button type="submit" className={`cta cta-main ${sending ? "is-busy" : ""}`} aria-label="Request an assessment" aria-busy={sending || undefined} disabled={sending}><Tumble>Request an assessment</Tumble></button>
        <p className="form-msg" role="alert">{tried && !valid ? "Add your name, a complete work email and a service to continue." : ""}</p>
      </div>
    </form>
  );
}

/* ---------- Sticky stage: heading rises to centre, lifts out, the card rises in ----------
   The section is tall; its inner stage sticks for the length of the scroll, and --p (0→1)
   is how far through the section the reader is. CSS maps --p to each beat. */
export function StickyStage({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const travel = r.height - window.innerHeight;
      const p = travel > 0 ? Math.min(1, Math.max(0, -r.top / travel)) : 1;
      el.style.setProperty("--p", p.toFixed(4));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);
  return (
    <div ref={ref} className="stage">
      <div className="stage-pin">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="stage-bg" src="/images/spaces/collaborative-office.jpg" alt="" aria-hidden="true" loading="lazy" />
        <h2 id={id} className="h2 stage-title">{title}</h2>
        <div className="stage-card">{children}</div>
      </div>
    </div>
  );
}

/* ---------- PinProgress: sets --p (0→1) as the reader scrolls through this element ---------- */
export function PinProgress({ className = "", children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const travel = r.height - window.innerHeight;
      el.style.setProperty("--p", (travel > 0 ? Math.min(1, Math.max(0, -r.top / travel)) : 1).toFixed(4));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);
  return <div ref={ref} className={className}>{children}</div>;
}

/* ---------- Dropdown: the branded replacement for <select> ----------
   A button that opens a listbox panel. Keyboard: Enter/Space/↓ opens, ↑↓ move,
   Home/End jump, a letter jumps to the next option starting with it, Enter picks,
   Escape or Tab closes. Clicking outside closes. */
function Dropdown({ labelId, placeholder, options, value, onChange, onClose }: {
  labelId: string; placeholder: string; options: string[]; value: string;
  onChange: (v: string) => void; onClose?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [hi, setHi] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const btn = useRef<HTMLButtonElement>(null);
  const list = useRef<HTMLUListElement>(null);

  const show = (at = Math.max(0, options.indexOf(value))) => { setHi(at); setOpen(true); };
  const hide = (refocus = true) => { setOpen(false); onClose?.(); if (refocus) btn.current?.focus(); };
  const pick = (i: number) => { onChange(options[i]); hide(); };

  useEffect(() => {
    if (!open) return;
    list.current?.focus();
    const out = (e: PointerEvent) => { if (!root.current?.contains(e.target as Node)) hide(false); };
    document.addEventListener("pointerdown", out);
    return () => document.removeEventListener("pointerdown", out);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // keep the highlighted option in view
  useEffect(() => { if (open) list.current?.children[hi]?.scrollIntoView({ block: "nearest" }); }, [hi, open]);

  const onListKey = (e: React.KeyboardEvent) => {
    const last = options.length - 1;
    const moves: Record<string, number> = { ArrowDown: Math.min(last, hi + 1), ArrowUp: Math.max(0, hi - 1), Home: 0, End: last };
    if (e.key in moves) { e.preventDefault(); setHi(moves[e.key]); return; }
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pick(hi); return; }
    if (e.key === "Escape") { e.preventDefault(); hide(); return; }
    if (e.key === "Tab") { hide(false); return; }
    if (e.key.length === 1) {
      const k = e.key.toLowerCase();
      const next = options.findIndex((o, i) => i > hi && o.toLowerCase().startsWith(k));
      const wrap = options.findIndex((o) => o.toLowerCase().startsWith(k));
      if (next >= 0 || wrap >= 0) setHi(next >= 0 ? next : wrap);
    }
  };

  return (
    <div ref={root} className={`dd ${open ? "open" : ""}`}>
      <button ref={btn} type="button" className={`dd-btn ${value ? "" : "empty"}`} aria-haspopup="listbox" aria-expanded={open}
        aria-labelledby={`${labelId} w-svc-value`}
        onClick={() => (open ? hide() : show())}
        onKeyDown={(e) => { if (["ArrowDown", "ArrowUp"].includes(e.key)) { e.preventDefault(); show(); } }}>
        <span id="w-svc-value">{value || placeholder}</span>
        <ChevronDown strokeWidth={1.5} aria-hidden="true" />
      </button>
      <ul ref={list} className="dd-list" role="listbox" aria-labelledby={labelId} tabIndex={-1} hidden={!open}
        aria-activedescendant={open ? `dd-opt-${hi}` : undefined} onKeyDown={onListKey}>
        {options.map((o, i) => (
          <li key={o} id={`dd-opt-${i}`} role="option" aria-selected={o === value}
            className={`${i === hi ? "hi" : ""} ${o === value ? "sel" : ""}`}
            onPointerEnter={() => setHi(i)} onClick={() => pick(i)}>
            <span>{o}</span>{o === value && <Check strokeWidth={1.5} aria-hidden="true" />}
          </li>
        ))}
      </ul>
    </div>
  );
}
