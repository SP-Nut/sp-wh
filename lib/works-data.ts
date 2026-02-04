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

// ข้อมูลรูปผลงาน - แต่ละรูปแยกกัน
export const WORKS_IMAGES: WorkImage[] = [
  // โกดังสำเร็จรูป - ภายนอก
  { id: 1, src: "/images/works/warehouse-1.jpg", category: "warehouse", viewCategory: "exterior" },
  { id: 2, src: "/images/works/warehouse-2.jpg", category: "warehouse", viewCategory: "exterior" },
  { id: 3, src: "/images/works/warehouse-3.jpg", category: "warehouse", viewCategory: "exterior" },
  { id: 4, src: "/images/works/warehouse-4.jpg", category: "warehouse", viewCategory: "exterior" },
  { id: 5, src: "/images/works/warehouse-5.jpg", category: "warehouse", viewCategory: "exterior" },
  { id: 6, src: "/images/works/warehouse-6.jpg", category: "warehouse", viewCategory: "exterior" },
  
  // โกดังสำเร็จรูป - ภายใน
  { id: 7, src: "/images/works/warehouse-interior-1.jpg", category: "warehouse", viewCategory: "interior" },
  { id: 8, src: "/images/works/warehouse-interior-2.jpg", category: "warehouse", viewCategory: "interior" },
  { id: 9, src: "/images/works/warehouse-interior-3.jpg", category: "warehouse", viewCategory: "interior" },
  
  // โกดังสำเร็จรูป - โครงสร้าง
  { id: 10, src: "/images/works/warehouse-structure-1.jpg", category: "warehouse", viewCategory: "structure" },
  { id: 11, src: "/images/works/warehouse-structure-2.jpg", category: "warehouse", viewCategory: "structure" },
  
  // โกดังสำเร็จรูป - แบบ 3D
  { id: 12, src: "/images/works/warehouse-design-1.jpg", category: "warehouse", viewCategory: "design" },
  { id: 13, src: "/images/works/warehouse-design-2.jpg", category: "warehouse", viewCategory: "design" },
  
  // หลังคาอเนกประสงค์
  { id: 14, src: "/images/works/roof-1.jpg", category: "roof", viewCategory: "exterior" },
  { id: 15, src: "/images/works/roof-2.jpg", category: "roof", viewCategory: "exterior" },
  { id: 16, src: "/images/works/roof-3.jpg", category: "roof", viewCategory: "structure" },
  
  // หลังคาที่จอดรถ
  { id: 17, src: "/images/works/carport-1.jpg", category: "carport", viewCategory: "exterior" },
  { id: 18, src: "/images/works/carport-2.jpg", category: "carport", viewCategory: "exterior" },
  { id: 19, src: "/images/works/carport-3.jpg", category: "carport", viewCategory: "exterior" },
  
  // ร้านอเนกประสงค์
  { id: 20, src: "/images/works/shop-1.jpg", category: "shop", viewCategory: "exterior" },
  { id: 21, src: "/images/works/shop-2.jpg", category: "shop", viewCategory: "exterior" },
  { id: 22, src: "/images/works/shop-interior-1.jpg", category: "shop", viewCategory: "interior" },
  { id: 23, src: "/images/works/shop-design-1.jpg", category: "shop", viewCategory: "design" },
  { id: 24, src: "/images/works/shop-design-2.jpg", category: "shop", viewCategory: "design" },
];
