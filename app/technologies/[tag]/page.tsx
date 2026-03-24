import { SiteHeader } from '@/components/layout/SiteHeader';
import { JobGrid } from '@/components/jobs/JobGrid';
import { getTagPageContent } from '@/lib/cms-pages';
import { getOffersByTechnology } from '@/lib/jobs';
import styles from '../../site.module.css';

type TechnologyPageProps = {
  params: Promise<{ tag: string }>;
};

export default async function TechnologyPage({ params }: TechnologyPageProps) {
  const { tag } = await params;
  const [offers, tagPage] = await Promise.all([
    getOffersByTechnology(tag),
    getTagPageContent(decodeURIComponent(tag)),
  ]);
  const decodedTag = decodeURIComponent(tag);

  return (
    <div className={styles.page}>
      <SiteHeader />
      <main className={styles.container}>
        <section className={styles.panel}>
          <h1 className={styles.panelTitle}>{tagPage.title}</h1>
          <p className={styles.article}>{tagPage.intro}</p>
          <p className={styles.article}>Tag: {decodedTag}</p>
          <JobGrid offers={offers} />
        </section>
      </main>
    </div>
  );
}
