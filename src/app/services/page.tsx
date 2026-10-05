import type { Metadata } from "next";
import { Nav } from "@/components/lum/nav";
import { SiteFooter } from "@/components/lum/footer";
import { Cta } from "@/components/lum/cta";
import { PinProgress, Reveal } from "@/components/lum/interactive";
import { services } from "@/components/lum/services";

export const metadata: Metadata = {
  title: "Cleaning services | Luminari Cleaning",
  description: "Recurring janitorial, office, restaurant and residential cleaning, deep cleaning, post-construction and moving cleans in Toronto and Vaughan.",
};

const pad = (n: number) => String(n).padStart(2, "0");

export default function Services() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Nav base="/" />
      <main id="main">
        <header className="report-hero dark">
          <div className="wrap">
            <Reveal className="report-hero-in">
              <span className="eyebrow">Luminari cleaning services</span>
              <h1 className="h1">Professional cleaning.<br /><em>For every chapter of your space.</em></h1>
              <p className="lede">Keep your workplace cared for day after day, or arrange a focused clean for a move, renovation or fresh start.</p>
              <Cta href="/#walkthrough">Request a Quote</Cta>
            </Reveal>
          </div>
        </header>

        <section id="services" className="tint-bg" aria-labelledby="services-h">
          <PinProgress className="svc-pin">
            <div className="wrap svc-pin-inner">
              <div className="head">
                <h2 id="services-h" className="h2">One less thing on your list.</h2>
                <p className="lede">A regular clean. A thorough reset. A fresh start. Choose the care your space needs.</p>
              </div>
              <ul className="svc">
                {services.map((s, i) => (
                  <li key={s.id} id={s.id} style={{ ["--i" as string]: i }}>
                    <span className="num">{pad(i + 1)}</span>
                    <span className="eyebrow">{s.tag}</span>
                    <h3 className="h3"><a className="svc-link" href={`/services/${s.id}`}>{s.title}</a></h3>
                    <p className="body">{s.body}</p>
                  </li>
                ))}
              </ul>
              <div className="svc-foot"><Cta href="/#walkthrough">Request a Quote</Cta></div>
            </div>
          </PinProgress>
        </section>

        <section className="section dark" aria-labelledby="cta-h">
          <div className="wrap">
            <Reveal className="head">
              <span className="eyebrow">Your space. Your schedule. A clear scope from day one.</span>
              <h2 id="cta-h" className="h2">Good mornings start the night before.</h2>
              <p className="lede">Tell us about your space. We’ll arrange a walkthrough and send a tailored scope and quote.</p>
              <Cta href="/#walkthrough">Request a Quote</Cta>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter base="/" />
    </>
  );
}
