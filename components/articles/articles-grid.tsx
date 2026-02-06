"use client";

import { useState, useEffect, useMemo, useTransition, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Calendar, ArrowRight, FileText, Tag, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

interface Article {
  id: string;
  title: string;
  slug: string;
  category: string | null;
  excerpt: string | null;
  image_url: string | null;
  published_at: string | null;
  created_at: string;
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("th-TH", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function ArticlesGrid() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryParam = searchParams.get("category");
  
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || "all");
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  // Fetch articles
  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("articles")
        .select("id, title, slug, category, excerpt, image_url, published_at, created_at")
        .eq("is_published", true)
        .order("published_at", { ascending: false });

      if (!error && data) {
        const typedData = data as Article[];
        setArticles(typedData);
        
        // Extract unique categories
        const cats = [...new Set(typedData.map(a => a.category).filter(Boolean))] as string[];
        setCategories(cats);
      }
      setLoading(false);
    };

    fetchArticles();
  }, []);

  // Filter articles
  const filteredArticles = useMemo(() => {
    if (selectedCategory === "all") return articles;
    return articles.filter(a => a.category === selectedCategory);
  }, [articles, selectedCategory]);

  const handleCategoryChange = useCallback((cat: string) => {
    startTransition(() => {
      setSelectedCategory(cat);
    });
    if (cat === "all") {
      router.push("/articles", { scroll: false });
    } else {
      router.push(`/articles?category=${encodeURIComponent(cat)}`, { scroll: false });
    }
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    );
  }

  return (
    <>
      {/* Category Filter */}
      {categories.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Tag className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-500">หมวดหมู่</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleCategoryChange("all")}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                selectedCategory === "all"
                  ? "bg-primary-900 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              )}
            >
              ทั้งหมด ({articles.length})
            </button>
            {categories.map((cat) => {
              const count = articles.filter(a => a.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                    selectedCategory === cat
                      ? "bg-primary-900 text-white"
                      : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                  )}
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Articles Grid */}
      {filteredArticles.length > 0 ? (
        <div className={cn(
          "grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 transition-opacity duration-150",
          isPending && "opacity-60"
        )}>
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
            >
              {/* Image */}
              <div className="aspect-video bg-primary-100 relative overflow-hidden">
                {article.image_url ? (
                  <img
                    src={article.image_url}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <FileText className="w-12 h-12 text-primary-300" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6">
                <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {formatDate(article.published_at || article.created_at)}
                  </span>
                  {article.category && (
                    <span className="bg-primary-50 text-primary-700 px-2 py-0.5 rounded-full text-xs">
                      {article.category}
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold text-primary-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {article.excerpt}
                </p>
                <Link
                  href={`/articles/${article.slug}`}
                  className="inline-flex items-center text-accent-500 font-medium text-sm hover:text-accent-600 transition-colors"
                >
                  อ่านต่อ
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-xl">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">
            {selectedCategory === "all" ? "ยังไม่มีบทความในขณะนี้" : `ไม่พบบทความในหมวด "${selectedCategory}"`}
          </p>
          {selectedCategory !== "all" && (
            <button
              onClick={() => handleCategoryChange("all")}
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              ดูทั้งหมด
            </button>
          )}
        </div>
      )}
    </>
  );
}
