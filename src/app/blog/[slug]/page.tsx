import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock3 } from "lucide-react";
import { client, isSanityConfigured, POST_QUERY } from "@/lib/sanity";
import { samplePosts, formatDate, type Post } from "@/lib/blog-data";
import { ArticleBody } from "@/components/blog/article-body";

export const revalidate = 3600;

type Props = {
  params: Promise<{ slug: string }>;
};

async function getPost(slug: string): Promise<Post | null> {
  if (isSanityConfigured && client) {
    try {
      return await client.fetch<Post | null>(POST_QUERY, { slug });
    } catch (error) {
      console.error("Échec du fetch Sanity, repli sur les données locales :", error);
    }
  }
  return samplePosts.find((post) => post.slug === slug) ?? null;
}

export async function generateStaticParams() {
  if (isSanityConfigured) return [];
  return samplePosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Article introuvable" };
  return { title: post.title, description: post.excerpt };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  return (
    <article className="mx-auto w-full max-w-[720px] flex-1 px-4 pb-24 sm:px-6">
      <Link
        href="/blog"
        className="mb-12 mt-32 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-all hover:gap-3 hover:text-foreground sm:mt-40"
      >
        <ArrowLeft className="size-4" />
        Retour au journal
      </Link>

      <header className="mb-12">
        <div className="mb-5 flex flex-wrap items-center gap-3">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
            >
              {tag}
            </span>
          ))}
          <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <CalendarDays className="size-3.5" />
            {formatDate(post.publishedAt)}
          </span>
          <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Clock3 className="size-3.5" />
            {post.readingTime} min de lecture
          </span>
        </div>
        <h1 className="fs-article-title font-bold leading-tight tracking-tight">
          {post.title}
        </h1>
      </header>

      <div className="mb-12 overflow-hidden rounded-xl border border-border">
        <Image
          src={post.thumbnail}
          alt={post.title}
          width={1440}
          height={720}
          className="h-auto w-full object-contain"
          priority
        />
      </div>

      <ArticleBody body={post.body} />

      <footer className="mt-16 border-t border-border pt-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-all hover:gap-3 hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Retour au journal
        </Link>
      </footer>
    </article>
  );
}
