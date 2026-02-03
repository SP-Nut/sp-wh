"use client";

import { useState } from "react";
import { Send, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui";

const WAREHOUSE_SIZES = [
  { value: "100-300", label: "100-300 ตร.ม." },
  { value: "301-500", label: "301-500 ตร.ม." },
  { value: "501-1000", label: "501-1,000 ตร.ม." },
  { value: "1001+", label: "1,001+ ตร.ม." },
];

interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  lineId: string;
  warehouseSize: string[];
  details: string;
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    lineId: "",
    warehouseSize: [],
    details: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      warehouseSize: prev.warehouseSize.includes(value)
        ? prev.warehouseSize.filter((v) => v !== value)
        : [...prev.warehouseSize, value],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          address: "",
          lineId: "",
          warehouseSize: [],
          details: "",
        });
      } else {
        setSubmitStatus("error");
        setErrorMessage(result.message || "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
      }
    } catch {
      setSubmitStatus("error");
      setErrorMessage("ไม่สามารถส่งข้อมูลได้ กรุณาลองใหม่อีกครั้ง");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name Fields */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ชื่อ <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            placeholder="ชื่อ"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            นามสกุล
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="นามสกุล"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
          />
        </div>
      </div>

      {/* Contact Fields */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            เบอร์โทร <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="เบอร์โทร"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            อีเมล
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="อีเมล"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
          />
        </div>
      </div>

      {/* Address & LINE */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ที่อยู่
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="ที่อยู่หน้างานติดตั้ง"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ID LINE
          </label>
          <input
            type="text"
            name="lineId"
            value={formData.lineId}
            onChange={handleChange}
            placeholder="ID LINE"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
          />
        </div>
      </div>

      {/* Warehouse Size */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          ขนาดพื้นที่โกดัง
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {WAREHOUSE_SIZES.map((size) => (
            <label
              key={size.value}
              className={`flex items-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                formData.warehouseSize.includes(size.value)
                  ? "border-primary-500 bg-primary-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <input
                type="checkbox"
                checked={formData.warehouseSize.includes(size.value)}
                onChange={() => handleCheckboxChange(size.value)}
                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700">{size.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Details */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          รายละเอียด
        </label>
        <textarea
          name="details"
          value={formData.details}
          onChange={handleChange}
          rows={4}
          placeholder="รายละเอียดเพิ่มเติม เช่น ความต้องการพิเศษ, งบประมาณ"
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all resize-none"
        />
      </div>

      {/* Status Messages */}
      {submitStatus === "success" && (
        <div className="flex items-center gap-3 p-4 bg-green-50 text-green-700 rounded-xl">
          <CheckCircle className="w-5 h-5 flex-shrink-0" />
          <p>ส่งข้อมูลสำเร็จ! ทีมงานจะติดต่อกลับโดยเร็วที่สุด</p>
        </div>
      )}

      {submitStatus === "error" && (
        <div className="flex items-center gap-3 p-4 bg-red-50 text-red-700 rounded-xl">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p>{errorMessage}</p>
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full justify-center"
        size="lg"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            กำลังส่ง...
          </>
        ) : (
          <>
            <Send className="w-5 h-5 mr-2" />
            ส่งข้อมูล
          </>
        )}
      </Button>
    </form>
  );
}
