import * as prismic from '@prismicio/client';
import { createClient, repositoryName } from '@/prismicio';

type HomepageContent = {
  title: string;
  heroCaption: string;
  intro: string;
  heroImageUrl: string;
  heroFrameEnabled: boolean;
  heroFrameColor: string;
  heroFrameWidth: number;
};

type ListeContent = {
  title: string;
  intro: string;
  pageSize: number;
};

type ProfilContent = {
  title: string;
  intro: string;
  savedJobsTitle: string;
  historyTitle: string;
  historyText: string;
  pinnedOfferUids: string[];
};

type MentionsContent = {
  title: string;
  contentParagraphs: string[];
};

type TagPageContent = {
  title: string;
  intro: string;
};

type SinglePageContent = {
  intro: string;
  showApplyForm: boolean;
};

const textFromField = (value: unknown) => {
  if (typeof value === 'string') {
    return value;
  }

  if (Array.isArray(value)) {
    return prismic.asText(value as prismic.RichTextField) || '';
  }

  return '';
};

const getSingletonData = async (type: string) => {
  if (!repositoryName) {
    return null;
  }

  try {
    const client = createClient();
    const doc = await client.getSingle(type as any);
    return (doc?.data as Record<string, unknown>) ?? null;
  } catch {
    return null;
  }
};

const getByUidData = async (type: string, uid: string) => {
  if (!repositoryName) {
    return null;
  }

  try {
    const client = createClient();
    const doc = await client.getByUID(type as any, uid);
    return (doc?.data as Record<string, unknown>) ?? null;
  } catch {
    return null;
  }
};

export const getHomepageContent = async (): Promise<HomepageContent> => {
  const data = await getSingletonData('homepage');
  const heroImage =
    data?.hero_image && typeof data.hero_image === 'object'
      ? (data.hero_image as Record<string, unknown>)
      : null;
  const heroImageUrl = typeof heroImage?.url === 'string' ? heroImage.url : '';
  const heroFrameEnabled = data?.hero_frame_enabled === true;
  const heroFrameColorRaw = typeof data?.hero_frame_color === 'string' ? data.hero_frame_color : '';
  const heroFrameColor = heroFrameColorRaw.trim() || '#1e90ff';
  const heroFrameWidthRaw = data?.hero_frame_width;
  const heroFrameWidth =
    typeof heroFrameWidthRaw === 'number' && Number.isFinite(heroFrameWidthRaw)
      ? Math.max(1, Math.min(12, Math.round(heroFrameWidthRaw)))
      : 3;

  return {
    title: textFromField(data?.title) || 'Offres d emploi',
    heroCaption: textFromField(data?.hero_caption) || 'Nos dernieres opportunites',
    intro:
      textFromField(data?.intro) ||
      'Consultez les offres et accedez a la fiche detaillee de chaque poste.',
    heroImageUrl,
    heroFrameEnabled,
    heroFrameColor,
    heroFrameWidth,
  };
};

export const getListeContent = async (): Promise<ListeContent> => {
  const data = await getSingletonData('liste');
  const pageSizeRaw = data?.page_size;
  const pageSize = typeof pageSizeRaw === 'number' && Number.isFinite(pageSizeRaw)
    ? Math.max(1, Math.min(50, Math.round(pageSizeRaw)))
    : 9;

  return {
    title: textFromField(data?.title) || 'Offres d emploi',
    intro: textFromField(data?.intro) || 'Toutes les annonces administrees dans Prismic.',
    pageSize,
  };
};

export const getProfilContent = async (): Promise<ProfilContent> => {
  const data = await getSingletonData('profil');
  const pinnedOfferUids: string[] = [];
  const pinnedRaw = data?.pinned_offers;

  if (Array.isArray(pinnedRaw)) {
    for (const item of pinnedRaw) {
      if (!item || typeof item !== 'object') {
        continue;
      }

      const objectValue = item as Record<string, unknown>;
      const rawLink = objectValue.offer;

      if (rawLink && typeof rawLink === 'object') {
        const linkValue = rawLink as Record<string, unknown>;
        const uid = typeof linkValue.uid === 'string' ? linkValue.uid : '';

        if (uid) {
          pinnedOfferUids.push(uid);
        }
      }
    }
  }

  return {
    title: textFromField(data?.title) || 'Bienvenue',
    intro: textFromField(data?.intro) || 'Historique de candidatures et offres enregistrees.',
    savedJobsTitle: textFromField(data?.saved_jobs_title) || 'Offres enregistrees',
    historyTitle: textFromField(data?.history_title) || 'Historique des candidatures',
    historyText:
      textFromField(data?.history_text) ||
      'Vos envois de candidature s afficheront ici apres la connexion du module backend.',
    pinnedOfferUids: [...new Set(pinnedOfferUids)],
  };
};

export const getMentionsContent = async (): Promise<MentionsContent> => {
  const data = await getSingletonData('mentions');
  const contentText = textFromField(data?.content);

  return {
    title: textFromField(data?.title) || 'Mentions legales',
    contentParagraphs: contentText
      ? contentText.split('\n').map((line) => line.trim()).filter(Boolean)
      : [
          'Ce site est un projet pedagogique de gestion d offres d emploi. Les contenus affiches sont fournis a titre d exercice.',
          'Editeur: Projet NextJS DS - Hebergement: Vercel - Donnees emploi: Prismic.',
        ],
  };
};

export const getTagPageContent = async (uid: string): Promise<TagPageContent> => {
  const data = await getByUidData('tag', uid);

  return {
    title: textFromField(data?.title) || `Techno ${uid}`,
    intro: textFromField(data?.intro) || 'Offres reliees a cette technologie.',
  };
};

export const getSinglePageContent = async (uid: string): Promise<SinglePageContent> => {
  const data = await getByUidData('single', uid);

  return {
    intro: textFromField(data?.job_intro),
    showApplyForm: data?.show_apply_form !== false,
  };
};
