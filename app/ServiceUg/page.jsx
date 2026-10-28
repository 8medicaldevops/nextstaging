import ServicesUg from "@/views/ServicesUg";

export const metadata = {
  title: "Urgent Care",
  description: "Urgent medical care when you need it — rapid assessment and treatment from qualified clinicians, at home or wherever you are.",
  alternates: { canonical: "/ServiceUg" },
  openGraph: { title: "Urgent Care", description: "Urgent medical care when you need it — rapid assessment and treatment from qualified clinicians, at home or wherever you are.", url: "/ServiceUg" },
};

export default function Page() {
  return <ServicesUg />;
}
