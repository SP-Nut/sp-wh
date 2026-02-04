"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth/auth-context";
import { supabase } from "@/lib/supabase/client";
import { 
  ArrowLeft, 
  Plus, 
  Trash2, 
  Loader2,
  Edit,
  Eye,
  EyeOff,
  FileText
} from "lucide-react";

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  image_url: string | null;
  author: string | null;
  is_published: boolean;
  published_at: string | null;
  created_at: string;
}

export default function AdminArticlesPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/admin");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setArticles(data);
      }
      setLoading(false);
    };
    
    fetchArticles();
  }, [refreshKey]);

  const refreshArticles = () => setRefreshKey(prev => prev + 1);

  const togglePublish = async (id: string, currentStatus: boolean) => {
    const updateData = { 
      is_published: !currentStatus,
      published_at: !currentStatus ? new Date().toISOString() : null
    };
    
    await supabase
      .from("articles")
      .update(updateData as never)
      .eq("id", id);
    
    refreshArticles();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("ต้องการลบบทความนี้?")) return;
    await supabase.from("articles").delete().eq("id", id);
    refreshArticles();
  };

  if (authLoading || !user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/admin/dashboard"
              className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <h1 className="font-bold text-primary-900">จัดการบทความ</h1>
          </div>
          <Link
            href="/admin/articles/new"
            className="flex items-center gap-2 bg-primary-900 hover:bg-primary-800 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span className="hidden sm:inline">เขียนบทความ</span>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">ยังไม่มีบทความ</p>
            <Link
              href="/admin/articles/new"
              className="inline-block bg-primary-900 hover:bg-primary-800 text-white px-6 py-2 rounded-lg transition-colors"
            >
              เขียนบทความแรก
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">บทความ</th>
                  <th className="text-center px-4 py-3 text-sm font-medium text-gray-600 hidden sm:table-cell">สถานะ</th>
                  <th className="text-center px-4 py-3 text-sm font-medium text-gray-600">จัดการ</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {articles.map((article) => (
                  <tr key={article.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        {article.image_url ? (
                          <img
                            src={article.image_url}
                            alt=""
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                            <FileText className="w-6 h-6 text-gray-400" />
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-primary-900 line-clamp-1">{article.title}</p>
                          <p className="text-sm text-gray-500 line-clamp-1">{article.excerpt}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center hidden sm:table-cell">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                        article.is_published 
                          ? "bg-green-100 text-green-700" 
                          : "bg-gray-100 text-gray-600"
                      }`}>
                        {article.is_published ? (
                          <>
                            <Eye className="w-3 h-3" />
                            เผยแพร่
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3 h-3" />
                            ฉบับร่าง
                          </>
                        )}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => togglePublish(article.id, article.is_published)}
                          className={`p-2 rounded-lg transition-colors ${
                            article.is_published
                              ? "bg-gray-100 hover:bg-gray-200 text-gray-600"
                              : "bg-green-100 hover:bg-green-200 text-green-600"
                          }`}
                          title={article.is_published ? "ซ่อน" : "เผยแพร่"}
                        >
                          {article.is_published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                        <Link
                          href={`/admin/articles/${article.id}/edit`}
                          className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(article.id)}
                          className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
