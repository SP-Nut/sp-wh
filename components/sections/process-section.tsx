import { COMPANY_STRENGTHS } from "@/lib/constants";
import { Settings, Ruler, Wrench, Headset, Trophy } from "lucide-react";

const ICON_MAP = {
  Settings,
  Ruler,
  Wrench,
  Headset,
  Trophy,
};

export function ProcessSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary-900 mb-2">
            สร้างโกดังสินค้ากับ <span className="text-accent-500">SP WAREHOUSE</span>
          </h2>
        </div>

        {/* Top Row - 3 items */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {COMPANY_STRENGTHS.slice(0, 3).map((item, index) => {
            const Icon = ICON_MAP[item.icon as keyof typeof ICON_MAP];
            return (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary-100 rounded-full flex items-center justify-center">
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-primary-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Row - 2 items centered */}
        <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
          {COMPANY_STRENGTHS.slice(3).map((item, index) => {
            const Icon = ICON_MAP[item.icon as keyof typeof ICON_MAP];
            return (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary-100 rounded-full flex items-center justify-center">
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-primary-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
