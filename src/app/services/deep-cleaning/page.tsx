import { ServicePage, serviceMetadata, type ServiceCopy } from "@/components/lum/service-page";

/* Deep Cleaning: approved copy. Edit the wording here; the layout lives in ServicePage. */
const copy: ServiceCopy = {
  "slug": "deep-cleaning",
  "name": "Deep Cleaning",
  "seoTitle": "Deep Cleaning Services in Toronto | Luminari Cleaning",
  "metaDescription": "A deeper clean for spaces that need extra attention. Luminari provides professional deep cleaning across Toronto, Vaughan and the GTA.",
  "img": "washroom",
  "alt": "Bathroom with fixtures and a mirror",
  "eyebrow": "Deep Cleaning",
  "h1": "For the Clean That Goes Further",
  "intro": [
    "Some spaces need more than regular cleaning.",
    "Luminari provides deep cleaning services across Toronto, Vaughan and the GTA for homes and businesses that need extra attention in the areas regular cleaning may not cover."
  ],
  "first": {
    "h": "When Regular Cleaning Isn't Enough",
    "p": [
      "Dust builds up. Dirt gets into corners. Areas that aren't part of the everyday routine eventually need attention.",
      "A deep clean gives those spaces a reset."
    ]
  },
  "whatTitle": "Areas We Can Focus On",
  "what": [
    {
      "h": "Hard-to-Reach Areas",
      "p": "Extra attention to areas that are easy to overlook."
    },
    {
      "h": "Kitchens",
      "p": "Detailed cleaning around surfaces and areas that see regular use."
    },
    {
      "h": "Bathrooms",
      "p": "A more thorough clean for bathrooms and frequently touched areas."
    },
    {
      "h": "Floors",
      "p": "Additional attention to flooring and built-up dirt."
    },
    {
      "h": "Corners & Edges",
      "p": "Cleaning around areas that can collect dust and debris."
    },
    {
      "h": "High-Touch Areas",
      "p": "A deeper clean of surfaces that are frequently handled."
    }
  ],
  "second": {
    "h": "A Deeper Reset",
    "p": [
      "Deep cleaning can be useful before starting regular service, after a period of heavy use, during a seasonal reset or whenever a space needs additional attention.",
      "We focus the service around the condition and requirements of the space."
    ]
  },
  "process": [
    {
      "h": "Assess the Space",
      "p": "We identify the areas that need additional attention."
    },
    {
      "h": "Set the Scope",
      "p": "We establish what the deep clean should cover."
    },
    {
      "h": "Reset the Space",
      "p": "Our team works through the agreed areas with a more detailed cleaning approach."
    }
  ],
  "third": {
    "h": "Start Fresh. Then Keep It That Way.",
    "p": [
      "A deep clean can be the starting point.",
      "Once the space is reset, a recurring cleaning schedule can help keep it there."
    ]
  },
  "serve": [
    "Homes",
    "Offices",
    "Commercial spaces",
    "Rental properties",
    "Businesses preparing a space for regular cleaning"
  ],
  "faqs": [
    {
      "q": "What is included in a deep cleaning service?",
      "a": "The scope depends on the space and its condition. We focus on areas that need more attention than regular cleaning typically provides."
    },
    {
      "q": "Is deep cleaning different from regular cleaning?",
      "a": "Yes. Deep cleaning is intended to address areas and buildup that may not be part of a standard recurring cleaning routine."
    },
    {
      "q": "How often should I book a deep clean?",
      "a": "There is no single schedule. Some spaces may benefit from seasonal deep cleaning, while others may need it after heavy use or before beginning recurring service."
    },
    {
      "q": "Can deep cleaning be combined with recurring cleaning?",
      "a": "Yes. A deep clean can be used as a starting point before establishing a regular cleaning schedule."
    },
    {
      "q": "Do you provide deep cleaning in Toronto and Vaughan?",
      "a": "Yes. Luminari serves Toronto, Vaughan and the Greater Toronto Area."
    }
  ],
  "cta": {
    "h": "Give Your Space a Proper Reset.",
    "p": "Tell us what needs attention and we'll help define the right scope."
  }
};

export const metadata = serviceMetadata(copy);

export default function Page() {
  return <ServicePage c={copy} />;
}
