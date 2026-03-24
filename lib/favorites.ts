const FAVORITES_KEY = 'favorite-offers';

export const getFavoriteOfferUids = (): string[] => {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(FAVORITES_KEY);

    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter((value): value is string => typeof value === 'string');
  } catch {
    return [];
  }
};

export const setFavoriteOfferUids = (uids: string[]) => {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(FAVORITES_KEY, JSON.stringify([...new Set(uids)]));
  window.dispatchEvent(new CustomEvent('favorite-offers-change'));
};

export const toggleFavoriteOfferUid = (uid: string) => {
  const favorites = getFavoriteOfferUids();

  if (favorites.includes(uid)) {
    setFavoriteOfferUids(favorites.filter((value) => value !== uid));
    return false;
  }

  setFavoriteOfferUids([...favorites, uid]);
  return true;
};
