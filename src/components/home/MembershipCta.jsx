"use client";
import Reveal from "@/components/site/Reveal";
import doctor__asset from "../../assets/images/doctor.jpeg";

const doctor = doctor__asset.src ?? doctor__asset;

export default function MembershipCta({ onBecomeMember }) {
  return (
    <section className="bg-[#F9F9FA] py-16 lg:py-24">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-white/10">
          {/* full-bleed photo with a night gradient pulling it into the theme */}
          <img
            src={doctor}
            alt="8medical paramedic caring for a patient"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover object-[75%_center]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-night-deep via-night-deep/85 to-night-deep/20"
          />
          <Reveal className="relative flex max-w-[560px] flex-col items-start gap-6 px-8 py-20 sm:px-14 lg:py-28">
            <h2 className="font-brbold text-4xl tracking-tight text-white sm:text-6xl">Membership</h2>
            <p className="font-brmedium text-lg text-white/80">
              Enroll your family, organization, and customers in our plan for access to urgent and emergency care services.
            </p>
            <button
              onClick={onBecomeMember}
              className="inline-flex items-center gap-2 rounded-full bg-ev-700 hover:bg-ev-800 px-6 py-3.5 font-brsemi text-lg text-white transition-transform duration-200 ease-out-strong active:scale-[0.97]"
            >
              Become a Member
              <svg width="16" height="16" viewBox="0 0 16 17" fill="none" aria-hidden="true">
                <path d="M9.62 4.45331L13.6667 8.49998L9.62 12.5466" stroke="currentColor" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2.33337 8.5H13.5534" stroke="currentColor" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
