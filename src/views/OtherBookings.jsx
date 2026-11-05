"use client";
import ReactGA from "react-ga4";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, Clock, Copy, Mail, Phone } from "lucide-react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Section from "@/components/site/Section";
import SectionHeading from "@/components/site/SectionHeading";
import Cta from "@/components/site/Cta";
import Reveal from "@/components/site/Reveal";
import { CONTACT } from "@/lib/site";
import teamImg__asset from "../assets/images/teamtwo.png";

const teamImg = teamImg__asset.src ?? teamImg__asset;

const EMAIL = "hello@8medical.co";
// Each number dials itself: the tel: link and the text shown always match.
const PHONES = [
    { label: "Main line", href: `tel:${CONTACT.phone}`, display: "+234 707 153 4107", raw: CONTACT.phone },
    { label: "Alternate line", href: `tel:${CONTACT.altPhone}`, display: "+234 809 888 8763", raw: CONTACT.altPhone },
];

const SOCIAL_NAMES = {
    "facebook.com": "Facebook",
    "instagram.com": "Instagram",
    "x.com": "X",
    "linkedin.com": "LinkedIn",
};
const socials = CONTACT.socials.map((href) => {
    const host = new URL(href).hostname.replace("www.", "");
    return { href, name: SOCIAL_NAMES[host] || host };
});

// Shared pill styling for plain anchors (tel: and mailto: links bypass the router Link).
const pill =
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 py-3.5 font-brsemi text-lg transition-[transform,background-color,border-color] duration-200 ease-out-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.97]";

function CopyButton({ value, label }) {
    const [copied, setCopied] = useState(false);
    const timer = useRef(null);

    useEffect(() => () => clearTimeout(timer.current), []);

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(value);
            setCopied(true);
            clearTimeout(timer.current);
            timer.current = setTimeout(() => setCopied(false), 2000);
        } catch {
            /* clipboard blocked: the value is still visible and selectable on the page */
        }
    };

    return (
        <button
            type="button"
            onClick={copy}
            aria-label={`Copy ${label}`}
            className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 font-brsemi text-sm text-ink transition-colors duration-200 ease-out-strong hover:border-ev-300 hover:text-ev-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ev-700"
        >
            {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
            <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
        </button>
    );
}

