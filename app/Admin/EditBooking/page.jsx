import EditBookingClient from "@/client-pages/EditBookingClient";

export const metadata = {
  title: "Edit Booking",
  alternates: { canonical: "/Admin/EditBooking" },
  robots: { index: false, follow: false },
};

export default function Page() {
  return <EditBookingClient />;
}
