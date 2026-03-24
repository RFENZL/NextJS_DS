import Image from 'next/image';
import Link from 'next/link';
import { JobGrid } from '@/components/jobs/JobGrid';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { getHomepageContent } from '@/lib/cms-pages';
import { getJobOffers } from '@/lib/jobs';
import styles from './site.module.css';

export default async function HomePage() {
  const [offers, homepage] = await Promise.all([getJobOffers(), getHomepageContent()]);

  return (
    <div className={styles.page}>
      <SiteHeader />
      <main className={styles.container}>
        {homepage.heroImageUrl ? (
          <section className={styles.heroImageWrap}>
            <Image
              src={homepage.heroImageUrl}
              alt="Hero"
              width={1600}
              height={500}
              className={styles.heroImage}
              unoptimized
            />
          </section>
        ) : null}

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
      </main>
    </div>
  );
}
