"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Cta from "@/components/site/Cta";
import { cn } from "@/lib/utils";
import { siren } from "@/components/three/siren";
import { BEATS } from "@/components/three/story-beats";

gsap.registerPlugin(ScrollTrigger);

// Three.js is heavy: load it client-side only; the lavender gradient shows until it mounts.
const StoryScene = dynamic(() => import("@/components/three/StoryScene"), {
  ssr: false,
  loading: () => null,
});

// The headline is drawn in layers, pixel-aligned: an outline, a solid ink layer revealed top to
// bottom by a clip-path wipe, and two siren layers (red, purple) that light the letters through
// moving masks, pulsing in step with the beacons in the 3D scene.
const TONES = {
  outline: "text-transparent [-webkit-text-stroke:2px_rgba(109,9,249,0.38)]",
  solid: "text-night",
  red: "text-alarm",
  purple: "text-ev-500",
};

function Headline({ tone = "outline" }) {
  const size = "text-[9.5vw] sm:text-[7.5vw] lg:text-[min(5.75vw,6.25rem)]";
  return (
    <div className="flex flex-col items-center text-center font-brbold leading-[0.88] tracking-tight">
      <span className={cn(size, TONES[tone])}>EVERY SECOND</span>
      <span className={cn(size, TONES[tone])}>COUNTS</span>
    </div>
  );
}

// Elliptical light pool; its centre (--rx or --px) is moved by the pointer.
const lightMask = (cx) => {
  const mask = `radial-gradient(ellipse 30vw 12vw at var(${cx}) 50%, #000 0%, transparent 100%)`;
  return { WebkitMaskImage: mask, maskImage: mask };
};

