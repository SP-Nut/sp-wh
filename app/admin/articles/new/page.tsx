"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth/auth-context";
import { supabase } from "@/lib/supabase/client";
import { RichTextEditor } from "@/components/editor";
import { 
  ArrowLeft, 
  Save,
  Loader2,
  Upload,
  Plus,
  Tag
} from "lucide-react";

// หมวดหมู่เริ่มต้น
const DEFAULT_CATEGORIES = [
  "ความรู้โกดัง",
  "เทคนิคการสร้าง",
  "วัสดุก่อสร้าง",
  "การดูแลรักษา",
  "ข่าวสาร",
];

export default function NewArticlePage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [categories, setCategories] = useState<string[]>(DEFAULT_CATEGORIES);
  const [newCategory, setNewCategory] = useState("");
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "",
    excerpt: "",
    content: "",
    image_url: "",
    author: "SP Warehouse",
    is_published: false,
  });

  // Fetch existing categories from database
  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await supabase
        .from("articles")
        .select("category")
        .not("category", "is", null);
      
      if (data) {
        const dbCategories = [...new Set(data.map(d => (d as { category: string }).category).filter(Boolean))];
        const allCategories = [...new Set([...DEFAULT_CATEGORIES, ...dbCategories])];
        setCategories(allCategories);
      }
    };
    fetchCategories();
  }, []);

  const addNewCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      setCategories([...categories, newCategory.trim()]);
      setFormData(prev => ({ ...prev, category: newCategory.trim() }));
      setNewCategory("");
      setShowNewCategory(false);
    }
  };

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/admin");
    }
  }, [user, authLoading, router]);

  const generateSlug = (title: string) => {
    // สร้าง slug จากภาษาอังกฤษ + random string
    const englishPart = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
    
    const randomPart = Math.random().toString(36).substring(2, 8);
    
    return englishPart ? `${englishPart}-${randomPart}` : randomPart;
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title,
      slug: prev.slug || generateSlug(title), // ไม่เปลี่ยน slug ถ้ามีอยู่แล้ว
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `articles/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("images")
      .upload(filePath, file);

    if (!uploadError) {
      const { data: { publicUrl } } = supabase.storage
        .from("images")
        .getPublicUrl(filePath);

      setFormData((prev) => ({ ...prev, image_url: publicUrl }));
    }

    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const insertData = {
      title: formData.title,
      slug: formData.slug || generateSlug(formData.title),
      category: formData.category || null,
      excerpt: formData.excerpt || null,
      content: formData.content,
      image_url: formData.image_url || null,
      author: formData.author || null,
      is_published: formData.is_published,
      published_at: formData.is_published ? new Date().toISOString() : null,
    };

    const { error } = await supabase.from("articles").insert(insertData as never);

    setSaving(false);

    if (!error) {
      router.push("/admin/articles");
    }
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
              href="/admin/articles"
              className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <h1 className="font-bold text-primary-900">เขียนบทความใหม่</h1>
          </div>
          <button
            onClick={handleSubmit}
            disabled={saving || !formData.title || !formData.content}
            className="flex items-center gap-2 bg-primary-900 hover:bg-primary-800 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Save className="w-5 h-5" />
            )}
            <span className="hidden sm:inline">บันทึก</span>
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              หัวข้อบทความ *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={handleTitleChange}
              required
              placeholder="ใส่หัวข้อบทความ"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-lg"
            />
            
            {/* Slug Input */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL Slug (ภาษาอังกฤษ) *
              </label>
              <div className="flex items-center gap-2">
                <span className="text-gray-500 text-sm">/articles/</span>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => {
                    const slug = e.target.value
                      .toLowerCase()
                      .replace(/[^a-z0-9-]/g, "")
                      .replace(/-+/g, "-");
                    setFormData((prev) => ({ ...prev, slug }));
                  }}
                  required
                  placeholder="my-article-slug"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-sm font-mono"
                />
              </div>
              <p className="mt-1 text-xs text-gray-400">ใช้ตัวอักษรภาษาอังกฤษพิมพ์เล็ก ตัวเลข และขีด (-) เท่านั้น</p>
            </div>
          </div>

          {/* Category */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Tag className="w-4 h-4 inline mr-1" />
              หมวดหมู่
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, category: cat }))}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    formData.category === cat
                      ? "bg-primary-900 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
              {!showNewCategory && (
                <button
                  type="button"
                  onClick={() => setShowNewCategory(true)}
                  className="px-3 py-1.5 rounded-full text-sm font-medium bg-accent-100 text-accent-700 hover:bg-accent-200 transition-all flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  เพิ่มหมวดหมู่
                </button>
              )}
            </div>
            {showNewCategory && (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="ชื่อหมวดหมู่ใหม่"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-sm"
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addNewCategory())}
                />
                <button
                  type="button"
                  onClick={addNewCategory}
                  className="px-4 py-2 bg-primary-900 text-white rounded-lg hover:bg-primary-800"
                >
                  เพิ่ม
                </button>
                <button
                  type="button"
                  onClick={() => setShowNewCategory(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
                >
                  ยกเลิก
                </button>
              </div>
            )}
          </div>

          {/* Image */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              รูปปก
            </label>
            {formData.image_url ? (
              <div className="relative">
                <img
                  src={formData.image_url}
                  alt=""
                  className="w-full h-48 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, image_url: "" }))}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
                >
                  ลบ
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                {uploading ? (
                  <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
                ) : (
                  <>
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500">คลิกเพื่อเลือกรูป</span>
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Excerpt */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              คำอธิบายสั้นๆ
            </label>
            <textarea
              value={formData.excerpt}
              onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
              rows={2}
              placeholder="เขียนคำอธิบายสั้นๆ สำหรับแสดงในหน้ารายการบทความ"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-none"
            />
          </div>

          {/* Content */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              เนื้อหา *
            </label>
            <RichTextEditor
              content={formData.content}
              onChange={(content) => setFormData((prev) => ({ ...prev, content }))}
              placeholder="เริ่มเขียนเนื้อหาบทความที่นี่... สามารถแทรกรูป จัดรูปแบบข้อความได้"
            />
          </div>

          {/* Settings */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="is_published"
                checked={formData.is_published}
                onChange={(e) => setFormData((prev) => ({ ...prev, is_published: e.target.checked }))}
                className="w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <label htmlFor="is_published" className="font-medium text-gray-700">
                เผยแพร่บทความทันที
              </label>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
