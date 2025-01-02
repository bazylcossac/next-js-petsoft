import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bytegrad.com",
        pathname: "/course-assets/react-nextjs/petsoft-preview.png",
        port: "",
        search: "",
      },
    ],
  },
};

export default nextConfig;
