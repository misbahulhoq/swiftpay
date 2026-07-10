import type { NextConfig } from "next";

const repoName = "/swiftpay";
const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  output: "export",
  basePath: isProd ? repoName : "", // required for images to work properly in production (github pages)
  allowedDevOrigins: [
    process.env.ALLOWED_DEV_ORIGIN || "http://localhost:3000",
  ],
  images: {
    unoptimized: true,
  },
  turbopack: {
    rules: {
      "*.mp3": {
        loaders: ["asset"],
      },
    },
  },
};

export default nextConfig;
