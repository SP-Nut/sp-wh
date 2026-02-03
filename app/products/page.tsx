import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Ruler, CheckCircle, Calculator } from "lucide-react";
import { Button } from "@/components/ui";
import { PriceCalculator } from "@/components/calculator";
import { WAREHOUSE_SIZES, SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "ขนาดโกดังสำเร็จรูป | SP WAREHOUSE",
  description: "เลือกขนาดโกดังสำเร็จรูปที่เหมาะกับธุรกิจของคุณ ตั้งแต่ 100 - 1,000+ ตร.ม. วัสดุคุณภาพ มาตรฐาน มอก.",
};

export default function ProductsPage() {
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
              ขนาดโกดังสำเร็จรูป
            </h1>
            <p className="text-lg text-gray-300 mb-6">
              เลือกขนาดโกดังที่เหมาะกับธุรกิจของคุณ ตั้งแต่ขนาดเล็กไปจนถึงขนาดใหญ่
              พร้อมออกแบบตามความต้องการ
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <a
                href="#calculator"
                className="inline-flex items-center justify-center gap-2 bg-accent-500 hover:bg-accent-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                <Calculator className="w-5 h-5" />
                คำนวณราคาโกดัง
              </a>
              <Button variant="outline" href={SITE_CONFIG.lineUrl} external className="border-white text-white hover:bg-white hover:text-primary-900">
                ปรึกษาผู้เชี่ยวชาญ
              </Button>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Link href="/" className="hover:text-white transition-colors">หน้าแรก</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white">ขนาดโกดัง</span>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WAREHOUSE_SIZES.map((size) => (
              <div
                key={size.id}
                className="group bg-gray-50 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                {/* Image */}
                <div className="aspect-video bg-primary-100 flex items-center justify-center">
                  <div className="text-center">
                    <Ruler className="w-12 h-12 text-primary-600 mx-auto mb-2" />
                    <p className="text-primary-700 font-medium">{size.name}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-primary-900 mb-2">
                    โกดัง {size.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    โกดังสำเร็จรูปขนาด {size.name} เหมาะสำหรับ
                    {size.id === "small" && " ธุรกิจขนาดเล็ก เก็บสินค้า"}
                    {size.id === "medium" && " โรงงานขนาดกลาง คลังสินค้า"}
                    {size.id === "large" && " อุตสาหกรรม โรงงาน"}
                    {size.id === "xlarge" && " อุตสาหกรรมขนาดใหญ่"}
                  </p>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-accent-500" />
                      วัสดุมาตรฐาน มอก.
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-accent-500" />
                      รับประกันโครงสร้าง
                    </li>
                  </ul>
                  <Button href={SITE_CONFIG.lineUrl} external className="w-full justify-center">
                    สอบถามราคา
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Price Calculator Section */}
      <section id="calculator" className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-accent-500 font-semibold mb-2">คำนวณราคา</p>
              <h2 className="text-2xl md:text-3xl font-bold text-primary-900 mb-4">
                ประมาณการราคาโกดัง
              </h2>
              <p className="text-gray-600 mb-6">
                กรอกขนาดพื้นที่และเลือกประเภทโกดังที่ต้องการ 
                ระบบจะคำนวณราคาประมาณการให้ทันที
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-3 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-accent-500 flex-shrink-0" />
                  ราคารวมค่าวัสดุและค่าแรง
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-accent-500 flex-shrink-0" />
                  ส่วนลดพิเศษสำหรับพื้นที่ขนาดใหญ่
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-accent-500 flex-shrink-0" />
                  ขอใบเสนอราคาจริงได้ทันที
                </li>
              </ul>
              <div className="p-4 bg-primary-50 rounded-xl">
                <p className="text-sm text-primary-700">
                  <strong>หมายเหตุ:</strong> ราคาที่แสดงเป็นการประมาณการเบื้องต้น
                  ราคาจริงขึ้นอยู่กับสภาพพื้นที่และรายละเอียดงาน
                </p>
              </div>
            </div>
            <PriceCalculator />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            ต้องการขนาดพิเศษ?
          </h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            เราสามารถออกแบบและสร้างโกดังตามขนาดที่คุณต้องการได้
            ติดต่อเราเพื่อรับคำปรึกษาฟรี
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
