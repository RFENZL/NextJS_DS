import Link from 'next/link';
import { JobGrid } from '@/components/jobs/JobGrid';
import { TagCloud } from '@/components/jobs/TagCloud';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { getHomepageContent } from '@/lib/cms-pages';
import { getJobOffers, getTechnologyCloud } from '@/lib/jobs';
import styles from './site.module.css';

export default async function HomePage() {
  const [offers, tags, homepage] = await Promise.all([
    getJobOffers(),
    getTechnologyCloud(),
    getHomepageContent(),
  ]);

  return (
    <div className={styles.page}>
      <SiteHeader />
      <main className={styles.container}>
        <section className={styles.hero}>
          <p>{homepage.heroCaption}</p>
        </section>

        <section className={styles.panel}>
          <SectionTitle title={homepage.title} subtitle={homepage.intro} />
          <div className={styles.topBar}>
            <p>{offers.length} offre(s) disponible(s)</p>
            <div className={styles.actions}>
              <Link href="/offres">Voir la liste</Link>
            </div>
          </div>
          <JobGrid offers={offers.slice(0, 9)} />
        </section>

        <section className={styles.panel}>
          <h2 className={styles.panelTitle}>Technologies</h2>
          <TagCloud tags={tags} />
        </section>
      </main>
    </div>
  );
}
