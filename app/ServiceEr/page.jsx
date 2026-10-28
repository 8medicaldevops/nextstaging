import ServicesEr from "@/views/ServicesEr";

export const metadata = {
  title: "Emergency Response",
  description: "On-demand emergency medical response in Nigeria. Trained paramedics dispatched to your location in minutes, with treatment en route to the right hospital.",
  alternates: { canonical: "/ServiceEr" },
  openGraph: { title: "Emergency Response", description: "On-demand emergency medical response in Nigeria. Trained paramedics dispatched to your location in minutes, with treatment en route to the right hospital.", url: "/ServiceEr" },
};

export default function Page() {
  return <ServicesEr />;
}
