import ScheduleClient from "@/client-pages/ScheduleClient";

export const metadata = {
  title: "Schedule",
  alternates: { canonical: "/StandBy/Nigeria/Event/Schedule" },
  robots: { index: false, follow: false },
};

export default function Page() {
  return <ScheduleClient />;
}
