"use client";
import { useState } from "react";
import { Link, useNavigate } from "@/lib/router-compat";
import Section from "@/components/site/Section";
import SectionHeading from "@/components/site/SectionHeading";
import Cta from "@/components/site/Cta";
import Reveal from "@/components/site/Reveal";
import { cn } from "@/lib/utils";
import { services } from "./home-data";
import { serviceIcons } from "./service-icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ServiceExplorer({ onOpenBookingModal }) {
  const [activeKey, setActiveKey] = useState("standby");
  const navigate = useNavigate();
  const active = services.find((s) => s.key === activeKey);
  const readyToLaunch = process.env.VITE_READY_TO_LAUNCH === "Ready";

  const handleAction = (service) => {
    if (service.action.type === "modal") return onOpenBookingModal();
    if (service.key === "standby" && !readyToLaunch) return onOpenBookingModal();
    navigate(service.action.to);
  };

  return (
    <Section tone="mist" id="services" className="scroll-mt-20">
      <Reveal>
        <SectionHeading title="Choose a Service" />
      </Reveal>

      {/* desktop tabs */}
      <div className="mt-8 hidden gap-3 lg:flex" role="tablist" aria-label="Services">
        {services.map((service) => {
          const Icon = serviceIcons[service.key];
          const isActive = service.key === activeKey;
          return (
            <button
              key={service.key}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveKey(service.key)}
              className={cn(
                "flex items-center gap-2 rounded-full border px-6 py-3.5 font-brsemi text-base transition-colors duration-200 ease-out-strong",
                isActive
                  ? "border-ev-700 bg-ev-700 text-white"
                  : "border-line bg-white text-ink hover:border-ev-300 hover:text-ev-700"
              )}
            >
              <Icon />
              {service.tab}
            </button>
          );
        })}
      </div>

      {/* mobile select */}
      <div className="mt-6 lg:hidden">
        <Select value={activeKey} onValueChange={setActiveKey}>
          <SelectTrigger className="w-[260px] rounded-lg border border-line bg-white font-brmedium text-ink">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="rounded-lg bg-white">
            {services.map((service) => {
              const Icon = serviceIcons[service.key];
              return (
                <SelectItem key={service.key} value={service.key}>
                  <div className="flex items-center gap-2 text-ink">
                    <Icon />
                    {service.tab}
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>

      {/* active panel */}
      <div
        key={active.key}
        role="tabpanel"
        className="mt-6 rounded-2xl border border-line bg-white p-6 md:p-12 animate-in fade-in slide-in-from-bottom-2 duration-300"
      >
        <p className="mb-3 font-brmedium text-ev-700">{active.label}</p>
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-24">
          <h3 className="font-brsemi text-3xl leading-tight text-ink sm:text-4xl">{active.headline}</h3>
          <div className="flex flex-col gap-3">
            <p className="font-brreg text-lg text-mute">{active.body}</p>
            <Link to={active.learnMore.to} className="font-brmedium text-ev-700 hover:underline">
              {active.learnMore.label}
            </Link>
          </div>
        </div>
        <Cta className="mt-8" size="lg" onClick={() => handleAction(active)}>
          {active.action.label}
        </Cta>
      </div>
    </Section>
  );
}
