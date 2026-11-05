"use client";
import { useEffect, useState } from "react";
import Section from "@/components/site/Section";
import SectionHeading from "@/components/site/SectionHeading";
import Reveal from "@/components/site/Reveal";
import { cn } from "@/lib/utils";
import { CalendarClock, HeartPulse } from "lucide-react";
import { stats, whyUs } from "./home-data";
/* Existing brand feature icons, kept as-is */
const icons = {
  reliable: (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M21.38 37.5799C37.38 25.9599 41.14 13.5799 41.98 8.29992C42.0312 7.9881 42.0077 7.66861 41.9115 7.36761C41.8153 7.06662 41.6492 6.7927 41.4268 6.56829C41.2043 6.34389 40.9319 6.17538 40.6317 6.07659C40.3316 5.97779 40.0123 5.95152 39.7 5.99992C34.48 6.85992 22 10.5399 10.42 26.6199L21.38 37.5799Z" fill="#FA8A3A" />
      <path d="M31.68 28.3601C32.6859 30.6621 32.9335 33.2244 32.387 35.6764C31.8405 38.1285 30.5282 40.3431 28.64 42.0001L23 36.3601" stroke="#A177FF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19.64 16.3201C17.338 15.3142 14.7757 15.0666 12.3237 15.6131C9.87164 16.1596 7.657 17.4719 6 19.3601L11.64 25.0001" stroke="#A177FF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21.38 37.5799C37.38 25.9599 41.14 13.5799 41.98 8.29992C42.0311 7.9881 42.0076 7.66861 41.9115 7.36761C41.8153 7.06662 41.6492 6.7927 41.4267 6.56829C41.2043 6.34389 40.9318 6.17538 40.6317 6.07659C40.3315 5.97779 40.0122 5.95152 39.7 5.99992C34.48 6.85992 22 10.5399 10.42 26.6199L21.38 37.5799ZM17.38 39.1799L20.22 36.3399L11.66 27.8399L8.81999 30.6799C8.44749 31.0546 8.2384 31.5616 8.2384 32.0899C8.2384 32.6183 8.44749 33.1252 8.81999 33.4999L14.5 39.1799C14.8747 39.5524 15.3816 39.7615 15.91 39.7615C16.4384 39.7615 16.9453 39.5524 17.32 39.1799H17.38Z" stroke="#A177FF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  clock: (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M41.3 17.1801C42.8425 21.6272 42.62 26.4966 40.6784 30.7846C38.7369 35.0725 35.2242 38.4521 30.8645 40.2267C26.5049 42.0014 21.6305 42.0358 17.2462 40.3228C12.862 38.6099 9.30195 35.2802 7.30005 31.0201C6.86675 29.9598 6.532 28.8618 6.30005 27.7401C8.6512 31.277 12.1535 33.8917 16.2128 35.1405C20.2721 36.3893 24.6384 36.1955 28.5711 34.5918C32.5037 32.9881 35.7605 30.0734 37.789 26.3421C39.8174 22.6107 40.4926 18.2926 39.7001 14.1201C40.3239 15.0902 40.8594 16.1143 41.3 17.1801Z" fill="#FA8A3A" />
      <path d="M24 6C27.5601 6 31.0402 7.05568 34.0003 9.03355C36.9603 11.0114 39.2675 13.8226 40.6298 17.1117C41.9922 20.4008 42.3487 24.02 41.6541 27.5116C40.9596 31.0033 39.2453 34.2106 36.7279 36.7279C34.2106 39.2453 31.0033 40.9596 27.5116 41.6541C24.02 42.3487 20.4008 41.9922 17.1117 40.6298C13.8226 39.2675 11.0114 36.9603 9.03355 34.0003C7.05568 31.0402 6 27.5601 6 24" stroke="#A177FF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 24H24V14" stroke="#A177FF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  check: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path d="M12 20L18 26L28 16M38 20C38 23.5601 36.9443 27.0402 34.9665 30.0003C32.9886 32.9603 30.1774 35.2675 26.8883 36.6298C23.5992 37.9922 19.98 38.3487 16.4884 37.6541C12.9967 36.9596 9.78943 35.2453 7.27209 32.7279C4.75474 30.2106 3.04041 27.0033 2.34587 23.5116C1.65134 20.02 2.0078 16.4008 3.37018 13.1117C4.73255 9.82263 7.03966 7.01141 9.99974 5.03355C12.9598 3.05568 16.4399 2 20 2C24.7739 2 29.3523 3.89642 32.7279 7.27208C36.1036 10.6477 38 15.2261 38 20Z" stroke="#6D09F9" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  wallet: (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M20 24V34C20 34.5304 19.7893 35.0391 19.4142 35.4142C19.0391 35.7893 18.5304 36 18 36H8C6.93913 36 5.92172 35.5786 5.17157 34.8284C4.42143 34.0783 4 33.0609 4 32V24H20ZM20 20V14C20 13.4696 19.7893 12.9609 19.4142 12.5858C19.0391 12.2107 18.5304 12 18 12H8C6.93913 12 5.92172 12.4214 5.17157 13.1716C4.42143 13.9217 4 14.9391 4 16V20H20Z" fill="#FA8A3A" />
      <path d="M40 4H20C17.7909 4 16 5.79086 16 8V40C16 42.2091 17.7909 44 20 44H40C42.2091 44 44 42.2091 44 40V8C44 5.79086 42.2091 4 40 4Z" fill="#A177FF" />
      <path d="M24 4L24.62 6.48C24.7295 6.92375 24.9877 7.31661 25.3516 7.59317C25.7155 7.86973 26.1631 8.01331 26.62 8H33.5C33.9569 8.01331 34.4045 7.86973 34.7684 7.59317C35.1323 7.31661 35.3905 6.92375 35.5 6.48L36 4" fill="#FA8A3A" />
    </svg>
  ),
};

