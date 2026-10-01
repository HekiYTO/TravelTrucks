import Image from 'next/image';
import { FiX } from 'react-icons/fi';
import Button from '@/components/Button/Button';
import css from './EmptyState.module.css';

export default function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className={css.box}>
      <Image
        src="/not_found.png"
        alt="No campers found"
        width={1254}
        height={1254}
        className={css.art}
        unoptimized
      />
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