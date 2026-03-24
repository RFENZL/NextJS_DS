import { SiteHeader } from '@/components/layout/SiteHeader';
import { ProfileFavorites } from '@/components/jobs/ProfileFavorites';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { getProfilContent } from '@/lib/cms-pages';
import { getJobOffers } from '@/lib/jobs';
import styles from '../site.module.css';

export default async function ProfilePage() {
  const profil = await getProfilContent();
  const offers = await getJobOffers();

  return (
    <div className={styles.page}>
      <SiteHeader />
      <main className={styles.container}>
        <section className={styles.panel}>
          <SectionTitle title={profil.title} subtitle={profil.intro} />
          <ProfileFavorites
            offers={offers}
            savedJobsTitle={profil.savedJobsTitle}
            historyTitle={profil.historyTitle}
            historyText={profil.historyText}
          />
        </section>
      </main>
    </div>
  );
}
