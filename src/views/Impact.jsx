"use client";
import ReactGA from "react-ga4";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Section from "@/components/site/Section";
import SectionHeading from "@/components/site/SectionHeading";
import CountUp from "@/components/site/CountUp";
import Reveal from "@/components/site/Reveal";
import '../App.css';

import headerImg__asset from "../assets/images/sustainable.jpeg";
import threeImg__asset from "../assets/images/three.jpeg";
import genderEq__asset from "../assets/images/gendereq.png";
import decentWork__asset from "../assets/images/decentwork.png";
import industry__asset from "../assets/images/industry.png";
import ten__asset from "../assets/images/ten.png";
import climate__asset from "../assets/images/climate.png";
import peace__asset from "../assets/images/peace.png";

gsap.registerPlugin(ScrollTrigger);

const headerImg = headerImg__asset.src ?? headerImg__asset;
const threeImg = threeImg__asset.src ?? threeImg__asset;
const genderEq = genderEq__asset.src ?? genderEq__asset;
const decentWork = decentWork__asset.src ?? decentWork__asset;
const industry = industry__asset.src ?? industry__asset;
const ten = ten__asset.src ?? ten__asset;
const climate = climate__asset.src ?? climate__asset;
const peace = peace__asset.src ?? peace__asset;

/* ---------------------------------- data ---------------------------------- */

// Keyed by SDG number. Copy is unchanged from the previous page.
const GOALS = {
    3: {
        image: threeImg,
        short: "Good Health and Well-being",
        title: "Good Health and Wellbeing",
        points: [
            "We strive to reduce preventable global deaths, particularly in cases of pregnancy and child-related emergencies, as well as injuries from road traffic accidents. Our focus is on delivering prompt ambulance response and efficient transport to save lives.",
            "We leverage trained experts, equipment, up-to-date information, technology and infrastructure to ensure reduction in neonatal, maternal and general mortality.",
            "We have a 95% emergency call-to-mission completion rate.",
            "We have a care-now-pay-later product in place to ensure last-mile access to definitive care for our patients.",
        ],
    },
    5: {
        image: genderEq,
        short: "Gender Equality",
        title: "Achieve Gender Equality and Empower all Women and Girls",
        points: [
            "We have the first female biker response medic in West Africa.",
            "Eight Medical's leadership style involves a balanced structure of both men and women.",
        ],
    },
    8: {
        image: decentWork,
        short: "Decent Work and Economic Growth",
        title: "Promote Sustained, Inclusive Economic Growth and Decent Work for All",
        points: [
            "Eight Medical has provided at least 2-3 jobs per day for both men and women, ensuring equal pay for work of equal value.",
            "We substantially reduced the proportion of youths not in employment through our work-integrated learning and foundation training programs.",
        ],
    },
    9: {
        image: industry,
        short: "Industry, Innovation and Infrastructure",
        title: "Build Resilient Infrastructure and Foster Innovation",
        points: [
            "We've built a robust technology infrastructure to ensure reliable, sustainable, and affordable access to urgent and emergency services, promoting human wellbeing.",
        ],
    },
    10: {
        image: ten,
        short: "Reduced Inequalities",
        title: "Reduce Inequality Within and Among Countries",
        points: [
            "We empower and promote social, economic and political inclusion of all, irrespective of age, sex, disability, race, ethnicity, origin, religion or economic or other status.",
            "We ensure equal opportunities and reduce inequalities of outcomes by promoting appropriate legislation and policies within the organisation.",
        ],
    },
    13: {
        image: climate,
        short: "Climate Action",
        title: "Take Urgent Action to Combat Climate Change and its Impacts",
        points: [
            "As an EMS technology platform and provider, we are at the forefront of strengthening resilience and adaptive capacity at community, state and national levels.",
            "We are committed to improving education, awareness and capacity on climate change mitigation, adaptation, impact reduction and early warning.",
        ],
    },
    16: {
        image: peace,
        short: "Peace, Justice and Strong Institutions",
        title: "Promote Peaceful, Inclusive Societies and Accountable Institutions",
        points: [
            "Through our EMS platform and care provision, we contribute to the reduction of violence-related death rates.",
            "Leveraging our emergency resource bank, we protect children from abuse, exploitation, trafficking and violence by connecting them to the most appropriate emergency resource when it matters most.",
        ],
    },
};

// The seven goals grouped by what they change. Each group is one branch of the diagram.
const THEMES = [
    { key: "people", name: "People", blurb: "Fair work, equal opportunity and inclusion.", goals: [5, 8, 10] },
    { key: "systems", name: "Systems", blurb: "Technology and resilience that keep care reliable.", goals: [9, 13] },
    { key: "lives", name: "Lives", blurb: "Care that reaches patients and keeps communities safe.", goals: [3, 16] },
];

