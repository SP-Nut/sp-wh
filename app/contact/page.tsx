import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Phone, Mail, MapPin, Clock, MessageCircle, Facebook, Youtube } from "lucide-react";
import { Button } from "@/components/ui";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "ติดต่อเรา | SP WAREHOUSE",
  description: "ติดต่อ SP WAREHOUSE สอบถามข้อมูล ขอใบเสนอราคา หรือนัดหมายเข้าสำรวจพื้นที่",
};

export default function ContactPage() {
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
              ติดต่อเรา
            </h1>
            <p className="text-lg text-gray-300 mb-6">
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

      {/* Contact Content */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-primary-900 mb-6">
                ช่องทางติดต่อ
              </h2>
              <p className="text-gray-600 mb-8">
                ติดต่อเราได้หลายช่องทาง ทีมงานพร้อมให้บริการทุกวัน
              </p>

              <div className="space-y-6">
                {/* Phone */}
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 hover:bg-primary-50 transition-colors group"
                >
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                    <Phone className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-primary-900">โทรศัพท์</p>
                    <p className="text-gray-600">
                      {SITE_CONFIG.phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")}
                    </p>
                    <p className="text-gray-600">
                      {SITE_CONFIG.phone2.replace(/(\d{2})(\d{3})(\d{4})/, "$1-$2-$3")}
                    </p>
                  </div>
                </a>

                {/* LINE */}
                <a
                  href={SITE_CONFIG.lineUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 hover:bg-green-50 transition-colors group"
                >
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-200 transition-colors">
                    <MessageCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-primary-900">LINE Official</p>
                    <p className="text-gray-600">{SITE_CONFIG.lineId}</p>
                    <p className="text-sm text-green-600">แชทได้ตลอด 24 ชม.</p>
                  </div>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 hover:bg-primary-50 transition-colors group"
                >
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                    <Mail className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-primary-900">อีเมล</p>
                    <p className="text-gray-600">{SITE_CONFIG.email}</p>
                  </div>
                </a>

                {/* Address */}
                <a
                  href={SITE_CONFIG.googleMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 hover:bg-primary-50 transition-colors group"
                >
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                    <MapPin className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-primary-900">ที่อยู่สำนักงาน</p>
                    <p className="text-gray-600">{SITE_CONFIG.address}</p>
                  </div>
                </a>

                {/* Working Hours */}
                <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50">
                  <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-accent-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-primary-900">เวลาทำการ</p>
                    <p className="text-gray-600">{SITE_CONFIG.workingHours}</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-8">
                <p className="font-semibold text-primary-900 mb-4">ติดตามเราได้ที่</p>
                <div className="flex gap-4">
                  <a
                    href={SITE_CONFIG.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center hover:bg-blue-200 transition-colors"
                  >
                    <Facebook className="w-6 h-6 text-blue-600" />
                  </a>
                  <a
                    href={SITE_CONFIG.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center hover:bg-red-200 transition-colors"
                  >
                    <Youtube className="w-6 h-6 text-red-600" />
                  </a>
                  <a
                    href={SITE_CONFIG.lineUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center hover:bg-green-200 transition-colors"
                  >
                    <MessageCircle className="w-6 h-6 text-green-600" />
                  </a>
                </div>
              </div>
            </div>

            {/* Map */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-primary-900 mb-6">
                แผนที่
              </h2>
              <div className="aspect-square lg:aspect-4/3 bg-gray-100 rounded-2xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3873.789!2d100.6392!3d13.8127!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDQ4JzQ1LjciTiAxMDDCsDM4JzIxLjEiRQ!5e0!3m2!1sth!2sth!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="SP Warehouse Location"
                ></iframe>
              </div>
              <div className="mt-4">
                <Button href={SITE_CONFIG.googleMapUrl} external className="w-full justify-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  เปิดใน Google Maps
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-accent-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            พร้อมเริ่มโปรเจกต์ของคุณ?
          </h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            ติดต่อเราวันนี้ รับคำปรึกษาฟรี พร้อมใบเสนอราคา
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              href={SITE_CONFIG.lineUrl} 
              external
              className="bg-white text-accent-600 hover:bg-gray-100"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              แชทผ่าน LINE
            </Button>
            <Button 
              size="lg" 
              href={`tel:${SITE_CONFIG.phone}`}
              className="bg-primary-900 text-white hover:bg-primary-800"
            >
              <Phone className="w-5 h-5 mr-2" />
              โทรเลย
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
