/**
 * Script de seed : importe les articles d'exemple dans Sanity.
 *
 * Usage :
 *  1. Configurez SANITY_PROJECT_ID, SANITY_DATASET et SANITY_API_TOKEN
 *     (token avec permission "editor" ou "writer") dans .env.local
 *  2. Lancez : npm run seed
 */
import "dotenv/config";
import { createClient } from "@sanity/client";
import { samplePosts } from "../src/lib/blog-data";

if (!process.env.SANITY_PROJECT_ID || !process.env.SANITY_API_TOKEN) {
  console.error(
    "Erreur : SANITY_PROJECT_ID et SANITY_API_TOKEN doivent être définis dans .env.local"
  );
  process.exit(1);
}

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET ?? "production",
  apiVersion: "2026-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

async function seed() {
  let created = 0;
  let skipped = 0;

  for (const post of samplePosts) {
    const existing = await client.fetch(
      `*[_type == "post" && slug.current == $slug][0]._id`,
      { slug: post.slug }
    );

    if (existing) {
      console.log(`- Déjà présent, ignoré : ${post.title}`);
      skipped++;
      continue;
    }

    await client.create({
      _type: "post",
      title: post.title,
      slug: { _type: "slug", current: post.slug },
      publishedAt: post.publishedAt,
      excerpt: post.excerpt,
      tags: post.tags,
      body: post.body,
    });
    console.log(`+ Créé : ${post.title}`);
    created++;
  }

  console.log(`\nTerminé : ${created} créé(s), ${skipped} ignoré(s).`);
  console.log(
    "Pensez à définir l'image de couverture (thumbnail) de chaque article depuis le studio."
  );
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
