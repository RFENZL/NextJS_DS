import type { RichTextField } from '@prismicio/client';
import {
  PrismicRichText as BasePrismicRichText,
  type JSXMapSerializer,
} from '@prismicio/react';
import styles from './PrismicRichText.module.css';

type PrismicRichTextProps = {
  field: RichTextField;
  components?: JSXMapSerializer;
};

const defaultComponents: JSXMapSerializer = {
  heading1: ({ children }) => <h1>{children}</h1>,
  heading2: ({ children }) => <h2>{children}</h2>,
  heading3: ({ children }) => <h3>{children}</h3>,
  paragraph: ({ children }) => <p>{children}</p>,
  hyperlink: ({ children, node }) => (
    <a href={node.data.url ?? '#'} target="_blank" rel="noreferrer">
      {children}
    </a>
  ),
};

export function PrismicRichText({ field, components }: PrismicRichTextProps) {
  return (
    <div className={styles.richText}>
      <BasePrismicRichText field={field} components={components ?? defaultComponents} />
    </div>
  );
}
