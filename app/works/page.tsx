import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { ChevronRight, Building2 } from "lucide-react";
import { Button } from "@/components/ui";
import { BreadcrumbSchema } from "@/components/seo";
import { WorksGallery } from "@/components/works";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "ผลงานของเรา",
  description: "ผลงานโกดังสำเร็จรูปที่เราสร้างให้ลูกค้ากว่า 1,500 โปรเจกต์ทั่วประเทศ ทั้งโกดัง โรงงาน คลังสินค้า หลังคาโครงเหล็ก",
  alternates: {
    canonical: `${SITE_CONFIG.url}/works`,
  },
  openGraph: {
    title: "ผลงานของเรา - SP WAREHOUSE",
    description: "ผลงานโกดังสำเร็จรูปกว่า 1,500 โปรเจกต์ทั่วประเทศ",
    url: `${SITE_CONFIG.url}/works`,
  },
};

const breadcrumbs = [
  { name: "หน้าแรก", url: SITE_CONFIG.url },
  { name: "ผลงานของเรา", url: `${SITE_CONFIG.url}/works` },
];

export default function WorksPage() {
  return (
    <main>
      <BreadcrumbSchema items={breadcrumbs} />
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 lg:py-20 bg-primary-900 overflow-hidden">
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
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
              ผลงานของเรา
            </h1>
            <p className="text-base sm:text-lg text-gray-300 mb-4 sm:mb-6">
              ผลงานโกดังสำเร็จรูปที่เราภูมิใจนำเสนอ กว่า 1,500 โปรเจกต์ทั่วประเทศไทย
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Link href="/" className="hover:text-white transition-colors">
                หน้าแรก
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white">ผลงานของเรา</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-6 sm:py-8 bg-primary-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-4 gap-2 sm:gap-4 md:gap-6 text-center">
            <div>
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-accent-400">
                1,500+
              </p>
              <p className="text-primary-200 text-xs sm:text-sm">โปรเจกต์สำเร็จ</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-accent-400">
                77
              </p>
              <p className="text-primary-200 text-xs sm:text-sm">จังหวัดทั่วไทย</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-accent-400">
                35+
              </p>
              <p className="text-primary-200 text-xs sm:text-sm">ปีประสบการณ์</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-accent-400">
                100%
              </p>
              <p className="text-primary-200 text-xs sm:text-sm">ความพึงพอใจ</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Component (Client-side) */}
      <Suspense fallback={<GallerySkeleton />}>
        <WorksGallery />
      </Suspense>

      {/* Why Choose Us */}
      <section className="py-10 sm:py-14 lg:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <p className="text-accent-500 font-semibold mb-2">ทำไมต้องเลือกเรา</p>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary-900 mb-4">
                เราเป็นผู้เชี่ยวชาญในการสร้างโกดัง
              </h2>
              <p className="text-gray-600 mb-6">
                ด้วยเหล็กและวัสดุที่ได้มาตรฐาน ทำให้ลูกค้ามั่นใจได้ว่าโกดังที่ได้รับจะมีคุณภาพ
                แข็งแรงทนทานในราคาที่เหมาะสม SP WAREHOUSE
                เป็นทางเลือกที่ดีสำหรับลูกค้าที่ต้องการโกดังสำเร็จรูปครบจบในที่เดียว
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-3 text-gray-700">
                  <span className="w-6 h-6 bg-accent-100 rounded-full flex items-center justify-center text-accent-600 text-sm font-bold">
                    ✓
                  </span>
                  วัสดุมาตรฐาน มอก. คุณภาพสูง
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <span className="w-6 h-6 bg-accent-100 rounded-full flex items-center justify-center text-accent-600 text-sm font-bold">
                    ✓
                  </span>
                  ทีมงานมืออาชีพ ประสบการณ์กว่า 35 ปี
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <span className="w-6 h-6 bg-accent-100 rounded-full flex items-center justify-center text-accent-600 text-sm font-bold">
                    ✓
                  </span>
                  บริการครบวงจร วัดพื้นที่ ออกแบบ ผลิต ก่อสร้าง
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <span className="w-6 h-6 bg-accent-100 rounded-full flex items-center justify-center text-accent-600 text-sm font-bold">
                    ✓
                  </span>
                  รับประกันคุณภาพ มีบริการหลังการขาย
                </li>
              </ul>
            </div>
            <div className="bg-primary-100 rounded-2xl p-8 lg:p-12 flex items-center justify-center min-h-[300px]">
              <div className="text-center">
                <Building2 className="w-20 h-20 text-primary-600 mx-auto mb-4" />
                <p className="text-2xl font-bold text-primary-900">คิดถึงโกดัง</p>
                <p className="text-primary-600">คิดถึง SP WAREHOUSE</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 sm:py-14 lg:py-16 bg-primary-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4">
            พร้อมเริ่มโปรเจกต์ของคุณ?
          </h2>
          <p className="text-gray-300 mb-5 sm:mb-6 max-w-2xl mx-auto text-sm sm:text-base">
            ให้เราช่วยสร้างโกดังในฝันของคุณ ติดต่อเราวันนี้เพื่อรับคำปรึกษาฟรี
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" href={SITE_CONFIG.lineUrl} external>
              ปรึกษาผู้เชี่ยวชาญ
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              href="/contact"
              className="border-white text-white hover:bg-white hover:text-primary-900"
            >
              กรอกแบบฟอร์ม
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

// Loading skeleton for gallery
function GallerySkeleton() {
  return (
    <section className="py-10 sm:py-14 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <div className="h-4 w-24 bg-gray-200 rounded mx-auto mb-2 animate-pulse" />
          <div className="h-8 w-48 bg-gray-200 rounded mx-auto animate-pulse" />
        </div>
        <div className="bg-white rounded-xl p-6 mb-8 animate-pulse">
          <div className="h-10 bg-gray-200 rounded mb-4" />
          <div className="h-10 bg-gray-200 rounded" />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden animate-pulse">
              <div className="aspect-video bg-gray-200" />
              <div className="p-5">
                <div className="h-4 w-20 bg-gray-200 rounded mb-3" />
                <div className="h-5 w-3/4 bg-gray-200 rounded mb-2" />
                <div className="h-4 w-1/2 bg-gray-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
