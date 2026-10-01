import { FiSearch, FiX } from 'react-icons/fi';
import Button from '@/components/Button/Button';
import css from './EmptyState.module.css';

export default function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className={css.box}>
      <svg className={css.art} viewBox="0 0 240 150" fill="none" stroke="#98a2b3" strokeWidth="1.5" aria-hidden="true">
        <path d="M10 110 L70 40 L100 75 L130 30 L200 110" />
        <rect x="55" y="85" width="105" height="40" rx="8" />
        <path d="M70 85 V70 H140 L160 85" />
        <circle cx="85" cy="128" r="9" />
        <circle cx="135" cy="128" r="9" />
      </svg>
      <span className={css.magnifier}>
        <FiSearch aria-hidden="true" />
      </span>
      <h2 className={css.title}>No campers found</h2>
      <p className={css.text}>
        We couldn&apos;t find any campers that match your filters. Try adjusting your search or clearing some filters.
      </p>
      <div className={css.actions}>
        <Button variant="outline" size="sm" onClick={onClear}>
          <FiX aria-hidden="true" />
          Clear filters
        </Button>
        <Button size="sm" onClick={onClear}>
          View all campers
        </Button>
      </div>
    </div>
  );
}
