import { Logo } from "./logo";
import { TcgBadge } from "./tcg-badge";
import { FooterTabs } from "./interactive";

/* Shared footer. `base` prefixes the in-page links so they still reach the home page
   sections from other routes (e.g. "/" on /report). */
export function SiteFooter({ base = "" }: { base?: string }) {
  const cols = [
    { title: "Services", links: [
      ["Janitorial services", "#services"], ["Office cleaning", "#services"], ["School cleaning", "#services"],
      ["Restaurant cleaning", "#services"], ["Residential contracts", "#services"], ["Deep cleaning", "#services"],
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
        <FooterTabs cols={cols} />
        <div className="footer-legal">
          <p>Luminari Cleaning © 2026 · Toronto · Vaughan · Greater Toronto Area</p>
          <ul>
            <li><a className="u" href="/privacy">Privacy</a></li>
            <li><a className="u" href="/terms">Terms</a></li>
            <li><a className="u" href="/accessibility">Accessibility</a></li>
          </ul>
        </div>
      </div>
      <a className="footer-logo" href={base || "#"} aria-label="Luminari Cleaning, home"><Logo /></a>
      <div className="credit"><TcgBadge tone="ink" /></div>
    </footer>
  );
}
