"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function Cursor() {
  const enabledRef = useRef(false);
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const dotX = useSpring(x, { stiffness: 900, damping: 60 });
  const dotY = useSpring(y, { stiffness: 900, damping: 60 });
  const ringX = useSpring(x, { stiffness: 250, damping: 28 });
  const ringY = useSpring(y, { stiffness: 250, damping: 28 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      if (!enabledRef.current) {
        enabledRef.current = true;
        setEnabled(true);
        document.body.classList.add("cursor-hidden");
      }
    };
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setHovering(
        Boolean(
          target.closest("a, button, [role='button'], input, textarea, label, [data-cursor]")
        )
      );
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      document.body.classList.remove("cursor-hidden");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        style={{ x: dotX, y: dotY, opacity: visible ? 1 : 0 }}
        className="pointer-events-none fixed left-0 top-0 z-[100] size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary"
      />
      <motion.div
        aria-hidden
        animate={{
          scale: pressed ? 0.7 : hovering ? 2 : 1,
          opacity: visible ? 1 : 0,
        }}
        style={{ x: ringX, y: ringY }}
        className="pointer-events-none fixed left-0 top-0 z-[100] size-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/60"
      />
    </>
  );
}
