import { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/constants";

interface ArticleForSitemap {
  slug: string;
  updated_at: string | null;
  published_at: string | null;
}

// ถ้ามี Supabase ให้ดึงบทความ
async function getArticles(): Promise<ArticleForSitemap[]> {
  try {
    const { createServerClient } = await import("@/lib/supabase/server");
    const supabase = createServerClient();
    
    if (!supabase) return [];
    
    const { data } = await supabase
      .from("articles")
      .select("slug, updated_at, published_at")
      .eq("is_published", true)
      .order("published_at", { ascending: false });
    
    return (data || []) as ArticleForSitemap[];
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_CONFIG.url;
  
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/works`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // Dynamic article pages
  const articles = await getArticles();
  const articlePages: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${baseUrl}/articles/${article.slug}`,
    lastModified: new Date(article.updated_at || article.published_at || new Date()),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Product size pages
  const productSizes = ["100-300-sqm", "301-500-sqm", "501-1000-sqm", "1001-plus-sqm"];
  const productPages: MetadataRoute.Sitemap = productSizes.map((slug) => ({
    url: `${baseUrl}/products/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...articlePages, ...productPages];
}