/* ------------------------------- infographics ------------------------------ */

// Single-value gauge: one arc, one number, no decoration.
function Gauge({ value, label }) {
    const arcRef = useRef(null);
    const R = 70;
    const C = 2 * Math.PI * R;
    const target = C * (1 - value / 100);

    useEffect(() => {
        const arc = arcRef.current;
        if (!arc) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            arc.style.strokeDashoffset = target;
            return;
        }
        const ctx = gsap.context(() => {
            gsap.fromTo(
                arc,
                { strokeDashoffset: C },
                {
                    strokeDashoffset: target,
                    duration: 1.6,
                    ease: "power2.out",
                    scrollTrigger: { trigger: arc, start: "top 90%", once: true },
                }
            );
        });
        return () => ctx.revert();
    }, [C, target]);

    return (
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
            <div className="relative h-[176px] w-[176px] shrink-0">
                <svg viewBox="0 0 176 176" className="h-full w-full -rotate-90" role="img" aria-label={`${value} percent ${label}`}>
                    <circle cx="88" cy="88" r={R} fill="none" stroke="#ECEBED" strokeWidth="12" />
                    <circle
                        ref={arcRef}
                        cx="88"
                        cy="88"
                        r={R}
                        fill="none"
                        stroke="#6D09F9"
                        strokeWidth="12"
                        strokeLinecap="round"
                        strokeDasharray={C}
                        strokeDashoffset={C}
                    />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center font-brbold text-4xl tabular-nums tracking-tight text-ink">
                    <CountUp value={value} suffix="%" />
                </span>
            </div>
            <p className="max-w-[18ch] font-brsemi text-lg leading-snug text-ink">{label}</p>
        </div>
    );
}

function Figure({ children, label }) {
    return (
        <div className="flex flex-col gap-2 py-2 md:px-8 md:first:pl-0">
            <span className="font-brbold text-5xl tabular-nums tracking-tight text-ev-700">{children}</span>
            <p className="max-w-[24ch] font-brmedium text-mute">{label}</p>
        </div>
    );
}

