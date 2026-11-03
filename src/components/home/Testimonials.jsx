"use client";
import Autoplay from "embla-carousel-autoplay";
import Section from "@/components/site/Section";
import SectionHeading from "@/components/site/SectionHeading";
import Reveal from "@/components/site/Reveal";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { testimonies } from "./home-data";

// Deterministic brand-tinted palette so each person keeps the same avatar color.
const avatarTones = [
  "bg-ev-100 text-ev-800",
  "bg-[#FDE8EA] text-[#B0071A]",
  "bg-[#FFF1DC] text-[#9A5200]",
  "bg-[#E2F6EA] text-[#12663A]",
  "bg-[#E4EEFD] text-[#1E4FA8]",
];

function initials(name) {
  const parts = name.trim().split(/\s+/);
  return (parts[0][0] + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase();
}

function toneFor(name) {
  let h = 0;
  for (const ch of name) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return avatarTones[h % avatarTones.length];
}

function TestimonialCard({ name, review }) {
  return (
    <figure className="group relative flex h-full flex-col gap-6 rounded-3xl border border-line bg-white p-7 transition-colors duration-300 ease-out-strong hover:border-ev-300">
      <svg
        width="36"
        height="28"
        viewBox="0 0 36 28"
        fill="none"
        aria-hidden="true"
        className="text-ev-200 transition-colors duration-300 ease-out-strong group-hover:text-ev-400"
      >
        <path
          d="M0 28V17.2C0 7.6 5 1.6 14.4 0l1.6 4.4C10.8 6 8.6 9.2 8.4 13H15V28H0Zm21 0V17.2C21 7.6 26 1.6 35.4 0L37 4.4C31.8 6 29.6 9.2 29.4 13H36V28H21Z"
          fill="currentColor"
        />
      </svg>
      <blockquote className="flex-1 font-brmedium text-[17px] leading-relaxed text-ink">{review}</blockquote>
      <figcaption className="flex items-center gap-3 border-t border-line pt-5">
        <span
          aria-hidden="true"
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-brbold text-sm ${toneFor(name)}`}
        >
          {initials(name)}
        </span>
        <span className="flex flex-col leading-tight">
          <span className="font-brbold text-base text-ink">{name}</span>
          <span className="font-brmedium text-sm text-mute">8medical customer</span>
        </span>
      </figcaption>
    </figure>
  );
}

export default function Testimonials() {
  return (
    <Section tone="white" bleed className="overflow-hidden">
      <Reveal className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <SectionHeading
          align="center"
          title="What People are Saying"
          lead="Here's what customers have to say about our 24/7 support."
        />
      </Reveal>
      <div className="relative mt-10">
        <Carousel
          opts={{ align: "start", loop: true }}
          plugins={[Autoplay({ delay: 3500, stopOnMouseEnter: true, stopOnInteraction: false })]}
          className="w-full"
        >
          <CarouselContent className="ml-6 gap-6 py-2 lg:ml-12">
            {testimonies.map((t) => (
              <CarouselItem key={t.name} className="flex-[0_0_340px]">
                <TestimonialCard {...t} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious aria-label="Previous testimonials" className="left-4 border-line bg-white text-ink hover:bg-ev-700 hover:text-white" />
          <CarouselNext aria-label="Next testimonials" className="right-4 border-line bg-white text-ink hover:bg-ev-700 hover:text-white" />
        </Carousel>
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent" />
      </div>
    </Section>
  );
}
