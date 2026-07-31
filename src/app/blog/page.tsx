import type { Metadata } from "next";
import { client, isSanityConfigured, POSTS_QUERY } from "@/lib/sanity";
import { samplePosts, type Post } from "@/lib/blog-data";
import { PostsGrid } from "@/components/blog/posts-grid";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Exploration, innovation et vision : le journal d'Aorte.",
};

export const revalidate = 3600;

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

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="mx-auto w-full max-w-[1140px] flex-1 px-4 pb-24 sm:px-6">
      <header className="pt-40 pb-16 text-center sm:pt-48">
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[2.5px] text-primary">
          Blog
        </span>
        <h1 className="text-silver text-[clamp(2.8rem,5vw,4rem)] font-bold tracking-tight">
          Le Journal
        </h1>
        <p className="mx-auto mt-5 max-w-[480px] text-lg leading-relaxed text-muted-foreground">
          Exploration, innovation et vision.
        </p>
      </header>

      <PostsGrid posts={posts} />
    </div>
  );
}
