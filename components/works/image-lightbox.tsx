"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import type { WorkImage } from "@/lib/works-data";

interface ImageLightboxProps {
  image: WorkImage | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ImageLightbox({ image, isOpen, onClose }: ImageLightboxProps) {
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

        {/* Image from Database */}
        <img
          src={image.src}
          alt=""
          className="w-full max-h-[80vh] object-contain rounded-xl"
        />
      </div>
    </div>
  );
}
