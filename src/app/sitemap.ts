import type { MetadataRoute } from "next";
import { SITE } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/projects", "/about", "/contact"].map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" || path === "/projects" ? "monthly" : "yearly",
    priority: path === "" ? 1 : path === "/projects" ? 0.9 : 0.7,
  }));
}
