import ServicesAfterLife from "@/views/ServicesAfterLife";

export const metadata = {
  title: "Afterlife Transport",
  description: "Dignified, professional afterlife transport services. We handle remains transport with care, compliance and compassion across Nigeria.",
  alternates: { canonical: "/ServiceAfterLife" },
  openGraph: { title: "Afterlife Transport", description: "Dignified, professional afterlife transport services. We handle remains transport with care, compliance and compassion across Nigeria.", url: "/ServiceAfterLife" },
};

export default function Page() {
  return <ServicesAfterLife />;
}
