import EmsLanding from "@/views/EMS";

export const metadata = {
  title: "EMS Week",
  description: "Join 8medical for EMS Week — celebrating emergency medical services professionals with talks, exhibitions and community events.",
  alternates: { canonical: "/ems-week" },
  openGraph: { title: "EMS Week", description: "Join 8medical for EMS Week — celebrating emergency medical services professionals with talks, exhibitions and community events.", url: "/ems-week" },
};

export default function Page() {
  return <EmsLanding />;
}
