"use client";

import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, staggerChild } from "@/components/motion/stagger";
import { motion } from "framer-motion";
import { TiltCard } from "@/components/tilt-card";
import {
  SectionSubtitle,
  SectionTitle,
} from "@/components/sections/section-heading";

const CARDS = [
  {
    tag: "BUREAUTIQUE",
    title: "Dominez vos outils, pas l'inverse.",
    text: "De l'initiation à l'informatique jusqu'aux tableaux croisés dynamiques. Tout ce qu'il faut pour bâtir des fondations solides.",
    image: "/img/Office.jpg",
  },
  {
    tag: "MONTAGE VIDEO",
    title: "Maîtrisez l'impact visuel et l'émotion.",
    text: "Dominez DaVinci Resolve pour transformer vos rushs en récits cinématographiques. De l'étalonnage des couleurs au mixage sonore dynamique.",
    image: "/img/Timeline.jpg",
  },
];

export function Learn() {
  return (
    <section id="learn" className="flex min-h-screen flex-col items-center px-4 py-[clamp(36px,8vw,72px)] sm:px-6 lg:px-8">
      <Reveal direction="up">
        <SectionTitle>Forgez votre maîtrise</SectionTitle>
      </Reveal>
      <Reveal direction="up" delay={0.1}>
        <SectionSubtitle>
          Aorte Learn n&apos;enseigne pas seulement la tech, elle transmet l&apos;art de bâtir.
        </SectionSubtitle>
      </Reveal>

      <Stagger
        stagger={0.15}
        className="mt-[clamp(24px,5vw,38px)] grid w-full max-w-[1000px] grid-cols-1 gap-6 md:grid-cols-2"
      >
        {CARDS.map((card) => (
          <motion.div key={card.tag} variants={staggerChild} className="min-w-0">
            <TiltCard className="group flex h-full flex-col rounded-xl border border-border bg-card p-4 pb-6 transition-colors duration-300 hover:border-border-hover">
              <div className="mb-4 flex h-[200px] w-full items-center justify-center overflow-hidden rounded-lg bg-gradient-to-b from-secondary/40 to-transparent">
                <Image
                  src={card.image}
                  alt={card.tag}
                  width={735}
                  height={490}
                  className="max-h-full w-auto object-contain transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <span className="mb-2 text-sm font-medium text-primary">
                {card.tag}
              </span>
              <h3 className="text-silver fs-card-title mb-3 font-semibold leading-snug">
                {card.title}
              </h3>
              <p className="flex-1 leading-relaxed text-muted-foreground">
                {card.text}
              </p>
            </TiltCard>
          </motion.div>
        ))}
      </Stagger>

      <Reveal direction="up" delay={0.15} className="mt-6 w-full max-w-[1000px]">
        <TiltCard className="rounded-xl border border-border bg-card p-6">
          <div className="flex flex-col items-center gap-6 lg:flex-row lg:gap-8">
            <div className="flex-1 text-center lg:text-left">
              <span className="mb-2 block text-sm font-medium text-primary">
                DESIGN GRAPHIQUE
              </span>
              <h3 className="text-silver fs-card-title mb-3 font-semibold leading-snug">
                Donnez vie à l&apos;image : de l&apos;intention à la création.
              </h3>
              <p className="leading-relaxed text-muted-foreground">
                Apprenez à structurer vos idées pour qu&apos;elles                 captent l&apos;œil. Nous
                explorons l&apos;équilibre des formes et la force des couleurs.
              </p>
              <span className="mt-4 inline-block rounded-full border border-border bg-secondary px-4 py-1.5 text-xs text-muted-foreground">
                L&apos;ESTHÉTIQUE AU SERVICE DE L&apos;IMPACT.
              </span>
            </div>
            <div className="relative flex w-full max-w-[420px] flex-1 items-center justify-center">
              <Image
                src="/img/Graphic.jpg"
                alt="Design graphique"
                width={736}
                height={920}
                className="h-auto w-full object-contain"
              />
            </div>
          </div>
        </TiltCard>
      </Reveal>
    </section>
  );
}
