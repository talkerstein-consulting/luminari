import { ServicePage, serviceMetadata, type ServiceCopy } from "@/components/lum/service-page";

/* Residential Cleaning: approved copy. Edit the wording here; the layout lives in ServicePage. */
const copy: ServiceCopy = {
  "slug": "residential-cleaning",
  "name": "Residential Cleaning",
  "seoTitle": "Residential Cleaning Services in Toronto | Luminari Cleaning",
  "metaDescription": "Reliable residential cleaning services in Toronto, Vaughan and the GTA. Recurring and tailored cleaning for homes, apartments and living spaces.",
  "img": "residential-living",
  "alt": "Sunlit residential living room with a sofa and lounge chairs",
  "eyebrow": "Residential Cleaning",
  "h1": "A Cleaner Home, Without Adding It to Your List",
  "intro": [
    "There is enough to keep up with at home.",
    "Luminari provides residential cleaning across Toronto, Vaughan and the GTA, with recurring service built around your home, your routine and the level of cleaning you need."
  ],
  "first": {
    "h": "More Time for the Things That Matter",
    "p": [
      "A regular cleaning service helps keep everyday mess from becoming a weekend project.",
      "We can create a recurring cleaning schedule around your home and the way you live in it."
    ]
  },
  "what": [
    {
      "h": "Living Areas",
      "p": "Regular cleaning for the spaces where you spend your time."
    },
    {
      "h": "Kitchens",
      "p": "Cleaning for counters, surfaces and everyday kitchen areas."
    },
    {
      "h": "Bathrooms",
      "p": "Routine cleaning and upkeep for bathrooms and high-touch areas."
    },
    {
      "h": "Bedrooms",
      "p": "Cleaning for bedrooms and frequently used surfaces."
    },
    {
      "h": "Floors",
      "p": "Regular floor cleaning throughout the home."
    },
    {
      "h": "Common Areas",
      "p": "Keep hallways, entryways and shared spaces maintained."
    }
  ],
  "second": {
    "h": "Cleaning That Fits Your Routine",
    "p": [
      "Every home is different.",
      "Some homes need weekly attention. Others need service less often. We work with you to establish a practical schedule based on your space and routine."
    ]
  },
  "process": [
    {
      "h": "Tell Us About Your Home",
      "p": "We learn about the space, your priorities and what you need help with."
    },
    {
      "h": "Build the Plan",
      "p": "We establish the areas and frequency that make sense for your home."
    },
    {
      "h": "Enjoy a Cleaner Home",
      "p": "Our team follows the agreed scope and schedule."
    }
  ],
  "third": {
    "h": "Recurring or One-Time",
    "p": [
      "Need regular upkeep? We can build a recurring schedule.",
      "Need a deeper reset? We can also discuss a one-time cleaning service based on your needs."
    ]
  },
  "serve": [
    "Homes",
    "Condos",
    "Apartments",
    "Townhomes",
    "Rental properties",
    "Residential spaces"
  ],
  "faqs": [
    {
      "q": "How often should my home be cleaned?",
      "a": "It depends on the size of your home, how it is used and how much upkeep you prefer. Weekly, biweekly and other schedules may be appropriate."
    },
    {
      "q": "Do you offer recurring residential cleaning?",
      "a": "Yes. Recurring cleaning can be arranged around your routine."
    },
    {
      "q": "Do you clean apartments and condos?",
      "a": "Yes. We provide residential cleaning for different types of homes and living spaces."
    },
    {
      "q": "Can I request specific areas to be cleaned?",
      "a": "Yes. Your cleaning plan can be built around the areas that matter most to you."
    },
    {
      "q": "Do you offer one-time cleaning?",
      "a": "Depending on your requirements, we can discuss one-time cleaning options."
    }
  ],
  "cta": {
    "h": "Come Home to a Cleaner Space.",
    "p": "Tell us about your home and what you'd like taken care of."
  }
};

export const metadata = serviceMetadata(copy);

export default function Page() {
  return <ServicePage c={copy} />;
}