const RESPONSE_MINS = stats.find((s) => s.label === "Avg. response time (mins)")?.value ?? 10;

/* ----------------------------- illustrations ------------------------------ */
// Each one shows its own claim. Motion is continuous but quiet: transforms and opacity only,
// with strong custom easing, and it stops entirely under prefers-reduced-motion.

// Reliable: an ambulance dot travels the route to you and arrives with a soft ring.
function RouteVisual() {
  const [still, setStill] = useState(false);
  useEffect(() => {
    setStill(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);
  return (
    <div className="absolute inset-0">
      <svg viewBox="0 0 520 260" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <pattern id="why-grid" width="26" height="26" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1.2" fill="#BEA8FF" opacity="0.55" />
          </pattern>
        </defs>
        <rect width="520" height="260" fill="url(#why-grid)" />
        <path id="why-route" d="M44 206 C 150 218, 168 92, 272 124 S 432 62, 468 74" fill="none" stroke="#8540FF" strokeWidth="3" strokeLinecap="round" strokeDasharray="2 9" />
        <circle cx="44" cy="206" r="7" fill="#FFFFFF" stroke="#8540FF" strokeWidth="3" />
        <circle cx="468" cy="74" r="22" fill="#6D09F9" opacity="0.12" className="origin-center motion-safe:animate-ring" style={{ transformOrigin: "468px 74px" }} />
        <circle cx="468" cy="74" r="10" fill="#6D09F9" />
        <circle cx="468" cy="74" r="4" fill="#FFFFFF" />
        <circle r="8" fill="#F9091D" stroke="#FFFFFF" strokeWidth="3" cx={still ? 468 : undefined} cy={still ? 74 : undefined}>
          {!still && (
            <animateMotion dur="3.6s" repeatCount="indefinite" calcMode="spline" keyTimes="0;1" keyPoints="0;1" keySplines="0.23 1 0.32 1">
              <mpath href="#why-route" />
            </animateMotion>
          )}
        </circle>
      </svg>
      <span className="absolute left-5 top-5 rounded-full border border-ev-200 bg-white px-3.5 py-1.5 font-brsemi text-sm text-ev-800">
        {RESPONSE_MINS} min average response
      </span>
    </div>
  );
}

// 24/7: a 24-hour dial, every hour lit, with a hand that sweeps a full day.
function DialVisual() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <svg viewBox="0 0 200 200" className="h-[88%] w-auto" role="img" aria-label="A 24 hour dial with every hour covered">
        <circle cx="100" cy="100" r="92" fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="1.5" />
        {Array.from({ length: 24 }, (_, i) => (
          <line key={i} x1="100" y1="14" x2="100" y2={i % 6 === 0 ? 30 : 24} stroke="#BEA8FF" strokeWidth={i % 6 === 0 ? 3 : 2} strokeLinecap="round" transform={`rotate(${i * 15} 100 100)`} />
        ))}
        <g className="motion-safe:animate-sweep" style={{ transformOrigin: "100px 100px" }}>
          <line x1="100" y1="100" x2="100" y2="22" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
        </g>
        <circle cx="100" cy="100" r="5" fill="#FFFFFF" />
        <text x="100" y="150" textAnchor="middle" fontSize="22" fontWeight="700" fill="#FFFFFF">24/7</text>
      </svg>
    </div>
  );
}

