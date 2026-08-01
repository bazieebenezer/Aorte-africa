import type { Metadata } from "next";
import { client, isSanityConfigured, POSTS_QUERY } from "@/lib/sanity";
import { samplePosts, type Post } from "@/lib/blog-data";
import { BlogFeed } from "@/components/blog/blog-feed";
import { Newsletter } from "@/components/blog/newsletter";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Guides pratiques sur l'intelligence artificielle, le développement logiciel et les technologies modernes.",
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
    <div className="flex-1 pb-24">
      <BlogFeed posts={posts} />
      <Newsletter />
    </div>
  );
}
