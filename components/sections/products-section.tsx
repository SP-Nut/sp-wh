import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui";
import { WAREHOUSE_SIZES } from "@/lib/constants";

export function ProductsSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <p className="text-accent-600 font-semibold mb-2">สินค้าของเรา</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-900 mb-4">
            ขนาดโกดังที่หลากหลาย
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            เลือกขนาดโกดังที่เหมาะกับธุรกิจของคุณ ตั้งแต่ขนาดเล็กไปจนถึงขนาดใหญ่
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {WAREHOUSE_SIZES.map((size) => (
            <Link
              key={size.id}
              href={`/products/${size.slug}`}
              className="group bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-gray-100 hover:border-accent-300 hover:shadow-lg transition-all duration-300"
            >
              {/* Image Placeholder */}
              <div className="aspect-4/3 bg-gray-100 flex items-center justify-center group-hover:bg-accent-50 transition-colors">
                <div className="text-center">
                  <span className="text-2xl sm:text-4xl">🏭</span>
                  <p className="text-gray-500 text-xs sm:text-sm mt-1 sm:mt-2">{size.name}</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-3 sm:p-4 lg:p-6">
                <h3 className="text-sm sm:text-lg lg:text-xl font-bold text-primary-900 group-hover:text-accent-600 transition-colors">
                  {size.name}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm mt-1 sm:mt-2 hidden sm:block">
                  โกดังสำเร็จรูปขนาด {size.name}
                </p>
                <div className="flex items-center text-accent-600 font-medium text-xs sm:text-sm mt-2 sm:mt-4 group-hover:translate-x-1 sm:group-hover:translate-x-2 transition-transform">
                  ดูรายละเอียด
                  <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-8 sm:mt-12">
          <Button variant="outline" size="lg" href="/products">
            ดูขนาดโกดังทั้งหมด
          </Button>
        </div>
      </div>
    </section>
  );
}
