"use client";

import { motion, useReducedMotion } from "motion/react";
import { Mail, Phone } from "lucide-react";
import StaggeredText from "@/components/staggered-text";
import { WalkthroughForm } from "@/components/site/ui";

const ic = { className: "lucide", strokeWidth: 1.75, "aria-hidden": true } as const;

export default function Cta10() {
  const reduce = useReducedMotion();
  return (
    <section id="contact" className="section dark" aria-labelledby="cta-h">
      <div className="container">
        {/* Split card from the block: 5fr panel + 7fr content. Slides up, no scale. */}
        <motion.div
          initial={{ y: reduce ? 0 : 24 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reduce ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="grid w-full grid-cols-1 border border-[var(--slate)] p-[var(--s-1)] md:grid-cols-[5fr_7fr]"
        >
          {/* Left panel: typography in place of the photo */}
          <div className="on-dark flex flex-col justify-between gap-[var(--s-5)] bg-[var(--slate)] p-[var(--s-4)]">
            <span className="monogram" aria-hidden="true">BZ</span>
            <div className="contact">
              <span className="eyebrow">Or reach us directly</span>
              <a className="focus-visible:outline-[var(--cream)]" href="tel:+18482857711"><Phone {...ic} />+1 (848) 285-7711</a>
              <a className="focus-visible:outline-[var(--cream)] [overflow-wrap:anywhere]" href="mailto:Admin@luminaricleaning.com"><Mail {...ic} />Admin@luminaricleaning.com</a>
            </div>
          </div>

          <div className="flex flex-col justify-center p-[var(--s-3)] sm:p-[var(--s-5)]">
            <div className="head-block">
              <h2 id="cta-h" className="display-l">
                <StaggeredText as="span" text="Good mornings start the night before." segmentBy="words" direction="bottom" blur={false} delay={40} duration={0.7} />
              </h2>
              <p className="lede">Tell us about your space. We’ll arrange a walkthrough and send a tailored scope and quote.</p>
            </div>
            <WalkthroughForm />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
