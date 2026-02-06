"use client";

import { useEffect, memo, useState } from "react";
import Image from "next/image";
import { X, Loader2 } from "lucide-react";
import type { WorkImage } from "@/lib/works-data";

interface ImageLightboxProps {
  image: WorkImage | null;
  isOpen: boolean;
  onClose: () => void;
}

// Separate image component that resets via key
const LightboxImage = memo(function LightboxImage({ src }: { src: string }) {
  const [isLoaded, setIsLoaded] = useState(false);
  
  return (
    <div className="relative w-full aspect-video">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-white animate-spin" />
        </div>
      )}
      <Image
        src={src}
        alt=""
        fill
        sizes="(max-width: 1024px) 100vw, 80vw"
        className={`object-contain rounded-xl transition-opacity duration-200 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        priority
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
});

export const ImageLightbox = memo(function ImageLightbox({ image, isOpen, onClose }: ImageLightboxProps) {
  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !image) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/90"
        onClick={onClose}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white/80 hover:text-white transition-colors p-2"
          aria-label="ปิด"
        >
          <X className="w-8 h-8" />
        </button>

        {/* Image - key prop resets the component when src changes */}
        <LightboxImage key={image.src} src={image.src} />
      </div>
    </div>
  );
});