export default function HomeHero({ onEmergency, onBookService }) {
  const sectionRef = useRef(null);
  const typeRef = useRef(null);
  const introRef = useRef(null);
  const fillRef = useRef(null);
  const redRef = useRef(null);
  const purpleRef = useRef(null);
  const sceneRef = useRef(null);
  const ctaRef = useRef(null);
  const [beat, setBeat] = useState(0);
  const onBeat = useCallback((i) => setBeat(i), []);
  // The 3D scene is heavy to parse and build, so it waits for the browser to go idle after first paint
  // (the headline and buttons are already interactive), and a light placeholder holds the space until
  // its first frame is on screen.
  const [mountScene, setMountScene] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const onReady = useCallback(() => setSceneReady(true), []);

  useEffect(() => {
    const start = () => setMountScene(true);
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(start, { timeout: 900 });
      return () => window.cancelIdleCallback(id);
    }
    const id = window.setTimeout(start, 300);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const type = typeRef.current;
    const intro = introRef.current;
    const fill = fillRef.current;
    if (!section || !type || !intro || !fill) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      fill.style.clipPath = "inset(0 0 0 0)"; // no motion: show the finished headline
      return;
    }

    let lightsReady = false;
    const pointer = { target: 50, x: 50 }; // pointer position across the hero, in %
    const onMove = (e) => {
      const r = section.getBoundingClientRect();
      pointer.target = ((e.clientX - r.left) / r.width) * 100;
    };
    const onLeave = () => (pointer.target = 50);
    section.addEventListener("pointermove", onMove);
    section.addEventListener("pointerleave", onLeave);

    // the siren light: strength follows the 3D beacons, centres lean toward the cursor
    const setRed = gsap.quickSetter(redRef.current, "opacity");
    const setPurple = gsap.quickSetter(purpleRef.current, "opacity");
    let lastShift = 0;
    const tick = () => {
      if (!lightsReady) return;
      const live = siren.live;
      setRed(live ? Math.max(0, siren.pulse) * 0.95 : 0);
      setPurple(live ? Math.max(0, -siren.pulse) * 0.95 : 0);
      pointer.x += (pointer.target - pointer.x) * 0.06;
      const shift = (pointer.x - 50) * 0.55;
      if (Math.abs(shift - lastShift) > 0.05) {
        lastShift = shift;
        fill.style.setProperty("--rx", `${22 + shift}%`);
        fill.style.setProperty("--px", `${78 + shift}%`);
      }
    };
    gsap.ticker.add(tick);

    const ctx = gsap.context(() => {
      // intro: the outlined type rises in, then the fill pours down from EVERY to COUNTS
      gsap.fromTo(intro, { opacity: 0, y: 80 }, { opacity: 1, y: 0, duration: 1.1, ease: "power3.out", delay: 0.2 });
      gsap.fromTo(
        fill,
        { clipPath: "inset(0 0 100% 0)" },
        {
          clipPath: "inset(0 0 0% 0)",
          duration: 2.6,
          ease: "power2.inOut",
          delay: 1.0,
          onComplete: () => (lightsReady = true), // once the letters are solid, the sirens can light them
        }
      );
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 1.2 }
        );
      }
      // scroll: type drifts up slower than the page (depth parallax)...
      gsap.to(type, {
        yPercent: -18,
        opacity: 0.4,
        ease: "none",
        scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: 1 },
      });
      // ...while the convoy dollies toward the viewer, as if the camera follows it out of the hero
      gsap.to(sceneRef.current, {
        scale: 1.22,
        yPercent: 5,
        transformOrigin: "50% 100%",
        ease: "none",
        scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: 1 },
      });
    }, section);
    return () => {
      gsap.ticker.remove(tick);
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#F4F1FF]">
      {/* soft lavender wash, static (no repaint cost) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(900px 520px at 50% 100%, rgba(133,64,255,0.16), transparent 65%), radial-gradient(700px 420px at 92% 0%, rgba(190,168,255,0.4), transparent 60%), linear-gradient(180deg, #F9F8FF 0%, #F1EDFF 100%)",
        }}
      />

      <h1 className="sr-only">8medical: urgent ambulance and emergency medical care across Nigeria</h1>

      {/* one column, so nothing can overlap: headline, then the scene, then caption + actions */}
      <div className="relative flex h-[calc(100dvh-64px)] min-h-[620px] flex-col">
        <div
          ref={typeRef}
          aria-hidden="true"
          className="pointer-events-none z-0 shrink-0 select-none px-4 pt-4 sm:pt-6 lg:pt-7"
        >
          <div ref={introRef} className="relative mx-auto w-fit">
            <Headline />
            <div
              ref={fillRef}
              className="absolute inset-0"
              style={{ clipPath: "inset(0 0 100% 0)", "--rx": "22%", "--px": "78%" }}
            >
              <Headline tone="solid" />
              <div ref={redRef} className="absolute inset-0 opacity-0" style={lightMask("--rx")}>
                <Headline tone="red" />
              </div>
              <div ref={purpleRef} className="absolute inset-0 opacity-0" style={lightMask("--px")}>
                <Headline tone="purple" />
              </div>
            </div>
          </div>
        </div>

        {/* the story plays in whatever height is left */}
        <div ref={sceneRef} className="relative z-10 min-h-0 flex-1 will-change-transform">
          <div
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute inset-x-0 bottom-[14%] h-[26%] transition-opacity duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]",
              sceneReady ? "opacity-0" : "opacity-100"
            )}
          >
            {/* the road, drawn in CSS: black asphalt, white edge lines, dashed centre */}
            <div
              className="h-full w-full bg-[#222227]"
              style={{
                backgroundImage:
                  "linear-gradient(#F4F4F6,#F4F4F6), linear-gradient(#F4F4F6,#F4F4F6), repeating-linear-gradient(90deg,#F4F4F6 0 56px,transparent 56px 112px)",
                backgroundSize: "100% 3px, 100% 3px, 100% 3px",
                backgroundPosition: "0 10%, 0 90%, 0 50%",
                backgroundRepeat: "no-repeat, no-repeat, repeat-x",
                maskImage: "linear-gradient(90deg, transparent, #000 15%, #000 85%, transparent)",
                WebkitMaskImage: "linear-gradient(90deg, transparent, #000 15%, #000 85%, transparent)",
              }}
            />
          </div>
          {mountScene && <StoryScene onBeat={onBeat} onReady={onReady} />}
        </div>

        <div className="relative z-20 flex shrink-0 flex-col items-center gap-5 px-4 pb-8 pt-2">
          {/* caption: what the scene is telling right now, and how far through it we are */}
          <div className="pointer-events-none flex flex-col items-center gap-3">
            <p
              key={beat}
              className="font-brsemi text-lg text-ink animate-in fade-in-0 slide-in-from-bottom-1 duration-500 sm:text-xl"
              aria-hidden="true"
            >
              {BEATS[beat]}
            </p>
            <div className="flex gap-1.5" aria-hidden="true">
              {BEATS.map((_, i) => (
                <span
                  key={i}
                  className={cn(
                    "h-1 w-8 rounded-full transition-colors duration-500",
                    i <= beat ? "bg-ev-700" : "bg-ev-700/15"
                  )}
                />
              ))}
            </div>
          </div>

          <div ref={ctaRef} className="flex flex-wrap items-center justify-center gap-4">
            <Cta variant="emergency" size="lg" onClick={onEmergency}>
              Report an Emergency
            </Cta>
            <Cta variant="quiet" size="lg" arrow onClick={onBookService}>
              Explore Services
            </Cta>
          </div>
        </div>
      </div>
    </section>
  );
}
