export const SITE_CONFIG = {
  name: "SP WAREHOUSE",
  fullName: "บริษัท เอสพี แวร์เฮ้าส์ จำกัด",
  fullNameEn: "SP WAREHOUSE CO., LTD.",
  description:
    "ผู้เชี่ยวชาญด้านโกดังสำเร็จรูป กว่า 35 ปี คุณภาพ มาตราฐาน บริการครบวงจร วัดพื้นที่ ออกแบบ ผลิต ก่อสร้าง ตรวจสอบ ส่งมอบ",
  url: "https://spwarehouse9.com",
  email: "spwarehouse9@gmail.com",
  phone: "0847613333",
  phone2: "029368843",
  lineId: "@075nbbwo",
  lineUrl: "https://lin.ee/K6gmKhc",
  address: "28/101 ถ.รัชดา-รามอินทรา แขวงคลองกุ่ม เขตบึงกุ่ม กทม. 10230",
  googleMapUrl: "https://maps.app.goo.gl/DTMxVmfY7VRdvvCX8",
  facebook: "https://www.facebook.com/warehousebysp",
  youtube: "https://www.youtube.com/channel/UCY3jO3Vs6X6R2WJfgcF0UKg",
  workingHours: "เปิดทำการทุกวัน 8:00 น. – 17:00 น.",
  experience: 35,
};

export const WAREHOUSE_SIZES = [
  {
    id: "small",
    name: "100 - 300 ตร.ม.",
    slug: "100-300-sqm",
    minSize: 100,
    maxSize: 300,
  },
  {
    id: "medium",
    name: "301 - 500 ตร.ม.",
    slug: "301-500-sqm",
    minSize: 301,
    maxSize: 500,
  },
  {
    id: "large",
    name: "501 - 1,000 ตร.ม.",
    slug: "501-1000-sqm",
    minSize: 501,
    maxSize: 1000,
  },
  {
    id: "xlarge",
    name: "1,001+ ตร.ม.",
    slug: "1001-plus-sqm",
    minSize: 1001,
    maxSize: null,
  },
];

export const NAV_LINKS = [
  { href: "/", label: "หน้าแรก" },
  { href: "/products", label: "ขนาดโกดัง" },
  { href: "/works", label: "ผลงานของเรา" },
  { href: "/about", label: "เกี่ยวกับเรา" },
  { href: "/articles", label: "บทความ" },
  { href: "/contact", label: "ติดต่อเรา" },
];

export const STATS = [
  { label: "โปรเจกต์ที่สำเร็จ", value: "1,500+", suffix: "" },
  { label: "ลูกค้า", value: "1,200+", suffix: "" },
  { label: "ความพึงพอใจ", value: "98", suffix: "%" },
  { label: "ปีประสบการณ์", value: "35+", suffix: "" },
];

export const SERVICES = [
  {
    title: "โกดังสำเร็จรูป",
    description: "โกดังสำเร็จรูปคุณภาพสูง พร้อมติดตั้ง",
    icon: "Warehouse",
  },
  {
    title: "หลังคาอเนกประสงค์",
    description: "หลังคาโครงเหล็ก ทนทาน กันแดดกันฝน",
    icon: "Home",
  },
  {
    title: "ที่จอดรถ",
    description: "หลังคาที่จอดรถ ออกแบบตามพื้นที่",
    icon: "Car",
  },
  {
    title: "ร้านค้าสำเร็จรูป",
    description: "ร้านค้าอเนกประสงค์ พร้อมใช้งาน",
    icon: "Store",
  },
];

export const PROCESS_STEPS = [
  {
    step: 1,
    title: "ติดต่อเรา",
    description: "ติดต่อสอบถามข้อมูลเบื้องต้น",
  },
  {
    step: 2,
    title: "สำรวจพื้นที่",
    description: "ทีมงานเข้าสำรวจและวัดพื้นที่",
  },
  {
    step: 3,
    title: "ออกแบบ",
    description: "ออกแบบโกดังตามความต้องการ",
  },
  {
    step: 4,
    title: "เสนอราคา",
    description: "เสนอราคาและรายละเอียดงาน",
  },
  {
    step: 5,
    title: "ผลิตและติดตั้ง",
    description: "ผลิตและติดตั้งโดยทีมงานมืออาชีพ",
  },
  {
    step: 6,
    title: "ส่งมอบงาน",
    description: "ตรวจสอบคุณภาพและส่งมอบงาน",
  },
];
