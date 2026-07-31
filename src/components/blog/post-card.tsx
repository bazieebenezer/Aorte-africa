import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Post } from "@/lib/blog-data";
import { formatDate } from "@/lib/blog-data";
import { cn } from "@/lib/utils";

export function PostCard({ post, featured = false }: { post: Post; featured?: boolean }) {
  return (
    <article className="group overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-border-hover">
      <Link
        href={`/blog/${post.slug}`}
        className={cn("flex h-full flex-col", featured && "md:flex-row")}
      >
        <div
          className={cn(
            "relative shrink-0 border-border bg-muted",
            featured
              ? "min-h-[220px] w-full md:min-h-[380px] md:w-[55%] md:border-r"
              : "h-[200px] w-full border-b"
          )}
        >
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div
          className={cn(
            "flex flex-1 flex-col",
            featured ? "justify-center gap-4 p-6 md:p-8" : "gap-3 p-5"
          )}
        >
          <div className="flex items-center gap-3">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground"
              >
                {tag}
              </span>
            ))}
            <time className="text-xs text-muted-foreground">
              {formatDate(post.publishedAt)}
            </time>
          </div>

          <h3 className="text-silver fs-card-title font-semibold leading-snug">
            {post.title}
          </h3>
          <p className="leading-relaxed text-muted-foreground">{post.excerpt}</p>

          <span className="mt-auto flex items-center gap-1.5 pt-4 text-sm font-medium text-muted-foreground transition-colors group-hover:text-primary">
            Lire l&apos;article
            <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </article>
  );
}
