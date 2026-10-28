import ServicesAgt from "@/views/ServicesAgt";

export const metadata = {
  title: "Air & Ground Ambulance Transport",
  description: "Safe, medically-equipped air and ground ambulance transport across Nigeria — inter-hospital transfers, long-distance transport and medical evacuations.",
  alternates: { canonical: "/ServiceAgt" },
  openGraph: { title: "Air & Ground Ambulance Transport", description: "Safe, medically-equipped air and ground ambulance transport across Nigeria — inter-hospital transfers, long-distance transport and medical evacuations.", url: "/ServiceAgt" },
};

export default function Page() {
  return <ServicesAgt />;
}
