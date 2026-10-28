import CreateAccountClient from "@/client-pages/CreateAccountClient";

export const metadata = {
  title: "Create Account",
  alternates: { canonical: "/CreateAccount" },
  robots: { index: false, follow: false },
};

export default function Page() {
  return <CreateAccountClient />;
}
