import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "ผลงานของเรา | SP WAREHOUSE",
  description: "ผลงานโกดังสำเร็จรูปที่เราสร้างให้ลูกค้ากว่า 1,500 โปรเจกต์ทั่วประเทศ",
};

// ตัวอย่างข้อมูลผลงาน (จะดึงจาก Supabase ในอนาคต)
const SAMPLE_WORKS = [
  {
    id: 1,
    title: "โกดังสำเร็จรูป 500 ตร.ม.",
    location: "ปทุมธานี",
    year: "2025",
    image: "/images/works/work-1.jpg",
  },
  {
    id: 2,
    title: "โกดังสำเร็จรูป 800 ตร.ม.",
    location: "สมุทรปราการ",
    year: "2025",
    image: "/images/works/work-2.jpg",
  },
  {
    id: 3,
    title: "โกดังสำเร็จรูป 300 ตร.ม.",
    location: "นนทบุรี",
    year: "2024",
    image: "/images/works/work-3.jpg",
  },
  {
    id: 4,
    title: "โกดังสำเร็จรูป 1,200 ตร.ม.",
    location: "ชลบุรี",
    year: "2024",
    image: "/images/works/work-4.jpg",
  },
  {
    id: 5,
    title: "โกดังสำเร็จรูป 600 ตร.ม.",
    location: "ระยอง",
    year: "2024",
    image: "/images/works/work-5.jpg",
  },
  {
    id: 6,
    title: "โกดังสำเร็จรูป 450 ตร.ม.",
    location: "อยุธยา",
    year: "2024",
    image: "/images/works/work-6.jpg",
  },
];

export default function WorksPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 bg-primary-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/images/hero-bg.webp"
            alt="Background"
            fill
            className="object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              ผลงานของเรา
            </h1>
            <p className="text-lg text-gray-300 mb-6">
              ผลงานโกดังสำเร็จรูปที่เราภูมิใจนำเสนอ กว่า 1,500 โปรเจกต์ทั่วประเทศไทย
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Link href="/" className="hover:text-white transition-colors">หน้าแรก</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white">ผลงานของเรา</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 sm:py-12 bg-accent-500">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 text-center">
            <div>
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">1,500+</p>
              <p className="text-white/80 text-sm sm:text-base">โปรเจกต์สำเร็จ</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">77</p>
              <p className="text-white/80 text-sm sm:text-base">จังหวัดทั่วไทย</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">35+</p>
              <p className="text-white/80 text-sm sm:text-base">ปีประสบการณ์</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">100%</p>
              <p className="text-white/80 text-sm sm:text-base">ความพึงพอใจ</p>
            </div>
          </div>
        </div>
      </section>

      {/* Works Grid */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-900 mb-4">
              ตัวอย่างผลงานล่าสุด
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              ผลงานโกดังสำเร็จรูปที่เราสร้างให้ลูกค้าทั่วประเทศ
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SAMPLE_WORKS.map((work) => (
              <div
                key={work.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {/* Image Placeholder */}
                <div className="aspect-video bg-primary-100 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl">🏭</span>
                  </div>
                  <div className="absolute inset-0 bg-primary-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white font-medium">ดูรายละเอียด</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-primary-900 mb-2">
                    {work.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {work.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {work.year}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              ต้องการดูผลงานเพิ่มเติม? ติดต่อเราเพื่อรับแคตตาล็อก
            </p>
            <Button href={SITE_CONFIG.lineUrl} external>
              ขอดูผลงานเพิ่มเติม
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            พร้อมเริ่มโปรเจกต์ของคุณ?
          </h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            ให้เราช่วยสร้างโกดังในฝันของคุณ ติดต่อเราวันนี้เพื่อรับคำปรึกษาฟรี
          </p>
          <Button size="lg" href={SITE_CONFIG.lineUrl} external>
            ปรึกษาผู้เชี่ยวชาญ
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>
    </main>
  );
}
