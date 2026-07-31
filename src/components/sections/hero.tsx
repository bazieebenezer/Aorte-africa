"use client";

import { motion } from "framer-motion";
import { BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/magnetic";

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col overflow-hidden"
      style={{
        backgroundImage: "url(/img/grid.svg)",
        backgroundSize: "contain",
        backgroundRepeat: "repeat",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 size-[clamp(300px,50vw,700px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[clamp(120px,20vw,300px)]"
      />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 pb-16 pt-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "backOut" }}
          className="mb-10 flex items-center gap-2 rounded-full border border-accent/40 bg-accent/5 px-4 py-1.5 text-xs text-accent sm:mb-16"
        >
          <BadgeCheck className="size-4" />
          <span>BATI SUR LA PASSION</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: "backOut" }}
          className="text-silver text-center text-[clamp(2.5rem,6vw,4rem)] font-semibold"
        >
          Graduatim, Potens.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "backOut" }}
          className="mb-6 mt-6 max-w-[600px] text-center leading-relaxed text-muted-foreground"
        >
          Nous ne créons pas seulement des outils, nous forgeons l&apos;infrastructure
          numérique d&apos;une nouvelle génération.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.65, ease: "backOut" }}
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
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-[clamp(40px,8vw,86px)] h-[clamp(80px,15vw,160px)] w-px bg-gradient-to-b from-transparent via-foreground/45 to-transparent"
        />
      </div>
    </section>
  );
}
