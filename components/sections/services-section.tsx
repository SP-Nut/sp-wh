import { Warehouse, Home, Car, Store } from "lucide-react";
import { SERVICES } from "@/lib/constants";

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  Warehouse,
  Home,
  Car,
  Store,
};

export function ServicesSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <p className="text-accent-600 font-semibold mb-2">บริการของเรา</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-900 mb-4">
            เราให้บริการครบวงจร
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            SP Warehouse ให้บริการออกแบบ ผลิต และติดตั้งโกดังสำเร็จรูป
            พร้อมบริการหลังการขายที่ครบครัน
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {SERVICES.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Warehouse;
            return (
              <div
                key={index}
                className="group bg-white p-5 sm:p-6 lg:p-8 rounded-2xl border border-gray-100 hover:border-accent-300 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-14 h-14 bg-accent-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent-500 transition-colors">
                  <IconComponent className="w-7 h-7 text-accent-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-primary-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
