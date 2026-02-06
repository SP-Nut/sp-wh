"use client";

import { memo, useCallback, useState } from "react";
import Image from "next/image";
import { ZoomIn } from "lucide-react";
import type { WorkImage } from "@/lib/works-data";

interface WorkCardProps {
  image: WorkImage;
  onImageClick?: (image: WorkImage) => void;
}

export const WorkCard = memo(function WorkCard({ image, onImageClick }: WorkCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  
  const handleClick = useCallback(() => {
    if (onImageClick) {
      onImageClick(image);
    }
  }, [image, onImageClick]);

  return (
    <div
      className="group aspect-square bg-primary-100 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 cursor-pointer relative"
      onClick={handleClick}
    >
      {/* Image with Next.js optimization and caching */}
      <Image
        src={image.src}
        alt=""
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        className={`object-cover transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
      />
      
      {/* Loading placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-primary-100 animate-pulse" />
      )}
      
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-primary-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
          <ZoomIn className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
})

// Skeleton loader for WorkCard
export function WorkCardSkeleton() {
  return (
    <div className="aspect-square bg-gray-200 rounded-xl animate-pulse" />
  );
}
