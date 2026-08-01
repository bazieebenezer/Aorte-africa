import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, ChevronLeft, ChevronRight, Clock3, UserRound } from "lucide-react";
import { client, isSanityConfigured, POST_QUERY, POSTS_QUERY } from "@/lib/sanity";
import { samplePosts, formatDate, type Post } from "@/lib/blog-data";
import { ArticleBody } from "@/components/blog/article-body";
import { ShareButton } from "@/components/blog/share-button";

export const revalidate = 3600;

type Props = {
  params: Promise<{ slug: string }>;
};

async function getPosts(): Promise<Post[]> {
  if (isSanityConfigured && client) {
    try {
      return await client.fetch<Post[]>(POSTS_QUERY);
    } catch (error) {
      console.error("Échec du fetch Sanity, repli sur les données locales :", error);
    }
  }
  return samplePosts;
}

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
  const [post, allPosts] = await Promise.all([getPost(slug), getPosts()]);

  if (!post) notFound();

  const index = allPosts.findIndex((p) => p.slug === slug);
  const prev = index > 0 ? allPosts[index - 1] : null;
  const next = index >= 0 && index < allPosts.length - 1 ? allPosts[index + 1] : null;

  return (
    <article className="mx-auto w-full max-w-[720px] flex-1 px-4 pb-24 sm:px-6">
      <nav aria-label="Fil d'ariane" className="mt-32 sm:mt-40">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
          <li>
            <Link
              href="/"
              className="transition-colors duration-200 hover:text-foreground"
            >
              Accueil
            </Link>
          </li>
          <li aria-hidden="true" className="flex items-center">
            <ChevronRight className="size-3.5" />
          </li>
          <li>
            <Link
              href="/blog"
              className="transition-colors duration-200 hover:text-foreground"
            >
              Blog
            </Link>
          </li>
          <li aria-hidden="true" className="flex items-center">
            <ChevronRight className="size-3.5" />
          </li>
          <li className="line-clamp-1 max-w-[280px] font-medium text-foreground sm:max-w-xs">
            {post.title}
          </li>
        </ol>
      </nav>

      <Link
        href="/blog"
        className="group mb-12 mt-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-all duration-200 hover:gap-3 hover:text-foreground"
      >
        <ChevronLeft className="size-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
        Retour au blog
      </Link>

      <header className="mb-10">
        <div className="mb-4 flex items-center gap-3">
          <span className="rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-foreground">
            {post.tags[0]}
          </span>
        </div>
        <h1 className="fs-article-title font-semibold leading-tight tracking-tight">
          {post.title}
        </h1>
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            <UserRound className="size-4" />
            {post.author}
          </span>
          <span className="flex items-center gap-2">
            <CalendarDays className="size-4" />
            {formatDate(post.publishedAt)}
          </span>
          <span className="flex items-center gap-2">
            <Clock3 className="size-4" />
            {post.readingTime} min de lecture
          </span>
          <ShareButton />
        </div>
      </header>

      <div className="mb-12 overflow-hidden rounded-2xl border border-border bg-secondary/60">
        <Image
          src={post.thumbnail}
          alt={post.title}
          width={1440}
          height={810}
          priority
          className="aspect-video w-full object-cover"
        />
      </div>

      <ArticleBody body={post.body} />

      <footer className="mt-16 border-t border-border pt-8">
        <div className="grid gap-4 sm:grid-cols-2">
          {prev ? (
            <Link
              href={`/blog/${prev.slug}`}
              className="group flex flex-col gap-2 rounded-xl border border-border p-5 transition-colors duration-200 hover:border-border-hover"
            >
              <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <ChevronLeft className="size-3.5" />
                Article précédent
              </span>
              <span className="text-sm leading-snug font-medium transition-colors duration-200 group-hover:text-primary">
                {prev.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={`/blog/${next.slug}`}
              className="group flex flex-col items-end gap-2 rounded-xl border border-border p-5 text-right transition-colors duration-200 hover:border-border-hover"
            >
              <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                Article suivant
                <ChevronRight className="size-3.5" />
              </span>
              <span className="text-sm leading-snug font-medium transition-colors duration-200 group-hover:text-primary">
                {next.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </footer>
    </article>
  );
}
