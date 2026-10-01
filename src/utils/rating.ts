// Для п'ятизіркової шкали: повертає масив із 5 булевих значень (true = зафарбована зірка).
export function toStars(rating: number): boolean[] {
  const rounded = Math.round(rating);
  return Array.from({ length: 5 }, (_, i) => i < rounded);
}
