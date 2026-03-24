'use client';

import { useEffect, useState } from 'react';
import { getFavoriteOfferUids, toggleFavoriteOfferUid } from '@/lib/favorites';
import styles from './FavoriteButton.module.css';

type FavoriteButtonProps = {
  uid: string;
};

export function FavoriteButton({ uid }: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const sync = () => {
      setIsFavorite(getFavoriteOfferUids().includes(uid));
    };

    sync();
    window.addEventListener('storage', sync);
    window.addEventListener('favorite-offers-change', sync as EventListener);

    return () => {
      window.removeEventListener('storage', sync);
      window.removeEventListener('favorite-offers-change', sync as EventListener);
    };
  }, [uid]);

  return (
    <button
      type="button"
      className={`${styles.button} ${isFavorite ? styles.active : ''}`}
      aria-label={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
      onClick={() => {
        setIsFavorite(toggleFavoriteOfferUid(uid));
      }}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 4.5a1.5 1.5 0 0 1 1.5-1.5h7A1.5 1.5 0 0 1 17 4.5v16.2a.3.3 0 0 1-.5.23L12 16.76l-4.5 4.17a.3.3 0 0 1-.5-.23z" />
      </svg>
    </button>
  );
}
