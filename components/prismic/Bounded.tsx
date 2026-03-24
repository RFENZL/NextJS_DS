import type { ComponentPropsWithoutRef } from 'react';
import styles from './Bounded.module.css';

type BoundedProps = ComponentPropsWithoutRef<'section'>;

export function Bounded({ className, children, ...rest }: BoundedProps) {
  const classes = className ? `${styles.bounded} ${className}` : styles.bounded;

  return (
    <section className={classes} {...rest}>
      <div className={styles.content}>{children}</div>
    </section>
  );
}
