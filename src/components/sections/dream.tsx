"use client";

import { Reveal } from "@/components/motion/reveal";
import { Stagger, staggerChild } from "@/components/motion/stagger";
import { motion } from "framer-motion";
import { GraduationCap, ShieldCheck, Rocket } from "lucide-react";
import { TiltCard } from "@/components/tilt-card";
import {
  SectionSubtitle,
  SectionTag,
  SectionTitle,
} from "@/components/sections/section-heading";

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
      <Reveal direction="down">
        <SectionTag>La vision</SectionTag>
      </Reveal>

      <Reveal direction="up" delay={0.1} className="mt-4">
        <SectionTitle className="fs-display">
          Bâtir l&apos;héritage <br />
          numérique
        </SectionTitle>
      </Reveal>
      <Reveal direction="up" delay={0.2}>
        <SectionSubtitle>
          Aorte n&apos;est pas qu&apos;une agence, c&apos;est un écosystème où l&apos;apprentissage
          rencontre l&apos;ingénierie pour transformer chaque vision en une infrastructure
          indestructible.
        </SectionSubtitle>
      </Reveal>

      <div className="relative mt-[clamp(40px,8vw,72px)] w-full max-w-[1000px]">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 z-0 size-[clamp(300px,60vw,700px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 opacity-20 blur-[clamp(150px,20vw,300px)]"
        />

        <Stagger
          stagger={0.15}
          className="relative z-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 sm:gap-6"
        >
          {VALUES.map((value) => (
            <motion.div key={value.title} variants={staggerChild} className="min-w-0">
              <TiltCard className="group flex h-full flex-col rounded-xl border border-border bg-card p-4 pb-6 transition-colors duration-300 hover:border-border-hover">
                <div className="mb-4 flex h-[200px] w-full items-center justify-center overflow-hidden rounded-lg bg-gradient-to-b from-secondary/40 to-transparent">
                  <value.icon className="size-16 text-foreground transition-transform duration-500 group-hover:scale-110 group-hover:text-primary" />
                </div>
                <span className="mb-2 text-sm font-medium text-primary">
                  {value.title}
                </span>
                <p className="flex-1 leading-relaxed text-muted-foreground">
                  {value.text}
                </p>
              </TiltCard>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
