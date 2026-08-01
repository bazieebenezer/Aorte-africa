import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <span
      aria-label="Aorte"
      role="img"
      className={cn("logo-mask h-7 w-[117px]", className)}
    />
  );
}
