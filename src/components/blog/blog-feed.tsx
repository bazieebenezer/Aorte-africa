"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import { PostCard } from "@/components/blog/post-card";
import { Reveal } from "@/components/motion/reveal";
import type { Post } from "@/lib/blog-data";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  "Tous",
  "IA",
  "Web",
  "React",
  "Next.js",
  "Backend",
  "Cloud",
  "Mobile",
  "DevOps",
  "Carrière",
];

const PAGE_SIZE = 6;

function getPageNumbers(current: number, total: number): (number | "…")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const pages: (number | "…")[] = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  if (start > 2) pages.push("…");
  for (let i = start; i <= end; i++) pages.push(i);
  if (end < total - 1) pages.push("…");
  pages.push(total);
  return pages;
}

export function BlogFeed({ posts }: { posts: Post[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Tous");
  const [page, setPage] = useState(1);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isMac] = useState(
    () => typeof navigator !== "undefined" && /Mac|iPhone|iPad/i.test(navigator.platform)
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    setPage(1);
  }, [query, category]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((post) => {
      const matchCategory = category === "Tous" || post.tags.includes(category);
      if (!matchCategory) return false;
      if (!q) return true;
      return (
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [posts, query, category]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const visible = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );
  const pageNumbers = getPageNumbers(currentPage, totalPages);

  return (
    <>
      <header className="relative overflow-hidden pt-40 pb-14 text-center sm:pt-48">
        <div
          aria-hidden
          className="theme-grid absolute inset-0 z-0"
          style={{
            backgroundImage: "url(/img/grid.svg)",
            backgroundSize: "contain",
            backgroundRepeat: "repeat",
            WebkitMaskImage:
              "radial-gradient(ellipse 140% 120% at 50% 0%, #000 0%, #000 20%, transparent 88%)",
            maskImage:
              "radial-gradient(ellipse 140% 120% at 50% 0%, #000 0%, #000 20%, transparent 88%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-2xl px-4 sm:px-6">
          <Reveal direction="up">
            <h1 className="text-silver fs-display font-semibold tracking-tight">
              Chaque étape compte
            </h1>
          </Reveal>
          <Reveal direction="up" delay={0.08}>
            <p className="fs-body-lg mt-5 leading-relaxed text-muted-foreground">
              Découvrez des articles sur l&apos;intelligence artificielle, le développement
              logiciel et les technologies modernes.
            </p>
          </Reveal>

          <Reveal direction="up" delay={0.16} className="mt-10">
            <div className="relative mx-auto w-full max-w-xl">
              <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher un article..."
                aria-label="Rechercher un article"
                className="h-[52px] w-full rounded-xl border border-border bg-card/70 pr-14 pl-11 text-sm text-foreground outline-none backdrop-blur transition-colors duration-200 placeholder:text-muted-foreground focus:border-primary/40 focus:bg-card"
              />
              {query ? (
                <button
                  onClick={() => setQuery("")}
                  aria-label="Effacer la recherche"
                  className="absolute top-1/2 right-3 flex size-6 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground"
                >
                  <X className="size-4" />
                </button>
              ) : (
                <kbd className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 rounded-md border border-border bg-muted/60 px-1.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                  {isMac ? "⌘K" : "Ctrl K"}
                </kbd>
              )}
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.24} className="mt-6">
            <div className="flex flex-wrap items-center justify-center gap-2">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={cn(
                    "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors duration-200",
                    c === category
                      ? "border-foreground bg-foreground text-background"
                      : "border-border text-muted-foreground hover:border-border-hover hover:text-foreground"
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </header>

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        {filtered.length > 0 && (
          <>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((post, i) => (
                <Reveal
                  key={post.slug}
                  direction="up"
                  delay={Math.min(0.1 + i * 0.06, 0.3)}
                >
                  <PostCard post={post} />
                </Reveal>
              ))}
            </div>

            {totalPages > 1 && (
              <nav
                aria-label="Pagination des articles"
                className="mt-12 flex flex-wrap items-center justify-center gap-2"
              >
                <button
                  onClick={() => setPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  aria-label="Page précédente"
                  className="flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:border-border-hover hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
                >
                  <ChevronLeft className="size-4" />
                  Précédent
                </button>

                {pageNumbers.map((p, i) =>
                  p === "…" ? (
                    <span
                      key={`ellipsis-${i}`}
                      className="px-1 text-sm text-muted-foreground"
                    >
                      …
                    </span>
                  ) : (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      aria-current={p === currentPage ? "page" : undefined}
                      className={cn(
                        "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors duration-200",
                        p === currentPage
                          ? "border-foreground bg-foreground text-background"
                          : "border-border text-muted-foreground hover:border-border-hover hover:text-foreground"
                      )}
                    >
                      {p}
                    </button>
                  )
                )}

                <button
                  onClick={() => setPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  aria-label="Page suivante"
                  className="flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:border-border-hover hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
                >
                  Suivant
                  <ChevronRight className="size-4" />
                </button>
              </nav>
            )}
          </>
        )}

        {filtered.length === 0 && (
          <div className="mt-20 text-center">
            <p className="text-muted-foreground">
              Aucun article ne correspond à votre recherche.
            </p>
            <button
              onClick={() => {
                setQuery("");
                setCategory("Tous");
              }}
              className="mt-4 text-sm font-medium text-primary transition-colors hover:underline"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </div>
    </>
  );
}
