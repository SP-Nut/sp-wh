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
  Upload,
  X,
  Image as ImageIcon
} from "lucide-react";

interface WorkImage {
  id: string;
  image_url: string;
  category: string;
  view_category: string;
  is_active: boolean;
  created_at: string;
}

const CATEGORIES = [
  { value: "warehouse", label: "โกดังสำเร็จรูป" },
  { value: "roof", label: "หลังคาอเนกประสงค์" },
  { value: "carport", label: "หลังคาที่จอดรถ" },
  { value: "shop", label: "ร้านอเนกประสงค์" },
];

const VIEW_CATEGORIES = [
  { value: "exterior", label: "ภายนอก" },
  { value: "interior", label: "ภายใน" },
  { value: "structure", label: "โครงสร้าง" },
  { value: "design", label: "แบบ 3D" },
];

export default function AdminWorksPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [works, setWorks] = useState<WorkImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("warehouse");
  const [selectedView, setSelectedView] = useState("exterior");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/admin");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    const fetchWorks = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("works")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setWorks(data);
      }
      setLoading(false);
    };
    
    fetchWorks();
  }, [refreshKey]);

  const refreshWorks = () => setRefreshKey(prev => prev + 1);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);

    for (const file of files) {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `works/${fileName}`;

      // Upload image to storage
      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(filePath, file);

      if (uploadError) {
        console.error("Upload error:", uploadError);
        continue;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from("images")
        .getPublicUrl(filePath);

      // Insert to database
      const insertData = {
        image_url: publicUrl,
        category: selectedCategory,
        view_category: selectedView,
        is_active: true,
      };
      await supabase.from("works").insert(insertData as never);
    }

    setUploading(false);
    setShowUploadModal(false);
    refreshWorks();
  };

  const handleDelete = async (id: string, imageUrl: string) => {
    if (!confirm("ต้องการลบรูปนี้?")) return;

    // Delete from database
    await supabase.from("works").delete().eq("id", id);

    // Try to delete from storage
    const path = imageUrl.split("/images/")[1];
    if (path) {
      await supabase.storage.from("images").remove([path]);
    }

    refreshWorks();
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
            <h1 className="font-bold text-primary-900">จัดการผลงาน</h1>
          </div>
          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center gap-2 bg-primary-900 hover:bg-primary-800 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span className="hidden sm:inline">เพิ่มรูป</span>
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
          </div>
        ) : works.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl">
            <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">ยังไม่มีรูปผลงาน</p>
            <button
              onClick={() => setShowUploadModal(true)}
              className="bg-primary-900 hover:bg-primary-800 text-white px-6 py-2 rounded-lg transition-colors"
            >
              เพิ่มรูปแรก
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {works.map((work) => (
              <div
                key={work.id}
                className="relative group aspect-square bg-white rounded-xl overflow-hidden shadow-sm"
              >
                <img
                  src={work.image_url}
                  alt=""
                  className="w-full h-full object-cover"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    onClick={() => handleDelete(work.id, work.image_url)}
                    className="w-10 h-10 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                {/* Category Badge */}
                <div className="absolute bottom-2 left-2 right-2 flex gap-1">
                  <span className="bg-primary-900/80 text-white text-xs px-2 py-0.5 rounded">
                    {CATEGORIES.find((c) => c.value === work.category)?.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowUploadModal(false)} />
          <div className="relative bg-white rounded-2xl p-6 w-full max-w-md">
            <button
              onClick={() => setShowUploadModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-xl font-bold text-primary-900 mb-6">เพิ่มรูปผลงาน</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ประเภทงาน
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  มุมมอง
                </label>
                <select
                  value={selectedView}
                  onChange={(e) => setSelectedView(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                >
                  {VIEW_CATEGORIES.map((view) => (
                    <option key={view.value} value={view.value}>
                      {view.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  เลือกรูป (เลือกได้หลายรูป)
                </label>
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
                    multiple
                    onChange={handleUpload}
                    disabled={uploading}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
