import { Bounded } from '@/components/prismic/Bounded';
import { PrismicRichText } from '@/components/prismic/PrismicRichText';
import styles from './index.module.css';

type TextBlockProps = {
  slice: {
    primary?: {
      content?: unknown;
    };
  };
};

export default function TextBlock({ slice }: TextBlockProps) {
  return (
    <Bounded>
      <section className={styles.section}>
        <PrismicRichText field={(slice.primary?.content as any) ?? []} />
      </section>
    </Bounded>
  );
}
