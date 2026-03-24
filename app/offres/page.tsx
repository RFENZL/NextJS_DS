import { JobGrid } from '@/components/jobs/JobGrid';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { getJobOffers } from '@/lib/jobs';
import styles from '../site.module.css';

export default async function OffersPage() {
  const offers = await getJobOffers();

  return (
    <div className={styles.page}>
      <SiteHeader />
      <main className={styles.container}>
        <section className={styles.panel}>
          <SectionTitle
            title="Offres d'emploi"
            subtitle="Toutes les annonces administrees dans Prismic."
          />
          <JobGrid offers={offers} />
        </section>
      </main>
    </div>
  );
}
