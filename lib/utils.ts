import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPhone(phone: string) {
  return phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    minimumFractionDigits: 0,
  }).format(price);
}

/**
 * Optimize Cloudinary URL with transformations
 * @param url - Original Cloudinary URL
 * @param width - Target width
 * @param height - Target height (optional)
 * @param options - Additional options
 */
export function optimizeCloudinaryUrl(
  url: string | null | undefined,
  width: number,
  height?: number,
  options: { quality?: string; format?: string; crop?: string } = {}
): string {
  if (!url) return "";
  if (!url.includes("cloudinary.com")) return url;

  const { quality = "auto", format = "auto", crop = "fill" } = options;
  const heightPart = height ? `,h_${height}` : "";
  const transform = `w_${width}${heightPart},c_${crop},q_${quality},f_${format}`;

  return url.replace("/upload/", `/upload/${transform}/`);
}
