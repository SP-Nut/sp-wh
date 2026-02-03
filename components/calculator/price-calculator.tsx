"use client";

import { useState, useMemo } from "react";
import { Calculator, ChevronRight, Info, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui";
import { SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

// ราคาโดยประมาณต่อตารางเมตร (บาท)
const PRICE_RATES = {
  basic: {
    name: "แบบมาตรฐาน",
    description: "โครงสร้างเหล็กมาตรฐาน หลังคาเมทัลชีท",
    pricePerSqm: 2500,
    features: ["โครงสร้างเหล็ก มอก.", "หลังคาเมทัลชีท", "รางน้ำฝน"],
  },
  standard: {
    name: "แบบมาตรฐานพลัส",
    description: "โครงสร้างเหล็กเสริมแรง หลังคา+ผนัง",
    pricePerSqm: 3500,
    features: ["โครงสร้างเหล็กเสริมแรง", "หลังคาเมทัลชีท", "ผนังเมทัลชีท", "รางน้ำฝน", "ประตูบานเลื่อน"],
  },
  premium: {
    name: "แบบพรีเมียม",
    description: "โครงสร้างเหล็กหนาพิเศษ ครบทุกอย่าง",
    pricePerSqm: 4500,
    features: ["โครงสร้างเหล็กหนาพิเศษ", "หลังคาฉนวนกันความร้อน", "ผนังแซนวิชพาเนล", "ประตูบานเลื่อนอัตโนมัติ", "รางน้ำฝน PVC", "ระบบไฟฟ้าพื้นฐาน"],
  },
};

type PriceType = keyof typeof PRICE_RATES;

export function PriceCalculator() {
  const [width, setWidth] = useState<string>("");
  const [length, setLength] = useState<string>("");
  const [selectedType, setSelectedType] = useState<PriceType>("standard");
  const [showResult, setShowResult] = useState(false);

  const calculation = useMemo(() => {
    const w = parseFloat(width) || 0;
    const l = parseFloat(length) || 0;
    const area = w * l;
    const rate = PRICE_RATES[selectedType];
    const basePrice = area * rate.pricePerSqm;
    
    // ส่วนลดตามขนาด
    let discount = 0;
    if (area >= 500) discount = 0.05; // 5%
    if (area >= 1000) discount = 0.10; // 10%
    
    const discountAmount = basePrice * discount;
    const finalPrice = basePrice - discountAmount;

    return {
      width: w,
      length: l,
      area,
      rate,
      basePrice,
      discount: discount * 100,
      discountAmount,
      finalPrice,
    };
  }, [width, length, selectedType]);

  const handleCalculate = () => {
    if (calculation.area > 0) {
      setShowResult(true);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("th-TH").format(Math.round(price));
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-primary-900 p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-accent-500 rounded-xl flex items-center justify-center">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold">คำนวณราคาโกดัง</h3>
            <p className="text-sm text-gray-300">ประมาณการราคาเบื้องต้น</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* ขนาดพื้นที่ */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            ขนาดพื้นที่ (เมตร)
          </label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">กว้าง</label>
              <input
                type="number"
                value={width}
                onChange={(e) => {
                  setWidth(e.target.value);
                  setShowResult(false);
                }}
                placeholder="เช่น 10"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">ยาว</label>
              <input
                type="number"
                value={length}
                onChange={(e) => {
                  setLength(e.target.value);
                  setShowResult(false);
                }}
                placeholder="เช่น 20"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
              />
            </div>
          </div>
          {calculation.area > 0 && (
            <p className="text-sm text-gray-500 mt-2">
              พื้นที่รวม: <span className="font-semibold text-primary-700">{formatPrice(calculation.area)} ตร.ม.</span>
            </p>
          )}
        </div>

        {/* ประเภทโกดัง */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            ประเภทโกดัง
          </label>
          <div className="space-y-3">
            {(Object.keys(PRICE_RATES) as PriceType[]).map((type) => {
              const rate = PRICE_RATES[type];
              return (
                <button
                  key={type}
                  onClick={() => {
                    setSelectedType(type);
                    setShowResult(false);
                  }}
                  className={cn(
                    "w-full p-4 rounded-xl border-2 text-left transition-all",
                    selectedType === type
                      ? "border-primary-500 bg-primary-50"
                      : "border-gray-200 hover:border-gray-300"
                  )}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className={cn(
                        "font-semibold",
                        selectedType === type ? "text-primary-700" : "text-gray-900"
                      )}>
                        {rate.name}
                      </p>
                      <p className="text-sm text-gray-500">{rate.description}</p>
                    </div>
                    <p className={cn(
                      "text-sm font-semibold whitespace-nowrap",
                      selectedType === type ? "text-primary-600" : "text-gray-600"
                    )}>
                      ฿{formatPrice(rate.pricePerSqm)}/ตร.ม.
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ปุ่มคำนวณ */}
        <Button
          onClick={handleCalculate}
          disabled={calculation.area <= 0}
          className="w-full justify-center mb-6"
          size="lg"
        >
          คำนวณราคา
        </Button>

        {/* ผลลัพธ์ */}
        {showResult && calculation.area > 0 && (
          <div className="border-t pt-6">
            <div className="bg-gray-50 rounded-xl p-5 mb-4">
              <div className="flex justify-between items-center mb-3">
                <span className="text-gray-600">ราคาพื้นฐาน</span>
                <span className="font-medium">฿{formatPrice(calculation.basePrice)}</span>
              </div>
              {calculation.discount > 0 && (
                <div className="flex justify-between items-center mb-3 text-green-600">
                  <span>ส่วนลด ({calculation.discount}%)</span>
                  <span className="font-medium">-฿{formatPrice(calculation.discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                <span className="text-lg font-semibold text-primary-900">ราคาประมาณการ</span>
                <span className="text-2xl font-bold text-accent-500">
                  ฿{formatPrice(calculation.finalPrice)}
                </span>
              </div>
            </div>

            {/* รายการที่รวม */}
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">รายการที่รวมในราคา:</p>
              <ul className="space-y-1">
                {calculation.rate.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-accent-500 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* หมายเหตุ */}
            <div className="flex items-start gap-2 p-3 bg-amber-50 rounded-lg text-sm">
              <Info className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
              <p className="text-amber-700">
                ราคานี้เป็นการประมาณการเบื้องต้นเท่านั้น ราคาจริงอาจแตกต่างขึ้นอยู่กับสภาพพื้นที่ 
                การเตรียมงาน และรายละเอียดอื่นๆ กรุณาติดต่อเพื่อขอใบเสนอราคาจริง
              </p>
            </div>

            <Button
              href={SITE_CONFIG.lineUrl}
              external
              className="w-full justify-center mt-4"
              size="lg"
            >
              ขอใบเสนอราคาจริง
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
