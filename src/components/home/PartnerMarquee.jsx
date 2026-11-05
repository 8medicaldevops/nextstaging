import EmblaCarousel from "@/components/EmblaCarousel";
import { partnerLogos } from "./home-data";

export default function PartnerMarquee() {
  return (
    <section className="partner-marquee border-b border-line bg-white py-10" aria-label="Partner organizations">
      <p className="mb-6 text-center font-brmedium text-sm text-mute sm:text-base">Trusted by leading organizations</p>
      <div className="[mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]">
        <EmblaCarousel
        slides={partnerLogos}
        options={{ loop: true, stopOnMouseEnter: true, stopOnInteraction: false }}
        speed={0.6}
        className="flex"
        />
      </div>
    </section>
  );
}
