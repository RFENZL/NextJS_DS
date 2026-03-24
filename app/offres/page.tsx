import { JobGrid } from '@/components/jobs/JobGrid';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { getListeContent } from '@/lib/cms-pages';
import { getJobOffers } from '@/lib/jobs';
import styles from '../site.module.css';

export default async function OffersPage() {
  const [offers, liste] = await Promise.all([getJobOffers(), getListeContent()]);

  return (
    <div className={styles.page}>
      <SiteHeader />
      <main className={styles.container}>
        <section className={styles.panel}>
          <SectionTitle title={liste.title} subtitle={liste.intro} />
          <JobGrid offers={offers} />
        </section>
      </main>
    </div>
  );
}
