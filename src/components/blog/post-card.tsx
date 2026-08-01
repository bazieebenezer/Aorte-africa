import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock3, UserRound } from "lucide-react";
import type { Post } from "@/lib/blog-data";
import { formatDate } from "@/lib/blog-data";
import { cn } from "@/lib/utils";

export function PostCard({ post, featured = false }: { post: Post; featured?: boolean }) {
  return (
    <article
      className={cn(
        "group overflow-hidden rounded-2xl border border-border bg-card transition-colors duration-200 hover:border-border-hover",
        featured && "md:grid md:grid-cols-2"
      )}
    >
      <Link href={`/blog/${post.slug}`} className="flex h-full flex-col">
        <div
          className={cn(
            "relative aspect-video shrink-0 overflow-hidden bg-secondary/60",
            featured && "md:aspect-auto md:min-h-full"
          )}
        >
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>

        <div className={cn("flex flex-1 flex-col gap-3 p-6", featured && "md:justify-center md:p-8")}>
          <div className="flex items-center gap-2">
            {featured && (
              <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-0.5 text-xs font-medium text-primary">
                À la une
              </span>
            )}
            <span className="rounded-full border border-border bg-secondary px-3 py-0.5 text-xs font-medium text-foreground">
              {post.tags[0]}
            </span>
          </div>

          <h3 className="text-silver fs-card-title font-semibold leading-snug">
            {post.title}
          </h3>
          <p className="line-clamp-2 leading-relaxed text-muted-foreground">
            {post.excerpt}
          </p>

          <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <UserRound className="size-3.5" />
              {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <CalendarDays className="size-3.5" />
              {formatDate(post.publishedAt)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock3 className="size-3.5" />
              {post.readingTime} min
            </span>
            <ArrowRight className="ml-auto size-4 text-muted-foreground transition-all duration-200 group-hover:translate-x-1 group-hover:text-primary" />
          </div>
        </div>
      </Link>
    </article>
  );
}
