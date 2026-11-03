// Content registry for the five service pages. Copy preserved from the previous build.
import { AmbulanceIcon, StandbyIcon, StethoscopeIcon, AfterlifeIcon } from "@/components/home/service-icons";

import players__asset from "../../assets/images/playersemergency.png";
import ambulance__asset from "../../assets/images/ambulancetransport.png";
import air__asset from "../../assets/images/airtransport.png";
import urgentCare__asset from "../../assets/images/urgentcare.png";
import afterlife__asset from "../../assets/images/Image.png";

const players = players__asset.src ?? players__asset;
const ambulance = ambulance__asset.src ?? ambulance__asset;
const air = air__asset.src ?? air__asset;
const urgentCare = urgentCare__asset.src ?? urgentCare__asset;
const afterlife = afterlife__asset.src ?? afterlife__asset;

export const BOOKING_POLICIES = [
  {
    title: "Cancellation",
    highlight: "Up to 1 hour before",
    body: "Cancellations for any reason are allowed up to one hour before the scheduled time.",
  },
  {
    title: "No-Cash Policy",
    highlight: "POS or transfer only",
    body: "We do not take cash as a form of payment. Kindly make payment for your service via POS or transfers only.",
  },
  {
    title: "Arrival Policy",
    highlight: "Arrive 10 mins early",
    body: "We operate an appointment-only service. Please arrive at least 10 mins early for your scheduled appointment. We provide a 15 mins grace period; after this we may not be able to guarantee a service.",
  },
  {
    title: "Refund Policy",
    highlight: "75% refunded",
    body: "For any situation where the service booked has to be cancelled, only 75% of the fee paid shall be refunded after cancellation.",
  },
];

