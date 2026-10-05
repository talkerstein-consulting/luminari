import type { Metadata } from "next";
import { Check } from "lucide-react";
import { Nav } from "./nav";
import { SiteFooter } from "./footer";
import { Cta } from "./cta";
import { Faq, Reveal } from "./interactive";
import { services } from "./services";

/* One service page. Each route under /services passes its own approved copy;
   this only lays it out on the site system and adds the structured data. */

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://luminaricleaning.com";
const AREA = "Serving Toronto, Vaughan and the Greater Toronto Area.";

type Block = { h: string; p: string[]; pairs?: { h: string; p: string }[] };

export type ServiceCopy = {
  slug: string;
  name: string;            // breadcrumb + schema name
  seoTitle: string;
  metaDescription: string;
  img: string; alt: string;
  eyebrow: string;
  h1: string;
  intro: string[];
  first: Block;
  whatTitle?: string;
  what: { h: string; p: string }[];
  second: Block;
  process: { h: string; p: string }[];
  third: Block;
  serve: string[];
  faqs: { q: string; a: string }[];
  cta: { h: string; p: string };
};

export function serviceMetadata(c: ServiceCopy): Metadata {
  const url = `/services/${c.slug}`;
  const images = [{ url: `/images/spaces/${c.img}.jpg`, alt: c.alt }];
  return {
    title: c.seoTitle, description: c.metaDescription,
    alternates: { canonical: url },
    openGraph: { type: "website", siteName: "Luminari Cleaning", locale: "en_CA", url, title: c.seoTitle, description: c.metaDescription, images },
    twitter: { card: "summary_large_image", title: c.seoTitle, description: c.metaDescription, images },
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

function Text({ b, id }: { b: Block; id: string }) {
  return (
    <>
      <h2 id={id} className="h2">{b.h}</h2>
      {b.p.map((t) => <p key={t} className="lede">{t}</p>)}
      {b.pairs && (
        <div className="sp-pairs">
          {b.pairs.map((x) => <div key={x.h}><h3 className="h3">{x.h}</h3><p className="body">{x.p}</p></div>)}
        </div>
      )}
    </>
  );
}

export function ServicePage({ c }: { c: ServiceCopy }) {
  const url = `${siteUrl}/services/${c.slug}`;
  const others = services.filter((s) => s.id !== c.slug);

  const ld = [
    {
      "@context": "https://schema.org", "@type": "Service", name: c.name, serviceType: c.name, url, description: c.metaDescription,
      image: `${siteUrl}/images/spaces/${c.img}.jpg`,
      areaServed: [{ "@type": "City", name: "Toronto" }, { "@type": "City", name: "Vaughan" }, { "@type": "AdministrativeArea", name: "Greater Toronto Area" }],
      provider: {
        "@type": "LocalBusiness", name: "Luminari Cleaning", url: siteUrl, telephone: "+1-848-285-7711", email: "Admin@luminaricleaning.com",
        address: { "@type": "PostalAddress", streetAddress: "4100 Chesswood Drive, Unit 200", addressLocality: "Toronto", addressRegion: "ON", addressCountry: "CA" },
      },
    },
    {
      "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Services", item: `${siteUrl}/services` },
        { "@type": "ListItem", position: 3, name: c.name, item: url },
      ],
    },
    {
      "@context": "https://schema.org", "@type": "FAQPage",
      mainEntity: c.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, "\\u003c") }} />
      <a className="skip" href="#main">Skip to content</a>
      <Nav base="/" />
      <main id="main">
        {/* hero */}
        <header className="report-hero dark svc-hero">
          <div className="wrap">
            <nav aria-label="Breadcrumb" className="crumbs">
              <ol>
                <li><a className="u" href="/">Home</a></li>
                <li><a className="u" href="/services">Services</a></li>
                <li aria-current="page">{c.name}</li>
              </ol>
            </nav>
            <Reveal className="report-hero-in">
              <span className="eyebrow">{c.eyebrow}</span>
              <h1 className="h1">{c.h1}</h1>
              {c.intro.map((t) => <p key={t} className="lede">{t}</p>)}
              <div className="actions">
                <Cta href="/#walkthrough">Request a Quote</Cta>
                <Cta href="tel:+18482857711" kind="secondary" label="Talk to us: +1 (848) 285-7711">Talk to Us</Cta>
              </div>
            </Reveal>
          </div>
        </header>

        {/* first section beside the photo */}
        <section className="section" aria-labelledby="s1-h">
          <div className="wrap split">
            <Reveal className="split-img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/images/spaces/${c.img}.jpg`} alt={c.alt} loading="lazy" />
            </Reveal>
            <Reveal className="head left sp-text"><Text b={c.first} id="s1-h" /></Reveal>
          </div>
        </section>

        {/* what we clean */}
        <section className="section tint" aria-labelledby="what-h">
          <div className="wrap">
            <Reveal className="head"><h2 id="what-h" className="h2">{c.whatTitle ?? "What We Clean"}</h2></Reveal>
            <ul className="svc sp-what">
              {c.what.map((x, i) => (
                <Reveal as="li" key={x.h} delay={(i % 3) * 90}>
                  <span className="num">{pad(i + 1)}</span>
                  <h3 className="h3">{x.h}</h3>
                  <p className="body">{x.p}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* second section + process */}
        <section className="section" aria-labelledby="s2-h">
          <div className="wrap">
            <Reveal className="head"><Text b={c.second} id="s2-h" /></Reveal>
            <ol className="steps sp-steps">
              {c.process.map((x, i) => (
                <Reveal as="li" key={x.h} delay={i * 90}>
                  <span className="step-num">{pad(i + 1)}</span>
                  <h3 className="h3">{x.h}</h3>
                  <p className="body">{x.p}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* third section + who we serve */}
        <section className="section dark" aria-labelledby="s3-h">
          <div className="wrap sp-split">
            <Reveal className="head left sp-text"><Text b={c.third} id="s3-h" /></Reveal>
            <Reveal className="sp-serve" delay={100}>
              <h2 className="eyebrow">Who We Serve</h2>
              <ul>{c.serve.map((x) => <li key={x}><Check strokeWidth={1.25} aria-hidden="true" />{x}</li>)}</ul>
              <p className="body">{AREA}</p>
            </Reveal>
          </div>
        </section>

        {/* FAQ */}
        <section className="section tint" aria-labelledby="faq-h">
          <div className="wrap faq-grid">
            <Reveal className="head left faq-intro">
              <h2 id="faq-h" className="h2">Questions, answered.</h2>
              <p className="lede">Anything else about {c.name.toLowerCase()}? Ask us directly.</p>
              <Cta href="tel:+18482857711" kind="secondary" label="Talk to us: +1 (848) 285-7711">Talk to Us</Cta>
            </Reveal>
            <Reveal delay={100}><Faq items={c.faqs} /></Reveal>
          </div>
        </section>

        {/* final CTA */}
        <section className="section dark" aria-labelledby="cta-h">
          <div className="wrap">
            <Reveal className="head">
              <h2 id="cta-h" className="h2">{c.cta.h}</h2>
              <p className="lede">{c.cta.p}</p>
              <Cta href="/#walkthrough">Request a Quote</Cta>
            </Reveal>
          </div>
        </section>

        {/* other services */}
        <section className="section" aria-labelledby="more-h">
          <div className="wrap">
            <Reveal as="h2" id="more-h" className="eyebrow sp-more-h">More services</Reveal>
            <ul className="sp-more">
              {others.map((s) => <li key={s.id}><a className="u" href={`/services/${s.id}`}>{s.title}</a></li>)}
            </ul>
          </div>
        </section>
      </main>
      <SiteFooter base="/" />
    </>
  );
}
