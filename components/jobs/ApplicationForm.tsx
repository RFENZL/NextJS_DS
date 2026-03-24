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

  return (
    <section className={styles.wrapper}>
      <h2>Candidature</h2>
      <form
        className={styles.form}
        onSubmit={async (event) => {
          event.preventDefault();
          setIsSubmitting(true);

          const formData = new FormData(event.currentTarget);
          const email = String(formData.get('email') ?? '');
          const message = String(formData.get('message') ?? '');

          try {
            await fetch('/api/candidature', {
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
          } catch {
            console.info('Candidature email logic is simulated in this project.');
          } finally {
            setDone(true);
            event.currentTarget.reset();
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

      <p className={styles.info}>La fonctionnalite email est fake mais fonctionnelle.</p>

      {done ? (
        <div className={styles.popup} role="status" aria-live="polite">
          <p>Merci, la candidature est enregistree (envoi email simule).</p>
          <button type="button" onClick={() => setDone(false)}>
            Fermer
          </button>
        </div>
      ) : null}
    </section>
  );
}
