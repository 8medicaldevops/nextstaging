"use client";
import { useEffect, useRef, useState } from "react";
import ReactGA from "react-ga4";
import "../App.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Faqs from "@/components/Faqs";
import NewsLetter from "@/components/NewsLetter";
import BookServiceModal from "@/components/BookServiceModal";
import ComingSoon from "@/components/ComingSoon";
import HomeHero from "@/components/home/HomeHero";
import PartnerMarquee from "@/components/home/PartnerMarquee";
import ServiceRows from "@/components/home/ServiceRows";
import ImpactStats from "@/components/home/ImpactStats";
import WhyUs from "@/components/home/WhyUs";
import MembershipCta from "@/components/home/MembershipCta";
import Testimonials from "@/components/home/Testimonials";

export default function HomePage() {
  const [bookingModal, setBookingModal] = useState(false);
  const [membershipModal, setMembershipModal] = useState(false);
  const newsLetterRef = useRef(null);

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: "/", title: "Home" });
  }, []);

  const scrollToServices = () => {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToNewsLetter = () => {
    setMembershipModal(false);
    newsLetterRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-night-deep">
      <NavBar />
      <main>
        <HomeHero onEmergency={() => setBookingModal(true)} onBookService={scrollToServices} />
        <PartnerMarquee />
        <ServiceRows onOpenBookingModal={() => setBookingModal(true)} />
        <ImpactStats />
        <WhyUs />
        <MembershipCta onBecomeMember={() => setMembershipModal(true)} />
        <Testimonials />
        <section className="flex flex-col items-center bg-[#F9F9FA]">
          <Faqs />
        </section>
        <section
          ref={newsLetterRef}
          className="relative overflow-hidden bg-night-deep px-4 pb-24 pt-8 sm:px-6 lg:px-8"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(700px 360px at 50% 100%, rgba(109,9,249,0.3), transparent 70%)",
            }}
          />
          <div className="relative mx-auto max-w-[1200px]">
            <NewsLetter />
          </div>
        </section>
      </main>
      <Footer />
      <BookServiceModal isModalOpen={bookingModal} isModalClosed={() => setBookingModal(false)} />
      <ComingSoon
        isModalOpen={membershipModal}
        scrollView={scrollToNewsLetter}
        isModalClosed={() => setMembershipModal(false)}
      />
    </div>
  );
}
