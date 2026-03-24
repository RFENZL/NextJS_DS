import Link from 'next/link';
import { JobGrid } from '@/components/jobs/JobGrid';
import { TagCloud } from '@/components/jobs/TagCloud';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { getJobOffers, getTechnologyCloud } from '@/lib/jobs';
import styles from './site.module.css';

export default async function HomePage() {
  const [offers, tags] = await Promise.all([getJobOffers(), getTechnologyCloud()]);

  return (
    <div className={styles.page}>
      <SiteHeader />
      <main className={styles.container}>
        <section className={styles.hero}>
          <p>Nos dernieres opportunites</p>
        </section>

        <section className={styles.panel}>
          <SectionTitle
            title="Offres d'emploi"
            subtitle="Consultez les offres et accedez a la fiche detaillee de chaque poste."
          />
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
