import { ServicePage, serviceMetadata, type ServiceCopy } from "@/components/lum/service-page";

/* Post-Construction Cleaning: approved copy. Edit the wording here; the layout lives in ServicePage. */
const copy: ServiceCopy = {
  "slug": "post-construction-cleaning",
  "name": "Post-Construction Cleaning",
  "seoTitle": "Post-Construction Cleaning Toronto | Luminari Cleaning",
  "metaDescription": "Professional post-construction cleaning for renovated and newly built spaces across Toronto and the GTA. Remove construction dust, debris and residue before handover.",
  "img": "office-studio",
  "alt": "Bright, newly finished studio interior",
  "eyebrow": "Post-Construction Cleaning",
  "h1": "From Construction Site to Ready Space",
  "intro": [
    "Construction can finish before a space is ready to use.",
    "Luminari provides post-construction cleaning across Toronto, Vaughan and the GTA, helping remove the dust, debris and residue left behind after construction or renovation work."
  ],
  "first": {
    "h": "The Work Is Finished. Now Make the Space Ready.",
    "p": [
      "A newly completed space still needs a proper clean before people move in, work or open the doors.",
      "We focus on the remaining construction mess so the finished work can actually be seen and the space can move toward handover."
    ]
  },
  "what": [
    {
      "h": "Construction Dust",
      "p": "Remove dust left across surfaces and finished areas."
    },
    {
      "h": "Floors",
      "p": "Clean flooring affected by construction activity and debris."
    },
    {
      "h": "Windows & Glass",
      "p": "Clean finished glass and visible surfaces where included in the scope."
    },
    {
      "h": "Surfaces",
      "p": "Remove dust, residue and remaining construction mess."
    },
    {
      "h": "Bathrooms",
      "p": "Clean newly finished bathroom areas before use."
    },
    {
      "h": "Final Details",
      "p": "Attention to the smaller areas that affect the finished appearance of the space."
    }
  ],
  "second": {
    "h": "Built Around the Project",
    "p": [
      "Every construction project is different.",
      "We assess the space, understand what has been completed and establish a cleaning scope based on what remains."
    ]
  },
  "process": [
    {
      "h": "Walkthrough",
      "p": "We review the site and understand the project's current condition."
    },
    {
      "h": "Define the Scope",
      "p": "We identify the areas requiring post-construction cleaning."
    },
    {
      "h": "Prepare the Space",
      "p": "Our team works through the agreed scope to bring the space closer to handover."
    }
  ],
  "third": {
    "h": "Ready for the Next Step",
    "p": [
      "Whether the next step is occupancy, a client walkthrough, a tenant move-in or opening day, a clean finished space makes the transition easier."
    ]
  },
  "serve": [
    "Contractors",
    "Developers",
    "Property managers",
    "Renovation projects",
    "Commercial projects",
    "Residential construction projects"
  ],
  "faqs": [
    {
      "q": "What is post-construction cleaning?",
      "a": "Post-construction cleaning removes dust, debris, residue and other mess left behind after construction or renovation."
    },
    {
      "q": "When should post-construction cleaning take place?",
      "a": "It is generally scheduled once the construction work that could create additional dust or debris is complete."
    },
    {
      "q": "Do you clean renovated spaces?",
      "a": "Yes. Post-construction cleaning can apply to renovation and remodeling projects as well as new construction."
    },
    {
      "q": "Do you clean windows and glass?",
      "a": "These areas can be included depending on the project's scope."
    },
    {
      "q": "Do you service construction projects in Toronto and Vaughan?",
      "a": "Yes. Luminari serves Toronto, Vaughan and the GTA."
    }
  ],
  "cta": {
    "h": "Get the Space Ready.",
    "p": "Tell us about the project, its location and what remains to be cleaned."
  }
};

export const metadata = serviceMetadata(copy);

export default function Page() {
  return <ServicePage c={copy} />;
}
