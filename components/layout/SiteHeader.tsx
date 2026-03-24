import Link from 'next/link';
import styles from './SiteHeader.module.css';

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand}>
          <span className={styles.logoIcon}>▱</span>
          DEV
        </Link>
        <Link href="/profil" className={styles.profileLink} aria-label="Profil">
          ⊙
        </Link>
      </div>
    </header>
  );
}
