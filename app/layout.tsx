import type { Metadata } from "next";
import { Noto_Sans_Thai } from "next/font/google";
import { Header, Footer } from "@/components/layout";
import { SITE_CONFIG } from "@/lib/constants";
import "./globals.css";

const notoSansThai = Noto_Sans_Thai({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-noto-sans-thai",
  display: "swap",
});

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
    "หลังคาโครงเหล็ก",
    "หลังคาอเนกประสงค์",
    "ที่จอดรถ",
    "SP Warehouse",
    "เอสพี แวร์เฮ้าส์",
  ],
  authors: [{ name: SITE_CONFIG.name }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
  openGraph: {
    type: "website",
    locale: "th_TH",
    url: SITE_CONFIG.url,
    title: `${SITE_CONFIG.name} | รับสร้างโกดังสำเร็จรูป`,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.name} | รับสร้างโกดังสำเร็จรูป`,
    description: SITE_CONFIG.description,
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
  icons: {
    icon: "/images/icon-logo.png",
    shortcut: "/images/icon-logo.png",
    apple: "/images/icon-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={notoSansThai.variable}>
      <body className="font-sans antialiased">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
