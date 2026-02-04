import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { Suspense } from "react";
import { BreadcrumbSchema } from "@/components/seo";
import { SITE_CONFIG } from "@/lib/constants";
import { ArticlesGrid } from "@/components/articles/articles-grid";

export const metadata: Metadata = {
  title: "บทความ",
  description: "บทความความรู้เกี่ยวกับโกดังสำเร็จรูป การเลือกวัสดุ การดูแลรักษา ราคาโกดัง และข้อมูลที่เป็นประโยชน์สำหรับผู้ที่สนใจสร้างโกดัง",
  alternates: {
    canonical: `${SITE_CONFIG.url}/articles`,
  },
  openGraph: {
    title: "บทความ - SP WAREHOUSE",
    description: "ความรู้และข้อมูลที่เป็นประโยชน์เกี่ยวกับโกดังสำเร็จรูป",
    url: `${SITE_CONFIG.url}/articles`,
  },
};

const breadcrumbs = [
  { name: "หน้าแรก", url: SITE_CONFIG.url },
  { name: "บทความ", url: `${SITE_CONFIG.url}/articles` },
];

export default function ArticlesPage() {

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
              บทความ
            </h1>
            <p className="text-base sm:text-lg text-gray-300 mb-4 sm:mb-6">
              ความรู้และข้อมูลที่เป็นประโยชน์เกี่ยวกับโกดังสำเร็จรูป
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Link href="/" className="hover:text-white transition-colors">หน้าแรก</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white">บทความ</span>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-12 sm:py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <Suspense fallback={<div className="flex justify-center py-20"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div></div>}>
            <ArticlesGrid />
          </Suspense>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 sm:py-14 lg:py-16 bg-primary-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4">
            มีคำถามเพิ่มเติม?
          </h2>
          <p className="text-gray-300 mb-5 sm:mb-6 max-w-2xl mx-auto text-sm sm:text-base">
            ทีมงานผู้เชี่ยวชาญพร้อมตอบทุกคำถามของคุณ ติดต่อเราเลย
          </p>
          <Link 
            href="/contact" 
            className="inline-flex items-center bg-accent-500 hover:bg-accent-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            ปรึกษาผู้เชี่ยวชาญ
            <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>
    </main>
  );
}
