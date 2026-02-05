import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Phone, Mail, MapPin, Clock, MessageCircle, Facebook, Youtube, Send, FileText } from "lucide-react";
import { Button } from "@/components/ui";
import { BreadcrumbSchema, ContactPageSchema } from "@/components/seo";
import { SITE_CONFIG } from "@/lib/constants";
import { ContactForm } from "@/components/forms/contact-form";

export const metadata: Metadata = {
  title: "ติดต่อเรา",
  description: `ติดต่อ SP WAREHOUSE สอบถามข้อมูล ขอใบเสนอราคาโกดังสำเร็จรูปฟรี โทร ${SITE_CONFIG.phone} หรือ LINE ${SITE_CONFIG.lineId}`,
  alternates: {
    canonical: `${SITE_CONFIG.url}/contact`,
  },
  openGraph: {
    title: "ติดต่อเรา - SP WAREHOUSE",
    description: "สอบถามข้อมูล ขอใบเสนอราคาโกดังสำเร็จรูปฟรี พร้อมให้บริการทั่วประเทศ",
    url: `${SITE_CONFIG.url}/contact`,
  },
};

const breadcrumbs = [
  { name: "หน้าแรก", url: SITE_CONFIG.url },
  { name: "ติดต่อเรา", url: `${SITE_CONFIG.url}/contact` },
];

const CONTACT_METHODS = [
  {
    icon: Phone,
    title: "โทรศัพท์",
    description: "พูดคุยกับทีมงานโดยตรง",
    details: [
      SITE_CONFIG.phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3"),
      SITE_CONFIG.phone2.replace(/(\d{2})(\d{3})(\d{4})/, "$1-$2-$3"),
    ],
    href: `tel:${SITE_CONFIG.phone}`,
    color: "primary",
  },
  {
    icon: MessageCircle,
    title: "LINE Official",
    description: "แชทได้ตลอด 24 ชม.",
    details: [SITE_CONFIG.lineId],
    href: SITE_CONFIG.lineUrl,
    color: "green",
    external: true,
  },
  {
    icon: Mail,
    title: "อีเมล",
    description: "ส่งรายละเอียดโปรเจกต์",
    details: [SITE_CONFIG.email],
    href: `mailto:${SITE_CONFIG.email}`,
    color: "primary",
  },
];

export default function ContactPage() {
  return (
    <main>
      <BreadcrumbSchema items={breadcrumbs} />
      <ContactPageSchema />
      {/* Hero Section */}
      <section className="relative py-10 sm:py-14 lg:py-16 bg-primary-900 overflow-hidden">
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
              ติดต่อเรา
            </h1>
            <p className="text-base sm:text-lg text-gray-300 mb-4 sm:mb-6">
              พร้อมให้คำปรึกษาและบริการ สอบถามข้อมูลหรือขอใบเสนอราคาได้ทันที
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Link href="/" className="hover:text-white transition-colors">หน้าแรก</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white">ติดต่อเรา</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content - Form & Contact Info */}
      <section className="py-10 sm:py-14 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
            
            {/* Left: Contact Form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-primary-900">
                      ขอใบเสนอราคา
                    </h2>
                    <p className="text-sm text-gray-500">ทีมงานจะติดต่อกลับภายใน 24 ชม.</p>
                  </div>
                </div>
                <ContactForm />
              </div>
            </div>

            {/* Right: Contact Methods & Info */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Quick Contact Methods */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-primary-900 mb-4">ติดต่อด่วน</h3>
                <div className="space-y-4">
                  {CONTACT_METHODS.map((method, index) => (
                    <a
                      key={index}
                      href={method.href}
                      target={method.external ? "_blank" : undefined}
                      rel={method.external ? "noopener noreferrer" : undefined}
                      className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-md ${
                        method.color === "green"
                          ? "border-green-100 hover:border-green-300 hover:bg-green-50"
                          : "border-gray-100 hover:border-primary-200 hover:bg-primary-50"
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        method.color === "green" ? "bg-green-100" : "bg-primary-100"
                      }`}>
                        <method.icon className={`w-6 h-6 ${
                          method.color === "green" ? "text-green-600" : "text-primary-600"
                        }`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-primary-900">{method.title}</p>
                        {method.details.map((detail, i) => (
                          <p key={i} className="text-sm text-gray-600 truncate">{detail}</p>
                        ))}
                      </div>
                      <Send className={`w-4 h-4 flex-shrink-0 ${
                        method.color === "green" ? "text-green-400" : "text-primary-400"
                      }`} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Address & Hours */}
              <div className="bg-white rounded-2xl p-6 shadow-sm space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary-900 mb-1">ที่อยู่</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">{SITE_CONFIG.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-accent-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary-900 mb-1">เวลาทำการ</h4>
                    <p className="text-sm text-gray-600">{SITE_CONFIG.workingHours}</p>
                    <p className="text-xs text-accent-600 font-medium mt-1">LINE ตอบกลับ 24 ชม.</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-primary-900 mb-4">ติดตามเรา</h3>
                <div className="flex gap-3">
                  <a
                    href={SITE_CONFIG.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center hover:bg-blue-200 hover:scale-110 transition-all"
                  >
                    <Facebook className="w-6 h-6 text-blue-600" />
                  </a>
                  <a
                    href={SITE_CONFIG.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center hover:bg-red-200 hover:scale-110 transition-all"
                  >
                    <Youtube className="w-6 h-6 text-red-600" />
                  </a>
                  <a
                    href={SITE_CONFIG.lineUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center hover:bg-green-200 hover:scale-110 transition-all"
                  >
                    <MessageCircle className="w-6 h-6 text-green-600" />
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-10 sm:py-14 lg:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-primary-900 mb-2">
              ที่ตั้งสำนักงาน
            </h2>
            <p className="text-gray-600">เยี่ยมชมโชว์รูมและพูดคุยกับทีมงานโดยตรง</p>
          </div>
          <div className="max-w-5xl mx-auto">
            <div className="aspect-video sm:aspect-[21/9] bg-gray-200 rounded-2xl overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3873.5!2d100.6539!3d13.8194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x235205839485eea9%3A0x1599d8d61520a74d!2sSP%20Warehouse!5e0!3m2!1sth!2sth!4v1707100000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="SP Warehouse Location - 28/101 ถ. รัชดา-รามอินทรา แขวงคลองกุ่ม เขตบึงกุ่ม กรุงเทพมหานคร"
              ></iframe>
            </div>
            <div className="mt-4 text-center">
              <Button href={SITE_CONFIG.googleMapUrl} external>
                <MapPin className="w-5 h-5 mr-2" />
                เปิดใน Google Maps
              </Button>
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
            ติดต่อเราวันนี้ รับคำปรึกษาฟรี พร้อมใบเสนอราคา
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Button 
              size="lg" 
              href={SITE_CONFIG.lineUrl} 
              external
              className="bg-accent-500 hover:bg-accent-600 text-white"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              แชทผ่าน LINE
            </Button>
            <Button 
              size="lg" 
              href={`tel:${SITE_CONFIG.phone}`}
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary-900"
            >
              <Phone className="w-5 h-5 mr-2" />
              โทร {SITE_CONFIG.phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")}
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
