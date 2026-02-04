export type { Database } from "./database";

// Work/Portfolio Types
export type WorkCategoryId = "warehouse" | "roof" | "carport" | "shop";
export type ViewCategoryId = "exterior" | "interior" | "structure" | "design";

export interface WorkCategory {
  id: WorkCategoryId;
  name: string;
  description: string;
  icon: string;
  count: number;
}

export interface ViewCategory {
  id: ViewCategoryId;
  name: string;
  description: string;
  icon: string;
}
