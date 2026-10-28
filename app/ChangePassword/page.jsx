import ChangePasswordClient from "@/client-pages/ChangePasswordClient";

export const metadata = {
  title: "Change Password",
  alternates: { canonical: "/ChangePassword" },
  robots: { index: false, follow: false },
};

export default function Page() {
  return <ChangePasswordClient />;
}
