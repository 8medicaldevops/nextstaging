import { cn } from "@/lib/utils";

/**
 * Stacked section header: title on top, supporting line below (max-w 65ch).
 * align: "left" | "center"
 */
export default function SectionHeading({ title, lead, align = "left", dark = false, className }) {
  return (
    <div className={cn("flex flex-col gap-3", align === "center" && "items-center text-center", className)}>
      <h2
        className={cn(
          "font-brsemi text-3xl tracking-tight sm:text-4xl",
          dark ? "text-white" : "text-ink"
        )}
      >
        {title}
      </h2>
      {lead && (
        <p className={cn("max-w-[65ch] font-brreg text-lg", dark ? "text-white/75" : "text-mute")}>
          {lead}
        </p>
      )}
    </div>
  );
}
