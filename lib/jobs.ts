import * as prismic from '@prismicio/client';
import { createClient, repositoryName } from '@/prismicio';

export type JobOffer = {
  id: string;
  uid: string;
  title: string;
  company: string;
  location: string;
  contract: string;
  excerpt: string;
  description: string;
  technologies: string[];
  createdAt: string;
};

const fallbackOffers: JobOffer[] = [
  {
    id: 'fallback-1',
    uid: 'developpeur-nextjs',
    title: 'Developpeur NextJS',
    company: 'DevY',
    location: 'Remote',
    contract: 'CDI',
    excerpt: 'Concevoir des interfaces performantes avec Next.js et TypeScript.',
    description:
      'Vous rejoignez une equipe produit pour construire une plateforme emploi moderne. Vous travaillez sur l App Router, l accessibilite et l integration CMS.',
    technologies: ['NextJS', 'TypeScript', 'Prismic'],
    createdAt: '2026-03-20',
  },
  {
    id: 'fallback-2',
    uid: 'developpeur-react',
    title: 'Developpeur React',
    company: 'Studio Front',
    location: 'Lyon',
    contract: 'CDD',
    excerpt: 'Construire une experience front claire, rapide et testable.',
    description:
      'Le poste couvre la conception de composants reutilisables, la qualite de code et la collaboration avec le design sur une maquette Figma.',
    technologies: ['React', 'TypeScript', 'CSS'],
    createdAt: '2026-03-18',
  },
  {
    id: 'fallback-3',
    uid: 'developpeur-fullstack',
    title: 'Developpeur Fullstack',
    company: 'API Makers',
    location: 'Paris',
    contract: 'Freelance',
    excerpt: 'Construire des pages Next.js et des APIs robustes pour des equipes metier.',
    description:
      'Vous intervenez sur l ensemble de la chaine: modelisation de contenus Prismic, pages dynamiques et publication continue sur Vercel.',
    technologies: ['NextJS', 'Node.js', 'Prismic'],
    createdAt: '2026-03-15',
  },
];

const asText = (value: unknown): string => {
  if (typeof value === 'string') {
    return value;
  }

  if (Array.isArray(value)) {
    try {
      return prismic.asText(value as prismic.RichTextField) ?? '';
    } catch {
      return '';
    }
  }

  return '';
};

const parseTechnologies = (data: Record<string, unknown>, tags: string[]) => {
  const fromFields: string[] = [];

  const candidateKeys = ['technologies', 'technology', 'tags', 'skills'];

  for (const key of candidateKeys) {
    const value = data[key];

    if (Array.isArray(value)) {
      for (const item of value) {
        if (typeof item === 'string' && item.trim()) {
          fromFields.push(item.trim());
        }

        if (item && typeof item === 'object') {
          const possibleObject = item as Record<string, unknown>;
          const textValue =
            asText(possibleObject.name) ||
            asText(possibleObject.technology) ||
            asText(possibleObject.tag) ||
            asText(possibleObject.skill);

          if (textValue.trim()) {
            fromFields.push(textValue.trim());
          }
        }
      }
    }

    if (typeof value === 'string' && value.trim()) {
      fromFields.push(...value.split(',').map((part) => part.trim()).filter(Boolean));
    }
  }

  return [...new Set([...tags, ...fromFields])];
};

type PrismicDoc = prismic.PrismicDocument;

const normalizeOffer = (doc: PrismicDoc): JobOffer => {
  const data = (doc.data as Record<string, unknown>) ?? {};

  const title = asText(data.title) || asText(data.job_title) || doc.uid || 'Offre sans titre';
  const excerpt =
    asText(data.excerpt) || asText(data.summary) || asText(data.description).slice(0, 120);
  const description =
    asText(data.description) || asText(data.content) || 'Description indisponible pour cette offre.';
  const company = asText(data.company) || asText(data.enterprise) || 'Entreprise non renseignee';
  const location = asText(data.location) || asText(data.city) || 'Non renseigne';
  const contract = asText(data.contract) || asText(data.contract_type) || 'CDI';
  const technologies = parseTechnologies(data, doc.tags ?? []);

  return {
    id: doc.id,
    uid: doc.uid ?? doc.id,
    title,
    company,
    location,
    contract,
    excerpt,
    description,
    technologies,
    createdAt: doc.first_publication_date ?? new Date().toISOString(),
  };
};

export const getJobOffers = async (): Promise<JobOffer[]> => {
  if (!repositoryName) {
    return fallbackOffers;
  }

  try {
    const client = createClient();
    const docs = await client.getAllByType('job');

    if (docs.length === 0) {
      return fallbackOffers;
    }

    return docs.map((doc) => normalizeOffer(doc as PrismicDoc));
  } catch {
    return fallbackOffers;
  }
};

export const getJobByUid = async (uid: string) => {
  const offers = await getJobOffers();
  return offers.find((offer) => offer.uid === uid) ?? null;
};

export const getTechnologyCloud = async () => {
  const offers = await getJobOffers();
  const counts = new Map<string, number>();

  for (const offer of offers) {
    for (const tech of offer.technologies) {
      const key = tech.trim();

      if (!key) {
        continue;
      }

      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
  }

  return Array.from(counts.entries())
    .map(([name, count]) => ({
      name,
      count,
      slug: encodeURIComponent(name.toLowerCase()),
    }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
};

export const getOffersByTechnology = async (rawTag: string) => {
  const offers = await getJobOffers();
  const tag = decodeURIComponent(rawTag).toLowerCase();

  return offers.filter((offer) =>
    offer.technologies.some((tech) => tech.toLowerCase() === tag),
  );
};
