import { cn } from "@/lib/cn";
import { PlaceholderBadge } from "./PlaceholderBadge";

export function SectionHeading({
  eyebrow,
  title,
  lede,
  verified = true,
  align = "start",
  id,
  as: Heading = "h2",
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  verified?: boolean;
  align?: "start" | "center";
  id?: string;
  as?: "h2" | "h3";
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
      )}
    >
      <div
        className={cn(
          "flex flex-wrap items-center gap-3",
          align === "center" && "justify-center",
        )}
      >
        <p className="eyebrow">{eyebrow}</p>
        {!verified && <PlaceholderBadge />}
      </div>
      <Heading id={id} className="section-title">
        {title}
      </Heading>
      {lede && <p className="section-lede">{lede}</p>}
    </div>
  );
}
