import type { Project } from "@/data/portfolio";
import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { toProjectId } from "@/lib/project";
import { PROJECT_PREVIEWS, PROJECT_FALLBACKS } from "@/data/project-previews";

interface SanityProject {
  _id?: string; title?: string; oneLiner?: string; description?: string;
  techStack?: string[]; liveUrl?: string; githubUrl?: string;
  thumbnail?: Parameters<typeof urlForImage>[0]; star?: Partial<Project["star"]>;
}
const curated = [
{
  "title": "Dumami Hair",
  "oneLiner": "An editorial hair-styling website with a four-step booking prototype.",
  "description": "A responsive style catalogue and appointment preview for a Romford and London braider.",
  "techStack": [
    "HTML",
    "CSS",
    "JavaScript"
  ],
  "liveUrl": "https://dumamihair.vercel.app/",
  "githubUrl": "https://github.com/Alexthethunderboy/dumamihair",
  "notes": {
    "aim": "Present protective styles and explain the proposed appointment journey.",
    "approach": "An editorial homepage connects a provisional style catalogue to a four-step booking preview.",
    "scope": "Prototype only. It does not save customer details, reserve appointments or take payment; service details and policies await client approval."
  }
},
{
  "title": "AlienMint",
  "oneLiner": "An interactive NFT mint demonstration with a separate live testnet route.",
  "description": "Explore a collection, preview a simulated mint and inspect a creator-studio workflow.",
  "techStack": [
    "Next.js",
    "React",
    "TypeScript",
    "Wagmi"
  ],
  "liveUrl": "https://alienmint.vercel.app/",
  "githubUrl": "https://github.com/Alexthethunderboy/alienmint",
  "notes": {
    "aim": "Explain an NFT mint experience without requiring a wallet or funds for the main demonstration.",
    "approach": "The public demo presents collection artwork, mint quantities and simulation states, alongside Creator Studio and a Base Sepolia route.",
    "scope": "The homepage mint is simulated. Wallet transactions, storage publication and production launch are separate workflows; they were not exercised for this portfolio entry."
  }
},
{
  "title": "Shopper",
  "oneLiner": "A fashion storefront with a product catalogue and shopping-cart interface.",
  "description": "Browse fashion categories, featured products and collection pages.",
  "techStack": [
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Prisma"
  ],
  "liveUrl": "https://shopper-chi-six.vercel.app/",
  "githubUrl": "https://github.com/Alexthethunderboy/shopper",
  "notes": {
    "aim": "Organise fashion discovery around categories and product information.",
    "approach": "A storefront connects featured products and collections to product, account and cart interfaces.",
    "scope": "This entry describes the storefront and repository. Checkout, payments, account creation and order fulfilment have not been verified; no purchase or subscription was made."
  }
},
{
  "title": "Ace-in-art",
  "oneLiner": "A creative portfolio and digital archive for Achilihu Chinedu Emmanuel.",
  "description": "A Sanity-backed archive for artwork, exhibitions and creative experiments.",
  "techStack": [
    "Next.js",
    "Sanity",
    "Tailwind CSS",
    "Framer Motion"
  ],
  "liveUrl": "https://aceinart.vercel.app/",
  "githubUrl": "https://github.com/Alexthethunderboy/aceinart"
},
{
  "title": "DirDeo",
  "oneLiner": "A videography and photography portfolio for Diotu Isaac.",
  "description": "A visual portfolio with selected film work, project details and contact routes.",
  "techStack": [
    "Next.js",
    "React",
    "Sanity",
    "Framer Motion"
  ],
  "liveUrl": "https://dirdeo.vercel.app/",
  "githubUrl": "https://github.com/Alexthethunderboy/dirdeo"
},
  {
    title: "DRAWN", oneLiner: "A culture picker for films, music, and books.",
    description: "Discover a pick from ranking lists and keep browser-local saved collections.",
    techStack: ["Next.js", "React", "Tailwind CSS"], liveUrl: "https://drawn-eta.vercel.app/", githubUrl: "https://github.com/Alexthethunderboy/drawn",
    notes: {
      aim: "Make choosing what to watch, listen to, or read a focused interaction.",
      approach: "Blend configured ranking providers with local lists, skip unavailable sources, and select one item. Lightweight username/PIN profiles separate saved picks on the same device.",
      scope: "Profiles and saved picks stay in one browser. They do not sync across devices; clearing site data removes them. Available provider data varies."
    }
  },
  {
    title: "CineChive", oneLiner: "A local-first archive for discovering and collecting cinema.",
    description: "Explore catalogue feeds and keep a personal library, journal, and collections in the browser.",
    techStack: ["Next.js", "TypeScript", "React", "Tailwind CSS"], liveUrl: "https://cinechive.vercel.app", githubUrl: "https://github.com/Alexthethunderboy/cinechive",
    notes: {
      aim: "Connect media discovery with a personal archive of collections, reviews, and viewing history.",
      approach: "Catalogue APIs supply discovery while a versioned browser archive stores personal records. JSON export/import provides a manual backup and transfer route.",
      scope: "The default is local-first. Cloud accounts, cross-device sync, and community interactions are disabled unless a shared backend is deliberately enabled."
    }
  },
  {
    title: "Kan Powers", oneLiner: "A service enquiry website for property maintenance and facility support.",
    description: "Present services and turn enquiry details into a structured WhatsApp draft for review.",
    techStack: ["Next.js", "TypeScript", "React"], liveUrl: "https://kanpowers.vercel.app", githubUrl: "https://github.com/Alexthethunderboy/kanpowers",
    notes: {
      aim: "Give prospective customers a clear route from service information to a detailed enquiry.",
      approach: "A dedicated enquiry form collects the request and creates a prefilled WhatsApp message that the customer reviews and sends.",
      scope: "This is an enquiry flow. Submitting details prepares a message; it does not confirm a booking or a service response time."
    }
  }
];

