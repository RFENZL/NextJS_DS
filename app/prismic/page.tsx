import * as prismic from '@prismicio/client';
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
    const docs = await client.getAllByType('mentions', { pageSize: 1 });
    const doc = docs[0];
    const data = (doc?.data as Record<string, unknown>) ?? {};
    const title =
      (typeof data.title === 'string' && data.title) ||
      prismic.asText((data.title as prismic.RichTextField) ?? []) ||
      'Mentions legales';
    const content = (data.content as prismic.RichTextField) ?? [];

    return (
      <main className={styles.page}>
        <h1>{title}</h1>
        <div>
          {prismic.asText(content)
            .split('\n')
            .filter(Boolean)
            .map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
        </div>
      </main>
    );
  } catch {
    return (
      <main className={styles.page}>
        <h1>Document Prismic introuvable</h1>
        <p>Cree et publie un document mentions dans Prismic.</p>
      </main>
    );
  }
}
