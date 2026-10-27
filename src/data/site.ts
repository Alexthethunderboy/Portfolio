export const SITE = {
  name: "Thunderboy",
  founder: "Kelechi Alexander Ugoh",
  preferredName: "Alex",
  descriptor: "Creative Technologist",
  description:
    "The portfolio of Kelechi Alexander Ugoh, a creative technologist working across digital products, visual identity, creative direction, and code.",
  url: "https://thunderboy.vercel.app",
  email: "alexthegreatdeveloper@gmail.com",
  github: "https://github.com/Alexthethunderboy",
  linkedin: "https://linkedin.com/in/kelechiugoh",
} as const;

export const SHARE_IMAGE = {
  url: `${SITE.url}/brand/social/thunderboy-og-1200x630.png`,
  width: 1200,
  height: 630,
  type: "image/png",
  alt: "thunderboy wordmark on Voltage Yellow. Built to feel exceptional. Engineered to hold up.",
} as const;

export const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;
