"use client";
import { useEffect, useRef, useState } from "react";
import ReactGA from "react-ga4";
import { Link, useNavigate } from "@/lib/router-compat";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import BookServiceModal from "@/components/BookServiceModal";
import Section from "@/components/site/Section";
import Cta from "@/components/site/Cta";
import Reveal from "@/components/site/Reveal";
import { cn } from "@/lib/utils";
import { SERVICES, SERVICE_CARDS, BOOKING_POLICIES } from "./service-data";

/* --------------------------------- pieces -------------------------------- */

function ServiceHero({ service, onAction }) {
  const Icon = service.icon;
  return (
    <Section tone="white" className="py-12 lg:py-16">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal className="flex flex-col items-start gap-6 max-lg:items-center max-lg:text-center">
          <span
            className="flex h-16 w-16 items-center justify-center rounded-2xl"
            style={{ backgroundColor: service.iconBg, color: service.iconColor }}
            aria-hidden="true"
          >
            <Icon width="30" height="30" />
          </span>
          <h1 className="font-brbold text-4xl leading-tight tracking-tight text-night md:text-5xl">
            {service.title}
          </h1>
          <p className="max-w-[52ch] font-brreg text-lg text-mute">{service.body}</p>
          <Cta
            size="lg"
            variant={service.heroAction.variant || "primary"}
            arrow
            onClick={() => onAction(service.heroAction)}
          >
            {service.heroAction.label}
          </Cta>
        </Reveal>
        <Reveal delay={0.1} className="overflow-hidden rounded-2xl border border-line">
          <img src={service.image} alt={service.imageAlt} className="w-full object-cover" />
        </Reveal>
      </div>
    </Section>
  );
}

function StepsSection({ steps }) {
  return (
    <Section tone="mist">
      <Reveal className="flex flex-wrap items-baseline justify-center gap-x-2 text-center font-brsemi text-3xl tracking-tight sm:text-4xl">
        <span className="text-ink">{steps.prefix}</span>
        <span className="text-ev-700">{steps.highlight}</span>
      </Reveal>
      <Reveal stagger={0.08} className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {steps.items.map((step, i) => (
          <div
            key={step.title}
            className="flex h-full flex-col gap-3 rounded-2xl border border-line bg-white p-6 transition-colors duration-300 ease-out-strong hover:border-ev-400"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ev-50 font-brsemi text-sm text-ev-700">
              {i + 1}
            </span>
            <h3 className="font-brbold text-lg text-ink">{step.title}</h3>
            <p className="font-brmedium text-mute">{step.body}</p>
            {step.contact && (
              <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1 font-brmedium text-ev-700 [overflow-wrap:anywhere]">
                {step.contact.map((c, j) => (
                  <span key={c} className="contents">
                    {j > 0 && <span className="font-brreg text-sm text-mute">or</span>}
                    {c.startsWith("+") ? (
                      <a href={`tel:${c}`} className="whitespace-nowrap hover:underline">
                        {c.replace(/^(\+234)(\d{3})(\d{3})(\d{4})$/, "$1 $2 $3 $4")}
                      </a>
                    ) : (
                      <a href={`mailto:${c}`} className="hover:underline">{c}</a>
                    )}
                  </span>
                ))}
              </p>
            )}
          </div>
        ))}
      </Reveal>
    </Section>
  );
}

function CtaBand({ band, onAction }) {
  return (
    <Section tone="white" className="py-0 lg:py-0">
      <div className="relative my-16 overflow-hidden rounded-3xl bg-night px-6 py-12 text-center md:px-16 md:py-14 lg:my-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(540px 280px at 80% 0%, rgba(255,255,255,0.14), transparent 65%)",
          }}
        />
        <div className="relative flex flex-col items-center gap-6">
          <div className="flex flex-col gap-1">
            <p className="font-brbold text-2xl text-white sm:text-4xl">{band.title}</p>
            {band.highlight && (
              <p className="font-brbold text-2xl text-ev-300 sm:text-4xl">{band.highlight}</p>
            )}
          </div>
          {band.action.type === "href" ? (
            <a
              href={band.action.href}
              className="inline-flex items-center rounded-full bg-ev-700 hover:bg-ev-800 px-6 py-3.5 font-brsemi text-lg text-white transition-transform duration-200 ease-out-strong active:scale-[0.97]"
            >
              {band.action.label}
            </a>
          ) : (
            <button
              onClick={() => onAction(band.action)}
              className="inline-flex items-center rounded-full bg-ev-700 hover:bg-ev-800 px-6 py-3.5 font-brsemi text-lg text-white transition-transform duration-200 ease-out-strong active:scale-[0.97]"
            >
              {band.action.label}
            </button>
          )}
        </div>
      </div>
    </Section>
  );
}

