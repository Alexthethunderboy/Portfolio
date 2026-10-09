// Genuine CMS previews and live-site captures, verified 8 October 2026.
export const PROJECT_PREVIEWS: Record<string, string> = {
  "dirdeo": "/projects/previews/dirdeo.jpg",
  "ace-in-art": "/projects/previews/aceinart.jpg",
  "dumami-hair": "/projects/previews/dumamihair.jpg",
  "alienmint": "/projects/previews/alienmint.jpg",
  "shopper": "/projects/previews/shopper.jpg",
  "drawn": "/projects/previews/drawn.jpg",
  "cinechive": "/projects/previews/cinechive.webp",
  "thegriot": "/projects/previews/thegriot.webp",
  "kan-powers": "/projects/previews/kan-powers.jpg",
  "taxable": "/projects/previews/taxable.webp",
  "thunderweather": "/projects/previews/thunderweather.webp",
  "the-thunderspace": "/projects/previews/thunderspace.webp"
};

// Public metadata snapshot keeps existing projects available during CMS outages.
export const PROJECT_FALLBACKS = [
  {
    "title": "TheGriot",
    "oneLiner": "An interactive globe for exploring history, oral traditions, and contested narratives.",
    "techStack": [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Deck.gl"
    ],
    "liveUrl": "https://thegriot.vercel.app/",
    "githubUrl": "https://github.com/Alexthethunderboy/thegriot"
  },
  {
    "title": "TaxAble",
    "oneLiner": "A Nigerian tax calculator, SME checker, and private document vault.",
    "techStack": [
      "Next.js",
      "React 19",
      "Framer Motion",
      "Tailwind CSS v4"
    ],
    "liveUrl": "https://taxable-psi.vercel.app/",
    "githubUrl": "https://github.com/Alexthethunderboy/taxable"
  },
  {
    "title": "ThunderWeather",
    "oneLiner": "A weather dashboard with forecasts, maps, and clear data visualisations.",
    "techStack": [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "OpenWeather API"
    ],
    "liveUrl": "https://thunderweather.vercel.app/",
    "githubUrl": "https://github.com/Alexthethunderboy/weatherApp"
  },
  {
    "title": "The ThunderSpace",
    "oneLiner": "A personal digital space for my work, interests, and ideas.",
    "techStack": [
      "Next.js",
      "React 19",
      "Tailwind CSS v4",
      "TypeScript"
    ],
    "liveUrl": "https://thunderspace.vercel.app/",
    "githubUrl": "https://github.com/Alexthethunderboy/thunderspace"
  }
];
