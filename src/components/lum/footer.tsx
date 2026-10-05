import { FooterLogo } from "./footer-logo";
import { TcgBadge } from "./tcg-badge";

/* Shared footer. `base` prefixes the in-page links so they still reach the home page
   sections from other routes (e.g. "/" on /report). */
export function SiteFooter({ base = "" }: { base?: string }) {
  const cols = [
    { title: "Services", links: [
      ["All services", "/services"], ["Janitorial services", "/services#janitorial"], ["Office cleaning", "/services#office"],
      ["Restaurant cleaning", "/services#restaurant"], ["Residential contracts", "/services#residential"], ["Deep cleaning", "/services#deep"],
      ["Post-construction", "/services#post-construction"], ["Move-in & move-out", "/services#move"],
    ] },
    { title: "Company", links: [["Areas of specialty", "#spaces"], ["Our standards", "#standards"], ["Service areas", "#contact"], ["FAQs", "#faq-h"]] },
    { title: "Start", links: [["Request an assessment", "#walkthrough"], ["Read the report", "/report"], ["Take the self-assessment", "#assessment"]] },
  ].map((c) => ({ ...c, links: c.links.map(([l, h]) => [l, h.startsWith("#") ? base + h : h]) }));

  return (
    <footer className="footer">
      <div className="wrap">
        <address className="footer-contact">
          <span>4100 Chesswood Drive, Unit 200</span>
          <a className="u" href="tel:+18482857711">+1 (848) 285-7711</a>
          <a className="u" href="mailto:Admin@luminaricleaning.com">Admin@luminaricleaning.com</a>
        </address>
        <nav className="footer-cols" aria-label="Footer">
          {cols.map((c) => (
            <div key={c.title}>
              <h2 className="eyebrow">{c.title}</h2>
              <ul>{c.links.map(([label, href]) => <li key={label}><a className="u" href={href}>{label}</a></li>)}</ul>
            </div>
          ))}
        </nav>
        <div className="footer-legal">
          <p>Luminari Cleaning © 2026 · Toronto · Vaughan · Greater Toronto Area</p>
          <ul>
            <li><a className="u" href="/privacy">Privacy</a></li>
            <li><a className="u" href="/terms">Terms</a></li>
            <li><a className="u" href="/accessibility">Accessibility</a></li>
          </ul>
        </div>
      </div>
      <FooterLogo base={base} />
      <div className="credit"><TcgBadge tone="ink" /></div>
    </footer>
  );
}
