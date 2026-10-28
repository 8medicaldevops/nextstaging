import { SITE_URL } from "@/lib/site";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/Admin",
          "/Login",
          "/OrderHistory",
          "/OtherBookings",
          "/BookingError",
          "/StandBy/Nigeria",
          "/StandBy/Others",
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
