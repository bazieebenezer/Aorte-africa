import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import Image from "next/image";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-6 text-base leading-8 text-muted-foreground">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-10 mb-5 text-[clamp(1.35rem,2.5vw,1.6rem)] font-semibold tracking-tight text-foreground">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 mb-4 text-[clamp(1.1rem,2vw,1.25rem)] font-semibold tracking-tight text-foreground">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-10 rounded-r-lg border-l-[3px] border-primary bg-card py-5 pl-6 pr-6 text-lg italic leading-relaxed text-foreground">
        {children}
      </blockquote>
    ),
  },
  types: {
    image: ({ value }) => (
      <div className="my-8 overflow-hidden rounded-xl border border-border">
        <Image
          src={value.asset?.url ?? ""}
          alt={value.alt ?? ""}
          width={1600}
          height={900}
          className="h-auto w-full object-cover"
        />
      </div>
    ),
  },
};

export function ArticleBody({ body }: { body: PortableTextBlock[] }) {
  return <PortableText value={body} components={components} />;
}
