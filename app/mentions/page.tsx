import { SiteHeader } from '@/components/layout/SiteHeader';
import styles from '../site.module.css';

export default function MentionsPage() {
  return (
    <div className={styles.page}>
      <SiteHeader />
      <main className={styles.container}>
        <section className={styles.panel}>
          <h1 className={styles.panelTitle}>Mentions legales</h1>
          <p className={styles.article}>
            Ce site est un projet pedagogique de gestion d offres d emploi. Les contenus affiches
            sont fournis a titre d exercice. Pour toute demande, contactez l administrateur de la
            formation.
          </p>
          <p className={styles.article}>
            Editeur: Projet NextJS DS - Hebergement: Vercel - Donnees emploi: Prismic.
          </p>
        </section>
      </main>
    </div>
  );
}
