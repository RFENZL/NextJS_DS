'use client';

import { useState } from 'react';
import type { JobOffer } from '@/lib/jobs';
import styles from './ApplicationForm.module.css';

type ApplicationFormProps = {
  offer: JobOffer;
};

export function ApplicationForm({ offer }: ApplicationFormProps) {
  const [done, setDone] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  return (
    <section className={styles.wrapper}>
      <h2>Candidature</h2>
      <form
        className={styles.form}
        onSubmit={async (event) => {
          event.preventDefault();
          setError('');
          setIsSubmitting(true);

          const formData = new FormData(event.currentTarget);
          const email = String(formData.get('email') ?? '');
          const message = String(formData.get('message') ?? '');

          try {
            const response = await fetch('/api/candidature', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                offerUid: offer.uid,
                offerTitle: offer.title,
                applicantEmail: email,
                message,
                adminEmails: offer.adminEmails,
              }),
            });

            if (!response.ok) {
              throw new Error('Envoi impossible');
            }

            setDone(true);
            event.currentTarget.reset();
          } catch {
            setError('Une erreur est survenue pendant l envoi.');
          } finally {
            setIsSubmitting(false);
          }
        }}
      >
        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" required />
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" rows={4} required />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Envoi...' : 'Envoyer'}
        </button>
      </form>

      {error ? <p className={styles.error}>{error}</p> : null}

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