// Expertise: a steady heartbeat trace scrolling by, seamless because the pattern is drawn twice.
function EcgVisual() {
  const beat = "M0 60 H70 l8 -7 8 7 H120 l8 12 12 -64 14 86 8 -34 H210 l10 -10 14 10 H400";
  return (
    <div className="absolute inset-0 flex items-center overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_18%,#000_82%,transparent)]">
      <svg viewBox="0 0 800 120" className="h-[46%] w-[200%] shrink-0 motion-safe:animate-ecg" preserveAspectRatio="none" aria-hidden="true">
        <g fill="none" stroke="#6D09F9" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke">
          <path d={beat} vectorEffect="non-scaling-stroke" />
          <path d={beat} transform="translate(400 0)" vectorEffect="non-scaling-stroke" />
        </g>
      </svg>
    </div>
  );
}

// Affordable: "Care now" slides to "Pay later" and back, the label inside the thumb crossfading in step.
function PillVisual() {
  return (
    <div className="absolute inset-0 flex items-center justify-center px-6">
      <div className="relative flex w-full max-w-[320px] rounded-full border border-line bg-white p-1.5" role="img" aria-label="Care now, pay later">
        <span className="flex flex-1 items-center justify-center gap-2 py-3 font-brsemi text-ink/45"><HeartPulse size={18} aria-hidden="true" />Care now</span>
        <span className="flex flex-1 items-center justify-center gap-2 py-3 font-brsemi text-ink/45"><CalendarClock size={18} aria-hidden="true" />Pay later</span>
        <span className="absolute inset-y-1.5 left-1.5 w-[calc(50%-6px)] rounded-full bg-ev-700 motion-safe:animate-pill" aria-hidden="true">
          <span className="absolute inset-0 flex items-center justify-center gap-2 font-brsemi text-white motion-safe:animate-pill-a"><HeartPulse size={18} aria-hidden="true" />Care now</span>
          <span className="absolute inset-0 flex items-center justify-center gap-2 font-brsemi text-white opacity-0 motion-safe:animate-pill-b"><CalendarClock size={18} aria-hidden="true" />Pay later</span>
        </span>
      </div>
    </div>
  );
}

const TILES = [
  { item: 0, Visual: RouteVisual, span: "lg:col-span-4", tone: "bg-ev-50" },
  { item: 1, Visual: DialVisual, span: "lg:col-span-2", tone: "bg-night" },
  { item: 2, Visual: EcgVisual, span: "lg:col-span-2", tone: "bg-white" },
  { item: 3, Visual: PillVisual, span: "lg:col-span-4", tone: "bg-[#F9F9FA]" },
];

export default function WhyUs() {
  return (
    <Section tone="white">
      <Reveal>
        <SectionHeading title="Why Choose 8medical?" lead="We provide healthcare services that suit your needs." />
      </Reveal>

      {/* asymmetric bento: 4 + 2, then 2 + 4. The picture sits in the tile, the words sit below it. */}
      <Reveal stagger={0.07} className="mt-12 grid gap-x-6 gap-y-10 lg:grid-cols-6">
        {TILES.map(({ item, Visual, span, tone }) => {
          const reason = whyUs[item];
          return (
            <figure key={reason.title} className={cn("flex flex-col", span)}>
              <div
                className={cn(
                  "relative h-[240px] overflow-hidden rounded-[2rem] border border-line transition-colors duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)]:hover:border-ev-300 sm:h-[260px]",
                  tone
                )}
              >
                <Visual />
              </div>
              <figcaption className="mt-5 flex items-start gap-3 px-1">
                <span className="mt-0.5 shrink-0 [&>svg]:h-7 [&>svg]:w-7">{icons[reason.icon]}</span>
                <span className="flex flex-col gap-1">
                  <span className="font-brbold text-xl tracking-tight text-ink">{reason.title}</span>
                  <span className="max-w-[46ch] font-brmedium text-mute">{reason.desc}</span>
                </span>
              </figcaption>
            </figure>
          );
        })}
      </Reveal>
    </Section>
  );
}
