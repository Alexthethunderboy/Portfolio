import type { MetadataRoute } from "next";
import { SITE } from "@/data/site";
import { getCaseStudies } from "@/lib/get-projects";
import { toProjectId } from "@/lib/project";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages: MetadataRoute.Sitemap = ["", "/projects", "/about", "/contact"].map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" || path === "/projects" ? "monthly" : "yearly",
    priority: path === "" ? 1 : path === "/projects" ? 0.9 : 0.7,
  }));
  const caseStudies: MetadataRoute.Sitemap = (await getCaseStudies()).map((project) => ({
    url: `${SITE.url}/work/${toProjectId(project.title)}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));
  return [...pages, ...caseStudies];
}
