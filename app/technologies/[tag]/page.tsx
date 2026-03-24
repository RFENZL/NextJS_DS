import { SiteHeader } from '@/components/layout/SiteHeader';
import { JobGrid } from '@/components/jobs/JobGrid';
import { getOffersByTechnology } from '@/lib/jobs';
import styles from '../../site.module.css';

type TechnologyPageProps = {
  params: Promise<{ tag: string }>;
};

export default async function TechnologyPage({ params }: TechnologyPageProps) {
  const { tag } = await params;
  const offers = await getOffersByTechnology(tag);
  const decodedTag = decodeURIComponent(tag);

  return (
    <div className={styles.page}>
      <SiteHeader />
      <main className={styles.container}>
        <section className={styles.panel}>
          <h1 className={styles.panelTitle}>Techno {decodedTag}</h1>
          <JobGrid offers={offers} />
        </section>
      </main>
    </div>
  );
}
