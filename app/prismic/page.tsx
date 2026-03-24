import { SliceZone } from '@prismicio/react';
import { components } from '@/slices';
import { createClient, repositoryName } from '@/prismicio';
import styles from './page.module.css';

export default async function PrismicPage() {
  if (!repositoryName) {
    return (
      <main className={styles.page}>
        <h1>Prismic non configure</h1>
        <p>Ajoute PRISMIC_REPOSITORY_NAME dans .env.local.</p>
      </main>
    );
  }

  try {
    const client = createClient();
    const pages = await client.getAllByType('page', { pageSize: 1 });
    const page = pages[0];
    const data = (page?.data as Record<string, unknown>) ?? {};
    const slices = (data.slices as any[]) ?? [];

    return (
      <main className={styles.page}>
        <SliceZone slices={slices} components={components} />
      </main>
    );
  } catch {
    return (
      <main className={styles.page}>
        <h1>Document Prismic introuvable</h1>
        <p>Cree un type page avec un champ Slice Zone nomme slices puis publie un document.</p>
      </main>
    );
  }
}
