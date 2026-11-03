"use client";
import { useState } from "react";
import { Link, useNavigate } from "@/lib/router-compat";
import Container from "@/components/site/Container";
import Cta from "@/components/site/Cta";
import Reveal from "@/components/site/Reveal";
import { cn } from "@/lib/utils";
import { services } from "./home-data";

/**
 * Typographic service index: each service is a full-width display-type row.
 * Clicking a row expands it in place (CSS grid-rows transition, fully flat).
 */
export default function ServiceRows({ onOpenBookingModal }) {
  const [openKey, setOpenKey] = useState(services[0].key);
  const navigate = useNavigate();
  const readyToLaunch = process.env.VITE_READY_TO_LAUNCH === "Ready";

  const handleAction = (service) => {
    if (service.action.type === "modal") return onOpenBookingModal();
    if (service.key === "standby" && !readyToLaunch) return onOpenBookingModal();
    navigate(service.action.to);
  };

  return (
    <section id="services" className="scroll-mt-20 bg-[#F9F9FA] py-16 lg:py-24">
      <Container>
        <Reveal>
          <h2 className="font-brsemi text-3xl tracking-tight text-ink sm:text-4xl">Choose a Service</h2>
        </Reveal>

        <div className="mt-10 border-t border-line">
          {services.map((service) => {
            const open = service.key === openKey;
            return (
              <div key={service.key} className="border-b border-line">
                <button
                  onClick={() => setOpenKey(open ? null : service.key)}
                  aria-expanded={open}
                  className="group flex w-full items-center justify-between gap-6 py-7 text-left sm:py-9"
                >
                  <span
                    className={cn(
                      "font-brbold text-2xl tracking-tight transition-colors duration-300 ease-out-strong sm:text-4xl lg:text-5xl",
                      open ? "text-ev-700" : "text-ink group-hover:text-ev-700"
                    )}
                  >
                    {service.tab}
                  </span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "hidden max-w-[30ch] flex-1 px-6 font-brmedium text-base leading-snug text-mute transition-opacity duration-300 ease-out-strong lg:block",
                      open ? "opacity-0" : "opacity-100"
                    )}
                  >
                    {service.headline}
                  </span>
                  <span
                    className={cn(
                      "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-[transform,border-color] duration-300 ease-out-strong sm:h-14 sm:w-14",
                      open
                        ? "rotate-45 border-ev-700 text-ev-700"
                        : "border-line bg-white text-ink group-hover:border-ev-700 group-hover:text-ev-700"
                    )}
                    aria-hidden="true"
                  >
                    <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                      <path d="M8 2V14M2 8H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </span>
                </button>

                {/* expanding panel */}
                <div
                  className={cn(
                    "grid transition-[grid-template-rows] duration-500 ease-in-out-strong",
                    open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="grid gap-8 pb-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16">
                      <div className="overflow-hidden rounded-2xl border border-line">
                        <img
                          src={service.image}
                          alt={service.label}
                          loading="lazy"
                          className="aspect-[16/9] w-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col items-start gap-5">
                        <p className="font-brsemi text-xl text-ink sm:text-2xl">{service.headline}</p>
                        <p className="max-w-[58ch] font-brreg text-lg text-mute">{service.body}</p>
                        <div className="flex flex-wrap items-center gap-5">
                          <Cta size="lg" onClick={() => handleAction(service)}>
                            {service.action.label}
                          </Cta>
                          <Link
                            to={service.learnMore.to}
                            className="font-brmedium text-ev-700 transition-colors hover:text-ev-900"
                          >
                            {service.learnMore.label}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
