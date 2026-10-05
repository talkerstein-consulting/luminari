import { ServicePage, serviceMetadata, type ServiceCopy } from "@/components/lum/service-page";

/* Move-In & Move-Out Cleaning: approved copy. Edit the wording here; the layout lives in ServicePage. */
const copy: ServiceCopy = {
  "slug": "move-in-move-out-cleaning",
  "name": "Move-In & Move-Out Cleaning",
  "seoTitle": "Move-In & Move-Out Cleaning Toronto | Luminari Cleaning",
  "metaDescription": "Professional move-in and move-out cleaning for homes, apartments and rental properties across Toronto, Vaughan and the GTA.",
  "img": "kitchen-interior",
  "alt": "Clean kitchen ready for new occupants",
  "eyebrow": "Move-In & Move-Out Cleaning",
  "h1": "Leave It Clean. Move In Ready.",
  "intro": [
    "Moving is enough work without having to clean the entire space too.",
    "Luminari provides move-in and move-out cleaning across Toronto, Vaughan and the GTA, helping prepare homes, apartments and rental spaces for the next stage."
  ],
  "first": {
    "h": "One Space. Two Moments.",
    "p": [
      "Our service can be tailored around the condition and requirements of the property."
    ],
    "pairs": [
      {
        "h": "Moving out?",
        "p": "Leave the space clean and ready for the next occupant."
      },
      {
        "h": "Moving in?",
        "p": "Start with a clean space before the boxes come out."
      }
    ]
  },
  "what": [
    {
      "h": "Living Areas",
      "p": "Clean floors, surfaces and commonly used areas."
    },
    {
      "h": "Kitchens",
      "p": "Attention to counters, surfaces and everyday kitchen areas."
    },
    {
      "h": "Bathrooms",
      "p": "Thorough cleaning of bathrooms before move-in or after move-out."
    },
    {
      "h": "Bedrooms",
      "p": "Clean bedrooms and frequently used surfaces."
    },
    {
      "h": "Floors",
      "p": "Cleaning throughout the property based on the scope."
    },
    {
      "h": "Entryways & Common Areas",
      "p": "Prepare the areas people see and use first."
    }
  ],
  "second": {
    "h": "Built Around the Move",
    "p": [
      "Timing matters when you're moving.",
      "We work with you to establish a cleaning scope around your move, whether you're preparing a property for handover or getting your new home ready."
    ]
  },
  "process": [
    {
      "h": "Tell Us About the Property",
      "p": "We learn about the space, its condition and what needs to be cleaned."
    },
    {
      "h": "Set the Scope",
      "p": "We establish the areas and level of cleaning required."
    },
    {
      "h": "Get the Space Ready",
      "p": "Our team completes the agreed cleaning so the property is ready for its next step."
    }
  ],
  "third": {
    "h": "Moving Out or Moving In",
    "p": [],
    "pairs": [
      {
        "h": "Moving Out",
        "p": "Leave the property in good condition for the next occupant, landlord or property manager."
      },
      {
        "h": "Moving In",
        "p": "Start fresh in a clean space before settling into your new home."
      }
    ]
  },
  "serve": [
    "Homeowners",
    "Renters",
    "Landlords",
    "Property managers",
    "Condo owners",
    "Apartment residents"
  ],
  "faqs": [
    {
      "q": "Do you offer both move-in and move-out cleaning?",
      "a": "Yes. We provide cleaning for properties being moved into or moved out of."
    },
    {
      "q": "What is included in move-out cleaning?",
      "a": "The scope can include living areas, kitchens, bathrooms, bedrooms, floors and common areas, depending on the property and requirements."
    },
    {
      "q": "Can you clean an apartment before I move in?",
      "a": "Yes. We can arrange a move-in cleaning to help prepare the space before you settle in."
    },
    {
      "q": "Can landlords use move-out cleaning for rental turnover?",
      "a": "Yes. Move-out cleaning can help prepare a property for its next occupant."
    },
    {
      "q": "Do you service Toronto and Vaughan?",
      "a": "Yes. Luminari serves Toronto, Vaughan and the Greater Toronto Area."
    }
  ],
  "cta": {
    "h": "Make the Next Move a Cleaner One.",
    "p": "Tell us about the property and when you need it ready.",
    "scene": {
      "before": "/images/move-dirty.jpg",
      "after": "/images/move-clean.jpg",
      "alt": "Empty condo living room and kitchen, cleaned and ready for move-in"
    }
  }
};

export const metadata = serviceMetadata(copy);

export default function Page() {
  return <ServicePage c={copy} />;
}
