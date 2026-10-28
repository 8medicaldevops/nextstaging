import AmbulanceTp from "@/views/AmbulanceTp";

export const metadata = {
  title: "Book Ambulance Transport",
  description: "Request ground ambulance transport with trained medical personnel. Tell us the pickup and destination and we handle the rest.",
  alternates: { canonical: "/AmbulanceTp" },
  openGraph: { title: "Book Ambulance Transport", description: "Request ground ambulance transport with trained medical personnel. Tell us the pickup and destination and we handle the rest.", url: "/AmbulanceTp" },
};

export default function Page() {
  return <AmbulanceTp />;
}
