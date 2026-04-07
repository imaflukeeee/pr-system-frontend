import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { // กำหนดตั้งค่ารูปภาพ next.js
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // กำหนดให้อนุญาตดึงรูปภาพจาก unsplash.com มาใช้ได้
      },
    ],
  },
};

export default nextConfig;
