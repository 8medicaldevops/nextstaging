import AdminPortalClient from "@/client-pages/AdminPortalClient";

export const metadata = {
  title: "Admin Portal",
  alternates: { canonical: "/Admin" },
  robots: { index: false, follow: false },
};

export default function Page() {
  return <AdminPortalClient />;
}
