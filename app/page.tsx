import Image from 'next/image';
import Link from 'next/link';
import { JobGrid } from '@/components/jobs/JobGrid';
import { TagCloud } from '@/components/jobs/TagCloud';
import { SiteHeader } from '@/components/layout/SiteHeader';
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
        <section className={styles.heroImageWrap}>
          {homepage.heroImageUrl ? (
            <Image
              src={homepage.heroImageUrl}
              alt="Hero"
              width={1600}
              height={500}
              className={styles.heroImage}
              unoptimized
            />
          ) : (
            <div className={styles.heroPlaceholder} />
          )}
        </section>

        <section className={styles.panel}>
          <h1 className={styles.sectionTitle}>{homepage.heroCaption}</h1>
          <p className={styles.sectionIntro}>{homepage.intro}</p>
          <div className={styles.topBar}>
            <p className={styles.countText}>📁 {offers.length} offres</p>
          </div>
          <JobGrid offers={offers.slice(0, 6)} />
          <div className={styles.centerAction}>
            <Link href="/offres" className={styles.primaryButton}>
              Voir toutes les offres
            </Link>
          </div>
        </section>

        <section className={styles.panel}>
          <h2 className={styles.panelTitle}>Technologies</h2>
          <TagCloud tags={tags} />
        </section>
      </main>
    </div>
  );
}
