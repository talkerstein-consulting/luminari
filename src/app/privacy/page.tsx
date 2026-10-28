import type { Metadata } from "next";
import { LegalPage } from "@/components/lum/legal-page";

export const metadata: Metadata = {
  title: "Privacy | Luminari Cleaning",
  description: "How Luminari Cleaning handles the information you share with us.",
  robots: { index: false },
};

export default function Privacy() {
  return (
    <LegalPage title="Privacy">
      <p className="lede">Our full privacy policy is being finalized and will be published here soon.</p>
      <p className="lede">In the meantime: we only use the details you send us, such as your name, contact information and notes about your space, to respond to your enquiry and prepare a quote. We do not sell your information.</p>
      <p className="lede">Our lead forms use Google reCAPTCHA to help prevent spam and abuse. Google processes interaction and device information for this purpose. The <a href="https://policies.google.com/privacy">Google Privacy Policy</a> and <a href="https://policies.google.com/terms">Terms of Service</a> apply.</p>
      <p className="lede">We use Google Analytics, managed through Google Tag Manager, to understand website visits and interactions. Google may use cookies and device identifiers to measure activity. Learn <a href="https://policies.google.com/technologies/partner-sites">how Google uses information from sites that use its services</a>. We do not send your enquiry details to Analytics.</p>
    </LegalPage>
  );
}
