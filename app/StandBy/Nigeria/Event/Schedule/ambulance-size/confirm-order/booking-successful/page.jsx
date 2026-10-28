import BookingSuccessfulClient from "@/client-pages/BookingSuccessfulClient";

export const metadata = {
  title: "Booking Successful",
  alternates: { canonical: "/StandBy/Nigeria/Event/Schedule/ambulance-size/confirm-order/booking-successful" },
  robots: { index: false, follow: false },
};

export default function Page() {
  return <BookingSuccessfulClient />;
}
