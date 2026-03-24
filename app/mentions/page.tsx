import { SiteHeader } from '@/components/layout/SiteHeader';
import { getMentionsContent } from '@/lib/cms-pages';
import styles from '../site.module.css';

export default async function MentionsPage() {
  const mentions = await getMentionsContent();

  return (
    <div className={styles.page}>
      <SiteHeader />
      <main className={styles.container}>
        <section className={styles.panel}>
          <h1 className={styles.panelTitle}>{mentions.title}</h1>
          {mentions.contentParagraphs.map((paragraph) => (
            <p key={paragraph} className={styles.article}>
              {paragraph}
            </p>
          ))}
        </section>
      </main>
    </div>
  );
}
