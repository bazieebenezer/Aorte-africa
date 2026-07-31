"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Direction = "up" | "down" | "left" | "right" | "scale" | "none";

const hiddenByDirection: Record<Direction, { opacity: number; y?: number; x?: number; scale?: number; filter: string }> = {
  up: { opacity: 0, y: 48, filter: "blur(6px)" },
  down: { opacity: 0, y: -48, filter: "blur(6px)" },
  left: { opacity: 0, x: -72, filter: "blur(6px)" },
  right: { opacity: 0, x: 72, filter: "blur(6px)" },
  scale: { opacity: 0, scale: 0.85, filter: "blur(8px)" },
  none: { opacity: 0, filter: "blur(0px)" },
};

export function Reveal({
  children,
  direction = "up",
  delay = 0,
  once = true,
  duration = 0.9,
  className,
}: {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  once?: boolean;
  duration?: number;
  className?: string;
}) {
  const hidden = hiddenByDirection[direction];

  return (
    <motion.div
      initial={hidden}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration, delay, ease: "backOut" }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
