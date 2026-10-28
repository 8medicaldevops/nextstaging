import BookingErrorClient from "@/client-pages/BookingErrorClient";

export const metadata = {
  title: "Booking Error",
  alternates: { canonical: "/BookingError" },
  robots: { index: false, follow: false },
};

export default function Page() {
  return <BookingErrorClient />;
}
