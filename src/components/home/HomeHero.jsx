"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Ambulance, Siren } from "lucide-react";
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
  outline: "text-transparent [-webkit-text-stroke:2px_rgba(190,168,255,0.5)]",
  solid: "text-white",
  red: "text-alarm",
  purple: "text-ev-400",
};

function Headline({ tone = "outline" }) {
  const size = "text-[11vw] sm:text-[6.4vw] lg:text-[min(4.6vw,5rem)]";
  return (
    <div className="flex flex-col items-center text-center font-brbold leading-[0.92] tracking-tight lg:items-start lg:text-left">
      <span className={cn(size, TONES[tone])}>
        EVERY SECOND
        <br />
        COUNTS
      </span>
    </div>
  );
}

// Elliptical light pool; its centre (--rx or --px) is moved by the pointer.
const lightMask = (cx) => {
  const mask = `radial-gradient(ellipse 55% 75% at var(${cx}) 50%, #000 0%, transparent 100%)`;
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
    // Not worth it on a metered or very slow connection: the headline, road and actions stand alone.
    const conn = navigator.connection;
    if (conn && (conn.saveData || /(^|-)2g$/.test(conn.effectiveType || ""))) return;

    let idleId = 0;
    let timer = 0;
    const start = () => setMountScene(true);
    const whenIdle = () => {
      if ("requestIdleCallback" in window) idleId = window.requestIdleCallback(start, { timeout: 1500 });
      else timer = window.setTimeout(start, 400);
    };
    // after the page has finished loading (fonts, images, hydration), then when the browser is idle
    if (document.readyState === "complete") whenIdle();
    else window.addEventListener("load", whenIdle, { once: true });
    return () => {
      window.removeEventListener("load", whenIdle);
      if (idleId) window.cancelIdleCallback(idleId);
      if (timer) window.clearTimeout(timer);
    };
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
      // The outlined headline and the actions are visible from the server render (they are the
      // page's largest paint, so nothing hides them until JS runs); the fill pours down afterwards.
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
      // scroll: the camera dollies toward the viewer, as if it follows the convoy out of the hero
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

      {/* the scene on top, then a dark purple band carrying the words: shorter than a full screen */}
      <div className="relative flex flex-col">
        <div className="relative h-[min(56vh,540px)] min-h-[340px] sm:min-h-[400px]">
          <div ref={sceneRef} className="absolute inset-0 will-change-transform">
            <div
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute inset-x-0 bottom-[20%] h-[13%] transition-opacity duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]",
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
          {/* feather the scene into the band below */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-night to-transparent" />
        </div>

        <div className="relative bg-night px-4 pb-7 pt-1 sm:px-8 lg:px-14 lg:pb-9">
          <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-7">
            <div className="flex w-full flex-col items-center gap-5 lg:w-auto lg:items-start lg:gap-6">
              <div ref={typeRef} aria-hidden="true" className="pointer-events-none select-none">
                <div ref={introRef} className="relative w-fit">
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

              {/* side by side on phones when both fit; each wraps to its own full-width row when the text
                  is too wide for half the screen (narrow phones, enlarged system text). Full labels from tablet up. */}
              <div ref={ctaRef} className="flex w-full max-w-[420px] flex-wrap gap-3 md:w-auto md:max-w-none md:flex-nowrap md:gap-4">
                <Cta variant="emergency" onClick={onEmergency} className="flex-1 basis-[calc(50%-0.375rem)] gap-1.5 px-2.5 text-sm md:flex-none md:basis-auto md:gap-2 md:px-6 md:py-3.5 md:text-lg">
                  <Siren size={16} aria-hidden="true" className="shrink-0 md:h-[18px] md:w-[18px]" />
                  <span className="md:hidden">Emergency</span>
                  <span className="hidden md:inline">Report an Emergency</span>
                </Cta>
                <Cta variant="light" onClick={onBookService} className="flex-1 basis-[calc(50%-0.375rem)] gap-1.5 px-2.5 text-sm md:flex-none md:basis-auto md:gap-2 md:px-6 md:py-3.5 md:text-lg">
                  <Ambulance size={16} aria-hidden="true" className="shrink-0 md:h-[18px] md:w-[18px]" />
                  Explore Services
                </Cta>
              </div>
            </div>

            {/* caption: what the scene is telling right now, and how far through it we are */}
            <div className="pointer-events-none flex flex-col items-center gap-2.5 lg:items-end lg:gap-3 lg:pb-1">
              <p
                key={beat}
                className="font-brsemi text-lg text-white animate-in fade-in-0 slide-in-from-bottom-1 duration-500 sm:text-xl"
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
                      i <= beat ? "bg-ev-400" : "bg-white/20"
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
