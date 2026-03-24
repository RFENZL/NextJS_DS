import type { JobOffer } from '@/lib/jobs';
import { JobCard } from './JobCard';
import styles from './JobGrid.module.css';

type JobGridProps = {
  offers: JobOffer[];
};

export function JobGrid({ offers }: JobGridProps) {
  if (offers.length === 0) {
    return <p className={styles.empty}>Aucune offre disponible.</p>;
  }

  return (
    <div className={styles.grid}>
      {offers.map((offer) => (
        <JobCard key={offer.id} offer={offer} />
      ))}
    </div>
  );
}
