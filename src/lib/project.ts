export function toProjectId(title: string) {
  return title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const PROJECT_SUMMARIES: Record<string, string> = {
  taxable: "A Nigerian tax calculator, SME checker, and private document vault.",
  thunderweather: "A weather dashboard with forecasts, maps, and clear data visualisations.",
  thegriot: "An interactive globe for exploring history, oral traditions, and contested narratives.",
  cinechive: "A local-first archive for discovering and collecting cinema.",
  drawn: "A culture picker for films, music, and books.",
  "kan powers": "A service enquiry website for property maintenance and facility support.",
  "the thunderspace": "A personal digital space for my work, interests, and ideas.",
};

export function getProjectSummary(title: string, fallback?: string) {
  return PROJECT_SUMMARIES[title.trim().toLowerCase()] || refinePortfolioCopy(fallback);
}

export function getShortTechLabel(value: string) {
  return value
    .replace(/^(Frontend|Backend & Auth|Styling & Animation|Visualization|AI Integration):\s*/i, "")
    .replace(/\s*\([^)]*\)\s*/g, "")
    .trim();
}

const PORTFOLIO_COPY_EDITS: Array<[RegExp, string]> = [
  [/\bA sleek and intuitive modern weather application\b/g, "A modern weather application"],
  [/\bwith premium styling\b/gi, "through a deliberate interface system"],
  [/\bfeature-rich\b/gi, "multi-surface"],
  [/\baccurate, real-time\b/gi, "real-time"],
  [/\bhighly responsive and engaging interface that looks great\b/gi, "responsive interface designed to work"],
  [/\bstrong demonstration of my abilities\b/gi, "working example of my experience"],
  [/\bvisually striking, highly interactive\b/gi, "visual, interactive"],
  [/\bseamlessly manages\b/gi, "coordinates"],
  [/\bA high-end digital sanctuary\b/g, "A focused film archive"],
  [/\bcomprehensive and visually premium\b/gi, "considered"],
  [/\bvibrant community\b/gi, "shared community"],
  [/\brobust architecture\b/gi, "architecture"],
  [/\bsuccessfully merges\b/gi, "connects"],
  [/\bessential, modern tool\b/gi, "practical tool"],
  [/\bhighly performant\b/gi, "performance-conscious"],
  [/\blightning-fast load times\b/gi, "responsive data loading"],
  [/\bironclad data security\b/gi, "row-level data controls"],
  [/\bvisually stunning\b/gi, "visually considered"],
  [/\bstunning user interface\b/gi, "focused interface"],
  [/\bflawless, engaging experience\b/gi, "consistent experience"],
  [/\bstate-of-the-art aesthetic\b/gi, "distinctive visual system"],
  [/\bimmediately wows visitors\b/gi, "creates a clear first impression"],
  [/\bhighly polished\b/gi, "considered"],
  [/\bhighly secure\b/gi, "privacy-conscious"],
  [/\bA high-precision tax calculator\b/g, "A Nigerian tax calculator"],
  [/\ba robust, high-precision tax compliance platform\b/gi, "a tax-planning platform"],
  [/^Successfully delivered\b/i, "Delivered"],
  [/^Successfully deployed\b/i, "Deployed"],
];

export function refinePortfolioCopy(value?: string) {
  if (!value) return "";

  return PORTFOLIO_COPY_EDITS.reduce(
    (copy, [pattern, replacement]) => copy.replace(pattern, replacement),
    value,
  )
    .replace(/\s+/g, " ")
    .trim();
}
