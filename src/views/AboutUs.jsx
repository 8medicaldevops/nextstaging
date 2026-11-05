"use client";
import ReactGA from "react-ga4";
import { useEffect } from "react";
import { Database, HeartPulse, Hospital, Users, Wallet, User } from "lucide-react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Section from "@/components/site/Section";
import SectionHeading from "@/components/site/SectionHeading";
import Reveal from "@/components/site/Reveal";
import abtPeeps__asset from '../assets/images/abt-peeps.png';
import team__asset from '../assets/images/team.png';
import teamTwo__asset from '../assets/images/teamtwo.png';

const abtPeeps = abtPeeps__asset.src ?? abtPeeps__asset;
const team = team__asset.src ?? team__asset;
const teamTwo = teamTwo__asset.src ?? teamTwo__asset;

const VALUES = [
    {
        letter: (
            <svg width="56" height="56" viewBox="0 0 64 64" fill="none" aria-hidden="true">
                <circle cx="32" cy="32" r="32" fill="#6D09F9" />
                <path d="M35.4286 45L28.5486 35.52H26.9486V45H20.0286V17H32.2286C39.3753 17 42.9486 20.1333 42.9486 26.4C42.9486 31.28 40.6686 34.2 36.1086 35.16L43.7486 45H35.4286ZM34.7886 28.8C35.4286 28.32 35.7486 27.52 35.7486 26.4C35.7486 25.28 35.4419 24.4933 34.8286 24.04C34.2153 23.56 33.2153 23.32 31.8286 23.32H26.9486V29.52H31.8286C33.1886 29.52 34.1753 29.28 34.7886 28.8Z" fill="white" />
            </svg>
        ),
        title: "Reliable",
        desc: "We give no excuses. We will be there when you call.",
    },
    {
        letter: (
            <svg width="56" height="56" viewBox="0 0 64 64" fill="none" aria-hidden="true">
                <circle cx="32" cy="32" r="32" fill="#6D09F9" />
                <path d="M29.847 39.72H43.967V46H22.927V18H43.567V24.28H29.847V28.76H42.527V34.96H29.847V39.72Z" fill="white" />
            </svg>
        ),
        title: "Excellent",
        desc: "We are continuously in the pursuit of excellence.",
    },
    {
        letter: (
            <svg width="56" height="56" viewBox="0 0 64 64" fill="none" aria-hidden="true">
                <circle cx="32" cy="32" r="32" fill="#6D09F9" />
                <path d="M40.2363 44L38.3562 38.56H27.6363L25.7563 44H18.3963L28.9563 16H37.0363L47.5963 44H40.2363ZM29.6763 32.72H36.3163L32.9963 23.16L29.6763 32.72Z" fill="white" />
            </svg>
        ),
        title: "Available",
        desc: "We take no day off. We are available round the clock.",
    },
    {
        letter: (
            <svg width="56" height="56" viewBox="0 0 64 64" fill="none" aria-hidden="true">
                <circle cx="32" cy="32" r="32" fill="#6D09F9" />
                <path d="M33.4911 46.56C29.1711 46.56 25.6511 45.2 22.9311 42.48C20.2378 39.76 18.8911 36.28 18.8911 32.04C18.8911 27.8 20.2244 24.3067 22.8911 21.56C25.5844 18.8133 29.1178 17.44 33.4911 17.44C36.4244 17.44 38.9978 18.12 41.2111 19.48C43.4244 20.8133 45.0911 22.7467 46.2111 25.28L40.1711 28.36C38.8911 25.4533 36.6778 24 33.5311 24C31.3444 24 29.5578 24.7467 28.1711 26.24C26.8111 27.7333 26.1311 29.6533 26.1311 32C26.1311 34.3467 26.8111 36.2667 28.1711 37.76C29.5578 39.2533 31.3444 40 33.5311 40C36.6778 40 38.8911 38.5467 40.1711 35.64L46.2111 38.72C45.0911 41.2533 43.4244 43.2 41.2111 44.56C38.9978 45.8933 36.4244 46.56 33.4911 46.56Z" fill="white" />
            </svg>
        ),
        title: "Committed",
        desc: "We are committed to keeping you alive and healthy.",
    },
    {
        letter: (
            <svg width="56" height="56" viewBox="0 0 64 64" fill="none" aria-hidden="true">
                <circle cx="32" cy="32" r="32" fill="#6D09F9" />
                <path d="M28.6576 47V25.44H20.7376V19H43.5376V25.44H35.6176V47H28.6576Z" fill="white" />
            </svg>
        ),
        title: "Timely",
        desc: "We are always on time regardless of the situation.",
    },
];

