"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, Mail, Phone } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import StaggeredText from "@/components/staggered-text";

const faqs = [
  { question: "Can you clean outside business hours?", answer: "After-hours cleaning is available. We agree on timing and access arrangements during the walkthrough." },
  { question: "How do you price a cleaning program?", answer: "We review your space, scope, schedule, and staffing needs before preparing a tailored proposal. Supplies and consumables are clarified separately." },
  { question: "Will we have a regular team?", answer: "We aim to assign familiar staff to your location. Backup arrangements and site instructions are discussed as part of your setup." },
  { question: "Can you manage washroom supplies?", answer: "We can coordinate ordering and replenishment. Consumables are billed separately from the cleaning service." },
];

const channels = [
  { icon: Phone, label: "+1 (848) 285-7711", detail: "Call the office", href: "tel:+18482857711" },
  { icon: Mail, label: "Admin@luminaricleaning.com", detail: "Write to us any time", href: "mailto:Admin@luminaricleaning.com" },
];

const ic = { className: "lucide shrink-0", strokeWidth: 1.75, "aria-hidden": true } as const;

export default function FAQ6() {
  const reduce = useReducedMotion();
  const [openIndex, setOpenIndex] = useState(0);

  const container: Variants = { hidden: {}, show: { transition: { staggerChildren: reduce ? 0 : 0.08, delayChildren: 0.05 } } };
  // Slide only, no fade.
  const item: Variants = {
    hidden: { y: reduce ? 0 : 16 },
    show: { y: 0, transition: { duration: reduce ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section className="section tint" aria-labelledby="faq-h">
      <div className="container">
        <div className="grid grid-cols-1 gap-[var(--s-5)] lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-[var(--s-6)]">
          {/* Sticky intro column with contact channels */}
          <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} className="lg:sticky lg:top-[var(--s-7)] lg:self-start">
            <h2 id="faq-h" className="display-l">
              <StaggeredText as="span" text="Before we get started." segmentBy="words" direction="bottom" blur={false} delay={40} duration={0.7} />
            </h2>
            <motion.p variants={item} className="lede mt-[var(--s-3)]">
              The practical details facility and office managers ask before booking a walkthrough, answered by our team.
            </motion.p>
            <motion.ul variants={item} className="mt-[var(--s-5)] max-w-[448px] list-none border border-[var(--line)] p-0">
              {channels.map((c) => (
                <li key={c.label} className="border-b border-[var(--line)] last:border-b-0">
                  <a href={c.href} className="flex min-h-[44px] items-center gap-[var(--s-2)] bg-[var(--paper)] p-[var(--s-3)] no-underline transition-colors duration-300 hover:bg-[var(--white)]">
                    <span className="flex h-[var(--s-5)] w-[var(--s-5)] shrink-0 items-center justify-center border border-[var(--line)] bg-[var(--white)]">
                      <c.icon {...ic} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold text-[var(--ink)] [overflow-wrap:anywhere]">{c.label}</span>
                      <span className="block text-[length:var(--fs-sm)] text-[var(--muted)]">{c.detail}</span>
                    </span>
                    <ChevronRight {...ic} />
                  </a>
                </li>
              ))}
            </motion.ul>
            <motion.div variants={item} className="mt-[var(--s-2)]">
              <a className="textlink" href="#walkthrough">Ask us directly</a>
            </motion.div>
          </motion.div>

          {/* Numbered accordion: panels animate grid-template-rows via .acc-panel */}
          <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}>
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <motion.div key={faq.question} variants={item} className={`acc-item ${isOpen ? "open" : ""}`}>
                  <h3>
                    <button
                      type="button"
                      id={`faq6-btn-${index}`}
                      aria-expanded={isOpen}
                      aria-controls={`faq6-panel-${index}`}
                      onClick={() => setOpenIndex(isOpen ? -1 : index)}
                      className="acc-btn items-start justify-start gap-[var(--s-3)]"
                    >
                      <span className={`w-[var(--s-4)] shrink-0 font-[family-name:var(--display)] text-[length:var(--fs-h3)] font-normal leading-[1.2] transition-colors duration-300 ${isOpen ? "text-[var(--ink)]" : "text-[var(--muted)]"}`}>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1">{faq.question}</span>
                      <ChevronDown {...ic} />
                    </button>
                  </h3>
                  <div id={`faq6-panel-${index}`} role="region" aria-labelledby={`faq6-btn-${index}`} className="acc-panel">
                    <div><p className="body pl-[calc(var(--s-4)+var(--s-3))]">{faq.answer}</p></div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
