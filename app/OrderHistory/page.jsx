import OrderHistoryClient from "@/client-pages/OrderHistoryClient";

export const metadata = {
  title: "Order History",
  alternates: { canonical: "/OrderHistory" },
  robots: { index: false, follow: false },
};

export default function Page() {
  return <OrderHistoryClient />;
}
