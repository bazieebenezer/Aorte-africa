import type { PortableTextBlock } from "@portabletext/types";

export type Post = {
  title: string;
  slug: string;
  publishedAt: string;
  excerpt: string;
  tags: string[];
  thumbnail: string;
  readingTime: number;
  author: string;
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
    title: "Sécurité des API : les failles que les développeurs négligent",
    slug: "securite-api-failles-negligees",
    publishedAt: "2026-08-01T09:00:00Z",
    excerpt:
      "L'authentification ne suffit pas : le vrai danger se cache dans les erreurs d'autorisation, la validation des entrées et les secrets qui traînent dans les logs.",
    tags: ["Backend"],
    thumbnail: "/img/Solution-icon2.svg",
    readingTime: 7,
    author: "Équipe Aorte",
    body: blocks([
      {
        text: "Lorsqu'on parle de sécurité d'une API, le premier réflexe est de penser à l'authentification : un bon login, des tokens, c'est réglé. La réalité est plus dérangeante : la plupart des failles graves ne viennent pas de l'absence d'authentification, mais de décisions banales prises chaque jour — une comparaison mal écrite, un champ ignoré, un log trop bavard.",
      },
      {
        text: "Voici les failles que nous croisons le plus souvent dans les audits, et les réflexes qui permettent de les éviter sans ralentir le développement.",
      },
      {
        h2: "L'authentification : la première ligne, pas la dernière",
      },
      {
        text: "Un token bien généré ne protège rien si la vérification est bâclée. La règle la plus rentable : ne jamais écrire soi-même la comparaison des secrets. Utilisez la fonction de comparaison à temps constant de votre framework, celle qui garantit le même temps de réponse quelle que soit la saisie, sinon votre endpoint devient une machine à deviner les signatures.",
      },
      {
        text: "Deuxième réflexe : vérifiez toujours l'expiration. Un token dont la durée de vie n'est jamais contrôlée est un passe-droit permanent, surtout pour les tokens de rafraîchissement qui restent valables des semaines entières par défaut dans certains services.",
      },
      {
        h2: "Les erreurs d'autorisation, la faille la plus sous-estimée",
      },
      {
        text: "L'authentification répond à la question « qui êtes-vous ? ». L'autorisation répond à « avez-vous le droit de faire ça ? ». Une API sécurisée vérifie les deux, et le point sensible est presque toujours le second : un utilisateur connecté peut-il lire la ressource d'un autre ? Modifier un document dont il n'est pas propriétaire ?",
      },
      {
        text: "La technique qui évite 90 % des problèmes : centraliser la vérification. Créez une fonction can(user, action, resource) unique, utilisée partout, plutôt que des contrôles dispersés dans chaque route. Un contrôle oublié dans une route sur vingt suffit à rendre votre API vulnérable.",
      },
      {
        quote:
          "La sécurité d'une API ne se mesure pas à sa porte d'entrée, mais à chaque porte intérieure.",
      },
      {
        h2: "La validation des entrées, ou la porte restée ouverte",
      },
      {
        text: "Tout ce qui entre dans votre API est hostile jusqu'à preuve du contraire. Les types, les longueurs, les formats : tout doit être validé, y compris les champs que vous n'utilisez pas. Un champ bonus ignoré par votre code mais accepté par votre base peut être le vecteur d'une injection ou d'une fuite de données.",
      },
      {
        text: "Utilisez un schéma de validation déclaratif pour chaque entrée, et rejetez ce qui ne correspond pas plutôt que de le nettoyer. Le modèle « refuse les inconnus » est plus sûr et plus simple à raisonner que le modèle « accepte tout puis assainit ».",
      },
      {
        h2: "Les secrets et les logs, les traîtres silencieux",
      },
      {
        text: "Un secret n'est un secret que s'il n'apparaît nulle part : ni dans le code, ni dans la config versionnée, ni dans les réponses d'erreur. Les messages d'exception sont des candidats naturels : ils finissent dans les logs, qui finissent dans les outils de monitoring, qui peuvent être consultés par d'autres équipes.",
      },
      {
        text: "Passez en revue vos logs comme un intrus le ferait : un token en clair dans une URL d'appel interne, une clé d'API dans un en-tête de débogage, un mot de passe dans une erreur de connexion. Chacune de ces apparitions est une fuite qui attend son moment.",
      },
      {
        h2: "La checklist de l'audit rapide",
      },
      {
        text: "Une heure suffit pour couvrir l'essentiel : testez chaque endpoint sans token (le rejet est-il propre ?), avec un token d'un autre utilisateur (les ressources sont-elles isolées ?), avec des entrées hors normes (le schéma les rejette-t-il ?), et enfin avec un requête dont l'historique complet finirait dans les logs (que voit-on vraiment ?).",
      },
      {
        text: "La sécurité n'est pas un module à brancher en fin de projet : c'est une discipline de chaque commit, et ces réflexes coûtent moins de temps qu'une fuite de données n'en fera perdre.",
      },
    ]),
  },
  {
    title: "Comprendre MCP : le protocole qui connecte les agents IA",
    slug: "comprendre-mcp-protocole-agents-ia",
    publishedAt: "2026-07-29T09:00:00Z",
    excerpt:
      "Le Model Context Protocol standardise la façon dont les agents IA accèdent à vos outils et à vos données. Voici comment il fonctionne, pas à pas.",
    tags: ["IA"],
    thumbnail: "/img/Learn_image.svg",
    readingTime: 8,
    author: "Équipe Aorte",
    body: blocks([
      {
        text: "Si vous construisez avec des modèles de langage, vous avez probablement vécu ce moment : pour donner accès à une base de données à l'agent, il faut écrire du code d'intégration sur mesure, et recommencer pour chaque outil. Le Model Context Protocol (MCP) a été créé pour régler ce problème une fois pour toutes.",
      },
      {
        text: "MCP est un protocole ouvert, publié par Anthropic fin 2024, qui définit une interface standard entre un agent IA (le client) et les sources de données ou outils qu'il utilise (les serveurs). L'analogie la plus juste est celle du connecteur USB-C : avant, chaque appareil exigeait son câble propriétaire ; maintenant, un seul standard suffit.",
      },
      {
        h2: "Trois acteurs, une même conversation",
      },
      {
        text: "Un écosystème MCP repose sur trois briques. Le host, d'abord : l'application qui héberge l'assistant (Claude Desktop, Cursor, votre propre application). Le server, ensuite : un petit programme qui expose des outils, des ressources ou des prompts de manière standardisée. Le client, enfin : la bibliothèque qui fait le lien entre les deux, incluse dans les SDK officiels.",
      },
      {
        text: "Concrètement, un serveur MCP pour une base PostgreSQL expose deux choses : des tools comme lister_les_tables ou executer_une_requete, et éventuellement des ressources statiques (schéma, documentation). Le host découvre ces capacités à la connexion, sans configuration manuelle de chaque outil.",
      },
      {
        h2: "Le flux d'une requête, étape par étape",
      },
      {
        text: "Quand l'utilisateur pose une question, l'agent suit une séquence précise. Il commence par la phase de découverte : à la connexion, le serveur annonce la liste de ses capacités via la méthode tools/list. Ensuite, l'agent choisit l'outil pertinent et l'appelle avec tools/call, en passant des arguments structurés en JSON. Le serveur exécute l'opération réelle (une requête SQL, un appel d'API) et renvoie un résultat que l'agent intègre à sa réponse.",
      },
      {
        text: "Tout circule sur JSON-RPC 2.0, ce qui rend le protocole agnostique au langage : un serveur écrit en Python sert aussi bien un client TypeScript. C'est cette interopérabilité qui fait la force du standard.",
      },
      {
        quote:
          "MCP ne remplace pas votre logique métier : il remplace les intégrations jetables que chaque projet IA accumulait.",
      },
      {
        h2: "Adopter MCP sans se perdre",
      },
      {
        text: "Commencez par un cas simple et maîtrisé. Choisissez un serveur officiel ou une référence de la communauté pour votre besoin le plus fréquent : lecture d'un dépôt Git, accès à un drive, recherche dans une base. Configurez-le dans votre host, puis vérifiez que l'agent utilise effectivement l'outil plutôt que de deviner les réponses.",
      },
      {
        text: "Ensuite, passez à l'étape productif : écrivez votre propre serveur MCP uniquement pour les opérations que vous faites répéter à l'agent, comme créer une fiche client ou résumer un ticket. Un serveur de 200 lignes couvre 80 % des besoins internes.",
      },
      {
        h2: "Sécurité : le point non négociable",
      },
      {
        text: "Un agent connecté à vos outils est un collaborateur avec des permissions. Appliquez le principe du moindre privilège : un serveur MCP en lecture seule ne doit jamais exposer une méthode d'écriture, et les accès aux secrets doivent rester côté serveur, jamais dans la configuration du client. Auditez régulièrement la liste des serveurs autorisés et retirez ceux qui ne servent plus.",
      },
      {
        text: "Le protocole évolue vite et certaines parties (notamment l'authentification) arrivent encore à maturité. Surveillez la spec, mais n'attendez pas : les gains de productivité sont immédiats dès le premier serveur branché.",
      },
    ]),
  },
  {
    title: "Next.js : choisir entre SSG, SSR et ISR sans se tromper",
    slug: "nextjs-ssg-ssr-isr-guide",
    publishedAt: "2026-07-25T09:00:00Z",
    excerpt:
      "Le mode de rendu de votre page détermine sa vitesse, sa fraîcheur et son coût. Un guide de décision simple, avec les critères qui comptent.",
    tags: ["Next.js"],
    thumbnail: "/img/Group 2028.svg",
    readingTime: 7,
    author: "Équipe Aorte",
    body: blocks([
      {
        text: "En Next.js, une page peut être générée de trois manières, et le choix conditionne tout : temps de chargement perçu, données à jour, coût d'infrastructure. La bonne nouvelle, c'est que la décision se résume à deux questions : vos données changent-elles souvent, et vos visiteurs sont-ils identifiés ?",
      },
      {
        h2: "SSG : le rendu statique, la valeur par défaut",
      },
      {
        text: "La génération statique construit la page à la compilation et la sert depuis un CDN. Résultat : des temps de réponse en millisecondes, un coût proche de zéro, une disponibilité parfaite. C'est le bon choix par défaut pour tout contenu public qui change rarement : articles de blog, documentation, pages marketing, fiches produits.",
      },
      {
        text: "La limite est évidente : si les données bougent toutes les minutes, la page sera périmée. C'est là qu'interviennent les deux autres modes.",
      },
      {
        h2: "SSR : le rendu dynamique, quand chaque visiteur est unique",
      },
      {
        text: "Le rendu côté serveur exécute votre code à chaque requête. Il est indispensable quand la réponse dépend de l'utilisateur : tableau de bord personnalisé, panier, contenus géolocalisés, authentification. Chaque visiteur reçoit exactement sa version de la page.",
      },
      {
        text: "Ce choix a un prix : chaque requête consomme du calcul serveur, et la page ne peut pas être mise en cache telle quelle. Il faut donc le réserver aux cas qui l'exigent vraiment, et combiner SSR et composants client pour isoler les parties personnalisées.",
      },
      {
        h2: "ISR : la fraîcheur sans sacrifier la vitesse",
      },
      {
        text: "La régénération statique incrémentale combine les deux mondes : la page est servie en statique depuis le CDN, mais Next.js la régénère en arrière-plan dès que la revalidation expire. C'est le mode idéal pour les contenus semi-dynamiques : un blog, un catalogue, des tarifs, des résultats de sondages.",
      },
      {
        text: "Concrètement, un revalidate de 3600 régénère la page au maximum une fois par heure, tout en restant instantanée pour vos visiteurs. Pour les mises à jour urgentes, la revalidation à la demande (on-demand) permet de déclencher la régénération immédiatement après une écriture en base.",
      },
      {
        quote:
          "La question n'est pas « statique ou dynamique », mais « quelle est la fraîcheur maximale acceptable pour ce contenu ? »",
      },
      {
        h2: "Le guide de décision en cinq critères",
      },
      {
        text: "Contenu identique pour tous les visiteurs ? Oui, passez à la question suivante ; non, choisissez le SSR. Contenu qui change moins d'une fois par heure ? Prenez le SSG. Contenu mis à jour plusieurs fois par jour ? Prenez l'ISR. La fraîcheur est critique en temps réel (scores, stocks, cours) ? Prenez le SSR. Votre page est servie derrière un cache de réseau de distribution ? Le SSG reste imbattable.",
      },
      {
        text: "Un dernier conseil : ne cherchez pas le mode parfait. Commencez par le SSG, mesurez, et passez à l'ISR seulement si la fraîcheur devient un besoin réel. La plupart des sites n'ont jamais besoin de plus.",
      },
    ]),
  },
  {
    title: "React : les patterns de composants qui durent",
    slug: "react-patterns-composants-durables",
    publishedAt: "2026-07-20T09:00:00Z",
    excerpt:
      "Composition, conteneurs, hooks : les trois disciplines qui font passer une base React de « ça marche » à « ça se maintient ».",
    tags: ["React"],
    thumbnail: "/img/Rectangle 8.svg",
    readingTime: 7,
    author: "Équipe Aorte",
    body: blocks([
      {
        text: "Après quelques mois de React, tout le monde sait écrire des composants. Ce qui distingue une codebase saine d'une base ingérable, ce sont les patterns : des décisions répétées au bon endroit, qui évitent les corrections en cascade. En voici trois qui paient sur le long terme.",
      },
      {
        h2: "La composition plutôt que la configuration",
      },
      {
        text: "Le réflexe naturel est d'ajouter des props : une prop variant, une prop icon, une prop footer. Chaque nouvelle prop multiplie les combinaisons à tester et les cas limites. À la place, composez : laissez le parent assembler les enfants directement avec children.",
      },
      {
        text: "Comparez un Modal qui accepte title, description et confirmLabel contre un Modal qui reçoit un header et un footer en children. Le second est trivialement extensible, ne change jamais de signature, et les styles des zones restent la responsabilité de ceux qui les remplissent.",
      },
      {
        h2: "Séparer le conteneur de la présentation",
      },
      {
        text: "Un composant qui récupère des données et affiche une interface fait deux métiers. Séparez-les : le conteneur s'occupe de la logique (chargement, état, événements) et le composant de présentation reçoit des props déjà prêtes.",
      },
      {
        text: "Ce pattern a un effet immédiat : les composants d'affichage deviennent réutilisables, testables sans contexte de données, et les changements de design ne touchent plus la logique. C'est le pattern le plus rentable de cette liste.",
      },
      {
        h2: "Les règles d'or des hooks",
      },
      {
        text: "Trois règles évitent 90 % des bugs de performance et d'état. Première règle : si une logique se répète, extrayez-la dans un custom hook avec des noms de retour explicites. Deuxième règle : n'optimisez qu'après mesure, et uniquement les re-rendus qui coûtent réellement (listes longues, composants lourds).",
      },
      {
        text: "Troisième règle : une dépendance d'effet doit toujours être déclarée. Un effet avec une liste de dépendances incomplète est une bombe à retardement qui explose lors du premier refactor. Si l'effet devient trop dépendant, c'est souvent le signe qu'il devrait être découpé.",
      },
      {
        quote:
          "Un composant simple est plus facile à maintenir que vingt composants « intelligents ». La complexité doit être distribuée, pas centralisée.",
      },
      {
        h2: "La checklist du composant durable",
      },
      {
        text: "Avant de considérer un composant terminé, vérifiez : la signature change-t-elle rarement ? L'interface est-elle décrite par des types ? Les états vide, chargement et erreur sont-ils gérés ? Le composant fonctionne-t-il sans données externes ? Peut-on le déplacer dans un autre projet sans le réécrire ? Si toutes les réponses sont positives, il durera.",
      },
    ]),
  },
  {
    title: "Concevoir une API que les développeurs adorent utiliser",
    slug: "concevoir-api-developers-friendly",
    publishedAt: "2026-07-15T09:00:00Z",
    excerpt:
      "Des réponses cohérentes, des erreurs explicites, une doc qui va à l'essentiel : les choix d'architecture qui font une API remarquable.",
    tags: ["Backend"],
    thumbnail: "/img/Solution-icon1.svg",
    readingTime: 7,
    author: "Équipe Aorte",
    body: blocks([
      {
        text: "Une API n'est pas jugée sur sa stack, mais sur l'expérience qu'elle donne aux développeurs qui l'intègrent. Une bonne API se devine en quelques secondes : les réponses sont prévisibles, les erreurs racontent une histoire, et la documentation répond avant même qu'on ait la question.",
      },
      {
        h2: "Des réponses cohérentes, quoi qu'il arrive",
      },
      {
        text: "Définissez une structure unique pour toutes vos réponses et tenez-vous-y. Un objet data contenant le résultat, un objet error avec un code machine, un message lisible et éventuellement un champ details : cette convention évite des années de cas particuliers côté client.",
      },
      {
        text: "La cohérence s'étend aux formats : une date s'écrit toujours en ISO 8601, les identifiants ont toujours le même type, les listes vides sont toujours des tableaux. Chaque exception à ces règles est un bug en attente chez vos intégrateurs.",
      },
      {
        h2: "Des erreurs qui font progresser",
      },
      {
        text: "Le statut HTTP n'est qu'un début : une 400 doit expliquer quoi corriger, et une 422 doit lister les champs invalides avec la raison précise de chacun. Un message « bad request » sans détail condamne votre intégrateur à deviner ou à ouvrir une issue.",
      },
      {
        text: "Pensez aussi aux limites : pagination documentée avec curseur stable, quotas avec en-têtes de consommation restants, rate limiting avec retry-after explicite. Les bons outils d'erreur transforment une frustration en relation de confiance.",
      },
      {
        h2: "Le versionnage sans douleur",
      },
      {
        text: "Choisissez une stratégie de versionnage simple et visible. Le versionnage par préfixe d'URL (api.example.com/v2/orders) reste le plus lisible pour les intégrateurs. Annoncez chaque évolution en trois temps : déprecation documentée, période de transition suffisante, puis suppression effective.",
      },
      {
        quote:
          "Une API s'évalue comme un produit : la première intégration doit prendre cinq minutes, pas cinq tickets.",
      },
      {
        h2: "La documentation par l'exemple",
      },
      {
        text: "Une documentation OpenAPI générée est une bonne base, mais c'est l'exemple qui vend. Pour chaque endpoint, montrez une requête réelle avec des données réalistes et la réponse correspondante. Ajoutez une collection prête à l'emploi pour vos outils préférés et des guides par cas d'usage, pas seulement par route.",
      },
      {
        text: "Enfin, testez votre API comme vos clients : appelez-la en tant qu'inconnu, sans accès à la base. Si vous devez consulter le code pour comprendre une réponse, votre documentation n'est pas encore finie.",
      },
    ]),
  },
  {
    title: "CI/CD pour débutants : automatiser tout, du push au déploiement",
    slug: "ci-cd-pour-debutants",
    publishedAt: "2026-07-10T09:00:00Z",
    excerpt:
      "L'intégration continue est un filet de sécurité, pas un luxe. Voici comment construire votre premier pipeline, étape par étape, sans jargon.",
    tags: ["DevOps"],
    thumbnail: "/img/Solution-icon3.svg",
    readingTime: 8,
    author: "Équipe Aorte",
    body: blocks([
      {
        text: "Le déploiement manuel fonctionne jusqu'au jour où il casse : une migration oubliée, un test rouge qui passe en production, un retour en arrière impossible. La CI/CD automatise le chemin de votre code de la branche jusqu'à la production, avec un contrôle à chaque étape. Et commencer est plus simple qu'on ne le pense.",
      },
      {
        h2: "Le pipeline en trois étapes",
      },
      {
        text: "Tout pipeline sérieux tient en trois étapes. Vérifier, d'abord : lint, tests unitaires et build sur chaque push. Construire, ensuite : produire l'artefact livrable, exactement celui qui partira en production. Déployer, enfin : envoyer l'artefact sur un environnement, d'abord de test, puis de production après validation.",
      },
      {
        text: "La règle d'or : ne déployez que ce que le pipeline a construit lui-même. Un artefact construit sur votre machine locale peut différer de celui du serveur, et cette différence est la source classique des bugs de déploiement.",
      },
      {
        h2: "Commencer avec GitHub Actions",
      },
      {
        text: "Pour un premier pipeline, GitHub Actions est le chemin le plus court : pas de serveur à administrer, une syntaxe YAML simple, et une exécution gratuite pour les dépôts publics. Un fichier workflow définit des événements déclencheurs, des jobs et des étapes.",
      },
      {
        text: "Concrètement, déclenchez le workflow sur push et pull request. Le job de vérification installe les dépendances, lance le lint, puis les tests. Le job de déploiement s'exécute uniquement sur la branche principale et utilise vos secrets stockés dans les settings du dépôt, jamais en clair dans le code.",
      },
      {
        h2: "Les pièges qui font échouer les débutants",
      },
      {
        text: "Quatre pièges reviennent systématiquement. Le premier : les secrets en dur dans le workflow, qui finissent tôt ou tard dans l'historique Git. Le second : des tests flaky, qui échouent une fois sur deux et finissent ignorés. Le troisième : un environnement de test qui diffère trop de la production, ce qui rend la vérification sans valeur.",
      },
      {
        quote:
          "Une CI qui échoue est une information, pas une faute. Le problème commence quand personne ne lit la sortie des pipelines.",
      },
      {
        h2: "La checklist du premier pipeline",
      },
      {
        text: "Pour démarrer : un workflow qui tourne sur push, avec lint et tests. Un second qui déploie la branche principale sur l'environnement de test automatiquement. Puis la production : d'abord manuellement via un bouton, ensuite automatiquement si les déploiements de test restent verts deux semaines. Enfin, un mécanisme de retour arrière simple et testé au moins une fois par trimestre.",
      },
      {
        text: "L'automatisation ne supprime pas la vigilance, elle la concentre sur les décisions qui comptent : que déployer, quand, et comment revenir en arrière.",
      },
    ]),
  },
  {
    title: "Déployer sur le cloud sans se ruiner",
    slug: "deployer-cloud-sans-se-ruiner",
    publishedAt: "2026-07-05T09:00:00Z",
    excerpt:
      "Le serverless, les pièges de facturation et les optimisations qui comptent : comment faire tourner un projet sérieux pour quelques euros par mois.",
    tags: ["Cloud"],
    thumbnail: "/img/Rectangle.png",
    readingTime: 7,
    author: "Équipe Aorte",
    body: blocks([
      {
        text: "La promesse du cloud est séduisante, la facture peut l'être beaucoup moins. Pourtant, une application moderne bien architecturée peut fonctionner pour quelques euros par mois. La clé tient en trois mots : payer à l'usage, surveiller, et ne jamais laisser tourner ce qui ne sert pas.",
      },
      {
        h2: "Le serverless comme réflexe par défaut",
      },
      {
        text: "Pour un site, une API ou un backend de prototype, les plateformes serverless (Vercel, Netlify, Cloudflare Workers) sont imbattables : déploiement instantané, échelle automatique, et un modèle de facturation où vous ne payez que les requêtes réellement exécutées.",
      },
      {
        text: "Un site public avec du trafic modéré reste dans le plan gratuit ou quasi gratuit de la plupart des plateformes. Les fonctions à la demande ne coûtent qu'à l'appel, ce qui rend les premiers mois extrêmement prévisibles.",
      },
      {
        h2: "Les quatre pièges de facturation",
      },
      {
        text: "Le premier piège, ce sont les machines laissées allumées : une instance de base de données ou de serveur qui tourne 24 h/24 pour rien. Le deuxième, la sortie réseau (egress) : transférer de gros volumes de données depuis un fournisseur vers l'extérieur coûte cher et se remarque trop tard. Le troisième, le stockage qui accumule : logs, images et sauvegardes oubliés. Le quatrième, l'échelle qui s'emballe : un pic de trafic mal configuré qui multiplie les instances sans limite de budget.",
      },
      {
        h2: "Optimiser sans sacrifier la qualité",
      },
      {
        text: "Le cache est votre premier levier : une page statique servie depuis un réseau de distribution ne coûte presque rien, même très visitée. Ensuite, les images : un format moderne et une taille adaptée réduisent la bande passante de 80 % sans impact visible. Enfin, les fonctions : plus elles sont rapides, moins elles coûtent, et un temps d'exécution court évite les surcoûts.",
      },
      {
        quote:
          "La facture cloud ne se répare pas en fin de mois : elle se pilote à la conception, comme l'architecture elle-même.",
      },
      {
        h2: "La routine mensuelle qui change tout",
      },
      {
        text: "Mettez en place un budget d'alerte dès le premier jour, même sur le plan gratuit. Chaque mois, passez dix minutes sur la liste des ressources : arrêtez ce qui est inutilisé, archivez ce qui doit être conservé, et notez les tendances du mois précédent. Cette routine suffit à éviter l'immense majorité des mauvaises surprises.",
      },
    ]),
  },
  {
    title: "Design mobile-first : les principes d'une base responsive solide",
    slug: "design-mobile-first-principes",
    publishedAt: "2026-06-28T09:00:00Z",
    excerpt:
      "La plupart de vos visiteurs sont sur mobile. Voici comment concevoir pour eux d'abord, sans casser l'expérience desktop.",
    tags: ["Mobile"],
    thumbnail: "/img/Video_image.png",
    readingTime: 6,
    author: "Équipe Aorte",
    body: blocks([
      {
        text: "Sur la majorité des sites, plus de la moitié du trafic vient d'un téléphone. Concevoir mobile-first ne consiste pas à rétrécir un design existant : c'est l'inverse, commencer par le plus contraint, puis enrichir. Cette approche produit des interfaces plus rapides, plus claires et finalement meilleures partout.",
      },
      {
        h2: "Le contenu d'abord, la décoration ensuite",
      },
      {
        text: "Sur un écran de 390 pixels, chaque élément doit se justifier. Commencez par l'information centrale : titre, action principale, contenu. Ajoutez ensuite seulement les éléments secondaires, et déplacez-les progressivement vers les grandes tailles d'écran avec les variantes sm:, md:, lg:.",
      },
      {
        text: "Cette contrainte est une chance : elle force à trancher entre l'essentiel et le superflu, et le résultat est plus lisible sur tous les appareils.",
      },
      {
        h2: "Des cibles tactiles, des gestes simples",
      },
      {
        text: "Un doigt n'est pas un curseur. Les cibles tactiles minimales de 44 pixels évitent les clics ratés, et les éléments interactifs doivent être espacés de plusieurs pixels les uns des autres. Évitez les gestes complexes : si l'action principale nécessite un long appui ou un glissement à deux doigts, elle est invisible pour une partie de vos utilisateurs.",
      },
      {
        h2: "Typographie et espacement fluides",
      },
      {
        text: "La fonction clamp() est l'outil le plus rentable du responsive : elle fait varier une taille de façon continue entre une valeur mobile et une valeur desktop, sans point de rupture supplémentaire. Une échelle typographique fluide avec des marges en vw évite les sauts brusques lors de la rotation de l'écran.",
      },
      {
        quote:
          "Un bon design mobile n'est pas un design réduit : c'est un design qui a fait ses choix les plus importants en premier.",
      },
      {
        h2: "La performance, question de survie sur mobile",
      },
      {
        text: "Sur un réseau mobile, chaque kilo-octet compte. Compressez les images au format adapté, chargez les contenus hors écran paresseusement, et surveillez la taille de vos scripts. Un écran de chargement rapide est la première impression, et sur mobile elle se joue en moins de trois secondes.",
      },
    ]),
  },
  {
    title: "Un site qui convertit : la méthode en 5 étapes",
    slug: "site-performant-qui-convertit",
    publishedAt: "2026-06-20T09:00:00Z",
    excerpt:
      "Vitesse, hiérarchie, friction : la méthode concrète pour transformer votre vitrine en machine à convertir, étape par étape.",
    tags: ["Web"],
    thumbnail: "/img/store-card-img.svg",
    readingTime: 6,
    author: "Équipe Aorte",
    body: blocks([
      {
        text: "Un site peut être magnifique et ne rien vendre. La conversion repose sur des mécanismes précis : la confiance s'installe en quelques secondes, la clarté oriente le regard, et la friction fait fuir. Voici la méthode en cinq étapes que nous appliquons sur chaque projet chez Aorte Systems.",
      },
      {
        h2: "Étape 1 : énoncer la promesse en cinq secondes",
      },
      {
        text: "À l'arrivée, le visiteur doit comprendre immédiatement ce que vous faites, pour qui, et ce qu'il doit faire ensuite. Un titre orienté résultat, un sous-titre qui précise, un seul appel à l'action visible : c'est le minimum vital. Tout élément qui ne contribue pas à cette promesse est un candidat à la suppression.",
      },
      {
        h2: "Étape 2 : faire de la vitesse un élément de design",
      },
      {
        text: "La performance n'est pas un réglage technique, c'est un critère de conversion : un chargement au-delà de 2,5 secondes fait chuter les taux de transformation. Mesurez le Core Web Vitals de vos pages clés, optimisez les images, évitez les scripts tiers inutiles, et testez sur réseau mobile réel.",
      },
      {
        h2: "Étape 3 : réduire la friction à chaque étape",
      },
      {
        text: "Chaque champ de formulaire est un obstacle, chaque page supplémentaire un point de fuite. Ne demandez que l'essentiel, proposez les options par défaut, et montrez la progression. Un devis demandé en deux champs convertit toujours mieux que le même devis en dix.",
      },
      {
        h2: "Étapes 4 et 5 : prouver, puis mesurer",
      },
      {
        text: "La preuve sociale est l'accélérateur de confiance le plus efficace : témoignages, chiffres, logos, exemples réels. Placez-la près des décisions importantes, pas en bas de page seulement. Enfin, mesurez : sans suivi d'événements, toute optimisation est une intuition. Installez une mesure dès le premier jour et ne modifiez qu'un paramètre à la fois.",
      },
      {
        quote:
          "Un site qui convertit n'est pas un site qui impressionne : c'est un site qui fait gagner du temps à ceux qui veulent avancer.",
      },
      {
        text: "La conversion est un processus, pas un état. Refaites ce cycle chaque trimestre, et votre site deviendra l'un de vos meilleurs commerciaux.",
      },
    ]),
  },
  {
    title: "De débutant à développeur professionnel : le parcours réaliste",
    slug: "debutant-developpeur-parcours",
    publishedAt: "2026-06-12T09:00:00Z",
    excerpt:
      "Spécialisation, apprentissage par projets, portfolio et recherche du premier poste : un plan d'action concret pour ceux qui veulent vivre de la tech.",
    tags: ["Carrière"],
    thumbnail: "/img/about-bg.svg",
    readingTime: 8,
    author: "Équipe Aorte",
    body: blocks([
      {
        text: "Entre les tutoriels qui promettent de devenir développeur en un mois et les discours alarmistes sur la saturation du marché, difficile de s'y retrouver. La vérité est plus simple et plus exigeante : le marché récompense ceux qui savent faire des choses utiles, pas ceux qui ont accumulé des certifications. Voici le parcours que nous recommandons aux apprenants d'Aorte Learn.",
      },
      {
        h2: "Choisir une spécialisation, pas « la programmation »",
      },
      {
        text: "« Je veux apprendre à coder » est une destination trop large. Choisissez un métier précis : développeur web frontend, backend, mobile, data, DevOps. La spécialisation permet d'atteindre le niveau professionnel en un an plutôt qu'en trois, et c'est elle que les recruteurs cherchent : un profil qui sait résoudre un problème précis, pas un généraliste qui connaît un peu tout.",
      },
      {
        text: "Regardez les offres d'emploi de votre marché cible et notez les compétences demandées en haut des annonces : ce sont elles qui composent votre programme d'apprentissage.",
      },
      {
        h2: "Apprendre par projets, jamais par tutoriels passifs",
      },
      {
        text: "Un tutoriel suivi passivement donne l'illusion de la maîtrise. La règle d'or : trois heures de construction valent dix heures de visionnage. Chaque notion apprise doit être immédiatement appliquée dans un projet personnel, et chaque blocage doit être traversé en cherchant la solution par vous-même.",
      },
      {
        text: "Le portfolio n'est pas un bonus : c'est la preuve. Trois projets complets, déployés et documentés, valent mieux que dix projets commencés. Chaque projet doit résoudre un problème réel, avoir un dépôt propre et une version accessible en ligne.",
      },
      {
        h2: "La recherche du premier poste, comme un projet",
      },
      {
        text: "Le premier emploi se trouve rarement par envoi massif de CV. Traitez la recherche comme un projet : ciblez une liste courte d'entreprises, adaptez votre profil à chacune, et privilégiez le réseau. Un message personnalisé à un développeur de l'équipe ou un post construit autour de votre projet démontre ce qu'un CV ne peut pas montrer.",
      },
      {
        quote:
          "Le premier emploi ne récompense pas le savoir accumulé : il récompense la capacité prouvée à livrer des choses qui fonctionnent.",
      },
      {
        h2: "La checklist des six mois",
      },
      {
        text: "Mois 1 : choisir la spécialisation et cartographier les compétences demandées. Mois 2 : terminer le premier projet complet. Mois 3 : apprendre les fondamentaux de l'outillage professionnel (Git, terminal, déploiement). Mois 4 : deuxième projet plus ambitieux, avec des tests. Mois 5 : troisième projet et nettoyage du portfolio. Mois 6 : recherche active, trois candidatures ciblées par semaine, et retours d'expérience après chaque entretien.",
      },
      {
        text: "Graduatim, Potens : progressivement, puissant. C'est exactement la trajectoire d'une carrière qui se construit sérieusement.",
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
