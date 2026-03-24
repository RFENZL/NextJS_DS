import { notFound } from 'next/navigation';
import { ApplicationForm } from '@/components/jobs/ApplicationForm';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { getSinglePageContent } from '@/lib/cms-pages';
import { getJobByUid } from '@/lib/jobs';
import styles from '../../site.module.css';

type JobDetailProps = {
  params: Promise<{ uid: string }>;
};

export default async function JobDetailPage({ params }: JobDetailProps) {
  const { uid } = await params;
  const [offer, singlePage] = await Promise.all([getJobByUid(uid), getSinglePageContent(uid)]);

  if (!offer) {
    notFound();
  }

  return (
    <div className={styles.page}>
      <SiteHeader />
      <main className={styles.container}>
        <section className={styles.panel}>
          <h1 className={styles.panelTitle}>{offer.title}</h1>
          <p className={styles.article}>
            {offer.company} - {offer.location} - {offer.contract}
          </p>
          {singlePage.intro ? <p className={styles.article}>{singlePage.intro}</p> : null}
          <p className={styles.article}>{offer.description}</p>
        </section>

        {singlePage.showApplyForm ? <ApplicationForm offer={offer} /> : null}
      </main>
    </div>
  );
}
