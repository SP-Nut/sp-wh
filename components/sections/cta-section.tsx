import { ChevronRight, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui";
import { SITE_CONFIG } from "@/lib/constants";

export function CTASection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-primary-900">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
            สร้างโกดังของคุณกับ
            <span className="text-accent-400"> SP Warehouse</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-primary-200 mb-6 sm:mb-10 max-w-2xl mx-auto">
            ด้วยงบประมาณที่คุ้มค่า เราคัดสรรวัสดุที่ดีที่สุดในราคาที่เหมาะสม
            พร้อมทีมงานผู้เชี่ยวชาญคอยให้คำปรึกษา
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Button size="lg" href={SITE_CONFIG.lineUrl} external className="bg-accent-500 hover:bg-accent-600">
              <MessageCircle className="w-5 h-5 mr-2" />
              ปรึกษาผ่าน LINE
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
            <a
              href={`tel:${SITE_CONFIG.phone}`}
              className="inline-flex items-center justify-center px-5 sm:px-6 md:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-lg border-2 border-accent-400 text-accent-400 hover:bg-accent-400 hover:text-primary-900 transition-all duration-200"
            >
              <Phone className="w-5 h-5 mr-2" />
              โทร {SITE_CONFIG.phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
