export const SITE = {
  name: "Thunderboy",
  founder: "Kelechi Alexander Ugoh",
  preferredName: "Alex",
  descriptor: "Cybersecurity Analyst · AppSec · Creative Technologist",
  description:
    "The portfolio of Kelechi Alexander Ugoh, a cybersecurity analyst focused on application security (AppSec), building digital products and visual experiences as Thunderboy.",
  url: "https://thunderboy.vercel.app",
  email: "alexthegreatdeveloper@gmail.com",
  github: "https://github.com/Alexthethunderboy",
  linkedin: "https://www.linkedin.com/in/thunderboy/",
} as const;

export const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;
