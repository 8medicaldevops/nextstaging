// Content for the homepage sections. Copy preserved from the previous build.
import afterlife__asset from "../../assets/images/afterlife.png";

const afterlife = afterlife__asset.src ?? afterlife__asset;

export const partnerLogos = [
  "../Zapphire.png",
  "../Wellpath.png",
  "../stuff.png",
  "../Rjolad.png",
  "../reliance.png",
  "../Oando.png",
  "../mdass.png",
  "../download.png",
  "../coptic.png",
  "../clinalancet.png",
];

export const services = [
  {
    key: "standby",
    tab: "Ambulance Standby",
    label: "Ambulance Standby",
    headline: "Book an ambulance to standby at your event",
    body: "Be it sporting events, film shoots, conferences or weddings, let's provide round the clock medical support.",
    learnMore: { label: "Learn more about Ambulance Standby", to: "/ServiceAmb" },
    action: { label: "Book Now", type: "navigate", to: "/StandBy" },
    image: "../ServiceImage.png",
  },
  {
    key: "transport",
    tab: "Ambulance Transport",
    label: "Ambulance Transport (Air and Ground)",
    headline: "Transport a patient in need with our ambulance",
    body: "Arrange ambulance transport for a loved one or patient, whether by land or air.",
    learnMore: { label: "Learn more about Ambulance Transport", to: "/ServiceAgt" },
    action: { label: "Book Now", type: "navigate", to: "/AmbulanceTp" },
    image: "../air.png",
  },
  {
    key: "afterLife",
    tab: "AfterLife Transport",
    label: "AfterLife Transport",
    headline: "Transport loved ones with dignity and care",
    body: "We handle your loved one's final journey with care and respect, allowing you to focus on honoring their memory.",
    learnMore: { label: "Learn more about AfterLife Transport", to: "/ServiceAfterLife" },
    action: { label: "Book Now", type: "navigate", to: "/AfterLife" },
    image: afterlife,
  },
  {
    key: "urgentCare",
    tab: "Urgent Care",
    label: "Urgent Care",
    headline: "Curate a medical care package to suit your health needs",
    body: "Need periodic ambulance transport or standby for your individual, family or business use? Curate a package to suit your needs.",
    learnMore: { label: "Learn more about Urgent Care", to: "/ServiceUg" },
    action: { label: "Get Started", type: "modal" },
    image: "../ug.png",
  },
];

export const stats = [
  { value: 15000, suffix: "+", label: "Calls received" },
  { value: 8000, suffix: "+", label: "Lives saved" },
  { value: 400, suffix: "+", label: "First responders" },
  { value: 10, suffix: "", label: "Avg. response time (mins)" },
  { value: 25, suffix: "+", label: "Ambulances" },
];

export const serviceCards = [
  {
    image: "../er.png",
    title: "Emergency Response",
    desc: "Be it night or day, you can count on our emergency response team to show up.",
    link: "/ServiceEr",
  },
  {
    image: "../air.png",
    title: "Ambulance Transport (Air and Ground)",
    desc: "Our state-of-the-art air and ground ambulances, staffed by skilled professionals, are ready 24/7 for rapid transport or specialized care.",
    link: "/ServiceAgt",
  },
  {
    image: "../ServiceImage.png",
    title: "Ambulance Standby",
    desc: "We provide ambulance standby for events or emergencies, ensuring immediate assistance with trained staff and well-equipped ambulances.",
    link: "/ServiceAmb",
  },
  {
    image: afterlife,
    title: "AfterLife Transport",
    desc: "Transport your deceased loved one with care. We guarantee respectful and dignified treatment as their life's journey concludes.",
    link: "/ServiceAfterLife",
  },
  {
    image: "../ug.png",
    title: "Urgent Care",
    desc: "We address non-life threatening medical issues to ensure that they don't escalate.",
    link: "/ServiceUg",
  },
];

export const whyUs = [
  {
    icon: "reliable",
    title: "Reliable",
    desc: "We deliver expert care to you in the shortest time possible.",
  },
  {
    icon: "clock",
    title: "24/7 Availability",
    desc: "We are available around the clock, every day of the year.",
  },
  {
    icon: "check",
    title: "Expertise",
    desc: "Our expert medical teams guarantee top-tier care.",
  },
  {
    icon: "wallet",
    title: "Affordable Healthcare",
    desc: "Access urgent medical care without breaking the bank.",
  },
];

export const testimonies = [
  { name: "Adaobi Onyekachi", review: "The medical team was quick, caring, and professional. Exceptional service, truly impressed." },
  { name: "Tunde Bakare", review: "Best healthcare experience ever. The paramedics were so calm and efficient. Highly recommended!" },
  { name: "Funmi Adewale", review: "Quick response, friendly staff, and excellent care. Couldn't ask for better service!" },
  { name: "Chukwuma Okafor", review: "The team arrived promptly and handled everything with utmost professionalism. Highly satisfied." },
  { name: "Ngozi Uche", review: "Efficient, caring, and professional. The service exceeded all my expectations." },
  { name: "Segun Adebayo", review: "From start to finish, the service was top-notch. The paramedics were incredibly compassionate." },
  { name: "Ezinne Chukwu", review: "I was amazed by the prompt and professional service. The team was very reassuring and kind." },
  { name: "Kola Falana", review: "They arrived on time, and the care was outstanding. I felt safe and well taken care of." },
  { name: "Rashida Mohammed", review: "The service was efficient, and the paramedics were empathetic. They made a stressful situation easier." },
  { name: "Bola Ojo", review: "Fast, reliable, and very professional. The paramedics were truly wonderful and attentive." },
  { name: "Obinna Eze", review: "Outstanding service. The paramedics were patient, understanding, and very professional." },
  { name: "Folake Babalola", review: "The response time was amazing, and the care was exceptional. I highly recommend their service." },
];
