'use client';

import { Stars } from '@/components/Rating/Rating';
import { useReviews } from '@/lib/api/hooks';
import css from './ReviewList.module.css';

export default function ReviewList({ camperId }: { camperId: string }) {
  const { data: reviews, isLoading, isError } = useReviews(camperId);

  return (
    <section aria-labelledby="reviews-title">
      <h2 id="reviews-title" className={css.title}>
        Reviews
      </h2>

      {isLoading && <p className={css.note}>Loading reviews...</p>}
      {isError && <p className={css.note}>Could not load reviews.</p>}
      {reviews && reviews.length === 0 && <p className={css.note}>No reviews yet.</p>}

      {reviews && reviews.length > 0 && (
        <ul className={css.list}>
          {reviews.map((review) => (
            <li key={review.id} className={css.item}>
              <div className={css.author}>
                <span className={css.avatar} aria-hidden="true">
                  {review.reviewer_name.charAt(0).toUpperCase()}
                </span>
                <div>
                  <p className={css.name}>{review.reviewer_name}</p>
                  <Stars rating={review.reviewer_rating} />
                </div>
              </div>
              <p className={css.comment}>{review.comment}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
