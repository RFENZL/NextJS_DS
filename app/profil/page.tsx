import { SiteHeader } from '@/components/layout/SiteHeader';
import { JobGrid } from '@/components/jobs/JobGrid';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { getProfilContent } from '@/lib/cms-pages';
import { getJobOffers } from '@/lib/jobs';
import styles from '../site.module.css';

export default async function ProfilePage() {
  const [offers, profil] = await Promise.all([getJobOffers(), getProfilContent()]);

  return (
    <div className={styles.page}>
      <SiteHeader />
      <main className={styles.container}>
        <section className={styles.panel}>
          <SectionTitle title={profil.title} subtitle={profil.intro} />
          <p className={styles.article}>{profil.savedJobsTitle}</p>
          <JobGrid offers={offers.slice(0, 6)} />
          <p className={styles.article}>{profil.historyTitle}</p>
          <p className={styles.article}>{profil.historyText}</p>
        </section>
      </main>
    </div>
  );
}
