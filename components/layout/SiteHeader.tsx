import Link from 'next/link';
import styles from './SiteHeader.module.css';

const links = [
  { href: '/', label: 'Accueil' },
  { href: '/offres', label: 'Offres' },
  { href: '/profil', label: 'Profil' },
  { href: '/mentions', label: 'Mentions' },
];

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand}>
          DEV
        </Link>
        <nav className={styles.nav} aria-label="Navigation principale">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className={styles.link}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
