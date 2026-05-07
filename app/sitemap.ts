import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: "https://outfittedmvp.vercel.app",
      lastModified,
      changeFrequency: "weekly",
    },
    {
      url: "https://outfittedmvp.vercel.app/outfit",
      lastModified,
      changeFrequency: "weekly",
    },
    {
      url: "https://outfittedmvp.vercel.app/about",
      lastModified,
      changeFrequency: "monthly",
    },
    {
      url: "https://outfittedmvp.vercel.app/privacy",
      lastModified,
      changeFrequency: "monthly",
    },
    {
      url: "https://outfittedmvp.vercel.app/affiliate-disclosure",
      lastModified,
      changeFrequency: "monthly",
    },
    {
      url: "https://outfittedmvp.vercel.app/contact",
      lastModified,
      changeFrequency: "monthly",
    },
  ];
}
