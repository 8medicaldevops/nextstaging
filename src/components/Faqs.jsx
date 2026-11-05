"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { cn } from "@/lib/utils";
import SectionHeading from "@/components/site/SectionHeading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useNavigate } from "@/lib/router-compat";
 

// const faqs = {
//   Individuals: {
//     questions: {
//       q1: 'Are all HMOs accepted?',
//       q2: 'How do I subcribe to emergency services?',
//       q3: 'Do you do interstate transport?',
//       q4: 'Are you active in all states?',
//       q5: 'When is a service booking considered to be confirmed?',
//       q6: 'How do I reach you?',
//     },
//     answers: {
//       a1: 'No, you can find a list of accepted HMOs when booking the service.',
//       a2: 'You can subscribe to our services by clicking the "Subscribe now" button or the link below and selecting a plan that best fits your needs.',
//       a3: 'Yes, we transport patients to all states.',
//       a4: 'No, we are only actively present in Lagos.',
//       a5: 'Payment confirms your booking.',
//       a6: 'You can reach us via phone call on +2348098888763 or via mail at hello@8medical.co',
//     },
//   },
//   // Add similar objects for other categories
//   EventPlanners: {
//     questions: {
//       q1: 'What services do you offer?',
//       q2: 'How can I book your services?',
//       q3: 'What is your cancellation policy?',
//       q4: 'Do you offer custom event planning?',
//       q5: 'Can you handle large-scale events?',
//       q6: 'What is the payment schedule?',
//     },
//     answers: {
//       a1: 'We offer full-service event planning, including catering, decor, and entertainment.',
//       a2: 'You can book our services through our website or by contacting us directly.',
//       a3: 'Our cancellation policy varies based on the service. Please contact us for details.',
//       a4: 'Yes, we offer custom event planning tailored to your needs.',
//       a5: 'Yes, we have experience handling events with over 500 attendees.',
//       a6: 'We require a deposit upfront, with the balance due before the event.',
//     },
//   },
//   Hospitals: {
//     questions: {
//       q1: 'Do you pick up from all hospitals?',
//       q2: 'Do you transport patients  to all hospitals?',
//       q3: 'How do we Signup as an Hospital?',
//       q4: 'Do you transport out of Lagos?',
      
//     },
//     answers: {
//       a1: 'Yes, we pick up patients from any location.',
//       a2: 'YES, we transport to all hospitals but we use certain hospitals during emergencies.',
//       a3: 'You can reach out to us at hello@8medical.co and our team will contact you on what to do.',
//       a4: 'Yes, we transport (ground and air) patients to all states and even as far as West African countries.',
      
//     },
//   },
//   Estates: {
//     questions: {
//       q1: 'How do we Signup as an Estate?',
//       q2: 'What offer does Eight Medical have for Estates?',
      
      
//     },
//     answers: {
//       a1: 'You can reach out to us at hello@8medical.co and our team will contact you on what to do.',
//       a2: 'You can reach out to us at hello@8medical.co and our team will contact you on what to do.',
//     },
//   },
//   Schools: {
//     questions: {
//       q1: 'How do we Signup as a School?',
//       q2: 'How does Eight Medical cater for Schools?',
//       q3: 'Do you accept HMOs',
      
      
//     },
//     answers: {
//       a1: 'You can reach out to us at hello@8medical.co and our team will contact you on what to do.',
//       a2: 'We offer ambulance standby, transport and emergency response services as well as overseeing school clinical services',
//       a3: 'No, we do not accept HMOs',
//     },
//   },
//   ProductionCompanies: {
//     questions: {
//       q1: 'How do we Signup for ambulance services?',
//       q2: 'How long is an ambulance standby?',
//       q3: 'Do you cover productions outside Lagos?',
      
      
//     },
//     answers: {
//       a1: 'You can reach out to us at hello@8medical.co and our team will contact you on what to do.',
//       a2: 'Standby durations are dependent on the production duration with a minimum of 4 hours.',
//       a3: 'Yes, we cover productions outside Lagos',
//     },
//   },
//   HMOs: {
//     questions: {
//       q1: 'Do you accept HMOs?',
//       q2: 'Are all HMOs accepted?',
//       q3: 'How do we Signup as an HMO?',
      
      
//     },
//     answers: {
//       a1: 'Yes, all you need is your enrollee ID to allow us validate your claim.',
//       a2: 'No, you can find a list of accepted HMOs when booking the service.',
//       a3: 'You can reach out to us at hello@8medical.co and our team will contact you on what to do.',
//     },
//   },
//   Responders: {
//     questions: {
//       q1: 'Do I have to work with Eight Medical to be a responder?',
//       q2: 'How do I become a responder with Eight medical?',
//       q3: 'What is the minimum requirement to become a responder?',
//       q4: 'Who is a responder in Eight Medical?',
      
      
//     },
//     answers: {
//       a1: 'No, you can volunteer or work part-time with us.',
//       a2: 'Apply for the role via the button below or send an email to human@8medical.co or call +2348098888763.',
//       a3: 'Background in healthcare, can communicate in English.',
//       a4: 'A responder is anyone who directly or indirectly provide care for individuals or businesses in need (urgent and emergency cases).',
//     },
//   },
//   // Add other categories (Hospitals, Estates, Schools, ProductionCompanies, HMOs) similarly
// };



const CATEGORIES = [
  { value: "Individuals", label: "Individuals" },
  { value: "Event Planners", label: "Event Planners" },
  { value: "Hospitals", label: "Hospitals" },
  { value: "Estates", label: "Estates" },
  { value: "Schools", label: "Schools" },
  { value: "Production Companies", label: "Production Companies" },
  { value: "HMO's", label: "HMOs" },
];

