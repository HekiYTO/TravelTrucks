import { FaStar } from 'react-icons/fa';
import { FiMapPin } from 'react-icons/fi';
import { reviewsLabel } from '@/utils/format';
import { toStars } from '@/utils/rating';
import css from './Rating.module.css';

// "★ 4.4(2 Reviews) | Kyiv, Ukraine"
export function RatingLocation({
  rating,
  totalReviews,
  location,
}: {
  rating: number;
  totalReviews: number;
  location: string;
}) {
  return (
    <div className={css.meta}>
      <span className={css.item}>
        <FaStar className={css.star} aria-hidden="true" />
        {rating}({reviewsLabel(totalReviews)})
      </span>
      <span className={css.item}>
        <FiMapPin aria-hidden="true" />
        {location}
      </span>
    </div>
  );
}

// П'ятизіркова шкала для відгуків.
export function Stars({ rating }: { rating: number }) {
  return (
    <span className={css.stars} role="img" aria-label={`Rating ${rating} out of 5`}>
      {toStars(rating).map((filled, i) => (
        <FaStar key={i} className={filled ? css.star : css.emptyStar} aria-hidden="true" />
      ))}
    </span>
  );
}
