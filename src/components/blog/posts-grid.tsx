"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PostCard } from "@/components/blog/post-card";
import { Stagger, staggerChild } from "@/components/motion/stagger";
import { motion } from "framer-motion";
import type { Post } from "@/lib/blog-data";
import { cn } from "@/lib/utils";

const PER_PAGE = 3;

export function PostsGrid({ posts }: { posts: Post[] }) {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(posts.length / PER_PAGE));
  const start = (page - 1) * PER_PAGE;
  const visible = posts.slice(start, start + PER_PAGE);

  return (
    <>
      <Stagger className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {visible.map((post, i) => (
          <motion.div
            key={post.slug}
            variants={staggerChild}
            className={cn("min-w-0", i === 0 && page === 1 && "md:col-span-2")}
          >
            <PostCard post={post} featured={i === 0 && page === 1} />
          </motion.div>
        ))}
      </Stagger>

      {totalPages > 1 && (
        <nav className="mt-14 flex items-center justify-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            aria-label="Page précédente"
            className="flex size-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-border-hover hover:text-foreground disabled:cursor-not-allowed disabled:opacity-25"
          >
            <ChevronLeft className="size-4" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => setPage(n)}
              className={cn(
                "flex h-9 min-w-9 items-center justify-center rounded-md border px-2 text-sm font-medium transition-colors",
                n === page
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
              )}
            >
              {n}
            </button>
          ))}

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            aria-label="Page suivante"
            className="flex size-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-border-hover hover:text-foreground disabled:cursor-not-allowed disabled:opacity-25"
          >
            <ChevronRight className="size-4" />
          </button>
        </nav>
      )}
    </>
  );
}
