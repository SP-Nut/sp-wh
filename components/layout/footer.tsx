import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Youtube,
  MessageCircle,
} from "lucide-react";
import { SITE_CONFIG, NAV_LINKS } from "@/lib/constants";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <div className="mb-6">
              <Image
                src="/images/โลโก้แวร์เฮ้าส์.png"
                alt="SP Warehouse Logo"
                width={180}
                height={72}
                className="object-contain h-16 w-auto"
                quality={100}
                unoptimized
              />
            </div>
            <p className="text-sm leading-relaxed text-gray-300">
              {SITE_CONFIG.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">เมนู</h3>
            <nav className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-300 hover:text-primary-300 transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">ติดต่อเรา</h3>
            <div className="flex flex-col gap-4">
              <a
                href={`tel:${SITE_CONFIG.phone}`}
                className="flex items-start gap-3 text-gray-300 hover:text-primary-300 transition-colors text-sm"
              >
                <Phone className="w-5 h-5 shrink-0 mt-0.5" />
                <span>
                  {SITE_CONFIG.phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")}
                  <br />
                  {SITE_CONFIG.phone2.replace(/(\d{2})(\d{3})(\d{4})/, "$1-$2-$3")}
                </span>
              </a>
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="flex items-center gap-3 text-gray-300 hover:text-primary-300 transition-colors text-sm"
              >
                <Mail className="w-5 h-5 shrink-0" />
                <span>{SITE_CONFIG.email}</span>
              </a>
              <a
                href={SITE_CONFIG.googleMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-gray-300 hover:text-primary-300 transition-colors text-sm"
              >
                <MapPin className="w-5 h-5 shrink-0 mt-0.5" />
                <span>{SITE_CONFIG.address}</span>
              </a>
              <div className="flex items-center gap-3 text-gray-300 text-sm">
                <Clock className="w-5 h-5 shrink-0" />
                <span>{SITE_CONFIG.workingHours}</span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">ติดตามเรา</h3>
            <div className="flex gap-4">
              <a
                href={SITE_CONFIG.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary-800 hover:bg-primary-600 rounded-full flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={SITE_CONFIG.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary-800 hover:bg-primary-600 rounded-full flex items-center justify-center transition-colors"
                aria-label="Youtube"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href={SITE_CONFIG.lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary-800 hover:bg-primary-600 rounded-full flex items-center justify-center transition-colors"
                aria-label="LINE"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-primary-800">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-gray-400">
            Copyright © {currentYear} {SITE_CONFIG.name}. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
