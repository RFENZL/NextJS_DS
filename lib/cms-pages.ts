import * as prismic from '@prismicio/client';
import { createClient, repositoryName } from '@/prismicio';

type HomepageContent = {
  title: string;
  heroCaption: string;
  intro: string;
};

type ListeContent = {
  title: string;
  intro: string;
};

type ProfilContent = {
  title: string;
  intro: string;
  savedJobsTitle: string;
  historyTitle: string;
  historyText: string;
};

type MentionsContent = {
  title: string;
  contentParagraphs: string[];
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

export const getHomepageContent = async (): Promise<HomepageContent> => {
  const data = await getSingletonData('homepage');

  return {
    title: textFromField(data?.title) || 'Offres d emploi',
    heroCaption: textFromField(data?.hero_caption) || 'Nos dernieres opportunites',
    intro:
      textFromField(data?.intro) ||
      'Consultez les offres et accedez a la fiche detaillee de chaque poste.',
  };
};

export const getListeContent = async (): Promise<ListeContent> => {
  const data = await getSingletonData('liste');

  return {
    title: textFromField(data?.title) || 'Offres d emploi',
    intro: textFromField(data?.intro) || 'Toutes les annonces administrees dans Prismic.',
  };
};

export const getProfilContent = async (): Promise<ProfilContent> => {
  const data = await getSingletonData('profil');

  return {
    title: textFromField(data?.title) || 'Bienvenue',
    intro: textFromField(data?.intro) || 'Historique de candidatures et offres enregistrees.',
    savedJobsTitle: textFromField(data?.saved_jobs_title) || 'Offres enregistrees',
    historyTitle: textFromField(data?.history_title) || 'Historique des candidatures',
    historyText:
      textFromField(data?.history_text) ||
      'Vos envois de candidature s afficheront ici apres la connexion du module backend.',
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
