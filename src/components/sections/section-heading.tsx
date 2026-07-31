import { cn } from "@/lib/utils";

export function SectionTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex w-fit items-center rounded-full border border-primary/20 bg-gradient-to-br from-primary/20 via-primary/5 to-transparent px-4 py-1.5 text-xs font-medium uppercase tracking-wide text-primary">
      {children}
    </span>
  );
}

export function SectionTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2 className={cn("text-silver fs-title text-center font-semibold leading-snug", className)}>
      {children}
    </h2>
  );
}

export function SectionSubtitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="fs-subtitle mt-2 max-w-2xl text-center text-muted-foreground">{children}</p>
  );
}
