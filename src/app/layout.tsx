import type { Metadata } from "next";
import { Libre_Caslon_Display, Manrope } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { SmoothScroll } from "@/components/lum/smooth-scroll";

const caslon = Libre_Caslon_Display({ variable: "--font-caslon", weight: "400", subsets: ["latin"] });
const manrope = Manrope({ variable: "--font-manrope", weight: ["400", "500", "600", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Luminari Cleaning | Your workplace, consistently cared for.",
  description: "Recurring commercial janitorial in Toronto and Vaughan. A familiar team, clear communication, and a workplace ready for your day.",
};

// The intro plays once per session; this runs before paint so repeat views never flash it.
const introScript = `try{var s=sessionStorage;if(s.getItem('lum-intro')||matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('no-intro')}s.setItem('lum-intro','1')}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${caslon.variable} ${manrope.variable}`} suppressHydrationWarning>
      <body>
        <SmoothScroll />
        {children}
        <Script id="lum-intro" strategy="beforeInteractive">{introScript}</Script>
      </body>
    </html>
  );
}
