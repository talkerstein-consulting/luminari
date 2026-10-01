import type { Metadata } from "next";
import { Nav } from "@/components/lum/nav";
import { SiteFooter } from "@/components/lum/footer";
import { Cta } from "@/components/lum/cta";
import { Reveal } from "@/components/lum/interactive";

export const metadata: Metadata = {
  title: "The Clean Advantage | Luminari Cleaning",
  description: "How clean environments shape the way people feel, focus and work — and what that means for your workplace.",
};

/* The report. Kept to claims that hold up: two well-known studies are cited by name;
   everything else is plain, practical observation. Sources are listed at the end. */
const chapters = [
  {
    n: "01", t: "Clutter competes for attention.",
    p: [
      "The brain can only process so much of what it sees at once. Research from the Princeton Neuroscience Institute found that multiple objects in view compete for neural representation, so a busy, disordered field of view makes it harder to focus on the task in front of you.",
      "In a workplace, that competition is constant: the pile by the printer, the smudged glass, the full bin in the meeting room. None of it is dramatic. All of it takes a little attention that was meant for something else.",
    ],
  },
  {
    n: "02", t: "The air people breathe affects how they think.",
    p: [
      "Harvard’s COGfx study found that office workers scored markedly higher on decision-making tests in buildings with better ventilation and fewer volatile organic compounds than in conventional office conditions.",
      "Cleaning is part of that picture. Dust, residue and the products used to remove them all shape indoor air. A good program removes what builds up without adding harsh chemistry back in.",
    ],
  },
  {
    n: "03", t: "Shared surfaces are shared risk.",
    p: [
      "Door handles, light switches, kitchen taps, shared desks and phones are touched by everyone, many times a day. When they are cleaned on a schedule rather than when someone notices, there is less for a cold to travel on.",
      "Fewer sick days is the practical outcome that every manager notices — and the one that rarely gets credited to the cleaning team.",
    ],
  },
  {
    n: "04", t: "First impressions are made in the details.",
    p: [
      "Clients and candidates judge a business before anyone says hello. A clean entrance, clear glass and a washroom that is right every time say that the people here pay attention.",
      "The reverse is just as true. A single neglected detail can quietly undo the impression everything else was built to make.",
    ],
  },
  {
    n: "05", t: "Consistency is what makes it work.",
    p: [
      "A one-time deep clean resets a space. What keeps it there is a regular team that knows the space, a clear scope, a record of what was done, and someone who answers when something needs attention.",
      "That is the difference between a space that is cleaned and a space that is cared for.",
    ],
  },
];

const takeaways = [
  "A clear, orderly space leaves more attention for the work itself.",
  "Indoor air quality, including what cleaning removes and what it adds, affects how people think.",
  "High-touch surfaces need a schedule, not a reminder.",
  "Visitors read the details before they meet the people.",
  "Consistency, not intensity, is what keeps a space ready.",
];

export default function Report() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Nav base="/" />
      <main id="main" className="report">
        <header className="report-hero dark">
          <div className="wrap">
            <Reveal className="report-hero-in">
              <span className="eyebrow">The Luminari report</span>
              <h1 className="h1">The Clean<br /><em>Advantage.</em></h1>
              <p className="lede">How clean environments shape the way people feel, focus and work — and what that means for your workplace.</p>
              <p className="report-meta">5 chapters · About a 6 minute read</p>
            </Reveal>
          </div>
        </header>

        <section className="section">
          <div className="wrap report-body">
            <aside className="report-toc" aria-label="Chapters">
              <span className="eyebrow">Contents</span>
              <ol>{chapters.map((c) => <li key={c.n}><a className="u" href={`#ch-${c.n}`}><b>{c.n}</b> {c.t}</a></li>)}</ol>
            </aside>
            <div className="report-chapters">
              {chapters.map((c) => (
                <Reveal as="article" key={c.n} id={`ch-${c.n}`} className="report-ch">
                  <span className="report-n">{c.n}</span>
                  <h2 className="h2">{c.t}</h2>
                  {c.p.map((t) => <p key={t.slice(0, 24)} className="report-p">{t}</p>)}
                </Reveal>
              ))}

              <Reveal className="report-take">
                <span className="eyebrow">Key takeaways</span>
                <ul>{takeaways.map((t) => <li key={t}>{t}</li>)}</ul>
              </Reveal>

              <Reveal className="report-cta">
                <h2 className="h2">See how your space measures up.</h2>
                <p className="lede">Take the two-minute self-assessment, or request an assessment of your space from our team.</p>
                <div className="actions">
                  <Cta href="/#walkthrough">Request an assessment</Cta>
                  <Cta href="/#assessment" kind="secondary">Take the self-assessment</Cta>
                </div>
              </Reveal>

              <footer className="report-sources">
                <span className="eyebrow">Sources</span>
                <ol>
                  <li>McMains, S. &amp; Kastner, S. (2011). Interactions of top-down and bottom-up mechanisms in human visual cortex. <i>Journal of Neuroscience</i>, 31(2), 587–597. Princeton Neuroscience Institute.</li>
                  <li>Allen, J. G. et al. (2016). Associations of cognitive function scores with carbon dioxide, ventilation, and volatile organic compound exposures in office workers. <i>Environmental Health Perspectives</i>, 124(6), 805–812. Harvard T.H. Chan School of Public Health (COGfx).</li>
                </ol>
              </footer>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter base="/" />
    </>
  );
}
