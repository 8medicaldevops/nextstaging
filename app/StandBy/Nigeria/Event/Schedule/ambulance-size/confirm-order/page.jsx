import ConfirmOrderClient from "@/client-pages/ConfirmOrderClient";

export const metadata = {
  title: "Confirm Order",
  alternates: { canonical: "/StandBy/Nigeria/Event/Schedule/ambulance-size/confirm-order" },
  robots: { index: false, follow: false },
};

export default function Page() {
  return <ConfirmOrderClient />;
}