export function safeProjectUrl(value: string): string {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? url.href : "";
  } catch { return ""; }
}

const titleKey = (title: string) => toProjectId(title).replace(/-/g, "");
const sourceKey = (url: string) => url.trim().replace(/\/+(?:$)/, "").replace(/\.git$/i, "").toLowerCase();

export function mergeProjects(existing: Project[]): Project[] {
  const projects: Project[] = [];
  for (const project of existing) {
    if (titleKey(project.title).includes("outback") || sourceKey(project.githubUrl).includes("outback")) continue;
    if (projects.some(p => titleKey(p.title) === titleKey(project.title) || (project.githubUrl && sourceKey(p.githubUrl) === sourceKey(project.githubUrl)))) continue;
    projects.push({ ...project });
  }
  for (const item of curated) {
    const index = projects.findIndex(p => titleKey(p.title) === titleKey(item.title) || sourceKey(p.githubUrl) === sourceKey(item.githubUrl));
    if (index >= 0) projects[index] = { ...projects[index], ...item };
    else projects.push({ id: toProjectId(item.title), thumbnail: "", star: { situation: "", task: "", action: "", result: "" }, ...item });
  }
  // Editorial order: demonstrated scope and distinctive interaction, then visual execution.
  // Prototype/payment limitations remain documented in each project's notes.
  const featured = ["cinechive", "drawn", "thegriot", "alienmint", "dumami-hair", "dirdeo", "ace-in-art", "kan-powers", "thunderweather", "shopper", "taxable", "the-thunderspace"];
  return projects.map(project => ({ ...project, liveUrl: safeProjectUrl(project.liveUrl), githubUrl: safeProjectUrl(project.githubUrl), thumbnail: PROJECT_PREVIEWS[toProjectId(project.title)] || project.thumbnail })).sort((a,b) => {
    const rank = (p: Project) => { const n = featured.indexOf(toProjectId(p.title)); return n < 0 ? featured.length : n; };
    return rank(a) - rank(b) || a.title.localeCompare(b.title);
  });
}

export async function getProjects(): Promise<Project[]> {
  let rows: SanityProject[] = PROJECT_FALLBACKS;
  try { rows = await client.fetch<SanityProject[]>(`*[_type == "project"] | order(_createdAt desc) { _id, title, oneLiner, description, techStack, liveUrl, githubUrl, thumbnail, star }`); }
  catch { /* Curated repository-backed projects remain available when the CMS cannot load. */ }
  if (rows.length === 0) rows = PROJECT_FALLBACKS;
  return mergeProjects(rows.map((p,index) => ({
    id: p._id || `project-${index}`, title: p.title?.trim() || "Untitled project",
    oneLiner: p.oneLiner || "", description: p.description || "", techStack: p.techStack || [],
    liveUrl: p.liveUrl || "", githubUrl: p.githubUrl || "",
    thumbnail: p.thumbnail ? urlForImage(p.thumbnail).width(1200).fit("max").format("webp").url() : "",
    star: { situation: p.star?.situation || "", task: p.star?.task || "", action: p.star?.action || "", result: p.star?.result || "" }
  })));
}
