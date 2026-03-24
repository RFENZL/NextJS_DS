import { SiteHeader } from '@/components/layout/SiteHeader';
import { TagCloud } from '@/components/jobs/TagCloud';
import { getTechnologyCloud } from '@/lib/jobs';
import styles from '../site.module.css';

export default async function TechnologiesPage() {
  const tags = await getTechnologyCloud();

  return (
    <div className={styles.page}>
      <SiteHeader />
      <main className={styles.container}>
        <section className={styles.panel}>
          <h1 className={styles.panelTitle}>Nuage de technologies</h1>
          <TagCloud tags={tags} />
        </section>
      </main>
    </div>
  );
}
