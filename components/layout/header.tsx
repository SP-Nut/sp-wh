"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      {/* Top bar - พับเมื่อเลื่อน */}
      <div 
        className={cn(
          "bg-primary-900 text-white overflow-hidden transition-all duration-300",
          isScrolled ? "max-h-0 py-0" : "max-h-12 py-2"
        )}
      >
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <a
              href={`tel:${SITE_CONFIG.phone}`}
              className="flex items-center gap-1 hover:text-primary-200 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>{SITE_CONFIG.phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")}</span>
            </a>
            <span className="hidden md:inline text-primary-400">|</span>
            <span className="hidden md:inline">{SITE_CONFIG.workingHours}</span>
          </div>
          <a
            href={SITE_CONFIG.lineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-primary-200 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="hidden sm:inline">LINE: {SITE_CONFIG.lineId}</span>
          </a>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/โลโก้แวร์เฮ้าส์.png"
              alt="SP Warehouse Logo"
              width={180}
              height={60}
              className="object-contain h-12 sm:h-14 w-auto"
              quality={100}
              priority
              unoptimized
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "font-medium transition-colors relative py-1",
                    isActive 
                      ? "text-primary-700" 
                      : "text-gray-600 hover:text-primary-700"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-700 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <Button href={SITE_CONFIG.lineUrl} external>
              ปรึกษาเรื่องโกดัง
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-3 -m-1 min-w-[44px] min-h-[44px] flex items-center justify-center text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-300",
            isMenuOpen ? "max-h-96 pb-4" : "max-h-0"
          )}
        >
          <nav className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "font-medium py-2 px-4 rounded-lg transition-all border-l-4",
                    isActive 
                      ? "text-primary-700 bg-primary-50 border-primary-700" 
                      : "text-gray-600 hover:text-primary-700 hover:bg-primary-50 border-transparent"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
            <Button href={SITE_CONFIG.lineUrl} external className="mt-2 w-full">
              ปรึกษาเรื่องโกดัง
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
