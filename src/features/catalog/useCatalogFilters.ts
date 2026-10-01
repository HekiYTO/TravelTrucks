'use client';

import { useState } from 'react';
import type { CampersFilters } from '@/lib/api/types';

const EMPTY: CampersFilters = { location: '', form: '', engine: '', transmission: '' };

// Чернетка фільтрів (те, що користувач вибирає) і застосовані фільтри
// (те, що йде в запит після натискання Search).
// Тип кузова, двигун і трансмісія: можна обрати лише один варіант,
// тому кожне значення це рядок, а повторний клік на радіо-кнопку не знімає вибір.
export function useCatalogFilters() {
  const [draft, setDraft] = useState<CampersFilters>(EMPTY);
  const [applied, setApplied] = useState<CampersFilters>(EMPTY);

  const setField = (key: keyof CampersFilters, value: string) =>
    setDraft((prev) => ({ ...prev, [key]: value }));

  const search = () => setApplied({ ...draft, location: draft.location?.trim() ?? '' });

  const clear = () => {
    setDraft(EMPTY);
    setApplied(EMPTY);
  };

  return { draft, applied, setField, search, clear };
}
