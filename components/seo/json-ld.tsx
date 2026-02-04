import { SITE_CONFIG } from "@/lib/constants";

// Organization Schema - ข้อมูลบริษัท
export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_CONFIG.name,
    legalName: SITE_CONFIG.fullName,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/images/sp-warehouse-logo.png`,
    description: SITE_CONFIG.description,
    foundingDate: "1991",
    address: {
      "@type": "PostalAddress",
      streetAddress: "28/101 ถ.รัชดา-รามอินทรา",
      addressLocality: "แขวงคลองกุ่ม เขตบึงกุ่ม",
      addressRegion: "กรุงเทพมหานคร",
      postalCode: "10230",
      addressCountry: "TH",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: `+66${SITE_CONFIG.phone.slice(1)}`,
        contactType: "sales",
        availableLanguage: ["Thai"],
      },
      {
        "@type": "ContactPoint",
        telephone: `+66${SITE_CONFIG.phone2.slice(1)}`,
        contactType: "customer service",
        availableLanguage: ["Thai"],
      },
    ],
    sameAs: [
      SITE_CONFIG.facebook,
      SITE_CONFIG.youtube,
      SITE_CONFIG.lineUrl,
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// LocalBusiness Schema - ธุรกิจท้องถิ่น
export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_CONFIG.url}/#localbusiness`,
    name: SITE_CONFIG.name,
    image: `${SITE_CONFIG.url}/images/sp-warehouse-logo.png`,
    url: SITE_CONFIG.url,
    telephone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    description: SITE_CONFIG.description,
    priceRange: "฿฿฿",
    address: {
      "@type": "PostalAddress",
      streetAddress: "28/101 ถ.รัชดา-รามอินทรา",
      addressLocality: "แขวงคลองกุ่ม เขตบึงกุ่ม",
      addressRegion: "กรุงเทพมหานคร",
      postalCode: "10230",
      addressCountry: "TH",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 13.8022,
      longitude: 100.6417,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "08:00",
        closes: "17:00",
      },
    ],
    areaServed: {
      "@type": "Country",
      name: "Thailand",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "บริการโกดังสำเร็จรูป",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "โกดังสำเร็จรูปขนาดเล็ก",
            description: "100-300 ตร.ม.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "โกดังสำเร็จรูปขนาดกลาง",
            description: "301-500 ตร.ม.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "โกดังสำเร็จรูปขนาดใหญ่",
            description: "501-1,000+ ตร.ม.",
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// WebSite Schema - สำหรับ Search Box
export function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_CONFIG.url}/#website`,
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
    publisher: {
      "@id": `${SITE_CONFIG.url}/#organization`,
    },
    inLanguage: "th-TH",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// BreadcrumbList Schema
interface BreadcrumbItem {
  name: string;
  url: string;
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Article Schema - สำหรับหน้าบทความ
interface ArticleSchemaProps {
  title: string;
  description: string;
  url: string;
  image?: string | null;
  publishedTime: string;
  modifiedTime?: string;
  author?: string;
  category?: string | null;
}

export function ArticleSchema({
  title,
  description,
  url,
  image,
  publishedTime,
  modifiedTime,
  author = SITE_CONFIG.name,
  category,
}: ArticleSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    image: image || `${SITE_CONFIG.url}/images/sp-warehouse-logo.png`,
    url: url,
    datePublished: publishedTime,
    dateModified: modifiedTime || publishedTime,
    author: {
      "@type": "Organization",
      name: author,
      url: SITE_CONFIG.url,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_CONFIG.url}/images/sp-warehouse-logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    ...(category && { articleSection: category }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Service Schema - สำหรับหน้าบริการ
interface ServiceSchemaProps {
  name: string;
  description: string;
  url: string;
  priceRange?: string;
}

export function ServiceSchema({
  name,
  description,
  url,
  priceRange,
}: ServiceSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: name,
    description: description,
    url: url,
    provider: {
      "@type": "LocalBusiness",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    areaServed: {
      "@type": "Country",
      name: "Thailand",
    },
    ...(priceRange && { priceRange }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Product Schema - สำหรับขนาดโกดัง
interface ProductSchemaProps {
  name: string;
  description: string;
  url: string;
  image?: string;
  priceRange: string;
  sku: string;
}

export function ProductSchema({
  name,
  description,
  url,
  image,
  priceRange,
  sku,
}: ProductSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: name,
    description: description,
    url: url,
    image: image || `${SITE_CONFIG.url}/images/sp-warehouse-logo.png`,
    sku: sku,
    brand: {
      "@type": "Brand",
      name: SITE_CONFIG.name,
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "THB",
      lowPrice: priceRange.split(" - ")[0]?.replace(/[^0-9]/g, "") || "350000",
      highPrice: priceRange.split(" - ")[1]?.replace(/[^0-9]/g, "") || "900000",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: SITE_CONFIG.name,
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "1500",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// FAQ Schema - สำหรับคำถามที่พบบ่อย
interface FAQItem {
  question: string;
  answer: string;
}

export function FAQSchema({ faqs }: { faqs: FAQItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ContactPage Schema
export function ContactPageSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "ติดต่อเรา - SP WAREHOUSE",
    description: "ติดต่อ SP WAREHOUSE สอบถามข้อมูล ขอใบเสนอราคา",
    url: `${SITE_CONFIG.url}/contact`,
    mainEntity: {
      "@type": "LocalBusiness",
      name: SITE_CONFIG.name,
      telephone: SITE_CONFIG.phone,
      email: SITE_CONFIG.email,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
