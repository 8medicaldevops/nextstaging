import ForgotPasswordClient from "@/client-pages/ForgotPasswordClient";

export const metadata = {
  title: "Forgot Password",
  alternates: { canonical: "/ForgotPassword" },
  robots: { index: false, follow: false },
};

export default function Page() {
  return <ForgotPasswordClient />;
}
