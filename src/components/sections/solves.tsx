"use client";

import { Reveal } from "@/components/motion/reveal";
import { Stagger, staggerChild } from "@/components/motion/stagger";
import { motion } from "framer-motion";
import { Globe, PenTool, Clapperboard } from "lucide-react";
import { TiltCard } from "@/components/tilt-card";
import {
  SectionSubtitle,
  SectionTitle,
} from "@/components/sections/section-heading";

const SERVICES = [
  {
    icon: Globe,
    tag: "PLATEFORME WEB",
    title: "Développement de plateforme web",
    text: "De la conception d'interfaces vitrines à l'architecture de solutions complexes, nous bâtissons des outils numériques fluides, rapides et sécurisés.",
  },
  {
    icon: PenTool,
    tag: "AFFICHES PUBLICITAIRES",
    title: "Conception d'affiches publicitaires",
    text: "Maximisez votre impact visuel avec des créations graphiques qui captent l'attention et ancrent votre identité.",
  },
  {
    icon: Clapperboard,
    tag: "MONTAGE VIDÉO",
    title: "Montage et édition vidéo",
    text: "Transformez vos tournages en récits captivants grâce à un montage maîtrisé, un sound design soigné et un étalonnage professionnel.",
  },
];

export function Solves() {
  return (
    <section id="solves" className="flex flex-col items-center px-4 py-[clamp(36px,8vw,72px)] sm:px-6 lg:px-8">
      <Reveal direction="up">
        <SectionTitle>Forgez votre infrastructure</SectionTitle>
      </Reveal>
      <Reveal direction="up" delay={0.1}>
        <SectionSubtitle>
          Aorte Systems ne livre pas seulement du service, elle développe
          l&apos;armature logique de votre succès.
        </SectionSubtitle>
      </Reveal>

      <Stagger
        stagger={0.15}
        className="mt-[clamp(40px,8vw,67px)] grid w-full max-w-[1100px] grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6"
      >
        {SERVICES.map((service) => (
          <motion.div key={service.title} variants={staggerChild} className="min-w-0">
            <TiltCard className="group flex h-full flex-col rounded-xl border border-border bg-card p-4 pb-6 transition-colors duration-300 hover:border-border-hover">
              <div className="mb-4 flex h-[200px] w-full items-center justify-center overflow-hidden rounded-lg bg-gradient-to-b from-secondary/40 to-transparent">
                <service.icon className="size-16 text-foreground transition-transform duration-500 group-hover:scale-110 group-hover:text-primary" />
              </div>
              <span className="mb-2 text-sm font-medium text-primary">
                {service.tag}
              </span>
              <h3 className="text-silver fs-card-title mb-3 font-semibold leading-snug">
                {service.title}
              </h3>
              <p className="flex-1 leading-relaxed text-muted-foreground">
                {service.text}
              </p>
            </TiltCard>
          </motion.div>
        ))}
      </Stagger>
    </section>
  );
}
