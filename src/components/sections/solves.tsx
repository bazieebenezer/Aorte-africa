"use client";

import { motion } from "framer-motion";
import { Globe, PenTool, Clapperboard } from "lucide-react";
import { TiltCard } from "@/components/tilt-card";
import {
  SectionSubtitle,
  SectionTitle,
} from "@/components/sections/section-heading";
import { fadeUp, staggerContainer } from "@/lib/animations";

const SERVICES = [
  {
    icon: Globe,
    title: "Développement de plateforme web",
    text: "De la conception d'interfaces vitrines à l'architecture de solutions complexes, nous bâtissons des outils numériques fluides, rapides et sécurisés.",
  },
  {
    icon: PenTool,
    title: "Conception d'affiches publicitaires",
    text: "Maximisez votre impact visuel avec des créations graphiques qui captent l'attention et ancrent votre identité.",
  },
  {
    icon: Clapperboard,
    title: "Montage et édition vidéo",
    text: "Transformez vos tournages en récits captivants grâce à un montage maîtrisé, un sound design soigné et un étalonnage professionnel.",
  },
];

export function Solves() {
  return (
    <section id="solves" className="flex flex-col items-center px-4 py-[clamp(36px,8vw,72px)] sm:px-6 lg:px-8">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <SectionTitle>Forgez votre infrastructure</SectionTitle>
      </motion.div>
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <SectionSubtitle>
          Aorte Systems ne livre pas seulement du service, elle développe
          l&apos;armature logique de votre succès.
        </SectionSubtitle>
      </motion.div>

      <motion.div
        variants={staggerContainer()}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="mt-[clamp(40px,8vw,67px)] grid w-full max-w-[1100px] grid-cols-1 gap-4 md:grid-cols-3 md:gap-6"
      >
        {SERVICES.map((service) => (
          <motion.div key={service.title} variants={fadeUp} className="min-w-0">
            <TiltCard className="h-full rounded-xl bg-gradient-to-br from-secondary to-background p-6">
              <service.icon className="mb-4 size-8 text-primary" />
              <h3 className="text-silver mb-4 text-2xl font-semibold leading-snug">
                {service.title}
              </h3>
              <p className="leading-relaxed text-muted-foreground">
                {service.text}
              </p>
            </TiltCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
