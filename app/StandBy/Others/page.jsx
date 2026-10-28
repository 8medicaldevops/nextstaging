import OtherCountriesClient from "@/client-pages/OtherCountriesClient";

export const metadata = {
  title: "Ambulance Standby — Other Countries",
  alternates: { canonical: "/StandBy/Others" },
  robots: { index: false, follow: false },
};

export default function Page() {
  return <OtherCountriesClient />;
}
