# Aorte Website

Site vitrine d'Aorte — refactorisé en **Next.js (App Router) + Tailwind CSS v4 + shadcn/ui + framer-motion + sonner + Sanity CMS**.

## Stack

- **Next.js 16** (App Router, TypeScript, Turbopack)
- **Tailwind CSS v4** + **shadcn/ui** (design système Linear-like, zéro ombre portée)
- **framer-motion** : animations scroll, tilt 3D, effet magnétique
- **lucide-react** : icônes
- **sonner** : toasts de notification
- **Sanity** : CMS headless pour le blog

## Démarrage

```bash
npm install
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000).

## Blog & Sanity

### 1. Créer le projet Sanity

Créez un projet sur [sanity.io/manage](https://www.sanity.io/manage), puis copiez `.env.example` vers `.env.local` et renseignez :

```
SANITY_PROJECT_ID=   # identifiant du projet
SANITY_DATASET=production
SANITY_API_VERSION=2026-01-01
SANITY_API_TOKEN=    # token (Settings > API > Tokens) — nécessaire pour le seed uniquement
```

Sans configuration, le blog fonctionne en mode démo avec des articles d'exemple locaux (`src/lib/blog-data.ts`).

### 2. Importer les articles d'exemple

```bash
npm run seed
```

### 3. Éditer le contenu

Le Sanity Studio s'exécute de manière **indépendante** de l'app Next.js (allégé pour le build) :

```bash
npx sanity dev
```

Ouvrez [http://localhost:3333](http://localhost:3333). Le schéma `post` se trouve dans `sanity/schemas/post.ts`.

> Note : le studio est volontairement hors du build Next.js (le schéma et la config restent dans `sanity.config.ts` à la racine).

## Scripts

| Script | Description |
|---|---|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production |
| `npm run start` | Serveur de production |
| `npm run lint` | ESLint |
| `npm run seed` | Importe les articles d'exemple dans Sanity |

## Structure

```
src/
├── app/                  # Routes (/, /blog, /blog/[slug])
├── components/
│   ├── ui/               # Composants shadcn/ui
│   ├── sections/         # Sections de la page d'accueil
│   └── blog/             # Composants du blog
├── hooks/                # useMagnetic
└── lib/                  # utils, animations, sanity, blog-data
sanity/                   # Schémas Sanity
scripts/                  # Script de seed
```
