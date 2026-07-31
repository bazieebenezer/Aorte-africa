import { Hero } from "@/components/sections/hero";
import { Presentation } from "@/components/sections/presentation";
import { Learn } from "@/components/sections/learn";
import { Solves } from "@/components/sections/solves";
import { Market } from "@/components/sections/market";
import { Dream } from "@/components/sections/dream";

export default function Home() {
  return (
    <>
      <Hero />
      <Presentation />
      <Learn />
      <Solves />
      <Market />
      <Dream />
    </>
  );
}
