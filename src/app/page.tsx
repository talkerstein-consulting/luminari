import { BadgeCheck, CalendarCheck, Mail, Phone, ShieldCheck, UserCheck } from "lucide-react";
import { Inspection } from "@/components/lum/inspection";
import { LogoMarquee, Opening } from "@/components/lum/reveal";
import { Assessment } from "@/components/lum/assessment";
import { SiteFooter } from "@/components/lum/footer";
import { Cta } from "@/components/lum/cta";
import { ServiceCards } from "@/components/lum/service-cards";
import { Nav } from "@/components/lum/nav";
import { Faq, Reveal, StickyStage, WalkthroughForm } from "@/components/lum/interactive";

const clients = [
  { src: "unger-law", alt: "Unger Law" },
  { src: "king-capital", alt: "King Capital Mortgage Investment Corporation" },
  { src: "studio-180", alt: "Studio 180 Design" },
  { src: "qmw", alt: "QMW Corp." },
  { src: "zucker", alt: "Zucker Jewish Academy Toronto" },
  { src: "inkas", alt: "INKAS" },
  { src: "mark-unger", alt: "Dr. Mark Unger" },
  { src: "ateret-torah", alt: "Ateret Torah Learning Center" },
  { src: "arikta", alt: "ARIKTA" },
];

const spaces = [
  { img: "restaurant-cafe", alt: "Restaurant with wooden tables, pendant lights and a café counter", tag: "01 · Hospitality", title: "Restaurants & cafés" },
  { img: "residential-living", alt: "Sunlit residential living room with a sofa and lounge chairs", tag: "02 · Residential", title: "Homes & apartments" },
  { img: "retail-store", alt: "Retail interior with clothing displays and clear floor space", tag: "03 · Commercial", title: "Commercial spaces" },
  { img: "classroom", alt: "Empty classroom with desks, chairs and a chalkboard", tag: "04 · Education", title: "Schools & learning" },
];

const proofs = [
  { icon: ShieldCheck, label: "$2M liability insurance" },
  { icon: BadgeCheck, label: "WSIB coverage" },
  { icon: UserCheck, label: "Owner-led oversight" },
  { icon: CalendarCheck, label: "Regular, familiar cleaners" },
];

const standards = [
  ["Familiar faces", "Your space, understood.", "A regular team that learns your layout, preferences, and the details that matter to your business."],
  ["Clear communication", "Someone who answers.", "A direct point of contact who coordinates the work and takes responsibility when something needs attention."],
  ["Consistent care", "A standard worth keeping.", "A tailored cleaning scope, owner oversight, and ongoing conversations about how your service is working."],
];

const steps = [
  ["Tell us about your space", "Share your facility, schedule, and what you’d like handled."],
  ["Walk through the details", "We review the areas, access, expectations, and current needs."],
  ["Agree on your program", "Receive a tailored scope and quote, with inclusions made clear."],
  ["Settle into a better routine", "Your team gets to know the space, with ongoing communication."],
];

const faqs = [
  { q: "Can you clean outside business hours?", a: "After-hours cleaning is available. We agree on timing and access arrangements during the walkthrough." },
  { q: "How do you price a cleaning program?", a: "We review your space, scope, schedule, and staffing needs before preparing a tailored proposal. Supplies and consumables are clarified separately." },
  { q: "Will we have a regular team?", a: "We aim to assign familiar staff to your location. Backup arrangements and site instructions are discussed as part of your setup." },
  { q: "Can you manage washroom supplies?", a: "We can coordinate ordering and replenishment. Consumables are billed separately from the cleaning service." },
];

const pad = (n: number) => String(n).padStart(2, "0");
const ic = { strokeWidth: 1.25, "aria-hidden": true } as const;

function Head({ id, title, lede, children }: { id: string; title: string; lede?: string; children?: React.ReactNode }) {
  return (
    <Reveal className="head">
      <h2 id={id} className="h2">{title}</h2>
      {children}
      {lede && <p className="lede">{lede}</p>}
    </Reveal>
  );
}

