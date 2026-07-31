"use client";

import { motion } from "framer-motion";
import { TiltCard } from "@/components/tilt-card";
import {
  SectionTag,
  SectionTitle,
} from "@/components/sections/section-heading";
import { fadeUp, staggerContainer } from "@/lib/animations";

const BOXES = [
  {
    title: "FONDATION",
    subtitle: "L'architecture d'un empire",
    text: (
      <>
        <strong className="font-medium text-primary">Aorte</strong> est né d&apos;une
        discipline rigoureuse et d&apos;une vision claire : devenir l&apos;artère du
        numérique en Afrique de l&apos;Ouest. Nous construisons une structure fondée sur
        la complémentarité et la résilience.
      </>
    ),
  },
  {
    title: "FLUX VITAL",
    subtitle: "Une synergie indestructible",
    text: (
      <>
        Au sein d&apos;<strong className="font-medium text-primary">Aorte</strong>, la
        connaissance irrigue l&apos;ingénierie, et l&apos;ingénierie forge les outils. Notre
        écosystème intégré élimine les frictions technologiques pour injecter une
        performance brute dans chaque strate de votre organisation.
      </>
    ),
  },
  {
    title: "PHILOSOPHIE",
    subtitle: "La valeur comme seul horizon",
    text: (
      <>
        Pour <strong className="font-medium text-primary">Aorte</strong>, l&apos;innovation
        n&apos;est pas une option, c&apos;est un engagement existentiel. Nous ne cherchons pas
        seulement à répondre à vos besoins ; nous construisons le futur numérique avec
        une efficacité maximale et une pression contagieuse.
      </>
    ),
  },
  {
    title: "EXPANSION",
    subtitle: "L'horizon de la domination",
    text: (
      <>
        L&apos;ambition d&apos;<strong className="font-medium text-primary">Aorte</strong>{" "}
        dépasse les frontières. Nous ne nous contentons pas d&apos;exister : nous développons
        notre modèle pour répondre aux besoins du marché.
      </>
    ),
  },
];

export function Presentation() {
  return (
    <section id="presentation" className="flex min-h-screen flex-col items-center px-4 py-[clamp(36px,8vw,72px)] sm:px-6 lg:px-8">
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
        className="mt-6"
      >
        <SectionTitle>
          Le coeur battant de votre{" "}
          <span className="text-muted-foreground">écosystème numérique.</span>
        </SectionTitle>
      </motion.div>

      <motion.div
        variants={staggerContainer()}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="mt-[clamp(40px,8vw,76px)] grid w-full max-w-[1000px] grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:gap-8"
      >
        {BOXES.map((box) => (
          <motion.div key={box.title} variants={fadeUp} className="min-w-0">
            <TiltCard className="h-full">
              <div className="mb-3 border-l-4 border-primary bg-gradient-to-r from-primary/5 to-transparent px-3 py-2">
                <h3 className="text-silver text-sm font-semibold tracking-wide">
                  {box.title}
                </h3>
                <h4 className="text-sm text-muted-foreground">{box.subtitle}</h4>
              </div>
              <p className="leading-relaxed text-muted-foreground">{box.text}</p>
            </TiltCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
