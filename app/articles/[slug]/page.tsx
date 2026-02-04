import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Calendar, ArrowLeft, ArrowRight, FileText, Tag, Eye } from "lucide-react";
import { Button } from "@/components/ui";
import { ArticleSchema, BreadcrumbSchema } from "@/components/seo";
import { SITE_CONFIG } from "@/lib/constants";
import { createServerClient } from "@/lib/supabase/server";
import type { Database } from "@/types/database";

type Article = Database["public"]["Tables"]["articles"]["Row"];

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

async function getArticle(slug: string): Promise<Article | null> {
  const supabase = createServerClient();
  
  if (!supabase) {
    return null;
  }
  
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) {
    console.log("Article fetch error:", error);
    return null;
  }

  return data;
}

async function incrementViewCount(articleId: string, currentCount: number): Promise<void> {
  try {
    const supabase = createServerClient();
    if (!supabase) return;
    
    await (supabase as any)
      .from("articles")
      .update({ view_count: currentCount + 1 })
      .eq("id", articleId);
  } catch {
    // Silently fail - view count is not critical
  }
}

async function getRelatedArticles(currentSlug: string, category: string | null): Promise<Article[]> {
  const supabase = createServerClient();
  
  if (!supabase) {
    return [];
  }
  
  let relatedArticles: Article[] = [];
  
  // 1. ดึงบทความหมวดเดียวกัน เรียงตาม view_count
  if (category) {
    const { data: sameCategoryData } = await supabase
      .from("articles")
      .select("*")
      .eq("is_published", true)
      .eq("category", category)
      .neq("slug", currentSlug)
      .order("view_count", { ascending: false, nullsFirst: false })
      .limit(4);
    
    if (sameCategoryData) {
      relatedArticles = sameCategoryData as Article[];
    }
  }
  
  // 2. ถ้ายังไม่ครบ 4 ให้ดึงบทความยอดนิยมจากหมวดอื่นมาเพิ่ม
  if (relatedArticles.length < 4) {
    const existingSlugs = [currentSlug, ...relatedArticles.map(a => a.slug)];
    
    const { data: popularData } = await supabase
      .from("articles")
      .select("*")
      .eq("is_published", true)
      .not("slug", "in", `(${existingSlugs.map(s => `"${s}"`).join(",")})`)
      .order("view_count", { ascending: false, nullsFirst: false })
      .limit(4 - relatedArticles.length);
    
    if (popularData) {
      relatedArticles = [...relatedArticles, ...(popularData as Article[])];
    }
  }
  
  // 3. ถ้ายังไม่ครบ (กรณี view_count เป็น null หมด) ดึงบทความล่าสุด
  if (relatedArticles.length < 4) {
    const existingSlugs = [currentSlug, ...relatedArticles.map(a => a.slug)];
    
    const { data: latestData } = await supabase
      .from("articles")
      .select("*")
      .eq("is_published", true)
      .not("slug", "in", `(${existingSlugs.map(s => `"${s}"`).join(",")})`)
      .order("published_at", { ascending: false })
      .limit(4 - relatedArticles.length);
    
    if (latestData) {
      relatedArticles = [...relatedArticles, ...(latestData as Article[])];
    }
  }
  
  // 4. สุ่มลำดับเล็กน้อย (shuffle แบบเบาๆ)
  if (relatedArticles.length > 1) {
    // Fisher-Yates shuffle แบบ partial (สลับแค่บางตำแหน่ง)
    for (let i = relatedArticles.length - 1; i > 0; i--) {
      // สุ่มสลับ 50% ของเวลา
      if (Math.random() > 0.5) {
        const j = Math.floor(Math.random() * (i + 1));
        [relatedArticles[i], relatedArticles[j]] = [relatedArticles[j], relatedArticles[i]];
      }
    }
  }
  
  return relatedArticles;
}

