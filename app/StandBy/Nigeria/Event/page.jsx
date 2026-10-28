import AboutEventClient from "@/client-pages/AboutEventClient";

export const metadata = {
  title: "About Your Event",
  alternates: { canonical: "/StandBy/Nigeria/Event" },
  robots: { index: false, follow: false },
};

export default function Page() {
  return <AboutEventClient />;
}
