import { PrismicText } from '@prismicio/react';
import { Bounded } from '@/components/prismic/Bounded';
import { PrismicRichText } from '@/components/prismic/PrismicRichText';
import styles from './index.module.css';

type HeroProps = {
  slice: {
    primary?: {
      title?: unknown;
      subtitle?: unknown;
    };
  };
};

export default function Hero({ slice }: HeroProps) {
  return (
    <Bounded>
      <section className={styles.hero}>
        <h1 className={styles.title}>
          <PrismicText field={(slice.primary?.title as any) ?? []} fallback="Offres d'emploi" />
        </h1>
        <div className={styles.subtitle}>
          <PrismicRichText field={(slice.primary?.subtitle as any) ?? []} />
        </div>
      </section>
    </Bounded>
  );
}
