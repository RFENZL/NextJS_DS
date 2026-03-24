import Link from 'next/link';
import styles from './TagCloud.module.css';

type TechnologyTag = {
  name: string;
  count: number;
  slug: string;
};

type TagCloudProps = {
  tags: TechnologyTag[];
};

export function TagCloud({ tags }: TagCloudProps) {
  if (tags.length === 0) {
    return <p className={styles.empty}>Aucune technologie pour le moment.</p>;
  }

  return (
    <ul className={styles.cloud}>
      {tags.map((tag) => (
        <li key={tag.name}>
          <Link href={`/technologies/${tag.slug}`}>
            {tag.name} <span>{tag.count}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
