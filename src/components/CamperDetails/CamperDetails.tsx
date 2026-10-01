'use client';

import Link from 'next/link';
import { BsFuelPump } from 'react-icons/bs';
import { GiGearStick } from 'react-icons/gi';
import BookingForm from '@/components/BookingForm/BookingForm';
import { buttonClass } from '@/components/Button/Button';
import Chip from '@/components/Chip/Chip';
import Gallery from '@/components/Gallery/Gallery';
import Loader from '@/components/Loader/Loader';
import { RatingLocation } from '@/components/Rating/Rating';
import ReviewList from '@/components/ReviewList/ReviewList';
import { useCamper } from '@/lib/api/hooks';
import { formatPrice, humanize, withUnit } from '@/utils/format';
import css from './CamperDetails.module.css';

export default function CamperDetails({ camperId }: { camperId: string }) {
  const { data: camper, isLoading, isError } = useCamper(camperId);

  if (isLoading) {
    return (
      <div className={css.state}>
        <Loader title="Loading camper..." text="Please wait while we fetch the details for you" />
      </div>
    );
  }

  if (isError || !camper) {
    return (
      <div className={css.state}>
        <p>We couldn&apos;t load this camper.</p>
        <Link href="/catalog" className={buttonClass('primary', 'sm')}>
          Back to catalog
        </Link>
      </div>
    );
  }

  const specs: Array<[string, string]> = [
    ['Form', humanize(camper.form)],
    ['Length', withUnit(camper.length, 'm')],
    ['Width', withUnit(camper.width, 'm')],
    ['Height', withUnit(camper.height, 'm')],
    ['Tank', withUnit(camper.tank, 'l')],
    ['Consumption', withUnit(camper.consumption, 'l / 100km')],
  ];

  return (
    <div className={css.page}>
      <div className={css.top}>
        <Gallery images={camper.gallery} name={camper.name} />

        <div className={css.side}>
          <section className={css.card}>
            <h1 className={css.name}>{camper.name}</h1>
            <RatingLocation rating={camper.rating} totalReviews={camper.totalReviews} location={camper.location} />
            <p className={css.price}>{formatPrice(camper.price)}</p>
            <p className={css.description}>{camper.description}</p>
          </section>

          <section className={css.card} aria-labelledby="details-title">
            <h2 id="details-title" className={css.cardTitle}>
              Vehicle details
            </h2>
            <ul className={css.chips}>
              <Chip icon={<GiGearStick />}>{humanize(camper.transmission)}</Chip>
              <Chip icon={<BsFuelPump />}>{humanize(camper.engine)}</Chip>
              {camper.amenities.map((amenity) => (
                <Chip key={amenity}>{humanize(amenity)}</Chip>
              ))}
            </ul>
            <dl className={css.specs}>
              {specs.map(([label, value]) => (
                <div key={label} className={css.spec}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
      </div>

      <div className={css.bottom}>
        <ReviewList camperId={camper.id} />
        <BookingForm camperId={camper.id} />
      </div>
    </div>
  );
}
