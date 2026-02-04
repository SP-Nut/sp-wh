"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { WorkCard } from "@/components/works";
import { ImageLightbox } from "@/components/works/image-lightbox";
import {
  WORK_CATEGORIES,
  VIEW_CATEGORIES,
  WORKS_IMAGES,
  type WorkImage,
} from "@/lib/works-data";
import { supabase } from "@/lib/supabase/client";
import type { Database } from "@/types/database";
import { Button } from "@/components/ui";
import { SITE_CONFIG } from "@/lib/constants";
import { Warehouse, Home, Car, Store, Building2, Eye, Layers, Ruler } from "lucide-react";
import { cn } from "@/lib/utils";

type WorkRow = Database["public"]["Tables"]["works"]["Row"];

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

export function WorksGallery() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  
  // Initialize category from URL param
  const initialCategory = categoryParam && ["warehouse", "roof", "carport", "shop"].includes(categoryParam) 
    ? categoryParam 
    : "all";
  
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedView, setSelectedView] = useState<string>("all");
  const [selectedImage, setSelectedImage] = useState<WorkImage | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [dbImages, setDbImages] = useState<WorkImage[]>([]);

  // Fetch images from database
  useEffect(() => {
    const fetchImages = async () => {
      const { data, error } = await supabase
        .from("works")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (!error && data) {
        const images: WorkImage[] = (data as WorkRow[]).map((item, index) => ({
          id: index + 1,
          src: item.image_url,
          category: item.category as WorkImage["category"],
          viewCategory: item.view_category as WorkImage["viewCategory"],
        }));
        setDbImages(images);
      }
    };

    fetchImages();
  }, []);

  // Use database images if available, otherwise use static data
  const allImages = dbImages.length > 0 ? dbImages : WORKS_IMAGES;

  // Filter images based on selected filters
  const filteredImages = useMemo(() => {
    return allImages.filter((img) => {
      const matchesCategory = selectedCategory === "all" || img.category === selectedCategory;
      const matchesView = selectedView === "all" || img.viewCategory === selectedView;
      return matchesCategory && matchesView;
    });
  }, [selectedCategory, selectedView, allImages]);

  const handleImageClick = (image: WorkImage) => {
    setSelectedImage(image);
    setLightboxOpen(true);
  };

  const clearFilters = () => {
    setSelectedCategory("all");
    setSelectedView("all");
  };

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
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all",
                    selectedCategory === "all"
                      ? "bg-primary-900 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  )}
                >
                  ทั้งหมด
                </button>
                {WORK_CATEGORIES.map((cat) => {
                  const Icon = CATEGORY_ICONS[cat.id as keyof typeof CATEGORY_ICONS];
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={cn(
                        "px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2",
                        selectedCategory === cat.id
                          ? "bg-primary-900 text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      {cat.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* View Filter */}
            <div>
              <p className="text-sm font-medium text-gray-500 mb-3">มุมมอง</p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedView("all")}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-sm font-medium transition-all border",
                    selectedView === "all"
                      ? "bg-accent-50 border-accent-300 text-accent-700"
                      : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                  )}
                >
                  ทั้งหมด
                </button>
                {VIEW_CATEGORIES.map((view) => {
                  const Icon = VIEW_ICONS[view.id as keyof typeof VIEW_ICONS];
                  return (
                    <button
                      key={view.id}
                      onClick={() => setSelectedView(view.id)}
                      className={cn(
                        "px-3 py-1.5 rounded-lg text-sm font-medium transition-all border flex items-center gap-1.5",
                        selectedView === view.id
                          ? "bg-accent-50 border-accent-300 text-accent-700"
                          : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      {view.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Results Info */}
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

          {/* Images Grid */}
          {filteredImages.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {filteredImages.map((image) => (
                <WorkCard
                  key={image.id}
                  image={image}
                  onImageClick={handleImageClick}
                />
              ))}
            </div>
          ) : (
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
        onClose={() => setLightboxOpen(false)}
      />
    </>
  );
}
