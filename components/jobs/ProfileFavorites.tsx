'use client';

import { useEffect, useMemo, useState } from 'react';
import type { JobOffer } from '@/lib/jobs';
import { getFavoriteOfferUids } from '@/lib/favorites';
import { JobGrid } from './JobGrid';

type ProfileFavoritesProps = {
  offers: JobOffer[];
  savedJobsTitle: string;
  historyTitle: string;
  historyText: string;
};

export function ProfileFavorites({
  offers,
  savedJobsTitle,
  historyTitle,
  historyText,
}: ProfileFavoritesProps) {
  const [favoriteUids, setFavoriteUids] = useState<string[]>([]);

  useEffect(() => {
    const sync = () => {
      setFavoriteUids(getFavoriteOfferUids());
    };

    sync();
    window.addEventListener('storage', sync);
    window.addEventListener('favorite-offers-change', sync as EventListener);

    return () => {
      window.removeEventListener('storage', sync);
      window.removeEventListener('favorite-offers-change', sync as EventListener);
    };
  }, []);

  const favoriteOffers = useMemo(() => {
    const set = new Set(favoriteUids.map((uid) => uid.toLowerCase()));
    return offers.filter((offer) => set.has(offer.uid.toLowerCase()));
  }, [favoriteUids, offers]);

  const unavailableCount = Math.max(0, favoriteUids.length - favoriteOffers.length);

  return (
    <>
      <p>{savedJobsTitle}</p>
      <JobGrid offers={favoriteOffers} />
      {favoriteUids.length === 0 ? <p>Aucune offre en favori pour le moment.</p> : null}
      {unavailableCount > 0 ? (
        <p>{unavailableCount} offre(s) favorite(s) ne sont plus disponibles sur Prismic.</p>
      ) : null}
      <p>{historyTitle}</p>
      <p>{historyText}</p>
    </>
  );
}
