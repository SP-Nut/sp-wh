/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary - Deep Navy (สีหลัก โทนกรมท่าเข้ม)
        primary: {
          50: '#f0f4f8',
          100: '#d9e2ec',
          200: '#bcccdc',
          300: '#9fb3c8',
          400: '#829ab1',
          500: '#627d98',
          600: '#486581',
          700: '#334e68',
          800: '#243b53',
          900: '#102a43',
        },
        // Secondary - Slate Blue (สีรอง โทนฟ้าเทา)
        secondary: {
          50: '#f0f4f8',
          100: '#d9e2ec',
          200: '#b6c7d6',
          300: '#8da2b5',
          400: '#6b8299',
          500: '#4a6480',
          600: '#3d5467',
          700: '#30434f',
          800: '#1f2d3d',
          900: '#0f1a26',
        },
        // Accent - Amber Gold (สำหรับ highlight เพิ่มชีวิตชีวา)
        accent: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        // CTA Blue (สำหรับปุ่ม CTA)
        cta: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
      },
      fontFamily: {
        sans: ['var(--font-noto-sans-thai)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

