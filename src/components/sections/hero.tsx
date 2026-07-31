"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/magnetic";

const TITLE_WORDS = ["Graduatim,", "Potens."];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const gridY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const glowScale = useTransform(scrollYProgress, [0, 1], [1, 1.6]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-screen flex-col overflow-hidden"
    >
      <motion.div
        aria-hidden
        style={{ y: gridY, backgroundImage: "url(/img/grid.svg)", backgroundSize: "contain", backgroundRepeat: "repeat" }}
        className="absolute inset-0 z-0"
      />
      <motion.div
        aria-hidden
        style={{ scale: glowScale }}
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 size-[clamp(300px,50vw,700px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[clamp(120px,20vw,300px)]"
      />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 pb-16 pt-32"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "backOut" }}
          className="mb-10 flex items-center gap-2 rounded-full border border-accent/40 bg-accent/5 px-4 py-1.5 text-xs text-accent sm:mb-16"
        >
          <BadgeCheck className="size-4" />
          <span>BATI SUR LA PASSION</span>
        </motion.div>

        <h1 className="fs-hero flex flex-col items-center gap-1 text-center font-semibold leading-[1.05] sm:gap-2">
          {TITLE_WORDS.map((word, i) => (
            <span key={word} className="flex overflow-hidden pb-1">
              <motion.span
                initial={{ y: "110%", rotateX: 45, opacity: 0 }}
                animate={{ y: 0, rotateX: 0, opacity: 1 }}
                transition={{
                  duration: 1.1,
                  delay: 0.35 + i * 0.18,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="text-silver"
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.85, ease: "backOut" }}
          className="fs-body-lg mb-6 mt-6 max-w-[600px] text-center leading-relaxed text-muted-foreground"
        >
          Nous ne créons pas seulement des outils, nous forgeons l&apos;infrastructure
          numérique d&apos;une nouvelle génération.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1, ease: "backOut" }}
        >
          <Magnetic>
            <Button asChild size="lg" className="font-semibold">
              <a href="#presentation">Découvrir l&apos;empire</a>
            </Button>
          </Magnetic>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-[clamp(40px,8vw,86px)] h-[clamp(80px,15vw,160px)] w-px bg-gradient-to-b from-transparent via-foreground/45 to-transparent"
        />
      </motion.div>
    </section>
  );
}
