import AboutUs from "@/views/AboutUs";

export const metadata = {
  title: "About Us",
  description: "Meet the team behind 8medical. We are building the fastest emergency medical response network in Nigeria, with trained paramedics and a modern ambulance fleet.",
  alternates: { canonical: "/AboutUs" },
  openGraph: { title: "About Us", description: "Meet the team behind 8medical. We are building the fastest emergency medical response network in Nigeria, with trained paramedics and a modern ambulance fleet.", url: "/AboutUs" },
};

export default function Page() {
  return <AboutUs />;
}
