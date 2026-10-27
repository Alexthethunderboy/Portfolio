import type { MetadataRoute } from "next";
import { SITE } from "@/data/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: SITE.name,
    start_url: "/",
    display: "standalone",
    theme_color: "#050505",
    background_color: "#050505",
    icons: [
      { src: "/brand/icons/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { src: "/brand/icons/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
