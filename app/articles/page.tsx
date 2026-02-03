import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Calendar, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "บทความ | SP WAREHOUSE",
  description: "บทความความรู้เกี่ยวกับโกดังสำเร็จรูป การเลือกวัสดุ การดูแลรักษา และข้อมูลที่เป็นประโยชน์",
};

// ตัวอย่างข้อมูลบทความ (จะดึงจาก Supabase ในอนาคต)
const SAMPLE_ARTICLES = [
  {
    id: 1,
    title: "วิธีเลือกขนาดโกดังให้เหมาะกับธุรกิจ",
    excerpt: "คู่มือการเลือกขนาดโกดังสำเร็จรูปที่เหมาะสมกับประเภทธุรกิจและงบประมาณของคุณ",
    date: "15 ม.ค. 2026",
    readTime: "5 นาที",
    category: "คู่มือ",
    image: "/images/articles/article-1.jpg",
  },
  {
    id: 2,
    title: "ข้อดีของโกดังสำเร็จรูปเทียบกับก่อสร้างแบบดั้งเดิม",
    excerpt: "เปรียบเทียบข้อดีข้อเสียระหว่างโกดังสำเร็จรูปกับการก่อสร้างแบบดั้งเดิม",
    date: "10 ม.ค. 2026",
    readTime: "7 นาที",
    category: "ความรู้",
    image: "/images/articles/article-2.jpg",
  },
  {
    id: 3,
    title: "การดูแลรักษาโกดังสำเร็จรูปให้อยู่นาน",
    excerpt: "เคล็ดลับการดูแลรักษาโกดังสำเร็จรูปให้คงทนและใช้งานได้ยาวนาน",
    date: "5 ม.ค. 2026",
    readTime: "4 นาที",
    category: "การดูแล",
    image: "/images/articles/article-3.jpg",
  },
  {
    id: 4,
    title: "มาตรฐาน มอก. สำหรับโครงสร้างเหล็ก",
    excerpt: "ทำความรู้จักกับมาตรฐาน มอก. และความสำคัญในการเลือกวัสดุก่อสร้าง",
    date: "1 ม.ค. 2026",
    readTime: "6 นาที",
    category: "มาตรฐาน",
    image: "/images/articles/article-4.jpg",
  },
  {
    id: 5,
    title: "ขั้นตอนการสร้างโกดังสำเร็จรูปตั้งแต่ต้นจนจบ",
    excerpt: "รู้จักขั้นตอนการสร้างโกดังสำเร็จรูป ตั้งแต่การสำรวจพื้นที่จนถึงการส่งมอบ",
    date: "25 ธ.ค. 2025",
    readTime: "8 นาที",
    category: "กระบวนการ",
    image: "/images/articles/article-5.jpg",
  },
  {
    id: 6,
    title: "ประเภทหลังคาโกดังที่นิยมใช้",
    excerpt: "เปรียบเทียบประเภทหลังคาโกดังที่นิยม พร้อมข้อดีข้อเสียของแต่ละแบบ",
    date: "20 ธ.ค. 2025",
    readTime: "5 นาที",
    category: "วัสดุ",
    image: "/images/articles/article-6.jpg",
  },
];

export default function ArticlesPage() {
  return (
    <main>
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            {SAMPLE_ARTICLES.map((article) => (
              <article
                key={article.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {/* Image */}
                <div className="aspect-video bg-primary-100 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-5xl">📝</span>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-accent-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                      {article.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6">
                  <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {article.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {article.readTime}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-primary-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {article.excerpt}
                  </p>
                  <Link
                    href={`/articles/${article.id}`}
                    className="inline-flex items-center text-accent-500 font-medium text-sm hover:text-accent-600 transition-colors"
                  >
                    อ่านต่อ
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
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
          <Button size="lg" href={SITE_CONFIG.lineUrl} external>
            ปรึกษาผู้เชี่ยวชาญ
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>
    </main>
  );
}
