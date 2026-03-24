import Link from 'next/link';
import { SiteHeader } from '@/components/layout/SiteHeader';
import styles from './site.module.css';

export default function NotFound() {
  return (
    <div className={styles.page}>
      <SiteHeader />
      <main className={styles.container}>
        <section className={styles.panel}>
          <h1 className={styles.panelTitle}>Page introuvable</h1>
          <p className={styles.article}>Cette page n existe pas ou n est plus disponible.</p>
          <div className={styles.actions}>
            <Link href="/">Retour a l accueil</Link>
          </div>
        </section>
      </main>
    </div>
  );
}
