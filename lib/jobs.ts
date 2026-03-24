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
  adminEmails: string[];
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
    adminEmails: ['recrutement@devy.example'],
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
    adminEmails: ['jobs@studio-front.example'],
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
    adminEmails: ['careers@apimakers.example'],
    createdAt: '2026-03-15',
  },
];

const isEmailLike = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

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

  const prettify = (value: string) =>
    value
      .replace(/[-_]+/g, ' ')
      .trim()
      .split(' ')
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');

  const pushLinkTag = (raw: unknown) => {
    if (!raw || typeof raw !== 'object') {
      return;
    }

    const link = raw as Record<string, unknown>;
    const uid = typeof link.uid === 'string' ? link.uid.trim() : '';
    const slug =
      typeof link.slug === 'string'
        ? link.slug.trim()
        : Array.isArray(link.slugs) && typeof link.slugs[0] === 'string'
          ? link.slugs[0].trim()
          : '';
    const linkUrl = typeof link.url === 'string' ? link.url.trim() : '';
    const urlLastPart = linkUrl.split('/').filter(Boolean).pop() ?? '';
    const linkedData =
      link.data && typeof link.data === 'object' ? (link.data as Record<string, unknown>) : null;
    const linkedTagName = linkedData
      ? asText(linkedData.tag_name) || asText(linkedData.title)
      : '';
    const fallbackName = prettify(uid || slug || urlLastPart);
    const finalName = linkedTagName || fallbackName;

    if (finalName) {
      fromFields.push(finalName);
    }
  };

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
          pushLinkTag(possibleObject.tag);
          pushLinkTag(possibleObject.technology);
          pushLinkTag(possibleObject.skill);
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

const parseAdminEmails = (data: Record<string, unknown>) => {
  const values: string[] = [];
  const candidateKeys = ['admin_emails', 'admins', 'emails_admin', 'recruiters'];

  for (const key of candidateKeys) {
    const value = data[key];

    if (Array.isArray(value)) {
      for (const item of value) {
        if (typeof item === 'string' && isEmailLike(item.trim())) {
          values.push(item.trim());
        }

        if (item && typeof item === 'object') {
          const objectValue = item as Record<string, unknown>;
          const rawEmail =
            asText(objectValue.email) ||
            asText(objectValue.admin_email) ||
            asText(objectValue.value);

          if (rawEmail && isEmailLike(rawEmail.trim())) {
            values.push(rawEmail.trim());
          }
        }
      }
    }

    if (typeof value === 'string') {
      const parts = value.split(',').map((part) => part.trim()).filter(Boolean);
      for (const part of parts) {
        if (isEmailLike(part)) {
          values.push(part);
        }
      }
    }
  }

  return [...new Set(values)];
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
  const adminEmails = parseAdminEmails(data);

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
    adminEmails,
    createdAt: doc.first_publication_date ?? new Date().toISOString(),
  };
};

export const getJobOffers = async (): Promise<JobOffer[]> => {
  if (!repositoryName) {
    return process.env.NODE_ENV === 'production' ? [] : fallbackOffers;
  }

  try {
    const client = createClient();
    const docs = await client.getAllByType('offre_emploi');

    if (docs.length === 0) {
      return process.env.NODE_ENV === 'production' ? [] : fallbackOffers;
    }

    return docs
      .map((doc) => normalizeOffer(doc as PrismicDoc))
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch (error) {
    console.error('Unable to fetch offre_emploi from Prismic:', error);
    return process.env.NODE_ENV === 'production' ? [] : fallbackOffers;
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

export const getOffersByUids = async (uids: string[]) => {
  if (uids.length === 0) {
    return [];
  }

  const set = new Set(uids.map((uid) => uid.toLowerCase()));
  const offers = await getJobOffers();

  return offers.filter((offer) => set.has(offer.uid.toLowerCase()));
};

export const getOffersPage = async (page: number, pageSize: number) => {
  const offers = await getJobOffers();
  const safePageSize = Math.max(1, pageSize);
  const total = offers.length;
  const pageCount = Math.max(1, Math.ceil(total / safePageSize));
  const currentPage = Math.min(Math.max(1, page), pageCount);
  const start = (currentPage - 1) * safePageSize;
  const paginatedOffers = offers.slice(start, start + safePageSize);

  return {
    offers: paginatedOffers,
    total,
    page: currentPage,
    pageCount,
    pageSize: safePageSize,
  };
};
