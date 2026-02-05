import type { Metadata, Viewport } from "next";
import { Prompt } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { LayoutWrapper } from "@/components/layout";
import { OrganizationSchema, LocalBusinessSchema, WebSiteSchema } from "@/components/seo";
import { SITE_CONFIG } from "@/lib/constants";
import "./globals.css";

const prompt = Prompt({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-prompt",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1e3a5f",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.name} | รับสร้างโกดังสำเร็จรูป ประสบการณ์กว่า ${SITE_CONFIG.experience} ปี`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    "โกดังสำเร็จรูป",
    "รับสร้างโกดัง",
    "โกดังสินค้า",
    "คลังสินค้า",
    "โกดังโครงเหล็ก",
    "โกดังราคาถูก",
    "โกดังให้เช่า",
    "สร้างโกดัง",
    "หลังคาโครงเหล็ก",
    "หลังคาอเนกประสงค์",
    "ที่จอดรถ",
    "โรงจอดรถ",
    "SP Warehouse",
    "เอสพี แวร์เฮ้าส์",
    "โกดังมาตรฐาน มอก",
    "โกดังกรุงเทพ",
    "โกดังทั่วประเทศ",
  ],
  authors: [{ name: SITE_CONFIG.name, url: SITE_CONFIG.url }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: SITE_CONFIG.url,
  },
  openGraph: {
    type: "website",
    locale: "th_TH",
    url: SITE_CONFIG.url,
    title: `${SITE_CONFIG.name} | รับสร้างโกดังสำเร็จรูป คุณภาพมาตรฐาน มอก.`,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} - รับสร้างโกดังสำเร็จรูป`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.name} | รับสร้างโกดังสำเร็จรูป`,
    description: SITE_CONFIG.description,
    images: ["/twitter-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // เพิ่ม verification codes ถ้ามี
    // google: "xxxxx",
    // yandex: "xxxxx",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  manifest: "/manifest.json",
  category: "construction",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={prompt.variable}>
      <head>
        <OrganizationSchema />
        <LocalBusinessSchema />
        <WebSiteSchema />
      </head>
      <body className="font-sans antialiased">
        <LayoutWrapper>
          <main className="min-h-screen">{children}</main>
        </LayoutWrapper>
        <Analytics />
      </body>
    </html>
  );
}