function PolicyTabs() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef([]);
  const policy = BOOKING_POLICIES[active];

  // roving tabindex + arrow keys, per the WAI-ARIA tabs pattern
  const onKeyDown = (e) => {
    const last = BOOKING_POLICIES.length - 1;
    const next = { ArrowDown: active + 1, ArrowRight: active + 1, ArrowUp: active - 1, ArrowLeft: active - 1, Home: 0, End: last }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    const i = (next + last + 1) % (last + 1);
    setActive(i);
    tabRefs.current[i]?.focus();
  };

  return (
    <Section tone="mist">
      <Reveal className="flex flex-col gap-2">
        <h2 className="font-brsemi text-2xl tracking-tight text-ink sm:text-3xl">Booking Policies</h2>
        <p className="max-w-[60ch] font-brreg text-mute">Good to know before you book.</p>
      </Reveal>
      <Reveal delay={0.05} className="mt-8 grid overflow-hidden rounded-3xl border border-line bg-white lg:grid-cols-[280px_minmax(0,1fr)]">
        <div
          role="tablist"
          aria-label="Booking policies"
          aria-orientation="vertical"
          onKeyDown={onKeyDown}
          className="flex flex-wrap gap-1 border-b border-line p-3 lg:flex-col lg:flex-nowrap lg:border-b-0 lg:border-r lg:p-4"
        >
          {BOOKING_POLICIES.map((p, i) => {
            const selected = i === active;
            return (
              <button
                key={p.title}
                ref={(el) => (tabRefs.current[i] = el)}
                role="tab"
                id={`policy-tab-${i}`}
                aria-selected={selected}
                aria-controls="policy-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(i)}
                className={cn(
                  "flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-left font-brsemi transition-colors duration-200 ease-out-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ev-700",
                  selected ? "bg-ev-50 text-ev-800" : "text-mute hover:bg-[#F9F9FA] hover:text-ink"
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs transition-colors duration-200",
                    selected ? "bg-ev-700 text-white" : "bg-[#F1F0F2] text-mute"
                  )}
                >
                  {i + 1}
                </span>
                <span className="whitespace-nowrap">{p.title}</span>
              </button>
            );
          })}
        </div>
        <div
          key={active}
          role="tabpanel"
          id="policy-panel"
          aria-labelledby={`policy-tab-${active}`}
          tabIndex={0}
          className="flex flex-col items-start gap-5 p-6 focus-visible:outline-none md:p-10 animate-in fade-in-0 slide-in-from-bottom-1 duration-300"
        >
          <span className="rounded-full bg-ev-50 px-3.5 py-1.5 font-brsemi text-sm text-ev-800">{policy.highlight}</span>
          <h3 className="font-brbold text-2xl tracking-tight text-ink sm:text-3xl">{policy.title}</h3>
          <p className="max-w-[56ch] font-brreg text-lg leading-relaxed text-mute">{policy.body}</p>
        </div>
      </Reveal>
    </Section>
  );
}

function OtherServices({ keys }) {
  return (
    <Section tone="white" className="pt-0 lg:pt-0">
      <h2 className="font-brsemi text-2xl tracking-tight text-ink sm:text-3xl">Other Services</h2>
      <Reveal stagger={0.08} className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {keys.map((key) => {
          const card = SERVICE_CARDS[key];
          return (
            <Link
              key={key}
              to={card.to}
              className="group flex h-full flex-col gap-4 rounded-2xl border border-line bg-white p-4 transition-colors duration-300 ease-out-strong hover:border-ev-400"
            >
              <div className="overflow-hidden rounded-xl">
                <img
                  src={card.image}
                  alt={card.title}
                  loading="lazy"
                  className="aspect-[9/5] w-full object-cover transition-transform duration-500 ease-out-strong group-hover:scale-[1.04]"
                />
              </div>
              <div className="flex flex-col gap-2 px-1 pb-2">
                <h3 className="font-brsemi text-lg text-ink">{card.title}</h3>
                <p className="flex items-center gap-2 font-brmedium text-sm text-ev-700">
                  Learn more
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="transition-transform duration-200 ease-out-strong group-hover:translate-x-1">
                    <path d="M10.9336 4.6665L14.3336 7.99984L10.9336 11.3332" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M1.66602 7.99976H12.7993" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </p>
              </div>
            </Link>
          );
        })}
      </Reveal>
    </Section>
  );
}

/* ---------------------------------- page --------------------------------- */

export default function ServicePage({ serviceKey }) {
  const service = SERVICES[serviceKey];
  const [bookingModal, setBookingModal] = useState(false);
  const navigate = useNavigate();
  const readyToLaunch = process.env.VITE_READY_TO_LAUNCH === "Ready";

  useEffect(() => {
    window.scrollTo(0, 0);
    ReactGA.send({ hitType: "pageview", page: service.path, title: service.gaTitle });
  }, [service.path, service.gaTitle]);

  const handleAction = (action) => {
    if (action.type === "modal") return setBookingModal(true);
    if (action.type === "navigate") return navigate(action.to);
    if (action.type === "navigate-env") return navigate(readyToLaunch ? "/StandBy" : "/OtherBookings");
  };

  return (
    <div>
      <NavBar />
      <main>
        <ServiceHero service={service} onAction={handleAction} />
        <StepsSection steps={service.steps} />
        <CtaBand band={service.band} onAction={handleAction} />
        {service.policies && <PolicyTabs />}
        <OtherServices keys={service.others} />
      </main>
      <Footer />
      <BookServiceModal isModalOpen={bookingModal} isModalClosed={() => setBookingModal(false)} />
    </div>
  );
}
