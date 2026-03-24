import { PrismicText } from '@prismicio/react';
import { JobGrid } from '@/components/jobs/JobGrid';
import { Bounded } from '@/components/prismic/Bounded';
import { getJobOffers } from '@/lib/jobs';
import styles from './index.module.css';

type OffersListProps = {
  slice: {
    primary?: {
      title?: unknown;
    };
  };
};

export default async function OffersList({ slice }: OffersListProps) {
  const offers = await getJobOffers();

  return (
    <Bounded>
      <section className={styles.section}>
        <h2 className={styles.title}>
          <PrismicText field={(slice.primary?.title as any) ?? []} fallback="Offres" />
        </h2>
        <JobGrid offers={offers} />
      </section>
    </Bounded>
  );
}
