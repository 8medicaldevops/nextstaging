import OtherBookingsClient from "@/client-pages/OtherBookingsClient";

export const metadata = {
  title: "Other Bookings",
  alternates: { canonical: "/OtherBookings" },
  robots: { index: false, follow: false },
};

export default function Page() {
  return <OtherBookingsClient />;
}
