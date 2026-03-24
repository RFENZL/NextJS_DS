import { SiteHeader } from '@/components/layout/SiteHeader';
import { JobGrid } from '@/components/jobs/JobGrid';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { getJobOffers } from '@/lib/jobs';
import styles from '../site.module.css';

export default async function ProfilePage() {
  const offers = await getJobOffers();

  return (
    <div className={styles.page}>
      <SiteHeader />
      <main className={styles.container}>
        <section className={styles.panel}>
          <SectionTitle
            title="Bienvenue"
            subtitle="Historique de candidatures et offres enregistrees."
          />
          <p className={styles.article}>Offres enregistrees</p>
          <JobGrid offers={offers.slice(0, 6)} />
          <p className={styles.article}>Historique des candidatures</p>
          <p className={styles.article}>
            Vos envois de candidature s afficheront ici apres la connexion du module backend.
          </p>
        </section>
      </main>
    </div>
  );
}
