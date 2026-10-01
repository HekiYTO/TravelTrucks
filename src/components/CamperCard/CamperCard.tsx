import Image from 'next/image';
import Link from 'next/link';
import { BsFuelPump, BsGrid1X2 } from 'react-icons/bs';
import { GiGearStick } from 'react-icons/gi';
import { buttonClass } from '@/components/Button/Button';
import Chip from '@/components/Chip/Chip';
import { RatingLocation } from '@/components/Rating/Rating';
import type { CamperListItem } from '@/lib/api/types';
import { formatPrice, getImageUrl, humanize } from '@/utils/format';
import css from './CamperCard.module.css';

export default function CamperCard({ camper }: { camper: CamperListItem }) {
  const image = getImageUrl(camper.coverImage, 'thumb');

  return (
    <li className={css.card}>
      <div className={css.imageWrap}>
        {image && (
          <Image src={image} alt={camper.name} fill sizes="260px" className={css.image} unoptimized />
        )}
      </div>

      <div className={css.info}>
        <div className={css.head}>
          <h2 className={css.name}>{camper.name}</h2>
          <p className={css.price}>{formatPrice(camper.price)}</p>
        </div>

        <RatingLocation rating={camper.rating} totalReviews={camper.totalReviews} location={camper.location} />

        {camper.description && <p className={css.description}>{camper.description}</p>}

        <ul className={css.chips}>
          <Chip icon={<BsFuelPump />}>{humanize(camper.engine)}</Chip>
          <Chip icon={<GiGearStick />}>{humanize(camper.transmission)}</Chip>
          <Chip icon={<BsGrid1X2 />}>{humanize(camper.form)}</Chip>
        </ul>

        <Link
          href={`/catalog/${camper.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`${buttonClass('primary', 'sm')} ${css.more}`}
        >
          Show more
        </Link>
      </div>
    </li>
  );
}
