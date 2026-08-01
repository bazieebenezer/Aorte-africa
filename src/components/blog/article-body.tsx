import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import Image from "next/image";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="fs-body mb-6 leading-8 text-muted-foreground">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="fs-title mt-10 mb-5 font-semibold tracking-tight text-foreground">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 mb-4 text-[clamp(1.05rem,1.5vw,1.25rem)] font-semibold tracking-tight text-foreground">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="relative my-10 border-l border-border pl-6 text-foreground">
        <span
          aria-hidden
          className="absolute -top-7 -left-1 font-serif text-6xl leading-none text-primary/25"
        >
          «
        </span>
        <p className="fs-body-lg font-medium leading-relaxed">{children}</p>
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
