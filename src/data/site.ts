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

export const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;
