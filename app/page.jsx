import HomePage from "@/views/HomePage";

export const metadata = {
  description: "Rapid emergency medical response, ambulance transport, event medical standby and urgent care across Nigeria. Request an ambulance in minutes with 8medical.",
  alternates: { canonical: "/" },
  openGraph: { title: "8medical — Emergency Medical Response & Ambulance Services", description: "Rapid emergency medical response, ambulance transport, event medical standby and urgent care across Nigeria. Request an ambulance in minutes with 8medical.", url: "/" },
};

export default function Page() {
  return <HomePage />;
}