// Five things 8medical connects a user to, drawn around the user. Copy: "hospital, personnel,
// care, information and credit to users in 10 mins or less".
const CONNECTIONS = [
    { label: "Hospital", Icon: Hospital },
    { label: "Personnel", Icon: Users },
    { label: "Care", Icon: HeartPulse },
    { label: "Information", Icon: Database },
    { label: "Credit", Icon: Wallet },
].map((c, i, all) => {
    const angle = (-90 + (360 / all.length) * i) * (Math.PI / 180);
    return { ...c, x: 50 + 36 * Math.cos(angle), y: 50 + 35 * Math.sin(angle) };
});

function ConnectionMap() {
    return (
        <div className="relative mx-auto aspect-square w-full max-w-[640px] sm:aspect-[5/4]">
            {/* spokes */}
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
                {CONNECTIONS.map((c) => (
                    <line
                        key={c.label}
                        x1="50"
                        y1="50"
                        x2={c.x}
                        y2={c.y}
                        stroke="#BEA8FF"
                        strokeWidth="1.5"
                        strokeDasharray="1 5"
                        strokeLinecap="round"
                        vectorEffect="non-scaling-stroke"
                    />
                ))}
            </svg>

            {/* the user, at the centre */}
            <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2">
                <span className="flex h-24 w-24 items-center justify-center rounded-full bg-ev-700 text-white sm:h-28 sm:w-28">
                    <User size={40} aria-hidden="true" />
                </span>
                <span className="font-brbold text-lg text-ink">You</span>
            </div>

            {/* what 8medical connects to you */}
            {CONNECTIONS.map(({ label, Icon, x, y }) => (
                <div
                    key={label}
                    className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2"
                    style={{ left: `${x}%`, top: `${y}%` }}
                >
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-ev-200 bg-white text-ev-700 sm:h-16 sm:w-16">
                        <Icon size={26} aria-hidden="true" />
                    </span>
                    <span className="font-brsemi text-sm text-ink sm:text-base">{label}</span>
                </div>
            ))}
        </div>
    );
}

const SCOPE = ["Medical", "Fire", "Security", "Roadside assistance"];

