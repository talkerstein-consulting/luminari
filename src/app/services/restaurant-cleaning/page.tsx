import { ServicePage, serviceMetadata, type ServiceCopy } from "@/components/lum/service-page";

/* Restaurant Cleaning: approved copy. Edit the wording here; the layout lives in ServicePage. */
const copy: ServiceCopy = {
  "slug": "restaurant-cleaning",
  "name": "Restaurant Cleaning",
  "seoTitle": "Restaurant Cleaning Services in Toronto | Luminari Cleaning",
  "metaDescription": "Professional restaurant cleaning for dining areas, washrooms and back-of-house spaces across Toronto and the GTA. Built around your operating schedule.",
  "img": "restaurant-cafe",
  "alt": "Restaurant with wooden tables, pendant lights and a café counter",
  "eyebrow": "Restaurant Cleaning",
  "h1": "A Cleaner Restaurant, From Front to Back",
  "intro": [
    "Restaurants have different cleaning demands from most commercial spaces.",
    "Luminari provides restaurant cleaning across Toronto, Vaughan and the GTA, with service built around your operating hours and the way your restaurant runs."
  ],
  "first": {
    "h": "Clean Where It Matters",
    "p": [
      "From the first table to the last washroom, your restaurant needs consistent attention.",
      "We focus on the areas your customers see and the spaces your team relies on behind the scenes."
    ]
  },
  "what": [
    {
      "h": "Dining Areas",
      "p": "Keep tables, floors and customer-facing spaces clean and presentable."
    },
    {
      "h": "Entryways",
      "p": "Make a good first impression from the moment customers walk in."
    },
    {
      "h": "Washrooms",
      "p": "Regular cleaning for customer and staff washrooms."
    },
    {
      "h": "Back-of-House Areas",
      "p": "Cleaning for staff areas and other operational spaces."
    },
    {
      "h": "Floors",
      "p": "Regular attention to high-traffic flooring and entry areas."
    },
    {
      "h": "High-Touch Surfaces",
      "p": "Routine cleaning of the surfaces customers and staff use throughout the day."
    }
  ],
  "second": {
    "h": "Built Around Your Operating Hours",
    "p": [
      "Restaurant cleaning needs to fit the rhythm of your business.",
      "We can work around opening, closing and quieter periods to establish a recurring schedule that keeps your space ready without getting in the way of service."
    ]
  },
  "process": [
    {
      "h": "Walkthrough",
      "p": "We assess your restaurant, operating hours and cleaning priorities."
    },
    {
      "h": "Build the Plan",
      "p": "We establish the areas, frequency and timing that make sense for your operation."
    },
    {
      "h": "Keep It Ready",
      "p": "Our team works to the agreed schedule, keeping the space clean for staff and customers."
    }
  ],
  "third": {
    "h": "Front of House. Back of House. One Plan.",
    "p": [
      "A restaurant isn't just the dining room.",
      "We create a cleaning scope that considers the full space, so the areas customers see and the areas they don't both receive the attention they need."
    ]
  },
  "serve": [
    "Restaurants",
    "Cafés",
    "Food service businesses",
    "Dining establishments",
    "Commercial food spaces"
  ],
  "faqs": [
    {
      "q": "Do you clean restaurants after hours?",
      "a": "Scheduling can be arranged around your operating hours and quieter periods."
    },
    {
      "q": "What areas of a restaurant do you clean?",
      "a": "Depending on your scope, service can include dining areas, entryways, washrooms, floors, high-touch surfaces and back-of-house areas."
    },
    {
      "q": "Can restaurant cleaning be recurring?",
      "a": "Yes. We can establish a recurring schedule based on your operation."
    },
    {
      "q": "Can the cleaning schedule change based on restaurant hours?",
      "a": "We can discuss a schedule that fits your operating pattern and cleaning requirements."
    },
    {
      "q": "Do you service restaurants outside Toronto?",
      "a": "Yes. Luminari serves Toronto, Vaughan and the GTA."
    }
  ],
  "cta": {
    "h": "Keep Your Restaurant Ready for Service.",
    "p": "Tell us about your space and schedule."
  }
};

export const metadata = serviceMetadata(copy);

export default function Page() {
  return <ServicePage c={copy} />;
}
