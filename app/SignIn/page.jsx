import SignInClient from "@/client-pages/SignInClient";

export const metadata = {
  title: "Sign In",
  alternates: { canonical: "/SignIn" },
  robots: { index: false, follow: false },
};

export default function Page() {
  return <SignInClient />;
}