export const SERVICES = {
  er: {
    path: "/ServiceEr",
    gaTitle: "Emergency Response",
    icon: StethoscopeIcon,
    iconColor: "#F9091D",
    iconBg: "#FEE6E8",
    title: "Emergency Response",
    body: "Our fleet of fully equipped ambucycles and ambulances are on standby, ensuring swift and effective response to emergencies at all times.",
    heroAction: { label: "Report Emergency", variant: "emergency", type: "modal" },
    image: players,
    imageAlt: "8medical team giving emergency response to injured players",
    steps: {
      prefix: "How to Report an",
      highlight: "Emergency",
      items: [
        { title: "Contact Us", body: "Contact us directly via call at", contact: ["+2348098888763"] },
        { title: "Provide Information about the Emergency", body: "Provide us with the following; type of emergency, number of individuals involved and location." },
        { title: "Await our Arrival", body: "Give extra useful information, then provide first aid if capable." },
      ],
    },
    band: {
      title: "Save our Emergency Line",
      highlight: "+2348098888763",
      action: { label: "Save Number", type: "href", href: "tel:+2348098888763" },
    },
    policies: false,
    others: ["agt", "amb", "ug"],
  },
  amb: {
    path: "/ServiceAmb",
    gaTitle: "Ambulance Standby",
    icon: StandbyIcon,
    iconColor: "#6AB106",
    iconBg: "#F4FEE6",
    title: "Ambulance Standby",
    body: "From small pop-up gatherings to high-profile conferences and weddings, all events carry the potential for unforeseen emergencies. Our comprehensive ambulance standby services ensure that your event is covered by and equipped with the best emergency response team money can buy. Most importantly, we ensure that you and your event are free from liability.",
    heroAction: { label: "Book Now", type: "navigate-env" },
    image: ambulance,
    imageAlt: "An 8medical ambulance on standby",
    steps: {
      prefix: "How to Book an",
      highlight: "Ambulance Standby",
      items: [
        { title: "State Standby Location", body: "Input the event venue and address for the standby." },
        { title: "Schedule Standby Date and Time Duration", body: "Enter the date and the time duration of your event for the standby." },
        { title: "Specify Number of Ambulance and Medical Personnel", body: "Enter the number of medics and ambulances you want at your event location." },
        { title: "Confirm Your Details and Make Payments", body: "Review the information you provided to ensure accuracy before proceeding to payment." },
        { title: "Prepare for our Arrival", body: "Reserve a space for providing care at your event." },
      ],
    },
    band: {
      title: "Book an ambulance to standby at your event today",
      action: { label: "Book Ambulance Standby", type: "navigate-env" },
    },
    policies: true,
    others: ["agt", "er", "ug"],
  },
  agt: {
    path: "/ServiceAgt",
    gaTitle: "Ambulance Transport",
    icon: AmbulanceIcon,
    iconColor: "#6D09F9",
    iconBg: "#F8F4FE",
    title: "Ambulance Transport (Air and Ground)",
    body: "For both ground and air transport, we provide bed-to-bed transfers of patients from both homes and hospitals. Experience peace of mind with our accomplished medical professionals and cutting-edge ambulances, ensuring seamless patient transport for any health condition. In partnership with trusted allies featuring emergency-ready jets and helicopters, our team of dedicated doctors and paramedics guarantees safe and expert air transportation.",
    heroAction: { label: "Book Now", type: "navigate", to: "/AmbulanceTp" },
    image: air,
    imageAlt: "An 8medical air ambulance",
    steps: {
      prefix: "How to Book an",
      highlight: "Ambulance Transport",
      items: [
        { title: "Contact Us", body: "Contact us directly via call at", contact: ["+2348098888763", "hello@8medical.co"] },
        { title: "Provide Information about the Transport", body: "Provide us with useful information such as the type of transport, pickup and drop off points e.t.c." },
        { title: "Schedule Date and Time for Transport", body: "Inform us of your preferred date and time for the patient's transport." },
        { title: "Confirm Your Details and Make Payments", body: "Review your information before proceeding to payment." },
        { title: "Prepare for Transport", body: "Get the patient ready for transport, we will arrive 30mins before selected time." },
      ],
    },
    band: {
      title: "Book our Ambulance Transport Service Today",
      action: { label: "Book Ambulance Transport", type: "navigate", to: "/AmbulanceTp" },
    },
    policies: true,
    others: ["er", "amb", "ug"],
  },
  ug: {
    path: "/ServiceUg",
    gaTitle: "Urgent Care",
    icon: StethoscopeIcon,
    iconColor: "#F96D09",
    iconBg: "#FEF0E6",
    title: "Urgent Care",
    body: "Book for medical care according to your needs or doctor's prescription. We offer both in-home and in-hospital appointments.",
    heroAction: { label: "Book Now", type: "modal" },
    image: urgentCare,
    imageAlt: "An 8medical professional providing urgent care",
    steps: {
      prefix: "How to Order an",
      highlight: "Urgent Care",
      items: [
        { title: "Contact Us", body: "Contact us directly at", contact: ["+2348098888763", "hello@8medical.co"] },
        { title: "Provide Patient's Details", body: "Give us the required personal and medical information of the patient(s)." },
        { title: "Schedule Appointment", body: "Choose a desired date and time for the care to be administered in your home or a medical facility." },
        { title: "Confirm Your Details and Make Payments", body: "Review your information before proceeding to payment." },
        { title: "Prepare for our Arrival", body: "Get the patient ready for care. We will arrive 30mins before the selected time." },
      ],
    },
    band: {
      title: "Get the medical care that suits your health needs today",
      action: { label: "Book Urgent Care", type: "modal" },
    },
    policies: true,
    others: ["agt", "amb", "er"],
  },
  afterlife: {
    path: "/ServiceAfterLife",
    gaTitle: "AfterLife Transport",
    icon: AfterlifeIcon,
    iconColor: "#6D09F9",
    iconBg: "#F8F4FE",
    title: "After Life Transport",
    body: "Transport your deceased loved one with the utmost care and compassion. Rest assured that we are committed to ensuring that your loved ones are handled with the respect and dignity they deserve as their life's journey comes to a close. Our dedicated team will go above and beyond to provide a seamless and respectful experience during this difficult time.",
    heroAction: { label: "Book Now", type: "navigate", to: "/AfterLife" },
    image: afterlife,
    imageAlt: "An illustration of 8medical afterlife transport",
    steps: {
      prefix: "How to Book an",
      highlight: "Afterlife Transport",
      items: [
        { title: "Contact Us", body: "Contact us directly via call at", contact: ["+2348098888763"] },
        { title: "Provide Information about the Transport", body: "Provide us with useful information such as the type of transport, pickup and drop off points e.t.c." },
        { title: "Schedule Date and Time for Transport", body: "Inform us of your preferred date and time for the transport." },
        { title: "Confirm Your Details and Make Payments", body: "Review your information before proceeding to payment." },
        { title: "Prepare for Transport", body: "We will arrive 30mins before the selected time." },
      ],
    },
    band: {
      title: "Book our After Life Transport Service Today",
      action: { label: "Book AfterLife Transport", type: "navigate", to: "/AfterLife" },
    },
    policies: true,
    others: ["er", "amb", "ug"],
  },
};

// Images + titles used on "Other Services" cards.
export const SERVICE_CARDS = {
  er: { image: players, title: "Emergency Response", to: "/ServiceEr" },
  amb: { image: "/ServiceImage.png", title: "Ambulance Standby", to: "/ServiceAmb" },
  agt: { image: "/air.png", title: "Air and Ground Ambulance Transport", to: "/ServiceAgt" },
  ug: { image: "/ugtwo.png", title: "Urgent Care", to: "/ServiceUg" },
  afterlife: { image: afterlife, title: "AfterLife Transport", to: "/ServiceAfterLife" },
};
