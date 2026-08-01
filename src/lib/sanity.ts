import { createClient } from "next-sanity";
import type { SanityClient } from "@sanity/client";

export const isSanityConfigured = Boolean(
  process.env.SANITY_PROJECT_ID && process.env.SANITY_DATASET
);

export const client: SanityClient | null = isSanityConfigured
  ? createClient({
      projectId: process.env.SANITY_PROJECT_ID ?? "",
      dataset: process.env.SANITY_DATASET ?? "production",
      apiVersion: process.env.SANITY_API_VERSION ?? "2026-01-01",
      useCdn: true,
    })
  : null;

export const POSTS_QUERY = `
  *[_type == "post"] | order(publishedAt desc) {
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    tags,
    "thumbnail": thumbnail.asset->url,
    "readingTime": round(length(pt::text(body)) / 1200),
    author
  }
`;

export const POST_QUERY = `
  *[_type == "post" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    tags,
    "thumbnail": thumbnail.asset->url,
    "readingTime": round(length(pt::text(body)) / 1200),
    author,
    "body": body[]{
      ...,
      asset->{url}
    }
  }
`;
