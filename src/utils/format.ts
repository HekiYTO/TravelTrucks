import type { CamperCoverImage } from '@/lib/api/types';

export const formatPrice = (price: number | string) => `€${Math.round(Number(price))}`;

// "panelVan" / "panel_van" / "petrol" -> "Panel Van" / "Petrol". Слова з великих літер (AC) не чіпаємо.
export function humanize(value: string): string {
  return value
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[_-]+/g, ' ')
    .trim()
    .split(/\s+/)
    .map((w) => (w === w.toUpperCase() ? w : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()))
    .join(' ');
}

// Якщо значення просто число, дописуємо одиницю виміру; якщо вже з одиницею, лишаємо як є.
export function withUnit(value: string | number | null | undefined, unit: string): string {
  if (value === null || value === undefined || value === '') return '—';
  const text = String(value).trim();
  return /^\d+([.,]\d+)?$/.test(text) ? `${text} ${unit}` : text;
}

// coverImage може бути рядком або об'єктом { thumb, original }.
export function getImageUrl(
  image: string | CamperCoverImage | null | undefined,
  prefer: 'thumb' | 'original' = 'original',
): string | null {
  if (!image) return null;
  if (typeof image === 'string') return image;
  return (prefer === 'thumb' ? image.thumb ?? image.original : image.original ?? image.thumb) ?? null;
}

export const reviewsLabel = (count: number) => `${count} ${count === 1 ? 'Review' : 'Reviews'}`;
