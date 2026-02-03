import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Shield, Award, Users, Target, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui";
import { SITE_CONFIG, STATS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "เกี่ยวกับเรา | SP WAREHOUSE",
  description: "SP WAREHOUSE ผู้เชี่ยวชาญด้านโกดังสำเร็จรูปกว่า 35 ปี บริการครบวงจร วัสดุคุณภาพมาตรฐาน มอก.",
};

const VALUES = [
  {
    icon: Shield,
    title: "คุณภาพ",
    description: "วัสดุคุณภาพสูง มาตรฐาน มอก. ทนทานต่อทุกสภาพอากาศ",
  },
  {
    icon: Award,
    title: "มาตรฐาน",
    description: "กระบวนการผลิตและติดตั้งได้มาตรฐานอุตสาหกรรม",
  },
  {
    icon: Users,
    title: "ทีมงานมืออาชีพ",
    description: "ทีมช่างผู้ชำนาญงาน ประสบการณ์กว่า 35 ปี",
  },
  {
    icon: Target,
    title: "ตรงต่อเวลา",
    description: "ส่งมอบงานตรงตามกำหนด ไม่ทิ้งงาน",
  },
];

export default function AboutPage() {
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
              เกี่ยวกับเรา
            </h1>
            <p className="text-lg text-gray-300 mb-6">
              รู้จัก SP WAREHOUSE ผู้เชี่ยวชาญด้านโกดังสำเร็จรูปกว่า 35 ปี
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Link href="/" className="hover:text-white transition-colors">หน้าแรก</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white">เกี่ยวกับเรา</span>
            </div>
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative">
              <div className="aspect-4/3 bg-primary-100 rounded-2xl overflow-hidden flex items-center justify-center">
                <Image
                  src="/images/โลโก้แวร์เฮ้าส์.png"
                  alt="SP Warehouse"
                  width={300}
                  height={200}
                  className="object-contain"
                  unoptimized
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-accent-500 text-white p-6 rounded-2xl shadow-xl">
                <p className="text-4xl font-bold">{SITE_CONFIG.experience}+</p>
                <p className="text-sm">ปีประสบการณ์</p>
              </div>
            </div>

            {/* Content */}
            <div>
              <p className="text-accent-500 font-semibold mb-2">เกี่ยวกับบริษัท</p>
              <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-6">
                {SITE_CONFIG.fullName}
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                SP WAREHOUSE เป็นบริษัทผู้เชี่ยวชาญด้านการออกแบบ ผลิต และติดตั้ง
                โกดังสำเร็จรูป โครงสร้างเหล็ก หลังคาโรงงาน มานานกว่า 35 ปี
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                ด้วยประสบการณ์อันยาวนานและทีมงานมืออาชีพ เราให้บริการครบวงจร
                ตั้งแต่การสำรวจพื้นที่ ออกแบบ ผลิต ก่อสร้าง จนถึงการส่งมอบงาน
                พร้อมบริการหลังการขายที่ครบครัน
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-3 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-accent-500 flex-shrink-0" />
                  วัสดุคุณภาพมาตรฐาน มอก.
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-accent-500 flex-shrink-0" />
                  ทีมช่างผู้ชำนาญงาน ประสบการณ์สูง
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-accent-500 flex-shrink-0" />
                  บริการครบวงจร สำรวจ-ออกแบบ-สร้าง-ส่งมอบ
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-accent-500 flex-shrink-0" />
                  รับสร้างทั่วประเทศ
                </li>
              </ul>
              <Button href={SITE_CONFIG.lineUrl} external>
                ติดต่อเรา
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-primary-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {STATS.map((stat, index) => (
              <div key={index}>
                <p className="text-3xl md:text-4xl font-bold text-accent-400">
                  {stat.value}{stat.suffix}
                </p>
                <p className="text-gray-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-accent-500 font-semibold mb-2">ค่านิยมของเรา</p>
            <h2 className="text-2xl md:text-3xl font-bold text-primary-900">
              ทำไมต้องเลือก SP WAREHOUSE
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((value, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                  <value.icon className="w-7 h-7 text-primary-600" />
                </div>
                <h3 className="text-lg font-bold text-primary-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-900 mb-4">
            พร้อมเริ่มโปรเจกต์ของคุณ?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            ติดต่อเราวันนี้เพื่อรับคำปรึกษาฟรี ทีมงานผู้เชี่ยวชาญพร้อมให้บริการ
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" href={SITE_CONFIG.lineUrl} external>
              ปรึกษาผ่าน LINE
            </Button>
            <Button variant="outline" size="lg" href={`tel:${SITE_CONFIG.phone}`}>
              โทร {SITE_CONFIG.phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")}
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
