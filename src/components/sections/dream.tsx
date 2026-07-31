"use client";

import { motion } from "framer-motion";
import { GraduationCap, ShieldCheck, Rocket } from "lucide-react";
import { TiltCard } from "@/components/tilt-card";
import {
  SectionSubtitle,
  SectionTag,
  SectionTitle,
} from "@/components/sections/section-heading";
import { fadeUp, staggerContainer } from "@/lib/animations";

const VALUES = [
  {
    icon: GraduationCap,
    title: "TRANSMISSION",
    text: "Transformer le savoir technique en pouvoir de création.",
  },
  {
    icon: ShieldCheck,
    title: "INTÉGRITÉ",
    text: "Bâtir des systèmes robustes et durables par essence.",
  },
  {
    icon: Rocket,
    title: "INNOVATION",
    text: "Repousser les frontières du possible à chaque projet.",
  },
];

export function Dream() {
  return (
    <section id="dream" className="flex flex-col items-center px-4 py-[clamp(36px,8vw,72px)] pb-[clamp(80px,15vw,200px)] sm:px-6 lg:px-8">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <SectionTag>L&apos;entité Aorte</SectionTag>
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="mt-4"
      >
        <SectionTitle className="text-[clamp(2.5rem,6vw,4rem)]">
          Bâtir l&apos;héritage <br />
          numérique
        </SectionTitle>
      </motion.div>
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <SectionSubtitle>
          Aorte n&apos;est pas qu&apos;une agence, c&apos;est un écosystème où l&apos;apprentissage
          rencontre l&apos;ingénierie pour transformer chaque vision en une infrastructure
          indestructible.
        </SectionSubtitle>
      </motion.div>

      <div className="relative mt-[clamp(40px,8vw,72px)] w-full max-w-[1000px]">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 z-0 size-[clamp(300px,60vw,700px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 opacity-20 blur-[clamp(150px,20vw,300px)]"
        />

        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative z-10 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6"
        >
          {VALUES.map((value) => (
            <motion.div key={value.title} variants={fadeUp} className="min-w-0">
              <TiltCard className="h-full rounded-xl border border-border bg-gradient-to-tr from-background/80 to-card p-6">
                <div className="mb-4 flex size-14 items-center justify-center rounded-full border border-border bg-gradient-to-b from-secondary to-background">
                  <value.icon className="size-6 text-foreground" />
                </div>
                <h3 className="text-silver mb-2 text-sm font-semibold tracking-wide">
                  {value.title}
                </h3>
                <p className="text-center leading-relaxed text-muted-foreground sm:text-left">
                  {value.text}
                </p>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
