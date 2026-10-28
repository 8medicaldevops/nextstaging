import StandBy from "@/views/StandBy";

export const metadata = {
  title: "Book Ambulance Standby",
  description: "Book a medically-equipped ambulance and paramedic team on standby for your event. Choose your location to get started.",
  alternates: { canonical: "/StandBy" },
  openGraph: { title: "Book Ambulance Standby", description: "Book a medically-equipped ambulance and paramedic team on standby for your event. Choose your location to get started.", url: "/StandBy" },
};

export default function Page() {
  return <StandBy />;
}
