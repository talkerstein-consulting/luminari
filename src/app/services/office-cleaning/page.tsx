import { ServicePage, serviceMetadata, type ServiceCopy } from "@/components/lum/service-page";

/* Office Cleaning: approved copy. Edit the wording here; the layout lives in ServicePage. */
const copy: ServiceCopy = {
  "slug": "office-cleaning",
  "name": "Office Cleaning",
  "seoTitle": "Office Cleaning Services in Toronto | Luminari Cleaning",
  "metaDescription": "Professional office cleaning services across Toronto, Vaughan and the GTA. Recurring cleaning built around your schedule, team and workspace.",
  "img": "professional-office",
  "alt": "Office workbench beside tall windows",
  "eyebrow": "Office Cleaning",
  "h1": "Office Cleaning That Works Around Your Business",
  "intro": [
    "Your office should be ready when your team arrives.",
    "Luminari provides recurring office cleaning across Toronto, Vaughan and the GTA, with schedules built around how your workplace actually operates."
  ],
  "first": {
    "h": "A Cleaner Workplace, Without the Disruption",
    "p": [
      "Cleaning should happen around your business, not interfere with it.",
      "We work around your hours and priorities to keep workspaces, meeting rooms, common areas and staff spaces clean and ready to use."
    ]
  },
  "what": [
    {
      "h": "Workstations",
      "p": "Regular cleaning for desks, work areas and shared surfaces."
    },
    {
      "h": "Meeting Rooms",
      "p": "Keep rooms ready for meetings, presentations and visitors."
    },
    {
      "h": "Common Areas",
      "p": "Cleaning for hallways, lounges and shared spaces."
    },
    {
      "h": "Kitchens & Break Rooms",
      "p": "Keep staff kitchens and break areas clean and usable."
    },
    {
      "h": "Washrooms",
      "p": "Routine cleaning and upkeep for employee and visitor washrooms."
    },
    {
      "h": "Entryways",
      "p": "Keep the first area people see clean and presentable."
    }
  ],
  "second": {
    "h": "Cleaning Around Your Schedule",
    "p": [
      "Your office doesn't have to stop for cleaning.",
      "We can schedule service around your team's working hours, including recurring arrangements that fit your daily routine."
    ]
  },
  "process": [
    {
      "h": "Walkthrough",
      "p": "We look at your workplace, how it is used and what needs attention."
    },
    {
      "h": "Build the Plan",
      "p": "We establish the right cleaning frequency and scope for your office."
    },
    {
      "h": "Keep It Ready",
      "p": "Our team follows the agreed schedule so your workplace stays ready for the next day."
    }
  ],
  "third": {
    "h": "The Details Matter",
    "p": [
      "A clean office isn't just about what looks clean.",
      "We pay attention to the everyday areas that affect how a workplace feels and functions, from shared surfaces and kitchens to washrooms and entryways."
    ]
  },
  "serve": [
    "Offices",
    "Professional firms",
    "Studios",
    "Small businesses",
    "Corporate workplaces",
    "Shared workspaces"
  ],
  "faqs": [
    {
      "q": "How often should an office be cleaned?",
      "a": "The right frequency depends on the size of your office, traffic and how the space is used. We can recommend a schedule based on your needs."
    },
    {
      "q": "Do you offer recurring office cleaning?",
      "a": "Yes. We provide recurring cleaning arrangements for offices across Toronto and the GTA."
    },
    {
      "q": "Can cleaning happen after hours?",
      "a": "Scheduling can be arranged around your business hours where appropriate."
    },
    {
      "q": "Do you clean kitchens and break rooms?",
      "a": "Yes. Shared kitchens, break rooms and other common areas can be included in your cleaning plan."
    },
    {
      "q": "Do you service offices in Vaughan?",
      "a": "Yes. Luminari serves Vaughan as well as Toronto and the Greater Toronto Area."
    }
  ],
  "cta": {
    "h": "A Better-Ready Office Starts Here.",
    "p": "Tell us about your workplace and we'll help build a cleaning schedule around it."
  }
};

export const metadata = serviceMetadata(copy);

export default function Page() {
  return <ServicePage c={copy} />;
}
