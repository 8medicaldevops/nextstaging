import { cn } from "@/lib/utils";
import Container from "./Container";

/**
 * Page section with a consistent vertical rhythm.
 * tone: "white" | "mist" | "night"
 */
const tones = {
  white: "bg-white",
  mist: "bg-[#F9F9FA]",
  night: "bg-night text-white",
};

export default function Section({ tone = "white", bleed = false, className, containerClassName, children, ...rest }) {
  return (
    <section className={cn(tones[tone], "py-16 lg:py-24", className)} {...rest}>
      {bleed ? children : <Container className={containerClassName}>{children}</Container>}
    </section>
  );
}
