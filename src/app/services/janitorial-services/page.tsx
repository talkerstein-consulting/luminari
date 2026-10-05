import { ServicePage, serviceMetadata, type ServiceCopy } from "@/components/lum/service-page";

/* Janitorial Services: approved copy. Edit the wording here; the layout lives in ServicePage. */
const copy: ServiceCopy = {
  "slug": "janitorial-services",
  "name": "Janitorial Services",
  "seoTitle": "Janitorial Services in Toronto | Luminari Cleaning",
  "metaDescription": "Reliable recurring janitorial services for businesses across Toronto, Vaughan and the GTA. Flexible cleaning schedules built around your space.",
  "img": "collaborative-office",
  "alt": "Shared office lounge, kitchenette and corridor",
  "eyebrow": "Janitorial Services",
  "h1": "Janitorial Services That Keep Your Space Ready",
  "intro": [
    "A clean space needs more than a one-time visit. Luminari provides reliable recurring janitorial services for businesses across Toronto, Vaughan and the GTA.",
    "We build cleaning schedules around your space, your hours and the level of service you need."
  ],
  "first": {
    "h": "Cleaning That Fits the Way You Work",
    "p": [
      "Every space gets used differently. Your cleaning plan should reflect that.",
      "We work with you to establish a practical schedule and scope, from regular upkeep to the areas that need extra attention."
    ]
  },
  "what": [
    {
      "h": "Common Areas",
      "p": "Keep shared spaces clean, presentable and ready for the people who use them."
    },
    {
      "h": "Workspaces",
      "p": "Regular cleaning for offices, work areas and employee spaces."
    },
    {
      "h": "Washrooms",
      "p": "Routine cleaning and upkeep for washrooms and high-touch areas."
    },
    {
      "h": "Kitchens & Break Rooms",
      "p": "Keep shared kitchens, lunchrooms and staff areas fresh and usable."
    },
    {
      "h": "Floors & Entryways",
      "p": "Cleaning for the areas that see the most traffic."
    },
    {
      "h": "High-Touch Surfaces",
      "p": "Regular attention to surfaces people interact with throughout the day."
    }
  ],
  "second": {
    "h": "A Schedule That Works for You",
    "p": [
      "Cleaning shouldn't get in the way of business.",
      "We can work around your operating hours and establish a schedule that makes sense for your space. Daily, weekly or another recurring arrangement, we build the service around what you actually need."
    ]
  },
  "process": [
    {
      "h": "Walkthrough",
      "p": "We learn about your space, priorities and schedule."
    },
    {
      "h": "Build the Plan",
      "p": "We establish the areas, frequency and scope of your cleaning service."
    },
    {
      "h": "Keep It Clean",
      "p": "Our team follows the agreed schedule and keeps your space ready for the people who use it."
    }
  ],
  "third": {
    "h": "Built for Consistency",
    "p": [
      "Recurring cleaning is about keeping things under control before they become a problem.",
      "Luminari focuses on clear expectations, consistent service and straightforward communication, so you know what is being cleaned and when."
    ]
  },
  "serve": [
    "Offices",
    "Commercial spaces",
    "Professional businesses",
    "Retail spaces",
    "Shared workspaces",
    "Other recurring commercial environments"
  ],
  "faqs": [
    {
      "q": "How often should janitorial services be scheduled?",
      "a": "It depends on your space, traffic and operating hours. We can build a daily, weekly or custom recurring schedule around your needs."
    },
    {
      "q": "Can cleaning be done outside business hours?",
      "a": "Yes. Scheduling can be arranged around your operating hours where appropriate."
    },
    {
      "q": "Do you provide recurring janitorial services?",
      "a": "Yes. Recurring service is one of our core offerings."
    },
    {
      "q": "Can the cleaning scope be customized?",
      "a": "Yes. We establish the areas and priorities based on your space and requirements."
    },
    {
      "q": "Do you service businesses outside Toronto?",
      "a": "Luminari serves Toronto, Vaughan and the Greater Toronto Area."
    }
  ],
  "cta": {
    "h": "Keep Your Space Ready.",
    "p": "Tell us about your space, your schedule and what you need cleaned."
  }
};

export const metadata = serviceMetadata(copy);

export default function Page() {
  return <ServicePage c={copy} />;
}
