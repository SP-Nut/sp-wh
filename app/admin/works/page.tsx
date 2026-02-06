"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState, useTransition, useCallback, memo } from "react";
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
  Image as ImageIcon,
  Edit3,
  Check,
  CheckCircle,
  Circle,
  XCircle
} from "lucide-react";
import { cn, optimizeCloudinaryUrl } from "@/lib/utils";

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

const ITEMS_PER_PAGE = 20;

// Memoized Work Card Component
const WorkCard = memo(function WorkCard({ 
  work, 
  onDelete, 
  onEdit,
  isSelecting,
  isSelected,
  onToggleSelect
}: { 
  work: WorkImage; 
  onDelete: (id: string, url: string) => void;
  onEdit: (work: WorkImage) => void;
  isSelecting: boolean;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
}) {
  const handleClick = useCallback(() => {
    if (isSelecting) onToggleSelect(work.id);
  }, [isSelecting, onToggleSelect, work.id]);

  const handleEditClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(work);
  }, [onEdit, work]);

  const handleDeleteClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(work.id, work.image_url);
  }, [onDelete, work.id, work.image_url]);

  const categoryLabel = CATEGORIES.find((c) => c.value === work.category)?.label || work.category;
  const viewLabel = VIEW_CATEGORIES.find((v) => v.value === work.view_category)?.label || work.view_category;

  return (
    <div 
      className={cn(
        "relative group aspect-square bg-white rounded-xl overflow-hidden shadow-sm cursor-pointer contain-paint",
        isSelected && "ring-4 ring-red-500"
      )}
      onClick={handleClick}
    >
      <img
        src={optimizeCloudinaryUrl(work.image_url, 400, 400)}
        alt=""
        className="w-full h-full object-cover"
        loading="lazy"
        decoding="async"
      />
      {/* Selection Checkbox */}
      {isSelecting && (
        <div className="absolute top-2 left-2 z-10">
          {isSelected ? (
            <CheckCircle className="w-7 h-7 text-red-500 bg-white rounded-full" />
          ) : (
            <Circle className="w-7 h-7 text-gray-400 bg-white/80 rounded-full" />
          )}
        </div>
      )}
      {/* Overlay - only show when not selecting */}
      {!isSelecting && (
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex items-center justify-center gap-2 pointer-events-none group-hover:pointer-events-auto will-change-opacity">
          <button
            onClick={handleEditClick}
            className="w-10 h-10 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center"
            title="แก้ไขหมวดหมู่"
          >
            <Edit3 className="w-5 h-5" />
          </button>
          <button
            onClick={handleDeleteClick}
            className="w-10 h-10 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center"
            title="ลบรูป"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      )}
      {/* Category Badge */}
      <div className="absolute bottom-2 left-2 right-2 flex gap-1 flex-wrap">
        <span className="bg-primary-900/80 text-white text-xs px-2 py-0.5 rounded">
          {categoryLabel}
        </span>
        <span className="bg-accent-500/80 text-white text-xs px-2 py-0.5 rounded">
          {viewLabel}
        </span>
      </div>
    </div>
  );
});

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
  
  // New states for optimization
  const [filterCategory, setFilterCategory] = useState("warehouse");
  const [filterView, setFilterView] = useState("design");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [isPending, startTransition] = useTransition();
  
  // Edit modal states
  const [editingWork, setEditingWork] = useState<WorkImage | null>(null);
  const [editCategory, setEditCategory] = useState("");
  const [editViewCategory, setEditViewCategory] = useState("");
  const [saving, setSaving] = useState(false);
  
  // Multi-select states
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [deleting, setDeleting] = useState(false);

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
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false });

      if (!error && data) {
        setWorks(data);
      }
      setLoading(false);
    };
    
    fetchWorks();
  }, [refreshKey]);

  const refreshWorks = () => setRefreshKey(prev => prev + 1);

  // Filter works by category and view
  const filteredWorks = works.filter(w => {
    const matchCategory = filterCategory === "all" || w.category === filterCategory;
    const matchView = filterView === "all" || w.view_category === filterView;
    return matchCategory && matchView;
  });
  
  const visibleWorks = filteredWorks.slice(0, visibleCount);
  const hasMore = filteredWorks.length > visibleCount;

  const handleFilterChange = useCallback((cat: string) => {
    setVisibleCount(ITEMS_PER_PAGE);
    startTransition(() => {
      setFilterCategory(cat);
    });
  }, []);

  const handleViewFilterChange = useCallback((view: string) => {
    setVisibleCount(ITEMS_PER_PAGE);
    startTransition(() => {
      setFilterView(view);
    });
  }, []);

  const loadMore = useCallback(() => {
    startTransition(() => {
      setVisibleCount(prev => prev + ITEMS_PER_PAGE);
    });
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);

    for (const file of files) {
      try {
        // Upload to Cloudinary via API
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", "works");

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Upload error:", errorData);
          alert(`Upload failed: ${errorData.error || "Unknown error"}`);
          continue;
        }

        const { url } = await response.json();

        // Insert to database
        const insertData = {
          image_url: url,
          category: selectedCategory,
          view_category: selectedView,
          is_active: true,
        };
        await supabase.from("works").insert(insertData as never);
      } catch (err) {
        console.error("Upload error:", err);
      }
    }

    setUploading(false);
    setShowUploadModal(false);
    refreshWorks();
  };

  const handleDelete = useCallback(async (id: string, imageUrl: string) => {
    if (!confirm("ต้องการลบรูปนี้?")) return;

    // Delete from database
    await supabase.from("works").delete().eq("id", id);

    // Delete from Cloudinary
    if (imageUrl.includes("cloudinary.com")) {
      // Extract public_id from Cloudinary URL
      // URL format: .../upload/v123/sp-warehouse/works/filename.jpg
      const match = imageUrl.match(/\/upload\/(?:v\d+\/)?(sp-warehouse\/.+?)(?:\.[^.]+)?$/);
      if (match) {
        const publicId = match[1];
        await fetch("/api/upload", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ publicId }),
        });
      }
    }

    refreshWorks();
  }, []);

  // Edit handlers
  const handleEdit = useCallback((work: WorkImage) => {
    setEditingWork(work);
    setEditCategory(work.category);
    setEditViewCategory(work.view_category);
  }, []);

  const handleSaveEdit = async () => {
    if (!editingWork) return;
    
    setSaving(true);
    const updateData = { 
      category: editCategory, 
      view_category: editViewCategory 
    };
    const { error } = await supabase
      .from("works")
      .update(updateData as never)
      .eq("id", editingWork.id);

    if (!error) {
      // Update local state immediately
      setWorks(prev => prev.map(w => 
        w.id === editingWork.id 
          ? { ...w, category: editCategory, view_category: editViewCategory }
          : w
      ));
    }
    
    setSaving(false);
    setEditingWork(null);
  };

  const handleCloseEdit = useCallback(() => {
    setEditingWork(null);
  }, []);

  // Multi-select handlers
  const toggleSelectMode = useCallback(() => {
    setIsSelecting(prev => !prev);
    setSelectedIds(new Set());
  }, []);

  const toggleSelect = useCallback((id: string) => {
    setSelectedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }, []);

  const selectAll = () => {
    setSelectedIds(new Set(filteredWorks.map(w => w.id)));
  };

  const deselectAll = () => {
    setSelectedIds(new Set());
  };

  const handleBulkDelete = async () => {
    if (selectedIds.size === 0) return;
    if (!confirm(`ต้องการลบ ${selectedIds.size} รูป?`)) return;

    setDeleting(true);
    
    // Get works to delete
    const worksToDelete = works.filter(w => selectedIds.has(w.id));
    
    // Delete from database
    const ids = Array.from(selectedIds);
    await supabase.from("works").delete().in("id", ids);
    
    // Delete from Cloudinary
    for (const work of worksToDelete) {
      if (work.image_url.includes("cloudinary.com")) {
        const match = work.image_url.match(/\/upload\/(?:v\d+\/)?(sp-warehouse\/.+?)(?:\.[^.]+)?$/);
        if (match) {
          const publicId = match[1];
          await fetch("/api/upload", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ publicId }),
          });
        }
      }
    }
    
    setDeleting(false);
    setIsSelecting(false);
    setSelectedIds(new Set());
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
          <div className="flex items-center gap-2">
            {works.length > 0 && (
              <button
                onClick={toggleSelectMode}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors",
                  isSelecting
                    ? "bg-gray-200 text-gray-700"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                )}
              >
                {isSelecting ? (
                  <>
                    <XCircle className="w-5 h-5" />
                    <span className="hidden sm:inline">ยกเลิก</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    <span className="hidden sm:inline">เลือกหลายรูป</span>
                  </>
                )}
              </button>
            )}
            <button
              onClick={() => setShowUploadModal(true)}
              className="flex items-center gap-2 bg-primary-900 hover:bg-primary-800 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">เพิ่มรูป</span>
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Filter Tabs */}
        {works.length > 0 && (
          <div className="bg-white rounded-xl p-4 mb-6 shadow-sm space-y-4">
            {/* Category Filter */}
            <div>
              <p className="text-sm font-medium text-gray-500 mb-3">กรองตามประเภท</p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleFilterChange("all")}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                    filterCategory === "all"
                      ? "bg-primary-900 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  )}
                >
                  ทั้งหมด ({filterView === "all" ? works.length : works.filter(w => w.view_category === filterView).length})
                </button>
                {CATEGORIES.map((cat) => {
                  // Count filtered by current view filter
                  const count = works.filter(w => 
                    w.category === cat.value && 
                    (filterView === "all" || w.view_category === filterView)
                  ).length;
                  return (
                    <button
                      key={cat.value}
                      onClick={() => handleFilterChange(cat.value)}
                      className={cn(
                        "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                        filterCategory === cat.value
                          ? "bg-primary-900 text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      )}
                    >
                      {cat.label} ({count})
                    </button>
                  );
                })}
              </div>
            </div>
            
            {/* View Filter */}
            <div>
              <p className="text-sm font-medium text-gray-500 mb-3">กรองตามมุมมอง</p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleViewFilterChange("all")}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                    filterView === "all"
                      ? "bg-accent-500 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  )}
                >
                  ทั้งหมด ({filterCategory === "all" ? works.length : works.filter(w => w.category === filterCategory).length})
                </button>
                {VIEW_CATEGORIES.map((view) => {
                  // Count filtered by current category filter
                  const count = works.filter(w => 
                    w.view_category === view.value && 
                    (filterCategory === "all" || w.category === filterCategory)
                  ).length;
                  return (
                    <button
                      key={view.value}
                      onClick={() => handleViewFilterChange(view.value)}
                      className={cn(
                        "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                        filterView === view.value
                          ? "bg-accent-500 text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      )}
                    >
                      {view.label} ({count})
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

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
          <>
            {/* Results count & Selection controls */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-600">
                แสดง <span className="font-semibold">{visibleWorks.length}</span> จาก {filteredWorks.length} รูป
                {isSelecting && selectedIds.size > 0 && (
                  <span className="ml-2 text-red-600 font-medium">
                    (เลือก {selectedIds.size} รูป)
                  </span>
                )}
              </p>
              {isSelecting && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={selectedIds.size === filteredWorks.length ? deselectAll : selectAll}
                    className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                  >
                    {selectedIds.size === filteredWorks.length ? "ยกเลิกทั้งหมด" : "เลือกทั้งหมด"}
                  </button>
                  {selectedIds.size > 0 && (
                    <button
                      onClick={handleBulkDelete}
                      disabled={deleting}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors disabled:opacity-50"
                    >
                      {deleting ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                      ลบ {selectedIds.size} รูป
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Grid */}
            <div className={cn(
              "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 transition-opacity duration-150",
              isPending && "opacity-60"
            )}>
              {visibleWorks.map((work) => (
                <WorkCard
                  key={work.id}
                  work={work}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                  isSelecting={isSelecting}
                  isSelected={selectedIds.has(work.id)}
                  onToggleSelect={toggleSelect}
                />
              ))}
            </div>

            {/* Load More */}
            {hasMore && (
              <div className="text-center mt-8">
                <button
                  onClick={loadMore}
                  disabled={isPending}
                  className="bg-white hover:bg-gray-50 text-primary-900 px-6 py-2 rounded-lg border border-gray-200 transition-colors disabled:opacity-50"
                >
                  {isPending ? "กำลังโหลด..." : `ดูเพิ่มเติม (${filteredWorks.length - visibleCount} รูป)`}
                </button>
              </div>
            )}
          </>
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

      {/* Edit Modal */}
      {editingWork && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={handleCloseEdit} />
          <div className="relative bg-white rounded-2xl p-6 w-full max-w-md">
            <button
              onClick={handleCloseEdit}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-xl font-bold text-primary-900 mb-6">แก้ไขหมวดหมู่</h2>

            {/* Preview */}
            <div className="mb-6">
              <img
                src={optimizeCloudinaryUrl(editingWork.image_url, 800, 450)}
                alt=""
                className="w-full aspect-video object-cover rounded-lg"
              />
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ประเภทงาน
                </label>
                <select
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value)}
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
                  value={editViewCategory}
                  onChange={(e) => setEditViewCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                >
                  {VIEW_CATEGORIES.map((view) => (
                    <option key={view.value} value={view.value}>
                      {view.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleCloseEdit}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  ยกเลิก
                </button>
                <button
                  onClick={handleSaveEdit}
                  disabled={saving}
                  className="flex-1 px-4 py-2 bg-primary-900 hover:bg-primary-800 text-white rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {saving ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Check className="w-5 h-5" />
                  )}
                  บันทึก
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
