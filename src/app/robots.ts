import type { MetadataRoute } from "next";
import { URLS } from "./(shared)/constants/urls";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${URLS.SITE}/sitemap.xml`,
  };
}
