import type { Metadata } from "next";
import { LegalPage } from "@/components/lum/legal-page";

export const metadata: Metadata = {
  title: "Terms | Luminari Cleaning",
  description: "Terms of use for the Luminari Cleaning website.",
  robots: { index: false },
};

export default function Terms() {
  return (
    <LegalPage title="Terms">
      <p className="lede">Our full terms of use are being finalized and will be published here soon.</p>
      <p className="lede">Information on this website is provided for general purposes. Service scope, scheduling and pricing are confirmed in writing for each client after a walkthrough.</p>
    </LegalPage>
  );
}
