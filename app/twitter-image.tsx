import { ImageResponse } from "next/og";
import { SITE_CONFIG } from "@/lib/constants";

export const alt = "SP WAREHOUSE - รับสร้างโกดังสำเร็จรูป";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #1e3a5f 0%, #2d5a87 50%, #1e3a5f 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px",
          position: "relative",
        }}
      >
        {/* Logo */}
        <div
          style={{
            width: "100px",
            height: "100px",
            background: "#f59e0b",
            borderRadius: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "48px",
            fontWeight: "bold",
            color: "#1e3a5f",
            marginBottom: "40px",
          }}
        >
          SP
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: "64px",
            fontWeight: "bold",
            color: "white",
            textAlign: "center",
            marginBottom: "20px",
            display: "flex",
          }}
        >
          {SITE_CONFIG.name}
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: "36px",
            color: "#f59e0b",
            textAlign: "center",
            marginBottom: "30px",
            display: "flex",
          }}
        >
          รับสร้างโกดังสำเร็จรูป
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: "24px",
            color: "#cbd5e1",
            textAlign: "center",
            maxWidth: "900px",
            display: "flex",
          }}
        >
          {`ประสบการณ์กว่า ${SITE_CONFIG.experience} ปี | คุณภาพมาตรฐาน มอก. | บริการครบวงจร`}
        </div>

        {/* Stats */}
        <div
          style={{
            display: "flex",
            gap: "60px",
            marginTop: "40px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ fontSize: "48px", fontWeight: "bold", color: "#f59e0b", display: "flex" }}>1,500+</div>
            <div style={{ fontSize: "20px", color: "#94a3b8", display: "flex" }}>โปรเจกต์สำเร็จ</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ fontSize: "48px", fontWeight: "bold", color: "#f59e0b", display: "flex" }}>{SITE_CONFIG.experience}+</div>
            <div style={{ fontSize: "20px", color: "#94a3b8", display: "flex" }}>ปีประสบการณ์</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ fontSize: "48px", fontWeight: "bold", color: "#f59e0b", display: "flex" }}>77</div>
            <div style={{ fontSize: "20px", color: "#94a3b8", display: "flex" }}>จังหวัดทั่วไทย</div>
          </div>
        </div>

        {/* Website URL */}
        <div
          style={{
            position: "absolute",
            bottom: "30px",
            fontSize: "20px",
            color: "#64748b",
            display: "flex",
          }}
        >
          {SITE_CONFIG.url}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
