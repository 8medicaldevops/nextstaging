"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Section from "@/components/site/Section";
import CountUp from "@/components/site/CountUp";
import Reveal from "@/components/site/Reveal";
import { stats } from "./home-data";

gsap.registerPlugin(ScrollTrigger);

const byLabel = (label) => stats.find((s) => s.label === label);
const responseMins = byLabel("Avg. response time (mins)").value;

// Clock face with the average response time drawn as a wedge of the hour: 10 of 60 minutes.
function ResponseClock({ minutes }) {
  const wedgeRef = useRef(null);
  const handRef = useRef(null);
  const R = 50; // wedge drawn as a thick stroke on a small circle
  const C = 2 * Math.PI * R;
  const arc = C * (minutes / 60);
  const angle = (minutes / 60) * 360;

  useEffect(() => {
    const wedge = wedgeRef.current;
    const hand = handRef.current;
    if (!wedge || !hand) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      wedge.style.strokeDasharray = `${arc} ${C}`;
      gsap.set(hand, { rotation: angle, svgOrigin: "120 120" });
      return;
    }
    const ctx = gsap.context(() => {
      const trigger = { trigger: wedge, start: "top 85%", once: true };
      gsap.fromTo(wedge, { strokeDasharray: `0 ${C}` }, { strokeDasharray: `${arc} ${C}`, duration: 1.8, ease: "power2.inOut", scrollTrigger: trigger });
      gsap.fromTo(hand, { rotation: 0, svgOrigin: "120 120" }, { rotation: angle, svgOrigin: "120 120", duration: 1.8, ease: "power2.inOut", scrollTrigger: trigger });
    });
    return () => ctx.revert();
  }, [arc, C, angle]);

  const ticks = Array.from({ length: 12 }, (_, i) => i * 30);
  const labels = [
    { text: "0", x: 120, y: 38 },
    { text: "15", x: 202, y: 125 },
    { text: "30", x: 120, y: 212 },
    { text: "45", x: 38, y: 125 },
  ];

  return (
    <figure className="flex flex-col items-center gap-6">
      <svg
        viewBox="0 0 240 240"
        className="h-auto w-full max-w-[340px]"
        role="img"
        aria-label={`Average response time: ${minutes} minutes, shown as ${minutes} minutes of a 60 minute clock face`}
      >
        <circle cx="120" cy="120" r="108" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" />
        {/* the response window */}
        <circle
          ref={wedgeRef}
          cx="120"
          cy="120"
          r={R}
          fill="none"
          stroke="#8540FF"
          strokeWidth={R * 2}
          strokeDasharray={`0 ${C}`}
          transform="rotate(-90 120 120)"
        />
        {ticks.map((deg) => (
          <line
            key={deg}
            x1="120"
            y1="18"
            x2="120"
            y2={deg % 90 === 0 ? 30 : 25}
            stroke="rgba(255,255,255,0.55)"
            strokeWidth={deg % 90 === 0 ? 2.5 : 1.5}
            strokeLinecap="round"
            transform={`rotate(${deg} 120 120)`}
          />
        ))}
        {labels.map((l) => (
          <text key={l.text} x={l.x} y={l.y} textAnchor="middle" dominantBaseline="middle" fontSize="11" fontWeight="600" fill="rgba(255,255,255,0.7)">
            {l.text}
          </text>
        ))}
        <g ref={handRef}>
          <line x1="120" y1="120" x2="120" y2="24" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
        </g>
        <circle cx="120" cy="120" r="6" fill="#FFFFFF" />
      </svg>
      <figcaption className="flex flex-col items-center gap-1 text-center">
        <span className="font-brbold text-4xl tracking-tight text-white">{minutes} minutes</span>
        <span className="font-brmedium text-white/65">Average response time</span>
      </figcaption>
    </figure>
  );
}

// A count-up number that reserves its final width, so the sentence never reflows while counting.
function Figure({ stat }) {
  const final = stat.value.toLocaleString() + stat.suffix;
  return (
    <span className="relative inline-block whitespace-nowrap tabular-nums text-ev-300">
      <span className="invisible">{final}</span>
      <span className="absolute inset-0 text-left">
        <CountUp value={stat.value} suffix={stat.suffix} />
      </span>
    </span>
  );
}

export default function ImpactStats() {
  const calls = byLabel("Calls received");
  const lives = byLabel("Lives saved");
  const responders = byLabel("First responders");
  const ambulances = byLabel("Ambulances");

  return (
    <Section tone="night" className="relative overflow-hidden bg-night-deep py-20 lg:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(820px 340px at 50% 120%, rgba(109,9,249,0.4), transparent 70%)",
        }}
      />
      <div className="relative grid items-center gap-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
        <Reveal className="flex justify-center">
          <ResponseClock minutes={responseMins} />
        </Reveal>
        <Reveal delay={0.1}>
          <p className="font-brbold text-3xl leading-[1.25] tracking-tight text-white/90 sm:text-4xl lg:text-[2.75rem]">
            We have received <Figure stat={calls} /> calls and saved <Figure stat={lives} /> lives. Today{" "}
            <Figure stat={responders} /> first responders and <Figure stat={ambulances} /> ambulances stand ready.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
