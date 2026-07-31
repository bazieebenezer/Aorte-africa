import type { PortableTextBlock } from "@portabletext/types";

export type Post = {
  title: string;
  slug: string;
  publishedAt: string;
  excerpt: string;
  tags: string[];
  thumbnail: string;
  readingTime: number;
  body: PortableTextBlock[];
};

type BlockItem = { h2?: string; h3?: string; quote?: string; text?: string };

function blocks(items: BlockItem[]): PortableTextBlock[] {
  return items.map((item, i) => {
    const style = item.h2 ? "h2" : item.h3 ? "h3" : item.quote ? "blockquote" : "normal";
    const text = item.text ?? item.h2 ?? item.h3 ?? item.quote ?? "";
    return {
      _type: "block",
      _key: `block-${i}`,
      style,
      markDefs: [],
      children: [{ _type: "span", _key: `span-${i}`, text }],
    };
  });
}

export const samplePosts: Post[] = [
  {
    title: "Comment le numérique transforme l'écosystème africain",
    slug: "numerique-ecosysteme-africain",
    publishedAt: "2026-07-24T09:00:00Z",
    excerpt:
      "Les technologies émergentes redessinent le paysage économique et social de l'Afrique de l'Ouest.",
    tags: ["Technologie"],
    thumbnail: "/img/Learn_image.svg",
    readingTime: 6,
    body: blocks([
      {
        text: "L'Afrique est à l'aube d'une révolution numérique sans précédent. Avec une population jeune, une adoption massive du mobile et des infrastructures qui se modernisent rapidement, le continent offre un terrain fertile pour l'innovation technologique.",
      },
      {
        h2: "Une adoption mobile fulgurante",
      },
      {
        text: "Le taux de pénétration du mobile en Afrique subsaharienne a dépassé les 50% en 2025, faisant du smartphone le premier — et parfois le seul — outil d'accès à internet pour des millions de personnes. Cette réalité a donné naissance à des solutions fintech, edtech et healthtech parfaitement adaptées aux besoins locaux.",
      },
      {
        h2: "La fintech au service de l'inclusion",
      },
      {
        text: "Des plateformes comme Orange Money, MTN Mobile Money et Wave ont révolutionné l'accès aux services financiers. Aujourd'hui, envoyer de l'argent, payer ses factures ou même contracter un micro-crédit se fait en quelques clics depuis un téléphone, contournant les limitations du système bancaire traditionnel.",
      },
      {
        text: "Cette transformation ne se limite pas aux paiements. Les startups africaines développent des solutions d'assurance, d'épargne et d'investissement qui ouvrent de nouvelles perspectives à des millions de personnes non bancarisées.",
      },
      {
        h2: "L'éducation à l'ère numérique",
      },
      {
        text: "La edtech africaine connaît une croissance explosive. Des plateformes comme Aorte Learn permettent aux apprenants de se former aux métiers du numérique, de la bureautique au design graphique en passant par le montage vidéo. L'enjeu est crucial : former les talents de demain pour accompagner la transformation digitale du continent.",
      },
      {
        quote:
          "Le numérique n'est pas une option pour l'Afrique — c'est le levier le plus puissant pour accélérer son développement et affirmer sa souveraineté technologique.",
      },
      {
        h2: "Les défis à relever",
      },
      {
        text: "Malgré ces avancées, des défis persistent. La fracture numérique entre zones urbaines et rurales reste importante, le coût de la data et des appareils peut être prohibitif, et la cybersécurité devient une préoccupation croissante. C'est précisément là qu'intervient la mission d'Aorte : bâtir une infrastructure numérique solide, accessible et durable.",
      },
      {
        h2: "Conclusion",
      },
      {
        text: "La transformation numérique de l'Afrique est en marche, portée par une jeunesse dynamique et des innovators déterminés. Chez Aorte, nous croyons que chaque défi technologique est une opportunité de construire un avenir meilleur — Graduatim, Potens.",
      },
    ]),
  },
  {
    title: "Maîtriser DaVinci Resolve : guide du débutant",
    slug: "davinci-resolve-guide-debutant",
    publishedAt: "2026-07-18T09:00:00Z",
    excerpt:
      "Les bases essentielles pour commencer le montage vidéo professionnel avec DaVinci Resolve.",
    tags: ["Formation"],
    thumbnail: "/img/Video_image.png",
    readingTime: 5,
    body: blocks([
      {
        text: "DaVinci Resolve s'est imposé comme la référence du montage vidéo professionnel. Et la bonne nouvelle : la version gratuite est déjà extrêmement puissante. Voici comment poser des fondations solides.",
      },
      {
        h2: "Comprendre l'espace de travail",
      },
      {
        text: "Resolve se découpe en plusieurs pages : Media, Cut, Edit, Fusion, Color, Fairlight et Deliver. Le débutant doit se concentrer sur trois d'entre elles : Edit pour assembler, Color pour étalonner et Deliver pour exporter.",
      },
      {
        h2: "Le montage : les réflexes essentiels",
      },
      {
        text: "Apprenez les raccourcis clavier dès le premier jour : I et O pour les points d'entrée et de sortie, B pour la lame de rasoir, et espace pour lire/pause. C'est le moyen le plus rapide de gagner en fluidité.",
      },
      {
        h2: "Premiers pas en étalonnage",
      },
      {
        text: "Commencez par la roue de balance des blancs, puis travaillez l'exposition avant de toucher aux couleurs. Un étalonnage réussi passe d'abord par une image propre.",
      },
      {
        quote: "La maîtrise vient de la répétition : montez un projet par semaine pendant trois mois, et vous aurez franchi un cap.",
      },
      {
        h2: "Exporter correctement",
      },
      {
        text: "Pour une diffusion web, choisissez le preset H.264 Master et ajustez la résolution à la plateforme cible. Vérifiez toujours votre export avant de le livrer.",
      },
    ]),
  },
  {
    title: "Les principes du design graphique moderne",
    slug: "principes-design-graphique-moderne",
    publishedAt: "2026-07-10T09:00:00Z",
    excerpt:
      "Explorez les fondamentaux du design : équilibre, typographie, couleur et leurs applications.",
    tags: ["Design"],
    thumbnail: "/img/Graphic design group.svg",
    readingTime: 4,
    body: blocks([
      {
        text: "Le design graphique moderne repose sur des principes intemporels, appliqués avec les outils d'aujourd'hui. Les maîtriser, c'est donner de l'intention à chaque choix visuel.",
      },
      {
        h2: "L'équilibre avant tout",
      },
      {
        text: "Un bon design trouve son équilibre entre les éléments : hiérarchie typographique, poids des couleurs et espaces vides. La grille reste l'outil le plus fiable pour structurer une composition.",
      },
      {
        h2: "La typographie est un langage",
      },
      {
        text: "Chaque police porte une personnalité. Limitez-vous à deux familles par projet : une pour les titres, une pour le texte courant, et construisez une échelle typographique cohérente.",
      },
      {
        h2: "La couleur avec retenue",
      },
      {
        text: "Commencez par une palette sobre et ajoutez une couleur d'accent. La retenue signale la maîtrise — c'est exactement la philosophie que nous appliquons chez Aorte.",
      },
    ]),
  },
  {
    title: "Pourquoi votre entreprise a besoin d'un site web performant",
    slug: "site-web-performant",
    publishedAt: "2026-07-02T09:00:00Z",
    excerpt: "Un site web n'est plus une option — c'est la vitrine numérique de votre entreprise.",
    tags: ["Web"],
    thumbnail: "/img/Solution-icon1.svg",
    readingTime: 4,
    body: blocks([
      {
        text: "Un site web est devenu le premier point de contact entre une entreprise et ses clients. Pourtant, beaucoup négligent encore sa performance et son impact.",
      },
      {
        h2: "La première impression compte",
      },
      {
        text: "Un visiteur met moins de trois secondes pour juger votre site. Une page rapide et claire inspire confiance ; une page lente fait fuir les clients potentiels vers vos concurrents.",
      },
      {
        h2: "Performance et référencement",
      },
      {
        text: "La vitesse de chargement est un facteur de classement majeur pour les moteurs de recherche. Un site optimisé vous rend visible, et la visibilité est le premier moteur de croissance.",
      },
      {
        h2: "Un investissement durable",
      },
      {
        text: "Chez Aorte Systems, nous concevons des plateformes rapides, sécurisées et évolutives : une vitrine qui devient une véritable infrastructure commerciale.",
      },
    ]),
  },
  {
    title: "Reconditionné vs neuf : le guide complet 2026",
    slug: "reconditionne-vs-neuf-guide-2026",
    publishedAt: "2026-06-25T09:00:00Z",
    excerpt:
      "Tout ce qu'il faut savoir pour choisir entre un appareil reconditionné et un appareil neuf.",
    tags: ["Éco-tech"],
    thumbnail: "/img/store-card-img.svg",
    readingTime: 5,
    body: blocks([
      {
        text: "Entre budget et impact environnemental, le choix entre appareil neuf et reconditionné n'a jamais été aussi pertinent qu'en 2026.",
      },
      {
        h2: "Le reconditionné professionnel",
      },
      {
        text: "Un appareil reconditionné par des professionnels subit des tests complets, le remplacement des composants usés et une garantie. La qualité est au rendez-vous, à un prix nettement inférieur.",
      },
      {
        h2: "Un geste pour la planète",
      },
      {
        text: "Prolonger la durée de vie d'une machine, c'est réduire son empreinte carbone de près de 70% par rapport à l'achat d'un appareil neuf. Chaque achat reconditionné est un choix responsable.",
      },
      {
        h2: "Le rôle d'Aorte Eco-Store",
      },
      {
        text: "Nous redonnons vie à la haute technologie : machines puissantes, testées et fiables, pour bâtir un futur numérique plus responsable — Graduatim, Potens.",
      },
    ]),
  },
  {
    title: "Graduatim, Potens — la philosophie derrière Aorte",
    slug: "graduatim-potens-philosophie",
    publishedAt: "2026-06-15T09:00:00Z",
    excerpt:
      "Plongée dans la vision et les valeurs qui animent Aorte : transmission, intégrité et innovation.",
    tags: ["Vision"],
    thumbnail: "/img/about-bg.svg",
    readingTime: 3,
    body: blocks([
      {
        text: "Graduatim, Potens : « progressivement, puissant ». Deux mots latins qui résument la trajectoire d'Aorte et la méthode de son écosystème.",
      },
      {
        h2: "La transmission comme fondation",
      },
      {
        text: "Aorte Learn transforme le savoir technique en pouvoir de création. Chaque compétence transmise est un maillon de l'infrastructure que nous bâtissons collectivement.",
      },
      {
        h2: "L'intégrité comme méthode",
      },
      {
        text: "Des systèmes robustes et durables par essence : c'est notre engagement. L'intégrité n'est pas une option, c'est la condition de notre résilience.",
      },
      {
        h2: "L'innovation comme horizon",
      },
      {
        text: "Repousser les frontières du possible à chaque projet. C'est avec cette ambition que nous construisons, pas à pas, l'héritage numérique de demain.",
      },
    ]),
  },
];

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
