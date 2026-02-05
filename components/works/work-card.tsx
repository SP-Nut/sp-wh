"use client";

import { ZoomIn } from "lucide-react";
import type { WorkImage } from "@/lib/works-data";

interface WorkCardProps {
  image: WorkImage;
  onImageClick?: (image: WorkImage) => void;
}

export function WorkCard({ image, onImageClick }: WorkCardProps) {
  const handleClick = () => {
    if (onImageClick) {
      onImageClick(image);
    }
  };

  return (
    <div
      className="group aspect-square bg-primary-100 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer relative"
      onClick={handleClick}
    >
      {/* Image from Database */}
      <img
        src={image.src}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
      
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-primary-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
          <ZoomIn className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
}

// Skeleton loader for WorkCard
export function WorkCardSkeleton() {
  return (
    <div className="aspect-square bg-gray-200 rounded-xl animate-pulse" />
  );
}