// Hub-and-branch diagram: 8medical -> three themes -> seven goal tiles. Tiles jump to their section.
function GoalMap() {
    return (
        <div className="flex flex-col items-center">
            <div className="rounded-full bg-night px-7 py-3.5 font-brsemi text-lg text-white">8medical</div>
            <div aria-hidden="true" className="h-8 w-px bg-ev-300" />

            <div className="relative grid w-full gap-6 lg:grid-cols-3 lg:gap-8">
                <div aria-hidden="true" className="absolute left-[16.67%] right-[16.67%] top-0 hidden h-px bg-ev-300 lg:block" />
                {THEMES.map((theme) => (
                    <div key={theme.key} className="relative flex flex-col items-center pt-8">
                        <span aria-hidden="true" className="absolute left-1/2 top-0 h-8 w-px -translate-x-1/2 bg-ev-300 max-lg:hidden" />
                        <div className="flex w-full flex-col items-center gap-1 rounded-2xl border border-ev-200 bg-white px-5 py-4 text-center">
                            <h3 className="font-brbold text-xl text-ev-800">{theme.name}</h3>
                            <p className="max-w-[30ch] font-brmedium text-sm text-mute">{theme.blurb}</p>
                        </div>
                        <div aria-hidden="true" className="h-6 w-px bg-ev-300" />
                        <ul className="flex flex-wrap justify-center gap-4">
                            {theme.goals.map((n) => (
                                <li key={n} className="w-[96px]">
                                    <a
                                        href={`#goal-${n}`}
                                        aria-label={`Goal ${n}, ${GOALS[n].short}: read how we contribute`}
                                        className="group flex flex-col items-center gap-2 focus-visible:outline-none"
                                    >
                                        <img
                                            src={GOALS[n].image}
                                            alt=""
                                            loading="lazy"
                                            className="aspect-square w-full rounded-xl border border-line object-cover transition-transform duration-300 ease-out-strong group-hover:-translate-y-1 group-focus-visible:ring-2 group-focus-visible:ring-ev-700 group-focus-visible:ring-offset-2"
                                        />
                                        <span className="text-center font-brmedium text-xs leading-snug text-mute transition-colors group-hover:text-ev-700">
                                            {GOALS[n].short}
                                        </span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}

function Check() {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="mt-1 shrink-0 text-ev-700">
            <circle cx="10" cy="10" r="9" fill="currentColor" opacity="0.12" />
            <path d="M6 10.4l2.7 2.7L14 7.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function GoalEntry({ number }) {
    const goal = GOALS[number];
    return (
        <article id={`goal-${number}`} className="grid scroll-mt-24 gap-6 py-8 first:pt-0 last:pb-0 sm:grid-cols-[120px_minmax(0,1fr)] sm:gap-8">
            <img
                src={goal.image}
                alt={`Sustainable Development Goal ${number}: ${goal.short}`}
                loading="lazy"
                className="aspect-square w-[96px] rounded-xl border border-line object-cover sm:w-[120px]"
            />
            <div className="flex flex-col gap-4">
                <h3 className="max-w-[40ch] font-brsemi text-xl leading-snug tracking-tight text-ink sm:text-2xl">{goal.title}</h3>
                <ul className="flex max-w-[68ch] flex-col gap-3">
                    {goal.points.map((point) => (
                        <li key={point} className="flex gap-3 font-brreg leading-relaxed text-[#3F3D42]">
                            <Check />
                            <span>{point}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </article>
    );
}

/* ---------------------------------- page ---------------------------------- */

export default function Impact() {
    useEffect(() => {
        ReactGA.send({ hitType: "pageview", page: "/Impact", title: "Impact" });
    }, []);

    return (
        <div>
            <NavBar />
            <main>
                {/* page header */}
                <section className="relative flex h-[44vh] min-h-[320px] items-end overflow-hidden bg-night-deep">
                    <div className="absolute inset-0 bg-[url(./assets/images/impactbackground.jpeg)] bg-cover bg-[center_35%]" aria-hidden="true" />
                    <div className="absolute inset-0 bg-gradient-to-t from-night-deep/90 via-night-deep/50 to-night-deep/20" aria-hidden="true" />
                    <div className="relative mx-auto flex w-full max-w-[1200px] flex-col gap-4 px-4 pb-12 sm:px-6 lg:px-8">
                        <h1 className="font-brbold text-5xl tracking-tight text-white sm:text-6xl">Impact</h1>
                        <p className="max-w-[48ch] font-brmedium text-lg text-white/80">
                            How 8medical contributes to the UN Sustainable Development Goals.
                        </p>
                    </div>
                </section>

                {/* overview + key figures */}
                <Section tone="white">
                    <div className="flex flex-col gap-12">
                        <Reveal className="flex flex-col gap-6">
                            <img src={headerImg} alt="United Nations Sustainable Development Goals" className="h-auto w-[300px] max-w-full" />
                            <SectionHeading
                                title="Seven goals, one purpose"
                                lead="Fast emergency care is where health, jobs, fairness and safety meet. These are the goals our work supports, and the figures behind them."
                            />
                        </Reveal>
                        <Reveal className="grid items-center gap-10 rounded-3xl border border-line bg-[#F9F9FA] p-8 sm:p-10 lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-14">
                            <Gauge value={95} label="Emergency call-to-mission completion rate" />
                            <div className="grid gap-6 md:grid-cols-3 md:divide-x md:divide-line">
                                <Figure label="jobs provided per day, with equal pay for work of equal value">2-3</Figure>
                                <Figure label="female biker response medic in West Africa">1st</Figure>
                                <Figure label="of the UN Sustainable Development Goals supported">
                                    <CountUp value={7} />
                                </Figure>
                            </div>
                        </Reveal>
                    </div>
                </Section>

                {/* how the goals connect */}
                <Section tone="mist">
                    <Reveal className="flex flex-col gap-12">
                        <SectionHeading
                            align="center"
                            title="How our work connects to the goals"
                            lead="Our work groups into three areas. Select a goal to read how we contribute."
                        />
                        <GoalMap />
                    </Reveal>
                </Section>

                {/* goal detail, grouped by theme */}
                <Section tone="white">
                    <Reveal>
                        <SectionHeading title="The Goals We Work Toward" />
                    </Reveal>
                    <div className="mt-12 flex flex-col gap-16">
                        {THEMES.map((theme) => (
                            <Reveal key={theme.key} className="grid gap-8 border-t border-line pt-10 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-14">
                                <div className="flex flex-col gap-2 lg:sticky lg:top-24 lg:self-start">
                                    <h3 className="font-brbold text-3xl tracking-tight text-ev-800">{theme.name}</h3>
                                    <p className="max-w-[28ch] font-brmedium text-mute">{theme.blurb}</p>
                                </div>
                                <div className="flex flex-col divide-y divide-line">
                                    {theme.goals.map((n) => (
                                        <GoalEntry key={n} number={n} />
                                    ))}
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </Section>
            </main>
            <Footer />
        </div>
    );
}
