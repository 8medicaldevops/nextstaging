/** @type {import('next').NextConfig} */

// The deploy environment still provides VITE_-prefixed variables (carried over
// from the Vite setup). Inline them into the client bundle so no CI changes
// are required.
const viteEnv = Object.fromEntries(
  Object.entries(process.env).filter(([key]) => key.startsWith("VITE_"))
);

const nextConfig = {
  env: viteEnv,
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // Imported images resolve to plain URL strings via the webpack rule below
    // (the legacy code uses <img>, background-image etc., not next/image).
    disableStaticImages: true,
  },
  async redirects() {
    // Legacy SPA funnel URLs contained spaces; they now live at hyphenated slugs.
    const base = "/StandBy/Nigeria/Event/Schedule";
    return [
      {
        source: `${base}/Ambulance%20Size`,
        destination: `${base}/ambulance-size`,
        permanent: true,
      },
      {
        source: `${base}/Ambulance%20Size/Confirm%20order`,
        destination: `${base}/ambulance-size/confirm-order`,
        permanent: true,
      },
      {
        source: `${base}/Ambulance%20Size/Confirm%20order/Booking%20successful`,
        destination: `${base}/ambulance-size/confirm-order/booking-successful`,
        permanent: true,
      },
    ];
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|svg|webp|avif|webm)$/i,
      type: "asset/resource",
      generator: { filename: "static/media/[name].[hash:8][ext]" },
    });
    return config;
  },
};

module.exports = nextConfig;
