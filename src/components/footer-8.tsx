"use client";

import { motion, useReducedMotion } from "motion/react";
import { Mail, MapPin, Phone } from "lucide-react";

const cols = [
  {
    title: "Services",
    links: [
      { label: "Janitorial services", href: "#services" },
      { label: "Office cleaning", href: "#services" },
      { label: "School cleaning", href: "#services" },
      { label: "Restaurant cleaning", href: "#services" },
      { label: "Residential contracts", href: "#services" },
      { label: "Deep cleaning", href: "#services" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Areas of specialty", href: "#spaces" },
      { label: "Our standards", href: "#standards" },
      { label: "Service areas", href: "#contact" },
      { label: "FAQs", href: "#faq-h" },
    ],
  },
  {
    title: "Start",
    links: [{ label: "Request a walkthrough", href: "#walkthrough" }],
  },
];

const legal = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Accessibility", href: "/accessibility" },
];

const ic = { className: "lucide", strokeWidth: 1.75, "aria-hidden": true } as const;
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Footer8() {
  const reduce = useReducedMotion();
  // columns slide up into place (no fade), staggered like the original block
  const rise = (i: number) => ({
    initial: { y: reduce ? 0 : 16 },
    whileInView: { y: 0 },
    viewport: { once: true },
    transition: { duration: reduce ? 0 : 0.3, delay: reduce ? 0 : i * 0.05, ease: EASE },
  });

  return (
    <footer className="footer overflow-hidden">
      <div className="container">
        <div className="grid grid-cols-1 gap-[var(--s-5)] sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr] lg:gap-[var(--s-5)]">
          <motion.div {...rise(0)} className="flex flex-col gap-[var(--s-3)]">
            <a className="logo self-start" href="#top" aria-label="Luminari Cleaning, home"><b>LUMINARI</b><span>CLEANING</span></a>
            <address className="contact">
              <span className="inline-flex min-h-[44px] items-center gap-[var(--s-1)]"><MapPin {...ic} />4100 Chesswood Drive, Unit 200</span>
              <a href="tel:+18482857711"><Phone {...ic} />+1 (848) 285-7711</a>
              <a href="mailto:Admin@luminaricleaning.com"><Mail {...ic} />Admin@luminaricleaning.com</a>
            </address>
          </motion.div>

          {cols.map((c, i) => (
            <motion.nav key={c.title} {...rise(i + 1)} aria-labelledby={`f8-${c.title}`} className="lg:border-t lg:border-[var(--slate)] lg:pt-[var(--s-3)]">
              <h4 id={`f8-${c.title}`}>{c.title}</h4>
              <ul>
                {c.links.map((l) => <li key={l.label}><a href={l.href}>{l.label}</a></li>)}
              </ul>
            </motion.nav>
          ))}
        </div>

        {/* oversized outlined wordmark, fading out at the base */}
        <div
          aria-hidden="true"
          className="relative mt-[var(--s-6)] w-full select-none"
          style={{
            fontSize: "min(14.2vw, 210px)",
            height: "0.74em",
            maskImage: "linear-gradient(to bottom, #000 50%, transparent 95%)",
            WebkitMaskImage: "linear-gradient(to bottom, #000 50%, transparent 95%)",
          }}
        >
          <div
            className="absolute inset-0 flex justify-center whitespace-nowrap font-[family-name:var(--display)] uppercase leading-none text-[var(--ink)]"
            style={{ fontSize: "inherit", letterSpacing: "0.12em", paddingLeft: "0.12em", WebkitTextStroke: "1px var(--slate)" }}
          >
            Luminari
          </div>
        </div>

        <div className="legal">
          <p>Luminari Cleaning © 2026 · Toronto · Vaughan · Greater Toronto Area</p>
          <ul style={{ display: "flex", flexWrap: "wrap", columnGap: "var(--s-3)" }}>
            {legal.map((l) => <li key={l.label}><a href={l.href}>{l.label}</a></li>)}
          </ul>
        </div>
      </div>
    </footer>
  );
}
