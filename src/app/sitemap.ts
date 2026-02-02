import type { MetadataRoute } from "next";
import fs from "node:fs";
import path from "node:path";
import { substitutionPageUrls } from "@/data/substitutionPageUrls";

export const dynamic = "force-static";

function getLastModified(filePath: string): Date {
  const fullPath = path.join(process.cwd(), "src/app", filePath);
  const { mtime } = fs.statSync(fullPath);
  return mtime;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  const normalizedBaseUrl = baseUrl.replace(/\/$/, "");

  const substitutionPages = substitutionPageUrls.map((slug) => ({
    url: `${normalizedBaseUrl}/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/termos-de-uso`,
      lastModified: getLastModified("privacidade/page.tsx"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacidade`,
      lastModified: getLastModified("termos-de-uso/page.tsx"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...substitutionPages,
  ];
}
