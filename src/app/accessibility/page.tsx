import type { Metadata } from "next";
import { LegalPage } from "@/components/lum/legal-page";

export const metadata: Metadata = {
  title: "Accessibility | Luminari Cleaning",
  description: "Luminari Cleaning's commitment to an accessible website.",
  robots: { index: false },
};

export default function Accessibility() {
  return (
    <LegalPage title="Accessibility">
      <p className="lede">Our full accessibility statement is being finalized and will be published here soon.</p>
      <p className="lede">We want everyone to be able to use this website. If anything here is difficult to access, please let us know and we will help you get the information you need.</p>
    </LegalPage>
  );
}
