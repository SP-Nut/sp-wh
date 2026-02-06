import type { WorkImage } from "@/lib/works-data";

// Simple in-memory cache for works data
let cachedWorks: WorkImage[] | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export function getCachedWorks(): WorkImage[] | null {
  if (cachedWorks && Date.now() - cacheTimestamp < CACHE_DURATION) {
    return cachedWorks;
  }
  return null;
}

export function setCachedWorks(works: WorkImage[]): void {
  cachedWorks = works;
  cacheTimestamp = Date.now();
}

export function invalidateWorksCache(): void {
  cachedWorks = null;
  cacheTimestamp = 0;
}
