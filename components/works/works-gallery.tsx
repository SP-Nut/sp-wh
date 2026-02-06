"use client";

import { useState, useMemo, useEffect, useTransition, useCallback, memo } from "react";
import { useSearchParams } from "next/navigation";
import { WorkCard, WorkCardSkeleton } from "@/components/works/work-card";
import { ImageLightbox } from "@/components/works/image-lightbox";
import {
  WORK_CATEGORIES,
  VIEW_CATEGORIES,
  type WorkImage,
} from "@/lib/works-data";
import { supabase } from "@/lib/supabase/client";
import type { Database } from "@/types/database";
import { Button } from "@/components/ui";
import { SITE_CONFIG } from "@/lib/constants";
import { getCachedWorks, setCachedWorks } from "@/lib/cache/works-cache";
import { Warehouse, Home, Car, Store, Building2, Eye, Layers, Ruler, Loader2, ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";

type WorkRow = Database["public"]["Tables"]["works"]["Row"];

const ITEMS_PER_PAGE = 8;

// Icon mapping
const CATEGORY_ICONS = {
  warehouse: Warehouse,
  roof: Home,
  carport: Car,
  shop: Store,
};

const VIEW_ICONS = {
  exterior: Building2,
  interior: Eye,
  structure: Layers,
  design: Ruler,
};

// Memoized filter button component
const FilterButton = memo(function FilterButton({ 
  isActive, 
  onClick, 
  children,
  className
}: { 
  isActive: boolean; 
  onClick: () => void; 
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-2 rounded-full text-sm font-medium transition-colors",
        isActive
          ? "bg-primary-900 text-white"
          : "bg-gray-100 text-gray-600 hover:bg-gray-200",
        className
      )}
    >
      {children}
    </button>
  );
});

// Memoized view filter button
const ViewFilterButton = memo(function ViewFilterButton({ 
  isActive, 
  onClick, 
  children 
}: { 
  isActive: boolean; 
  onClick: () => void; 
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border",
        isActive
          ? "bg-accent-50 border-accent-300 text-accent-700"
          : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
      )}
    >
      {children}
    </button>
  );
});