const AccordionComponent = ({ category, dark = false }) => {
  const [faq, setFaq] = useState({});
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const { questions, answers } = faq[category] || { questions: {}, answers: {} };
  const keys = Object.keys(questions);

  useEffect(() => {
    let cancelled = false;
    async function fetchFAQs() {
      try {
        const response = await axios.get(process.env.VITE_FAQS_API);
        if (cancelled) return;
        setFaq(response.data.faqs);
        setStatus("ready");
      } catch (error) {
        if (cancelled) return;
        console.error("Error fetching FAQs:", error);
        setStatus("error");
      }
    }
    fetchFAQs();
    return () => {
      cancelled = true;
    };
  }, []);

  if (status === "loading") {
    return (
      <div className="flex flex-col gap-3" aria-busy="true" aria-label="Loading questions">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className={cn("h-[68px] animate-pulse rounded-2xl", dark ? "bg-white/5" : "bg-[#ECEBED]/70")} />
        ))}
      </div>
    );
  }

  if (status === "error" || keys.length === 0) {
    return (
      <p className={cn("rounded-2xl border p-6 font-brmedium", dark ? "border-white/10 text-white/70" : "border-line bg-white text-mute")}>
        {status === "error"
          ? "We could not load the questions right now. Email hello@8medical.co and we will answer you directly."
          : "No questions for this group yet. Email hello@8medical.co and we will help."}
      </p>
    );
  }

  return (
    <Accordion type="single" collapsible className="flex flex-col gap-3">
      {keys.map((key, index) => (
        <AccordionItem
          key={key}
          value={`item-${index + 1}`}
          className={cn(
            "rounded-2xl border px-5 transition-colors duration-300 ease-out-strong",
            dark
              ? "border-white/10 bg-white/5 data-[state=open]:border-ev-400"
              : "border-line bg-white data-[state=open]:border-ev-300"
          )}
        >
          <AccordionTrigger
            className={cn(
              "py-5 text-left font-brsemi text-base hover:no-underline sm:text-lg",
              dark ? "text-white" : "text-ink"
            )}
          >
            {questions[key]}
          </AccordionTrigger>
          <AccordionContent>
            <div className={cn("max-w-[62ch] font-brreg text-base leading-relaxed", dark ? "text-white/70" : "text-mute")}>
              {answers[`a${key.substring(1)}`]}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default function Faqs({ dark = false }) {
  const [activeElement, setActiveElement] = useState("Individuals");
  const navigate = useNavigate();

  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-12 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <SectionHeading
        dark={dark}
        align="center"
        title="FAQs"
        lead="We have answered some of the most reoccurring questions we get from users."
      />

      <div className="grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-14">
        {/* group picker: select on small screens, tab list on large */}
        <div className="lg:hidden">
          <Select value={activeElement} onValueChange={setActiveElement}>
            <SelectTrigger
              aria-label="Choose a question group"
              className={cn(
                "w-full rounded-xl border font-brmedium sm:w-[280px]",
                dark ? "border-white/15 bg-white/5 text-white" : "border-line bg-white text-ink"
              )}
            >
              <SelectValue placeholder="Individuals" />
            </SelectTrigger>
            <SelectContent className="rounded-xl bg-white">
              {CATEGORIES.map((c) => (
                <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div
          role="tablist"
          aria-label="Question groups"
          aria-orientation="vertical"
          className="flex flex-col gap-1 self-start max-lg:hidden"
        >
          {CATEGORIES.map((c) => {
            const selected = c.value === activeElement;
            return (
              <button
                key={c.value}
                role="tab"
                aria-selected={selected}
                aria-controls="faq-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveElement(c.value)}
                onKeyDown={(e) => {
                  const i = CATEGORIES.findIndex((x) => x.value === activeElement);
                  const step = { ArrowDown: 1, ArrowUp: -1 }[e.key];
                  if (!step) return;
                  e.preventDefault();
                  const next = CATEGORIES[(i + step + CATEGORIES.length) % CATEGORIES.length];
                  setActiveElement(next.value);
                  e.currentTarget.parentElement.querySelector(`[data-tab="${next.value}"]`)?.focus();
                }}
                data-tab={c.value}
                className={cn(
                  "rounded-xl px-4 py-3 text-left font-brsemi text-[15px] transition-colors duration-200 ease-out-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ev-700",
                  selected
                    ? dark ? "bg-white/10 text-white" : "bg-ev-50 text-ev-800"
                    : dark ? "text-white/60 hover:text-white" : "text-mute hover:bg-white hover:text-ink"
                )}
              >
                {c.label}
              </button>
            );
          })}
        </div>
        <div id="faq-panel" role="tabpanel" className="min-w-0 lg:col-start-2 lg:row-start-1">
          <AccordionComponent category={activeElement} dark={dark} />
        </div>
      </div>

      <div
        className={cn(
          "flex flex-col items-center justify-between gap-6 rounded-3xl px-6 py-10 text-center md:flex-row md:px-12 md:text-left",
          dark ? "border border-white/10 bg-white/5" : "bg-night"
        )}
      >
        <p className="max-w-[24ch] font-brbold text-2xl leading-snug tracking-tight text-white sm:text-3xl">
          Do you have any more questions for us?
        </p>
        <button
          onClick={() => navigate("/OtherBookings")}
          className="inline-flex items-center rounded-full bg-ev-700 hover:bg-ev-800 px-6 py-3.5 font-brsemi text-lg text-white transition-transform duration-200 ease-out-strong active:scale-[0.97]"
        >
          Contact Us
        </button>
      </div>
    </div>
  );
}