export default function OtherBookings() {
    useEffect(() => {
        ReactGA.send({
            hitType: "pageview",
            page: "/OtherBookings",
            title: "Contact Page",
        });
    }, []);

    return (
        <div>
            <NavBar dark />
            <main>
                {/* header */}
                <section className="relative overflow-hidden bg-night-deep">
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0"
                        style={{
                            background:
                                "radial-gradient(900px 480px at 85% 100%, rgba(109,9,249,0.35), transparent 65%), radial-gradient(600px 360px at 0% 0%, rgba(75,7,171,0.4), transparent 60%)",
                        }}
                    />
                    <div className="relative mx-auto grid w-full max-w-[1200px] items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16 lg:px-8 lg:py-24">
                        <Reveal className="flex flex-col items-start gap-6">
                            <h1 className="font-brbold text-5xl leading-[1.05] tracking-tight text-white md:text-6xl">
                                Reach out to us
                            </h1>
                            <p className="max-w-[44ch] font-brmedium text-lg text-white/75">
                                To complete your request, contact us by phone or email. Our team is available 24/7.
                            </p>
                            <div className="flex flex-wrap items-center gap-4 pt-2">
                                <a
                                    href={PHONES[0].href}
                                    className={`${pill} bg-alarm text-white hover:bg-alarm-strong focus-visible:ring-alarm`}
                                >
                                    <Phone size={18} aria-hidden="true" />
                                    Call now
                                </a>
                                <a
                                    href={`mailto:${EMAIL}`}
                                    className={`${pill} border border-white/25 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 focus-visible:ring-white`}
                                >
                                    <Mail size={18} aria-hidden="true" />
                                    Email us
                                </a>
                            </div>
                        </Reveal>
                        <Reveal delay={0.1} className="overflow-hidden rounded-3xl border border-white/10 max-lg:hidden">
                            <img
                                src={teamImg}
                                alt="The 8medical team at their Lagos office, and paramedics on duty at an event"
                                className="h-[420px] w-full object-cover object-top"
                            />
                        </Reveal>
                    </div>
                </section>

                {/* ways to reach us */}
                <Section tone="white">
                    <Reveal className="flex flex-col gap-4">
                        <SectionHeading title="Ways to reach us" />
                        <p className="inline-flex w-fit items-center gap-2 rounded-full bg-ev-50 px-4 py-2 font-brsemi text-sm text-ev-800">
                            <Clock size={16} aria-hidden="true" />
                            Available 24/7
                        </p>
                    </Reveal>

                    <Reveal stagger={0.08} className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
                        {/* phone */}
                        <article className="flex flex-col gap-8 rounded-3xl border border-line bg-white p-8 transition-colors duration-300 ease-out-strong hover:border-ev-300 md:p-10">
                            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-ev-50 text-ev-700">
                                <Phone size={26} aria-hidden="true" />
                            </span>
                            <div className="flex flex-col gap-1">
                                <h3 className="font-brsemi text-xl text-ink">Call us</h3>
                                <p className="font-brmedium text-mute">Fastest for anything urgent.</p>
                            </div>
                            <ul className="flex flex-col divide-y divide-line">
                                {PHONES.map((p, i) => (
                                    <li key={p.raw} className="flex flex-wrap items-center justify-between gap-4 py-5 first:pt-0 last:pb-0">
                                        <div className="flex flex-col gap-1">
                                            <span className="font-brmedium text-sm text-mute">{p.label}</span>
                                            <a
                                                href={p.href}
                                                className={
                                                    "font-brbold tracking-tight tabular-nums text-ink transition-colors hover:text-ev-700 " +
                                                    (i === 0 ? "text-3xl sm:text-4xl" : "text-2xl")
                                                }
                                            >
                                                {p.display}
                                            </a>
                                        </div>
                                        <CopyButton value={p.display} label={`${p.label} number`} />
                                    </li>
                                ))}
                            </ul>
                        </article>

                        {/* email + socials */}
                        <div className="flex flex-col gap-6">
                            <article className="flex flex-1 flex-col justify-between gap-8 rounded-3xl border border-line bg-[#F9F9FA] p-6 md:p-10">
                                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-ev-700">
                                    <Mail size={26} aria-hidden="true" />
                                </span>
                                <div className="flex flex-col gap-1">
                                    <h3 className="font-brsemi text-xl text-ink">Email us</h3>
                                    <a
                                        href={`mailto:${EMAIL}`}
                                        className="break-all font-brbold text-2xl tracking-tight text-ink transition-colors hover:text-ev-700 sm:text-3xl"
                                    >
                                        {EMAIL}
                                    </a>
                                </div>
                                <div className="flex flex-wrap items-center gap-3">
                                    <a
                                        href={`mailto:${EMAIL}`}
                                        className={`${pill} bg-ev-700 text-white hover:bg-ev-800 focus-visible:ring-ev-700 !px-5 !py-2.5 !text-base`}
                                    >
                                        Send an email
                                        <ArrowUpRight size={16} aria-hidden="true" />
                                    </a>
                                    <CopyButton value={EMAIL} label="email address" />
                                </div>
                            </article>

                            <div className="flex flex-col gap-4 rounded-3xl border border-line bg-white p-8">
                                <h3 className="font-brsemi text-lg text-ink">Follow us</h3>
                                <ul className="flex flex-wrap gap-3">
                                    {socials.map((s) => (
                                        <li key={s.href}>
                                            <a
                                                href={s.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 font-brsemi text-sm text-ink transition-colors duration-200 ease-out-strong hover:border-ev-300 hover:text-ev-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ev-700"
                                            >
                                                {s.name}
                                                <ArrowUpRight size={14} aria-hidden="true" />
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </Reveal>
                </Section>

                {/* where to go next */}
                <Section tone="mist" className="py-14 lg:py-16">
                    <Reveal className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                        <div className="flex flex-col gap-1">
                            <h2 className="font-brsemi text-2xl tracking-tight text-ink">Looking to book a service?</h2>
                            <p className="font-brmedium text-mute">Pick your location again or head back to the start.</p>
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                            <Cta to="/StandBy" variant="primary">Change Location</Cta>
                            <Cta to="/" variant="quiet">Go Home</Cta>
                        </div>
                    </Reveal>
                </Section>
            </main>
            <Footer />
        </div>
    );
}
