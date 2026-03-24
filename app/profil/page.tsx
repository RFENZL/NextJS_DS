import { SiteHeader } from '@/components/layout/SiteHeader';
import { JobGrid } from '@/components/jobs/JobGrid';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { getProfilContent } from '@/lib/cms-pages';
import { getJobOffers, getOffersByUids } from '@/lib/jobs';
import styles from '../site.module.css';

export default async function ProfilePage() {
  const profil = await getProfilContent();
  const pinnedOffers = await getOffersByUids(profil.pinnedOfferUids);
  const fallbackOffers = await getJobOffers();
  const offersToDisplay = pinnedOffers.length > 0 ? pinnedOffers : fallbackOffers.slice(0, 6);
  const missingPinnedCount = Math.max(0, profil.pinnedOfferUids.length - pinnedOffers.length);

  return (
    <div className={styles.page}>
      <SiteHeader />
      <main className={styles.container}>
        <section className={styles.panel}>
          <SectionTitle title={profil.title} subtitle={profil.intro} />
          <p className={styles.article}>{profil.savedJobsTitle}</p>
          <JobGrid offers={offersToDisplay} />
          {missingPinnedCount > 0 ? (
            <p className={styles.article}>
              {missingPinnedCount} offre(s) pinee(s) ne sont plus disponibles sur Prismic.
            </p>
          ) : null}
          <p className={styles.article}>{profil.historyTitle}</p>
          <p className={styles.article}>{profil.historyText}</p>
        </section>
      </main>
    </div>
  );
}
