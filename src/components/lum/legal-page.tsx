import type { ReactNode } from "react";
import Link from "next/link";
import { Nav } from "./nav";
import { SiteFooter } from "./footer";

/* Placeholder legal page. Copy is interim until the client supplies approved text. */
export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Nav base="/" />
      <main id="main">
        <header className="report-hero dark svc-hero">
          <div className="wrap">
            <div className="report-hero-in">
              <nav aria-label="Breadcrumb" className="crumbs">
                <ol>
                  <li><Link className="u" href="/">Home</Link></li>
                  <li aria-current="page">{title}</li>
                </ol>
              </nav>
              <h1 className="h1">{title}</h1>
            </div>
          </div>
        </header>
        <section className="section">
          <div className="wrap" style={{ maxWidth: "72ch", display: "grid", gap: "1.25rem" }}>
            {children}
            <p className="lede">
              Questions? <Link className="u" href="/#walkthrough">Get in touch with our team</Link>.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter base="/" />
    </>
  );
}
