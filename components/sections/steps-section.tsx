import { 
  ClipboardList, 
  MessageCircle, 
  UserCheck, 
  Search, 
  FileText, 
  FileSignature 
} from "lucide-react";

const BUILDING_STEPS = [
  {
    title: "การเลือกแบบ",
    description: "เลือกแบบโกดังที่ท่านพอใจ และตอบโจทย์ในการใช้งานของท่าน รวมทั้งแจ้งขนาด และสถานที่หน้างาน",
    icon: ClipboardList,
  },
  {
    title: "ปรึกษาและให้คำแนะนำการสร้างโกดัง",
    description: "มีทีมแอดมิน คอยประสานงาน ให้คำปรึกษา หากต้องการปรับแบบหรือเพิ่ม-ลด ทางบริษัทฯ จะมีการดำเนินการแก้ไข พร้อมแจ้งงบประมาณเบื้องต้นให้ท่านทราบ",
    icon: MessageCircle,
  },
  {
    title: "ลูกค้าสนใจสร้างโกดัง",
    description: "หากท่านพิจารณาแล้วว่าจะใช้บริการสร้างโกดังกับทางเรา เราจะทำการนัดวันที่จะเข้าไปสำรวจพื้นที่",
    icon: UserCheck,
  },
  {
    title: "สำรวจหน้างาน ตรวจสภาพพื้นที่",
    description: "ทางเราจะเข้าไปสำรวจ พร้อมวัดขนาดพื้นที่จริง โดยทีมงานมืออาชีพ และประเมินหน้างาน กับโกดังที่ลูกค้าเลือก ให้เหมาะสมกับสภาพแวดล้อม",
    icon: Search,
  },
  {
    title: "การทำใบเสนอราคาพร้อมแบบ",
    description: "พร้อมทำแบบร่าง Sketchup 3D และแบบแปลนโครงสร้าง เมื่อลูกค้าตรวจสอบแล้ว พร้อมทำใบเสนอราคาให้กับลูกค้า",
    icon: FileText,
  },
  {
    title: "การทำสัญญาการก่อสร้าง",
    description: "เมื่อตกลงรายละเอียดเป็นที่แน่นอนแล้วทางเรา จะร่างสัญญาข้อตกลงให้ท่านได้พิจารณาล่วงหน้าก่อนการทำสัญญา เมื่อทำสัญญาว่าจ้างแล้ว ผู้ว่าจ้างจะต้องส่งมอบพื้นที่ก่อสร้างให้กับเรา เพื่อทำการก่อสร้างต่อไป",
    icon: FileSignature,
  },
];

export function StepsSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary-900">
            ขั้นตอนการสั่งสร้าง<span className="text-accent-500">โกดังอเนกประสงค์</span>
          </h2>
        </div>

        {/* Steps Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {BUILDING_STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary-100 rounded-full flex items-center justify-center">
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-primary-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