export function WorksGallery() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  
  // Initialize category from URL param
  const initialCategory = categoryParam && ["warehouse", "roof", "carport", "shop"].includes(categoryParam) 
    ? categoryParam 
    : "warehouse"; // Default to warehouse
  
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedView, setSelectedView] = useState<string>("design"); // Default to 3D design
  const [selectedImage, setSelectedImage] = useState<WorkImage | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [dbImages, setDbImages] = useState<WorkImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  // Fetch images from database with caching
  useEffect(() => {
    const fetchImages = async () => {
      // Check cache first
      const cached = getCachedWorks();
      if (cached) {
        setDbImages(cached);
        setIsLoading(false);
        return;
      }
      
      setIsLoading(true);
      setError(null);
      
      try {
        const { data, error: fetchError } = await supabase
          .from("works")
          .select("*")
          .eq("is_active", true)
          .order("created_at", { ascending: false });

        if (fetchError) {
          console.error("Error fetching works:", fetchError);
          setError("ไม่สามารถโหลดข้อมูลได้ กรุณาลองใหม่อีกครั้ง");
          return;
        }

        if (data) {
          const images: WorkImage[] = (data as WorkRow[]).map((item, index) => ({
            id: index + 1,
            src: item.image_url,
            category: item.category as WorkImage["category"],
            viewCategory: item.view_category as WorkImage["viewCategory"],
          }));
          setDbImages(images);
          setCachedWorks(images); // Cache the data
        }
      } catch (err) {
        console.error("Error:", err);
        setError("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  // Use database images only
  const allImages = dbImages;

  // Filter images based on selected filters
  const filteredImages = useMemo(() => {
    return allImages.filter((img) => {
      const matchesCategory = selectedCategory === "all" || img.category === selectedCategory;
      const matchesView = selectedView === "all" || img.viewCategory === selectedView;
      return matchesCategory && matchesView;
    });
  }, [selectedCategory, selectedView, allImages]);

  const handleImageClick = useCallback((image: WorkImage) => {
    setSelectedImage(image);
    setLightboxOpen(true);
  }, []);

  const handleCategoryChange = useCallback((category: string) => {
    setVisibleCount(ITEMS_PER_PAGE);
    startTransition(() => {
      setSelectedCategory(category);
    });
  }, []);

  const handleViewChange = useCallback((view: string) => {
    setVisibleCount(ITEMS_PER_PAGE);
    startTransition(() => {
      setSelectedView(view);
    });
  }, []);

  const clearFilters = useCallback(() => {
    setVisibleCount(ITEMS_PER_PAGE);
    startTransition(() => {
      setSelectedCategory("all");
      setSelectedView("all");
    });
  }, []);

  const loadMore = useCallback(() => {
    startTransition(() => {
      setVisibleCount(prev => prev + ITEMS_PER_PAGE);
    });
  }, []);

  const handleCloseLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  // Visible images with pagination
  const visibleImages = useMemo(() => {
    return filteredImages.slice(0, visibleCount);
  }, [filteredImages, visibleCount]);

  const hasMore = filteredImages.length > visibleCount;

  const hasFilters = selectedCategory !== "all" || selectedView !== "all";

  return (
    <>
      {/* Gallery Section */}
      <section className="py-10 sm:py-14 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <p className="text-accent-500 font-semibold mb-2">ผลงานของเรา</p>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary-900 mb-3">
              ตัวอย่างผลงาน
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              เลือกดูผลงานตามประเภทหรือมุมมองที่ต้องการ
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="bg-white rounded-xl p-4 sm:p-6 mb-8 shadow-sm">
            {/* Category Filter */}
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-500 mb-3">ประเภทงาน</p>
              <div className="flex flex-wrap gap-2">
                <FilterButton
                  isActive={selectedCategory === "all"}
                  onClick={() => handleCategoryChange("all")}
                >
                  ทั้งหมด
                </FilterButton>
                {WORK_CATEGORIES.map((cat) => {
                  const Icon = CATEGORY_ICONS[cat.id as keyof typeof CATEGORY_ICONS];
                  return (
                    <FilterButton
                      key={cat.id}
                      isActive={selectedCategory === cat.id}
                      onClick={() => handleCategoryChange(cat.id)}
                      className="flex items-center gap-2"
                    >
                      <Icon className="w-4 h-4" />
                      {cat.name}
                    </FilterButton>
                  );
                })}
              </div>
            </div>

            {/* View Filter */}
            <div>
              <p className="text-sm font-medium text-gray-500 mb-3">มุมมอง</p>
              <div className="flex flex-wrap gap-2">
                <ViewFilterButton
                  isActive={selectedView === "all"}
                  onClick={() => handleViewChange("all")}
                >
                  ทั้งหมด
                </ViewFilterButton>
                {VIEW_CATEGORIES.map((view) => {
                  const Icon = VIEW_ICONS[view.id as keyof typeof VIEW_ICONS];
                  return (
                    <ViewFilterButton
                      key={view.id}
                      isActive={selectedView === view.id}
                      onClick={() => handleViewChange(view.id)}
                    >
                      <span className="flex items-center gap-1.5">
                        <Icon className="w-4 h-4" />
                        {view.name}
                      </span>
                    </ViewFilterButton>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Results Info */}
          {!isLoading && !error && (
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                แสดง <span className="font-semibold text-primary-900">{filteredImages.length}</span> รูป
              </p>
              {hasFilters && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  ล้างตัวกรอง
                </button>
              )}
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="mb-6">
              <div className="flex items-center justify-center gap-3 py-8">
                <Loader2 className="w-6 h-6 animate-spin text-primary-600" />
                <span className="text-gray-600">กำลังโหลดผลงาน...</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <WorkCardSkeleton key={i} />
                ))}
              </div>
            </div>
          )}

          {/* Error State */}
          {error && !isLoading && (
            <div className="text-center py-16 bg-white rounded-xl">
              <div className="text-red-500 mb-4">
                <ImageOff className="w-12 h-12 mx-auto mb-2" />
                <p>{error}</p>
              </div>
              <Button 
                variant="outline" 
                onClick={() => window.location.reload()}
              >
                ลองใหม่อีกครั้ง
              </Button>
            </div>
          )}

          {/* Empty State - No data in database */}
          {!isLoading && !error && allImages.length === 0 && (
            <div className="text-center py-16 bg-white rounded-xl">
              <ImageOff className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 mb-2 text-lg font-medium">ยังไม่มีผลงานในระบบ</p>
              <p className="text-gray-400 mb-6">กรุณาเพิ่มผลงานผ่านระบบจัดการเนื้อหา</p>
              <Button href={SITE_CONFIG.lineUrl} external>
                ติดต่อเราเพื่อดูผลงาน
              </Button>
            </div>
          )}

          {/* Images Grid */}
          {!isLoading && !error && filteredImages.length > 0 && (
            <>
              <div 
                className={cn(
                  "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4",
                  isPending && "opacity-60"
                )}
                style={{ contentVisibility: "auto", containIntrinsicSize: "0 500px" }}
              >
                {visibleImages.map((image) => (
                  <WorkCard
                    key={image.id}
                    image={image}
                    onImageClick={handleImageClick}
                  />
                ))}
              </div>
              
              {/* Load More Button */}
              {hasMore && (
                <div className="text-center mt-8">
                  <Button
                    variant="outline"
                    onClick={loadMore}
                    disabled={isPending}
                  >
                    {isPending ? "กำลังโหลด..." : `ดูเพิ่มเติม (${filteredImages.length - visibleCount} รูป)`}
                  </Button>
                </div>
              )}
            </>
          )}

          {/* No results for filter */}
          {!isLoading && !error && allImages.length > 0 && filteredImages.length === 0 && (
            <div className="text-center py-16 bg-white rounded-xl">
              <p className="text-gray-500 mb-4">ไม่พบรูปในหมวดหมู่ที่เลือก</p>
              <Button variant="outline" onClick={clearFilters}>
                ดูทั้งหมด
              </Button>
            </div>
          )}

          {/* CTA */}
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              ต้องการดูผลงานเพิ่มเติม? ติดต่อเราเพื่อรับแคตตาล็อก
            </p>
            <Button href={SITE_CONFIG.lineUrl} external>
              ขอดูผลงานเพิ่มเติม
            </Button>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <ImageLightbox
        image={selectedImage}
        isOpen={lightboxOpen}
        onClose={handleCloseLightbox}
      />
    </>
  );
}
