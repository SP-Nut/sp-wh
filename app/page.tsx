import {
  HeroSection,
  ServicesSection,
  StatsSection,
  ProcessSection,
  StepsSection,
  ProductsSection,
  CTASection,
} from "@/components/sections";
import { FAQSchema, BreadcrumbSchema } from "@/components/seo";
import { SITE_CONFIG } from "@/lib/constants";

// FAQ สำหรับหน้าแรก
const homeFAQs = [
  {
    question: "โกดังสำเร็จรูป SP WAREHOUSE ราคาเท่าไหร่?",
    answer: "ราคาโกดังสำเร็จรูปเริ่มต้นที่ 350,000 บาท ขึ้นอยู่กับขนาดพื้นที่ โดยเราให้บริการตั้งแต่ 100-1,000+ ตร.ม. สามารถติดต่อขอใบเสนอราคาได้ฟรี",
  },
  {
    question: "ใช้เวลาสร้างโกดังสำเร็จรูปนานเท่าไหร่?",
    answer: "โดยทั่วไปใช้เวลาประมาณ 15-45 วัน ขึ้นอยู่กับขนาดและความซับซ้อนของโครงการ เราส่งมอบงานตรงตามกำหนดทุกครั้ง",
  },
  {
    question: "SP WAREHOUSE รับสร้างโกดังทั่วประเทศไหม?",
    answer: "รับครับ เราให้บริการสร้างโกดังสำเร็จรูปทั่วประเทศไทย 77 จังหวัด โดยมีผลงานกว่า 1,500 โปรเจกต์",
  },
  {
    question: "โกดังสำเร็จรูปมีรับประกันไหม?",
    answer: "มีครับ เรารับประกันโครงสร้างและวัสดุตามมาตรฐาน มอก. พร้อมบริการหลังการขายตลอดอายุการใช้งาน",
  },
  {
    question: "สามารถออกแบบโกดังตามความต้องการได้ไหม?",
    answer: "ได้ครับ เราออกแบบโกดังตามความต้องการของลูกค้าโดยเฉพาะ ไม่ว่าจะเป็นขนาด รูปทรง หรือการใช้งานพิเศษ",
  },
];

export default function HomePage() {
  return (
    <>
      <FAQSchema faqs={homeFAQs} />
      <BreadcrumbSchema items={[{ name: "หน้าแรก", url: SITE_CONFIG.url }]} />
      <HeroSection />
      <ServicesSection />
      <StatsSection />
      <ProductsSection />
      <ProcessSection />
      <StepsSection />
      <CTASection />
    </>
  );
}
