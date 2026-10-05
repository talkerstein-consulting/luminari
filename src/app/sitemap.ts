import type { MetadataRoute } from "next";
import { services } from "@/components/lum/services";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://luminaricleaning.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/services`, changeFrequency: "monthly", priority: 0.9 },
    ...services.map((s) => ({ url: `${siteUrl}/services/${s.id}`, changeFrequency: "monthly" as const, priority: 0.8 })),
    { url: `${siteUrl}/report`, changeFrequency: "yearly", priority: 0.5 },
  ];
}
