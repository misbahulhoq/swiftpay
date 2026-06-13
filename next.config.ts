import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  output: "export",
  allowedDevOrigins: [
    process.env.ALLOWED_DEV_ORIGIN || "http://localhost:3000",
  ],
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
