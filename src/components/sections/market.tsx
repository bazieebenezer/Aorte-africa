"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  SectionSubtitle,
  SectionTitle,
  SectionTag,
} from "@/components/sections/section-heading";
import { slideLeft, slideRight } from "@/lib/animations";

export function Market() {
  return (
    <section id="market" className="flex flex-col items-center px-4 py-[clamp(36px,8vw,72px)] sm:px-6 lg:px-8">
      <motion.div
        variants={slideLeft}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <SectionTitle>Redéfinissez votre équipement</SectionTitle>
      </motion.div>
      <motion.div
        variants={slideRight}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <SectionSubtitle>
          Aorte Eco-Store ne vend pas de l&apos;occasion, elle redonne vie à la haute
          technologie pour bâtir un futur numérique plus responsable.
        </SectionSubtitle>
      </motion.div>

      <motion.div
        variants={slideLeft}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="mt-[clamp(40px,8vw,67px)] grid w-full max-w-[1000px] grid-cols-1 overflow-hidden rounded-xl border border-border bg-card md:grid-cols-2"
      >
        <div className="flex flex-col justify-center p-[clamp(24px,5vw,48px)]">
          <SectionTag>CYCLE DURABLE</SectionTag>
          <h3 className="text-silver mt-4 text-2xl font-semibold leading-snug">
            Adoptez l&apos;excellence reconditionnée.
          </h3>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Réduisez votre empreinte carbone en prolongeant la vie de machines
            puissantes et fiables conçues pour durer dans le temps et garantir des
            performances optimales.
          </p>
        </div>
        <div className="relative min-h-[300px]">
          <Image
            src="/img/Rectangle.png"
            alt="Ordinateur reconditionné"
            fill
            className="object-cover"
          />
        </div>
      </motion.div>
    </section>
  );
}
