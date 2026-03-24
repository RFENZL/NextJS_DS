import Link from 'next/link';
import { JobGrid } from '@/components/jobs/JobGrid';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { getListeContent } from '@/lib/cms-pages';
import { getOffersPage } from '@/lib/jobs';
import styles from '../site.module.css';

type OffersPageProps = {
  searchParams: Promise<{ page?: string }>;
};

export default async function OffersPage({ searchParams }: OffersPageProps) {
  const params = await searchParams;
  const requestedPage = Number.parseInt(params.page ?? '1', 10);
  const safeRequestedPage = Number.isNaN(requestedPage) ? 1 : requestedPage;
  const liste = await getListeContent();
  const paged = await getOffersPage(safeRequestedPage, liste.pageSize);
  const previousPage = paged.page > 1 ? paged.page - 1 : null;
  const nextPage = paged.page < paged.pageCount ? paged.page + 1 : null;

  return (
    <div className={styles.page}>
      <SiteHeader />
      <main className={styles.container}>
        <section className={styles.panel}>
          <SectionTitle title={liste.title} subtitle={liste.intro} />
          <div className={styles.topBar}>
            <p>
              Page {paged.page} / {paged.pageCount} - {paged.total} offre(s)
            </p>
            <div className={styles.actions}>
              {previousPage ? <Link href={`/offres?page=${previousPage}`}>Precedent</Link> : null}
              {nextPage ? <Link href={`/offres?page=${nextPage}`}>Suivant</Link> : null}
            </div>
          </div>
          <JobGrid offers={paged.offers} />
        </section>
      </main>
    </div>
  );
}
