import AboutCallerClient from "@/client-pages/AboutCallerClient";

export const metadata = {
  title: "About You",
  alternates: { canonical: "/StandBy/Nigeria" },
  robots: { index: false, follow: false },
};

export default function Page() {
  return <AboutCallerClient />;
}
