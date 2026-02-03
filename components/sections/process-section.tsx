import { PROCESS_STEPS } from "@/lib/constants";

export function ProcessSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <p className="text-accent-600 font-semibold mb-2">ขั้นตอนการทำงาน</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-900 mb-4">
            ขั้นตอนการสั่งสร้างโกดัง
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            เราทำให้กระบวนการสร้างโกดังของคุณเป็นเรื่องง่าย ด้วยขั้นตอนที่ชัดเจน
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {PROCESS_STEPS.map((item, index) => (
            <div
              key={index}
              className="relative bg-gray-50 p-5 sm:p-6 lg:p-8 rounded-2xl border border-gray-100 hover:border-accent-300 hover:shadow-md transition-all"
            >
              {/* Step Number */}
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-accent-500 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                {item.step}
              </div>
              <div className="pt-4">
                <h3 className="text-xl font-bold text-primary-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
