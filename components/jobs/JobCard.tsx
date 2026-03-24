import Link from 'next/link';
import type { JobOffer } from '@/lib/jobs';
import styles from './JobCard.module.css';

type JobCardProps = {
  offer: JobOffer;
};

export function JobCard({ offer }: JobCardProps) {
  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <h3 className={styles.title}>
          <Link href={`/offres/${offer.uid}`}>{offer.title}</Link>
        </h3>
        <span className={styles.contract}>{offer.contract}</span>
      </header>
      <p className={styles.meta}>
        {offer.company} - {offer.location}
      </p>
      <p className={styles.excerpt}>{offer.excerpt}</p>
      <div className={styles.tags}>
        {offer.technologies.slice(0, 4).map((tech) => (
          <Link key={tech} href={`/technologies/${encodeURIComponent(tech.toLowerCase())}`}>
            {tech}
          </Link>
        ))}
      </div>
    </article>
  );
}
