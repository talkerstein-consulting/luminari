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
    </LegalPage>
  );
}