// Pre-render บทความที่ publish แล้ว
export async function generateStaticParams() {
  try {
    const supabase = createServerClient();
    if (!supabase) return [];

    const { data } = await supabase
      .from("articles")
      .select("slug")
      .eq("is_published", true);

    return (data || []).map((article: { slug: string }) => ({
      slug: article.slug,
    }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    return {
      title: "ไม่พบบทความ | SP WAREHOUSE",
    };
  }

  const articleUrl = `${SITE_CONFIG.url}/articles/${slug}`;

  return {
    title: article.title,
    description: article.excerpt || article.title,
    alternates: {
      canonical: articleUrl,
    },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt || article.title,
      url: articleUrl,
      siteName: SITE_CONFIG.name,
      publishedTime: article.published_at || undefined,
      modifiedTime: article.updated_at || undefined,
      authors: [SITE_CONFIG.name],
      ...(article.image_url && {
        images: [{ url: article.image_url, alt: article.title }],
      }),
      ...(article.category && { section: article.category }),
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt || article.title,
      ...(article.image_url && { images: [article.image_url] }),
    },
  };
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("th-TH", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    notFound();
  }

  // เพิ่ม view count (fire and forget)
  incrementViewCount(article.id, article.view_count || 0);

  const relatedArticles = await getRelatedArticles(slug, article.category);
  
  const articleUrl = `${SITE_CONFIG.url}/articles/${slug}`;
  const breadcrumbs = [
    { name: "หน้าแรก", url: SITE_CONFIG.url },
    { name: "บทความ", url: `${SITE_CONFIG.url}/articles` },
    { name: article.title, url: articleUrl },
  ];

  return (
    <main>
      {/* SEO Schema */}
      <ArticleSchema
        title={article.title}
        description={article.excerpt || article.title}
        url={articleUrl}
        image={article.image_url}
        publishedTime={article.published_at || article.created_at}
        modifiedTime={article.updated_at || undefined}
        category={article.category}
      />
      <BreadcrumbSchema items={breadcrumbs} />
      
      {/* Hero */}
      <section className="py-8 sm:py-12 bg-primary-900">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto lg:max-w-6xl">
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
              <Link href="/" className="hover:text-white transition-colors">หน้าแรก</Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/articles" className="hover:text-white transition-colors">บทความ</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white line-clamp-1">{article.title}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content with Sidebar */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto lg:flex lg:gap-10">
            {/* Main Content */}
            <article className="lg:flex-1 max-w-3xl">
              {/* Header */}
              <header className="mb-8">
                {article.category && (
                  <Link 
                    href={`/articles?category=${encodeURIComponent(article.category)}`}
                    className="inline-flex items-center gap-1 bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm font-medium mb-4 hover:bg-primary-100 transition-colors"
                  >
                    <Tag className="w-3 h-3" />
                    {article.category}
                  </Link>
                )}
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-900 mb-4 break-words">
                  {article.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-gray-500 text-sm">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {formatDate(article.published_at || article.created_at)}
                  </span>
                  {article.author && (
                    <span>โดย {article.author}</span>
                  )}
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {(article.view_count || 0).toLocaleString()} ครั้ง
                  </span>
                </div>
              </header>

              {/* Featured Image */}
              {article.image_url && (
                <div className="mb-8">
                  <img
                    src={article.image_url}
                    alt={article.title}
                    className="w-full rounded-xl"
                  />
                </div>
              )}

              {/* Content */}
              {article.content ? (
                <div 
                  className="prose prose-lg max-w-none prose-headings:text-primary-900 prose-a:text-primary-600 prose-img:rounded-lg prose-img:mx-auto prose-img:block break-words"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
              ) : (
                <p className="text-gray-500">ไม่มีเนื้อหา</p>
              )}

              {/* Back Button */}
              <div className="mt-12 pt-8 border-t">
                <Link
                  href="/articles"
                  className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  กลับไปหน้าบทความ
                </Link>
              </div>
            </article>

            {/* Sidebar - Desktop */}
            {relatedArticles.length > 0 && (
              <aside className="hidden lg:block lg:w-80 lg:flex-shrink-0">
                <div className="sticky top-24">
                  <h3 className="text-lg font-bold text-primary-900 mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    บทความแนะนำ
                  </h3>
                  <div className="space-y-4">
                    {relatedArticles.slice(0, 3).map((related) => (
                      <Link
                        key={related.id}
                        href={`/articles/${related.slug}`}
                        className="group block bg-gray-50 rounded-lg overflow-hidden hover:shadow-md transition-all"
                      >
                        {related.image_url ? (
                          <img
                            src={related.image_url}
                            alt={related.title}
                            className="w-full h-32 object-cover"
                          />
                        ) : (
                          <div className="w-full h-32 bg-primary-100 flex items-center justify-center">
                            <FileText className="w-8 h-8 text-primary-300" />
                          </div>
                        )}
                        <div className="p-3">
                          <p className="font-medium text-primary-900 text-sm line-clamp-2 group-hover:text-primary-600 transition-colors">
                            {related.title}
                          </p>
                          {related.category && (
                            <span className="text-xs text-gray-500 mt-1 block">
                              {related.category}
                            </span>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </aside>
            )}
          </div>
        </div>
      </section>

      {/* Related Articles - Mobile & Bottom */}
      {relatedArticles.length > 0 && (
        <section className="py-10 sm:py-14 bg-gray-50 lg:hidden">
          <div className="container mx-auto px-4">
            <h3 className="text-xl font-bold text-primary-900 mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              บทความแนะนำ
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {relatedArticles.slice(0, 4).map((related) => (
                <Link
                  key={related.id}
                  href={`/articles/${related.slug}`}
                  className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
                >
                  {related.image_url ? (
                    <img
                      src={related.image_url}
                      alt={related.title}
                      className="w-full h-40 object-cover"
                    />
                  ) : (
                    <div className="w-full h-40 bg-primary-100 flex items-center justify-center">
                      <FileText className="w-10 h-10 text-primary-300" />
                    </div>
                  )}
                  <div className="p-4">
                    <p className="font-semibold text-primary-900 line-clamp-2 group-hover:text-primary-600 transition-colors">
                      {related.title}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      {related.category && (
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          {related.category}
                        </span>
                      )}
                      <span className="text-accent-500 text-sm flex items-center gap-1">
                        อ่านเพิ่ม <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-10 sm:py-14 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-primary-900 mb-3">
            สนใจสร้างโกดัง?
          </h2>
          <p className="text-gray-600 mb-5 max-w-xl mx-auto">
            ปรึกษาผู้เชี่ยวชาญของเราได้ฟรี
          </p>
          <Button href={SITE_CONFIG.lineUrl} external>
            ติดต่อเรา
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>
    </main>
  );
}
