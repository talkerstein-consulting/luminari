import type { Metadata } from "next";
import { Jost, Libre_Caslon_Display, Manrope } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { SmoothScroll } from "@/components/lum/smooth-scroll";

const caslon = Libre_Caslon_Display({ variable: "--font-caslon", weight: "400", subsets: ["latin"] });
// Jost is for the wordmark only — the brand lockup is geometric sans
const jost = Jost({ variable: "--font-jost", weight: ["400", "500"], subsets: ["latin"] });
const manrope = Manrope({ variable: "--font-manrope", weight: ["400", "500", "600", "700"], subsets: ["latin"] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://luminaricleaning.ca";
const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
const validGtmId = gtmId && /^GTM-[A-Z0-9]+$/.test(gtmId) ? gtmId : undefined;
const title = "Luminari Cleaning | Commercial janitorial in Toronto & Vaughan";
const description = "Recurring commercial janitorial in Toronto and Vaughan. A familiar team, clear communication, and a workplace ready for your day.";

// The share image (opengraph-image.jpg / twitter-image.jpg) is the opening hero room, and icon.svg / apple-icon.png are the brand mark.
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: "Luminari Cleaning",
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION },
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: "Luminari Cleaning", locale: "en_CA", url: "/", title, description },
  twitter: { card: "summary_large_image", title, description },
};

// The intro plays once per session; this runs before paint so repeat views never flash it.
const introScript = `try{var s=sessionStorage;if(s.getItem('lum-intro')||matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('no-intro')}s.setItem('lum-intro','1')}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${caslon.variable} ${manrope.variable} ${jost.variable}`} suppressHydrationWarning>
      <body>
        {validGtmId && <noscript><iframe src={`https://www.googletagmanager.com/ns.html?id=${validGtmId}`} height="0" width="0" style={{ display: "none", visibility: "hidden" }} title="Google Tag Manager" /></noscript>}
        <SmoothScroll />
        {children}
        <Script id="lum-intro" strategy="beforeInteractive">{introScript}</Script>
        {validGtmId && <Script id="google-tag-manager" strategy="afterInteractive">{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s);j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${validGtmId}');`}</Script>}
      </body>
    </html>
  );
}
