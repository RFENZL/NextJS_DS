import Link from 'next/link';
import type { JobOffer } from '@/lib/jobs';
import { FavoriteButton } from './FavoriteButton';
import styles from './JobCard.module.css';

type JobCardProps = {
  offer: JobOffer;
};

const formatDate = (value: string) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return '01/01/2026';
  }

  return date.toLocaleDateString('fr-FR');
};

export function JobCard({ offer }: JobCardProps) {
  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <h3 className={styles.title}>
          <Link href={`/offres/${offer.uid}`}>{offer.title}</Link>
        </h3>
        <FavoriteButton uid={offer.uid} />
      </header>
      <p className={styles.date}>📅 {formatDate(offer.createdAt)}</p>
      <p className={styles.techs}>
        {'<>'}{' '}
        {offer.technologies.slice(0, 3).map((tech, index) => (
          <span key={tech}>
            <Link href={`/technologies/${encodeURIComponent(tech.toLowerCase())}`}>{tech}</Link>
            {index < Math.min(offer.technologies.length, 3) - 1 ? ', ' : ''}
          </span>
        ))}
      </p>
      <p className={styles.excerpt}>{offer.excerpt}</p>
    </article>
  );
}
