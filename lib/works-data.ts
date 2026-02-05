import type { WorkCategory, ViewCategory } from "@/types";

// หมวดหมู่ประเภทงาน
export const WORK_CATEGORIES: WorkCategory[] = [
  {
    id: "warehouse",
    name: "โกดังสำเร็จรูป",
    description: "โกดังสำเร็จรูปคุณภาพสูง สำหรับเก็บสินค้า คลังสินค้า โรงงาน",
    icon: "Warehouse",
    count: 850,
  },
  {
    id: "roof",
    name: "หลังคาอเนกประสงค์",
    description: "หลังคาโครงเหล็ก ทนทาน กันแดดกันฝน สำหรับทุกประเภทงาน",
    icon: "Home",
    count: 320,
  },
  {
    id: "carport",
    name: "หลังคาที่จอดรถ",
    description: "หลังคาที่จอดรถ ออกแบบตามพื้นที่ ติดตั้งรวดเร็ว",
    icon: "Car",
    count: 210,
  },
  {
    id: "shop",
    name: "ร้านอเนกประสงค์",
    description: "ร้านค้าสำเร็จรูป พร้อมใช้งาน เปิดกิจการได้ทันที",
    icon: "Store",
    count: 120,
  },
];

// หมวดหมู่มุมมองผลงาน
export const VIEW_CATEGORIES: ViewCategory[] = [
  {
    id: "exterior",
    name: "โกดังภายนอก",
    description: "มุมมองภายนอกโกดังที่เสร็จสมบูรณ์",
    icon: "Building2",
  },
  {
    id: "interior",
    name: "โกดังภายใน",
    description: "มุมมองภายในโกดังพร้อมใช้งาน",
    icon: "Eye",
  },
  {
    id: "structure",
    name: "งานโครงสร้าง",
    description: "งานติดตั้งโครงสร้างเหล็กคุณภาพ",
    icon: "Layers",
  },
  {
    id: "design",
    name: "ออกแบบ 3D",
    description: "แบบ 3D ที่ออกแบบให้ลูกค้า",
    icon: "Ruler",
  },
];

// ประเภทรูปผลงาน - แต่ละรูปเป็น 1 item
export interface WorkImage {
  id: number;
  src: string;
  category: "warehouse" | "roof" | "carport" | "shop";
  viewCategory: "exterior" | "interior" | "structure" | "design";
}
