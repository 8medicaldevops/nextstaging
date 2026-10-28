import AmbulanceSizeClient from "@/client-pages/AmbulanceSizeClient";

export const metadata = {
  title: "Ambulance Size",
  alternates: { canonical: "/StandBy/Nigeria/Event/Schedule/ambulance-size" },
  robots: { index: false, follow: false },
};

export default function Page() {
  return <AmbulanceSizeClient />;
}
