import Link from 'next/link';
import type { JobOffer } from '@/lib/jobs';
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
        <button type="button" className={styles.bookmark} aria-label="Epingler cette offre">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M7 4.5a1.5 1.5 0 0 1 1.5-1.5h7A1.5 1.5 0 0 1 17 4.5v16.2a.3.3 0 0 1-.5.23L12 16.76l-4.5 4.17a.3.3 0 0 1-.5-.23z" />
          </svg>
        </button>
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