export default function Home() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>

      {/* the original site's scroll opening sits above the header */}
      <Opening />

      <Nav />

      <main id="main">
        {/* TRUSTED BY */}
        <section className="clients" id="website" tabIndex={-1} aria-labelledby="clients-h">
          <div className="wrap">
            <Reveal as="h2" id="clients-h" className="eyebrow">Trusted by.</Reveal>
            <Reveal delay={100}><LogoMarquee logos={clients} /></Reveal>
          </div>
        </section>

        {/* SPACES */}
        <section id="spaces" className="section" aria-labelledby="spaces-h">
          <div className="wrap">
            <Head id="spaces-h" title="Work. Gather. Live." lede="Different spaces deserve different routines. Explore cleaning for the places you work, welcome people, and call home.">
              <p className="subhead">We’ll take care of the clean.</p>
            </Head>
            <ul className="spaces">
              {spaces.map((s, i) => (
                <Reveal as="li" key={s.img} delay={i * 90}>
                  <a href="/services">
                    <figure>
                      <div className="img">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={`/images/spaces/${s.img}.jpg`} alt={s.alt} loading="lazy" />
                      </div>
                      <figcaption>
                        <span className="eyebrow">{s.tag}</span>
                        <span className="h3">{s.title}</span>
                      </figcaption>
                    </figure>
                  </a>
                </Reveal>
              ))}
            </ul>
            <Reveal as="ul" className="proofs" aria-label="Credentials">
              {proofs.map(({ icon: Icon, label }) => <li key={label}><Icon {...ic} />{label}</li>)}
            </Reveal>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="section tint" aria-labelledby="services-h">
          <div className="wrap">
            <Head id="services-h" title="One less thing on your list." lede="A regular clean. A thorough reset. A fresh start. Choose the care your space needs." />
            <ServiceCards />
            <Reveal className="spaces-foot"><Cta href="/services">View all services</Cta></Reveal>
          </div>
        </section>

        {/* STANDARDS */}
        <section id="standards" className="section" aria-labelledby="standards-h">
          <div className="wrap split">
            <Reveal className="split-img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/spaces/professional-office.jpg" alt="Light-filled office workbench beside tall windows" loading="lazy" />
            </Reveal>
            <div>
              <Reveal className="head left">
                <h2 id="standards-h" className="h2">Clean desks. Clear expectations.</h2>
                <p className="lede">The reminders. The missed corners. The same conversation, again. Your cleaning arrangement should take work off your plate.</p>
              </Reveal>
              <ul className="pillars">
                {standards.map(([tag, title, body], i) => (
                  <Reveal as="li" key={tag} delay={i * 90}>
                    <span className="eyebrow">{tag}</span>
                    <h3 className="h3">{title}</h3>
                    <p className="body">{body}</p>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* SELF-ASSESSMENT (lead capture) */}
        <section id="assessment" className="section tint" aria-labelledby="asmt-h">
          <div className="wrap">
            <Head id="asmt-h" title="Is your current cleaning company actually doing a good job?" lede="Eight honest questions about the service you have today. Your score, and where it falls short." />
            <Reveal className="asmt-wrap" delay={100}><Assessment /></Reveal>
          </div>
        </section>

        {/* FINAL INSPECTION */}
        <section className="section dark" aria-labelledby="insp-h">
          <div className="wrap">
            <Head id="insp-h" title="The last look makes the difference." lede="Six details. One room. See what you notice." />
            <Reveal><Inspection /></Reveal>
          </div>
        </section>

        {/* OWNER */}
        <section id="people" className="tint-bg" aria-labelledby="people-h">
          <StickyStage id="people-h" title="A name you know. Someone you can reach.">
            <article className="owner" aria-label="Betzalel Zrihen, Owner">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="avatar" src="/images/owner.jpg" alt="Betzalel Zrihen, owner of Luminari Cleaning" width={480} height={480} loading="lazy" />
              <h3 className="owner-name">Betzalel Zrihen</h3>
              <span className="eyebrow">Owner, Luminari Cleaning</span>
              <p className="quote">Good service starts with taking responsibility.</p>
              <p className="body">Betzalel coordinates client communication, checks in on the work, and stays involved when something needs attention. Behind every clean is a team learning your space, following your agreed scope, and keeping the details in view.</p>
              <p className="eyebrow cite">Toronto <span aria-hidden="true">·</span> Vaughan <span aria-hidden="true">·</span> Greater Toronto Area</p>
              <Cta href="#walkthrough">Talk to Betzalel</Cta>
            </article>
          </StickyStage>
        </section>

        {/* PROCESS */}
        <section className="section" aria-labelledby="proc-h">
          <div className="wrap">
            <Head id="proc-h" title="A clear start. A better routine." />
            <ol className="steps">
              {steps.map(([title, body], i) => (
                <Reveal as="li" key={title} delay={i * 90}>
                  <span className="step-num">{pad(i + 1)}</span>
                  <h3 className="h3">{title}</h3>
                  <p className="body">{body}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* FAQ */}
        <section className="section tint" aria-labelledby="faq-h">
          <div className="wrap faq-grid">
            <Reveal className="head left faq-intro">
              <h2 id="faq-h" className="h2">Before we get started.</h2>
              <p className="lede">The practical details facility and office managers ask before booking a walkthrough, answered by our team.</p>
              <ul className="channels">
                <li><a href="tel:+18482857711"><Phone {...ic} /><span><b>+1 (848) 285-7711</b>Call the office</span></a></li>
                <li><a href="mailto:Admin@luminaricleaning.com"><Mail {...ic} /><span><b>Admin@luminaricleaning.com</b>Write to us any time</span></a></li>
              </ul>
              <Cta href="#walkthrough" kind="secondary">Ask us directly</Cta>
            </Reveal>
            <Reveal delay={100}><Faq items={faqs} /></Reveal>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="section dark contact" aria-labelledby="cta-h">
          <div className="wrap">
            <Head id="cta-h" title="Good mornings start the night before." lede="Tell us about your space. We’ll arrange a walkthrough and send a tailored scope and quote." />
            <Reveal className="form-wrap" delay={100}><WalkthroughForm /></Reveal>
            <div className="direct">
              <span className="eyebrow">Or reach us directly</span>
              <p>
                <a className="u" href="tel:+18482857711">+1 (848) 285-7711</a>
                <a className="u" href="mailto:Admin@luminaricleaning.com">Admin@luminaricleaning.com</a>
              </p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
