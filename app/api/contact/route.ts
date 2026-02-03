import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface ContactFormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  lineId: string;
  warehouseSize: string[];
  details: string;
}

export async function POST(request: NextRequest) {
  try {
    const data: ContactFormData = await request.json();

    // Validate required fields
    if (!data.firstName || !data.phone) {
      return NextResponse.json(
        { success: false, message: "กรุณากรอกชื่อและเบอร์โทร" },
        { status: 400 }
      );
    }

    // Create email content
    const warehouseSizeText = data.warehouseSize.length > 0 
      ? data.warehouseSize.join(", ") 
      : "ไม่ได้ระบุ";

    const emailContent = `
ข้อมูลติดต่อใหม่จากเว็บไซต์ SP Warehouse
========================================

ข้อมูลลูกค้า:
- ชื่อ: ${data.firstName} ${data.lastName}
- เบอร์โทร: ${data.phone}
- อีเมล: ${data.email || "ไม่ได้ระบุ"}
- ที่อยู่: ${data.address || "ไม่ได้ระบุ"}
- ID LINE: ${data.lineId || "ไม่ได้ระบุ"}

ความต้องการ:
- ขนาดพื้นที่โกดัง: ${warehouseSizeText}
- รายละเอียด: ${data.details || "ไม่ได้ระบุ"}

========================================
ส่งจากเว็บไซต์ SP Warehouse
เวลา: ${new Date().toLocaleString("th-TH", { timeZone: "Asia/Bangkok" })}
`;

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Segoe UI', Tahoma, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #1e3a5f 0%, #2d5a87 100%); color: white; padding: 30px; border-radius: 12px 12px 0 0; }
    .header h1 { margin: 0; font-size: 24px; }
    .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; }
    .section { background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    .section h3 { color: #1e3a5f; margin-top: 0; border-bottom: 2px solid #f59e0b; padding-bottom: 10px; }
    .field { margin-bottom: 12px; }
    .label { font-weight: 600; color: #6b7280; font-size: 14px; }
    .value { color: #111827; font-size: 16px; }
    .footer { background: #1e3a5f; color: #9ca3af; padding: 20px; text-align: center; border-radius: 0 0 12px 12px; font-size: 14px; }
    .highlight { background: #fef3c7; padding: 2px 8px; border-radius: 4px; color: #92400e; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📬 ข้อมูลติดต่อใหม่</h1>
      <p style="margin: 10px 0 0 0; opacity: 0.9;">จากเว็บไซต์ SP Warehouse</p>
    </div>
    
    <div class="content">
      <div class="section">
        <h3>👤 ข้อมูลลูกค้า</h3>
        <div class="field">
          <span class="label">ชื่อ-นามสกุล:</span><br>
          <span class="value">${data.firstName} ${data.lastName || "-"}</span>
        </div>
        <div class="field">
          <span class="label">เบอร์โทร:</span><br>
          <span class="value highlight">${data.phone}</span>
        </div>
        <div class="field">
          <span class="label">อีเมล:</span><br>
          <span class="value">${data.email || "-"}</span>
        </div>
        <div class="field">
          <span class="label">ที่อยู่หน้างาน:</span><br>
          <span class="value">${data.address || "-"}</span>
        </div>
        <div class="field">
          <span class="label">ID LINE:</span><br>
          <span class="value">${data.lineId || "-"}</span>
        </div>
      </div>
      
      <div class="section">
        <h3>📦 ความต้องการ</h3>
        <div class="field">
          <span class="label">ขนาดพื้นที่โกดัง:</span><br>
          <span class="value">${warehouseSizeText}</span>
        </div>
        <div class="field">
          <span class="label">รายละเอียดเพิ่มเติม:</span><br>
          <span class="value">${data.details || "-"}</span>
        </div>
      </div>
    </div>
    
    <div class="footer">
      <p style="margin: 0;">ส่งจากเว็บไซต์ SP Warehouse</p>
      <p style="margin: 5px 0 0 0;">${new Date().toLocaleString("th-TH", { timeZone: "Asia/Bangkok" })}</p>
    </div>
  </div>
</body>
</html>
`;

    // Configure email transport
    // ใช้ environment variables สำหรับการตั้งค่า
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Send email
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
      subject: `[SP Warehouse] ลูกค้าใหม่: ${data.firstName} ${data.lastName || ""} - ${data.phone}`,
      text: emailContent,
      html: htmlContent,
      replyTo: data.email || undefined,
    });

    return NextResponse.json({
      success: true,
      message: "ส่งข้อมูลสำเร็จ",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { 
        success: false, 
        message: "เกิดข้อผิดพลาดในการส่งข้อมูล กรุณาติดต่อทางโทรศัพท์หรือ LINE" 
      },
      { status: 500 }
    );
  }
}
