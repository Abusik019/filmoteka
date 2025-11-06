import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,
    images: {
        domains: ["image.openmoviedb.com"],
    },
};
export default nextConfig;
