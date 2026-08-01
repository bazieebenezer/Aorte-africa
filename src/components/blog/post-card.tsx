import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock3, UserRound } from "lucide-react";
import type { Post } from "@/lib/blog-data";
import { formatDate } from "@/lib/blog-data";
import { TiltCard } from "@/components/tilt-card";

export function PostCard({ post }: { post: Post }) {
  return (
    <TiltCard className="group h-[460px] rounded-2xl border border-border bg-card transition-colors duration-200 hover:border-border-hover">
      <article className="h-full overflow-hidden rounded-2xl">
      <Link href={`/blog/${post.slug}`} className="flex h-full flex-col">
        <div className="relative h-48 shrink-0 overflow-hidden bg-secondary/60">
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>

        <div className="flex flex-1 flex-col gap-3 p-6">
          <div className="flex items-center gap-2">
            <span className="rounded-full border border-border bg-secondary px-3 py-0.5 text-xs font-medium text-foreground">
              {post.tags[0]}
            </span>
          </div>

          <h3 className="text-silver fs-card-title font-semibold leading-snug line-clamp-2">
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
    </TiltCard>
  );
}