export default function AboutUs() {
    useEffect(() => {
        ReactGA.send({ hitType: "pageview", page: "/AboutUs", title: "About Us" });
    }, []);

    return (
        <div>
            <NavBar />
            <main>
                {/* page header over brand photography */}
                <section className="relative flex h-[44vh] min-h-[320px] items-end overflow-hidden bg-night-deep">
                    <div className="absolute inset-0 bg-[url(./assets/images/abt-bg.jpeg)] bg-cover bg-[center_30%]" aria-hidden="true" />
                    <div className="absolute inset-0 bg-gradient-to-t from-night-deep/90 via-night-deep/50 to-night-deep/20" aria-hidden="true" />
                    <div className="relative mx-auto flex w-full max-w-[1200px] flex-col gap-4 px-4 pb-12 sm:px-6 lg:px-8">
                        <h1 className="font-brbold text-5xl tracking-tight text-white md:text-6xl">About Us</h1>
                        <p className="max-w-[44ch] font-brmedium text-lg text-white/80">
                            Transforming emergency care response in Nigeria and Africa at large.
                        </p>
                    </div>
                </section>

                {/* our story */}
                <Section tone="mist">
                    <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-20">
                        <Reveal className="flex flex-col gap-6">
                            <SectionHeading title="Our Story" />
                            <div className="flex flex-col gap-4 font-brmedium text-lg leading-relaxed text-[#3F3D42] max-w-[62ch]">
                                <p>
                                    Our story is one woven with passion, innovation and commitment to transforming emergency care response in Nigeria and Africa at large. Our journey was birthed from a place of pain and loss of loved ones, which fuels our vision to make access to care easier.
                                </p>
                                <p>
                                    We are an end-to-end platform that identifies and connects hospital, personnel, care, information and credit to users in 10 mins or less. We ensure accessibility, improved patient care, and streamlined processes to care.
                                </p>
                                <p>
                                    Our team consists of healthcare personnel and product enthusiasts who are continually building the operating system for accessing care. Join us in our mission to empower the African healthcare system.
                                </p>
                            </div>
                        </Reveal>
                        <Reveal delay={0.1} className="overflow-hidden rounded-3xl border border-line">
                            <img src={abtPeeps} alt="8medical staff" className="w-full object-cover" />
                        </Reveal>
                    </div>
                </Section>

                {/* how we connect you: the story's one-sentence promise, drawn */}
                <Section tone="white">
                    <Reveal className="flex flex-col gap-12">
                        <SectionHeading
                            align="center"
                            title="Everything care needs, in 10 minutes or less"
                            lead="One platform connects you to the people and resources that get you care."
                        />
                        <ConnectionMap />
                    </Reveal>
                </Section>

                {/* mission and vision */}
                <Section tone="mist">
                    <Reveal stagger={0.1} className="grid gap-6 lg:grid-cols-2">
                        <article className="relative flex flex-col gap-6 overflow-hidden rounded-3xl bg-night p-6 md:p-12">
                            <div
                                aria-hidden="true"
                                className="pointer-events-none absolute inset-0"
                                style={{ background: "radial-gradient(520px 320px at 100% 100%, rgba(109,9,249,0.4), transparent 70%)" }}
                            />
                            <h2 className="relative font-brbold text-2xl tracking-tight text-ev-300">Our Mission</h2>
                            <p className="relative font-brsemi text-2xl leading-snug text-white sm:text-3xl">
                                To provide and ensure rapid access to life-saving medical intervention by empowering smarter emergency response.
                            </p>
                        </article>
                        <article className="flex flex-col gap-6 rounded-3xl border border-ev-100 bg-ev-50 p-6 md:p-12">
                            <h2 className="font-brbold text-2xl tracking-tight text-ev-800">Our Vision</h2>
                            <p className="font-brsemi text-2xl leading-snug text-night sm:text-3xl">
                                To be the infrastructural framework for provision and distribution of prompt, affordable, reliable and integrated access to emergency response solutions.
                            </p>
                            <ul className="mt-auto flex flex-wrap gap-2 pt-2" aria-label="Areas of emergency response">
                                {SCOPE.map((s) => (
                                    <li key={s} className="rounded-full border border-ev-200 bg-white px-4 py-2 font-brsemi text-sm text-ev-800">
                                        {s}
                                    </li>
                                ))}
                            </ul>
                        </article>
                    </Reveal>
                </Section>

                {/* values: the first letters spell REACT */}
                <Section tone="white">
                    <Reveal>
                        <SectionHeading
                            align="center"
                            title="Our Values"
                            lead="Take the first letter of each and they spell REACT."
                        />
                    </Reveal>
                    <Reveal className="relative mt-14">
                        <div
                            aria-hidden="true"
                            className="absolute bottom-7 left-7 top-7 w-px bg-ev-200 lg:bottom-auto lg:left-[10%] lg:right-[10%] lg:top-7 lg:h-px lg:w-auto"
                        />
                        <ol className="relative flex flex-col gap-10 lg:grid lg:grid-cols-5 lg:gap-6">
                            {VALUES.map((value) => (
                                <li key={value.title} className="flex gap-5 lg:flex-col lg:items-center lg:text-center">
                                    <span className="shrink-0 self-start rounded-full bg-white p-1 [&>svg]:h-12 [&>svg]:w-12">{value.letter}</span>
                                    <div className="flex flex-col gap-1">
                                        <h3 className="font-brbold text-xl text-ink">{value.title}</h3>
                                        <p className="max-w-[26ch] font-brmedium text-mute lg:mx-auto">{value.desc}</p>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </Reveal>
                </Section>

                {/* team */}
                <Section tone="mist">
                    <Reveal>
                        <SectionHeading align="center" title="The EightMedical Team" />
                    </Reveal>
                    <Reveal stagger={0.1} className="mt-12 grid items-stretch gap-6 md:grid-cols-2">
                        <div className="overflow-hidden rounded-3xl border border-line">
                            <img src={team} alt="8medical team members" className="h-full w-full object-cover" />
                        </div>
                        <div className="overflow-hidden rounded-3xl border border-line">
                            <img src={teamTwo} alt="8medical team members" className="h-full w-full object-cover" />
                        </div>
                    </Reveal>
                </Section>
            </main>
            <Footer />
        </div>
    );
}
