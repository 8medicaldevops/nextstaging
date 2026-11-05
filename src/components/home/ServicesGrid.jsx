import { Link } from "@/lib/router-compat";
import Section from "@/components/site/Section";
import SectionHeading from "@/components/site/SectionHeading";
import Reveal from "@/components/site/Reveal";
import { serviceCards } from "./home-data";

function ServiceCard({ image, title, desc, link }) {
  return (
    <Link
      to={link}
      className="group flex h-full flex-col gap-5 rounded-2xl border border-line bg-white p-4 transition-colors duration-300 ease-out-strong hover:border-ev-400"
    >
      <div className="overflow-hidden rounded-xl">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="aspect-[9/5] w-full object-cover transition-transform duration-500 ease-out-strong group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex flex-col gap-2 px-1 pb-2">
        <h3 className="font-brsemi text-xl text-ink">{title}</h3>
        <p className="font-brreg text-mute">{desc}</p>
        <p className="mt-1 flex items-center gap-2 font-brmedium text-ev-700">
          Learn more
          <svg width="16" height="17" viewBox="0 0 16 17" fill="none" aria-hidden="true" className="transition-transform duration-200 ease-out-strong group-hover:translate-x-1">
            <path d="M9.62 4.45337L13.6667 8.50004L9.62 12.5467" stroke="currentColor" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2.33337 8.5H13.5534" stroke="currentColor" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </p>
      </div>
    </Link>
  );
}

export default function ServicesGrid() {
  return (
    <Section tone="white">
      <Reveal>
        <SectionHeading
          title="Unparalleled Healthcare Services"
          lead="You are assured of top-notch medical care when you book any of our services."
        />
      </Reveal>
      {/* even, uniform cards */}
      <Reveal stagger={0.1} className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {serviceCards.map((card) => (
          <ServiceCard key={card.title} {...card} />
        ))}
      </Reveal>
    </Section>
  );
}
