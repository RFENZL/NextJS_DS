'use client';

import { useState } from 'react';
import styles from './ApplicationForm.module.css';

export function ApplicationForm() {
  const [done, setDone] = useState(false);

  return (
    <section className={styles.wrapper}>
      <h2>Candidature</h2>
      <form
        className={styles.form}
        onSubmit={(event) => {
          event.preventDefault();
          setDone(true);
        }}
      >
        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" required />
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" rows={4} required />
        <button type="submit">Envoyer</button>
      </form>

      {done ? (
        <div className={styles.popup} role="status" aria-live="polite">
          <p>Merci, votre candidature a bien ete enregistree.</p>
          <button type="button" onClick={() => setDone(false)}>
            Fermer
          </button>
        </div>
      ) : null}
    </section>
  );
}
