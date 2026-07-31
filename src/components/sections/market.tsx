"use client";

import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import {
  SectionSubtitle,
  SectionTitle,
  SectionTag,
} from "@/components/sections/section-heading";

export function Market() {
  return (
    <section id="market" className="flex flex-col items-center px-4 py-[clamp(36px,8vw,72px)] sm:px-6 lg:px-8">
      <Reveal direction="left">
        <SectionTitle>Redéfinissez votre équipement</SectionTitle>
      </Reveal>
      <Reveal direction="right" delay={0.1}>
        <SectionSubtitle>
          Aorte Eco-Store ne vend pas de l&apos;occasion, elle redonne vie à la haute
          technologie pour bâtir un futur numérique plus responsable.
        </SectionSubtitle>
      </Reveal>

      <Reveal
        direction="scale"
        delay={0.15}
        className="mt-[clamp(40px,8vw,67px)] w-full max-w-[1000px]"
      >
        <div className="grid grid-cols-1 overflow-hidden rounded-xl border border-border bg-card transition-colors duration-300 hover:border-border-hover md:grid-cols-2">
          <div className="flex flex-col justify-center p-[clamp(24px,5vw,48px)]">
            <SectionTag>CYCLE DURABLE</SectionTag>
            <h3 className="text-silver fs-card-title mt-4 font-semibold leading-snug">
              Adoptez l&apos;excellence reconditionnée.
            </h3>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Réduisez votre empreinte carbone en prolongeant la vie de machines
              puissantes et fiables conçues pour durer dans le temps et garantir des
              performances optimales.
            </p>
          </div>
          <div className="relative min-h-[300px] overflow-hidden">
            <Image
              src="/img/Rectangle.png"
              alt="Ordinateur reconditionné"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
