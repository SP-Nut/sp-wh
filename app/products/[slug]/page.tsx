import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ChevronRight,
  CheckCircle,
  Ruler,
  ArrowRight,
  Building2,
  Layers,
  MoveVertical,
  Wrench,
  Home,
} from "lucide-react";
import { Button } from "@/components/ui";
import { BreadcrumbSchema, ProductSchema } from "@/components/seo";
import { WAREHOUSE_SIZES, SITE_CONFIG } from "@/lib/constants";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all warehouse sizes
export async function generateStaticParams() {
  return WAREHOUSE_SIZES.map((size) => ({
    slug: size.slug,
  }));
}

// Generate metadata dynamically
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const warehouse = WAREHOUSE_SIZES.find((size) => size.slug === slug);

  if (!warehouse) {
    return {
      title: "ไม่พบหน้าที่ต้องการ",
    };
  }

  const pageUrl = `${SITE_CONFIG.url}/products/${slug}`;

  return {
    title: `${warehouse.title} ${warehouse.name}`,
    description: `${warehouse.description} - รับสร้างโกดังสำเร็จรูปขนาด ${warehouse.name} วัสดุคุณภาพ มาตรฐาน มอก. ราคา ${warehouse.priceRange} บาท`,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${warehouse.title} ${warehouse.name} - SP WAREHOUSE`,
      description: warehouse.description,
      url: pageUrl,
    },
  };
}

export default async function WarehouseSizePage({ params }: PageProps) {
  const { slug } = await params;
  const warehouse = WAREHOUSE_SIZES.find((size) => size.slug === slug);

  if (!warehouse) {
    notFound();
  }

  // Get other sizes for recommendation
  const otherSizes = WAREHOUSE_SIZES.filter((size) => size.slug !== slug);
  
  const pageUrl = `${SITE_CONFIG.url}/products/${slug}`;
  const breadcrumbs = [
    { name: "หน้าแรก", url: SITE_CONFIG.url },
    { name: "ขนาดโกดัง", url: `${SITE_CONFIG.url}/products` },
    { name: warehouse.title, url: pageUrl },
  ];

  return (
    <main>
      <BreadcrumbSchema items={breadcrumbs} />
      <ProductSchema
        name={`${warehouse.title} ${warehouse.name}`}
        description={warehouse.description}
        url={pageUrl}
        priceRange={warehouse.priceRange}
        sku={warehouse.id}
      />
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
            <span className="inline-block px-4 py-1.5 bg-accent-500 text-white text-sm font-semibold rounded-full mb-4">
              {warehouse.name}
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
              {warehouse.title}
            </h1>
            <p className="text-base sm:text-lg text-gray-300 mb-6">
              {warehouse.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <Button href={SITE_CONFIG.lineUrl} external>
                ขอใบเสนอราคา
              </Button>
              <Button
                variant="outline"
                href="/products#calculator"
                className="border-white text-white hover:bg-white hover:text-primary-900"
              >
                คำนวณราคาโกดัง
              </Button>
            </div>
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Link href="/" className="hover:text-white transition-colors">
                หน้าแรก
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/products" className="hover:text-white transition-colors">
                ขนาดโกดัง
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white">{warehouse.title}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-10 sm:py-14 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left - Image */}
            <div className="bg-gray-100 rounded-2xl overflow-hidden relative min-h-[300px] lg:min-h-[400px] w-full">
              <Image
                src={warehouse.image}
                alt={`โกดังสำเร็จรูป ${warehouse.name}`}
                fill
                unoptimized
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Right - Features */}
            <div>
              <p className="text-accent-500 font-semibold mb-2">คุณสมบัติ</p>
              <h2 className="text-2xl md:text-3xl font-bold text-primary-900 mb-4">
                เหมาะสำหรับ
              </h2>
              <p className="text-gray-600 mb-6">{warehouse.description}</p>

              <ul className="space-y-4 mb-8">
                {warehouse.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-accent-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="p-6 bg-accent-50 rounded-xl border border-accent-100">
                <p className="text-sm text-accent-700 font-medium mb-1">
                  ราคาประมาณการ
                </p>
                <p className="text-2xl font-bold text-accent-600">
                  {warehouse.priceRange} บาท
                </p>
                <p className="text-xs text-accent-600 mt-1">
                  * ราคาขึ้นอยู่กับสภาพพื้นที่และรายละเอียดงาน
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specifications Section */}
      <section className="py-10 sm:py-14 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-accent-500 font-semibold mb-2">รายละเอียด</p>
            <h2 className="text-2xl md:text-3xl font-bold text-primary-900">
              สเปคโกดัง {warehouse.name}
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
            <SpecCard
              icon={<MoveVertical className="w-8 h-8" />}
              label="ความกว้าง"
              value={warehouse.specifications.width}
            />
            <SpecCard
              icon={<Ruler className="w-8 h-8" />}
              label="ความยาว"
              value={warehouse.specifications.length}
            />
            <SpecCard
              icon={<Building2 className="w-8 h-8" />}
              label="ความสูง"
              value={warehouse.specifications.height}
            />
            <SpecCard
              icon={<Wrench className="w-8 h-8" />}
              label="โครงสร้าง"
              value={warehouse.specifications.structure}
            />
            <SpecCard
              icon={<Home className="w-8 h-8" />}
              label="หลังคา"
              value={warehouse.specifications.roof}
            />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-10 sm:py-14 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-accent-500 font-semibold mb-2">ทำไมต้องเลือกเรา</p>
            <h2 className="text-2xl md:text-3xl font-bold text-primary-900">
              มาตรฐานคุณภาพ SP WAREHOUSE
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <BenefitCard
              icon={<Layers className="w-8 h-8" />}
              title="วัสดุมาตรฐาน มอก."
              description="ใช้วัสดุคุณภาพสูงได้มาตรฐานอุตสาหกรรม"
            />
            <BenefitCard
              icon={<Wrench className="w-8 h-8" />}
              title="ทีมงานมืออาชีพ"
              description="ประสบการณ์กว่า 35 ปี ผลงานกว่า 1,500 โครงการ"
            />
            <BenefitCard
              icon={<CheckCircle className="w-8 h-8" />}
              title="รับประกันโครงสร้าง"
              description="รับประกันคุณภาพงานโครงสร้างตามสัญญา"
            />
            <BenefitCard
              icon={<Building2 className="w-8 h-8" />}
              title="ออกแบบตามต้องการ"
              description="ปรับแต่งขนาดและรูปแบบตามความต้องการ"
            />
          </div>
        </div>
      </section>

      {/* Other Sizes Section */}
      <section className="py-10 sm:py-14 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-accent-500 font-semibold mb-2">ขนาดอื่นๆ</p>
            <h2 className="text-2xl md:text-3xl font-bold text-primary-900">
              โกดังขนาดอื่นที่น่าสนใจ
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherSizes.map((size) => (
              <Link
                key={size.id}
                href={`/products/${size.slug}`}
                className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg hover:border-primary-200 transition-all"
              >
                <div className="aspect-video relative bg-gray-100 w-full">
                  <Image
                    src={size.image}
                    alt={`โกดังสำเร็จรูป ${size.name}`}
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-primary-900 mb-1">{size.title}</h3>
                  <p className="text-sm text-gray-500 mb-2">{size.name}</p>
                  <p className="text-gray-600 text-sm mb-4">{size.description}</p>
                  <span className="inline-flex items-center gap-1 text-primary-600 font-medium text-sm group-hover:text-primary-700">
                    ดูรายละเอียด
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 sm:py-14 lg:py-16 bg-primary-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4">
            สนใจ{warehouse.title}?
          </h2>
          <p className="text-gray-300 mb-5 sm:mb-6 max-w-2xl mx-auto text-sm sm:text-base">
            ติดต่อเราวันนี้เพื่อรับคำปรึกษาฟรี พร้อมใบเสนอราคาภายใน 24 ชั่วโมง
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" href={SITE_CONFIG.lineUrl} external>
              ติดต่อเราทาง LINE
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

// Spec Card Component
function SpecCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-white rounded-xl p-6 text-center border border-gray-100">
      <div className="text-primary-600 mb-3 flex justify-center">{icon}</div>
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p className="font-bold text-primary-900">{value}</p>
    </div>
  );
}

// Benefit Card Component
function BenefitCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-gray-50 rounded-xl p-6 text-center">
      <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 mx-auto mb-4">
        {icon}
      </div>
      <h3 className="font-bold text-primary-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}
