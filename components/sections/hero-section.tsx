import { ChevronRight, Calculator } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui";
import { SITE_CONFIG } from "@/lib/constants";

export function HeroSection() {
  return (
    <section className="relative min-h-[500px] sm:min-h-[550px] md:min-h-[600px] lg:min-h-[700px] overflow-hidden">
      {/* Background Image - ใช้ Next Image สำหรับ optimization */}
      <Image
        src="/images/hero-bg.webp"
        alt="SP Warehouse Background"
        fill
        priority
        quality={85}
        className="object-cover object-center"
        sizes="100vw"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-900/60 via-primary-900/35 to-transparent"></div>

      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 lg:py-28 relative z-10">
        <div className="max-w-3xl">
          {/* Content */}
          <div className="space-y-4 sm:space-y-5 md:space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium border border-white/20">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-accent-500 rounded-full animate-pulse"></span>
              ประสบการณ์กว่า {SITE_CONFIG.experience} ปี
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
              รับสร้าง
              <span className="text-accent-400"> โกดังสำเร็จรูป</span>
              <br />
              <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">คุณภาพมาตรฐาน มอก.</span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-gray-200 max-w-xl leading-relaxed">
              {SITE_CONFIG.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
              <Button size="lg" href={SITE_CONFIG.lineUrl} external className="w-full sm:w-auto justify-center">
                ปรึกษาผู้เชี่ยวชาญ
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
              </Button>
              <Link
                href="/products#calculator"
                className="inline-flex items-center justify-center gap-2 bg-accent-500 hover:bg-accent-600 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold transition-colors w-full sm:w-auto"
              >
                <Calculator className="w-4 h-4 sm:w-5 sm:h-5" />
                คำนวณราคาโกดัง
              </Link>
              <Button variant="outline" size="lg" href="/products" className="w-full sm:w-auto justify-center border-white text-white hover:bg-white hover:text-primary-900">
                ดูขนาดโกดัง
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 pt-4 sm:pt-6 border-t border-white/20 mt-4 sm:mt-6 md:mt-8">
              <div className="text-center sm:text-left">
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-accent-400">1,500+</p>
                <p className="text-gray-300 text-xs sm:text-sm">โปรเจกต์สำเร็จ</p>
              </div>
              <div className="text-center sm:text-left">
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-accent-400">{SITE_CONFIG.experience}+</p>
                <p className="text-gray-300 text-xs sm:text-sm">ปีประสบการณ์</p>
              </div>
              <div className="text-center sm:text-left">
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-accent-400">100%</p>
                <p className="text-gray-300 text-xs sm:text-sm">ความพึงพอใจ</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
