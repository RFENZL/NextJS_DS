import * as prismic from '@prismicio/client';

export const repositoryName = process.env.PRISMIC_REPOSITORY_NAME ?? '';

const defaultFetchOptions = {
  next: {
    revalidate: process.env.NODE_ENV === 'production' ? 60 : 5,
  },
} as any;

const routes: prismic.ClientConfig['routes'] = [
  {
    type: 'offre_emploi',
    path: '/offres/:uid',
  },
];

export const createClient = (config: prismic.ClientConfig = {}) => {
  if (!repositoryName) {
    throw new Error('Missing PRISMIC_REPOSITORY_NAME environment variable.');
  }

  return prismic.createClient(repositoryName, {
    routes,
    fetchOptions: defaultFetchOptions,
    ...config,
  });
};
