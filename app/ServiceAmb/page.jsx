import ServicesAmb from "@/views/ServicesAmb";

export const metadata = {
  title: "Ambulance Standby for Events",
  description: "Dedicated ambulance and paramedic standby for concerts, sports, weddings, film sets and corporate events anywhere in Nigeria. Book online in minutes.",
  alternates: { canonical: "/ServiceAmb" },
  openGraph: { title: "Ambulance Standby for Events", description: "Dedicated ambulance and paramedic standby for concerts, sports, weddings, film sets and corporate events anywhere in Nigeria. Book online in minutes.", url: "/ServiceAmb" },
};

export default function Page() {
  return <ServicesAmb />;
}
