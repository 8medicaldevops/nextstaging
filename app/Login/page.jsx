import AdminLoginClient from "@/client-pages/AdminLoginClient";

export const metadata = {
  title: "Admin Login",
  alternates: { canonical: "/Login" },
  robots: { index: false, follow: false },
};

export default function Page() {
  return <AdminLoginClient />;
}
