import type { MetadataRoute } from "next";
import { absoluteUrl, publicPages } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return publicPages.flatMap(({ path }) => {
    const url = absoluteUrl(path);
    return url ? [{ url }] : [];
  });
}
