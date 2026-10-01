'use client';

import { useState, type ChangeEvent, type FormEvent } from 'react';
import toast from 'react-hot-toast';
import { FiAlertCircle } from 'react-icons/fi';
import Button from '@/components/Button/Button';
import { validateBooking, type BookingErrors } from '@/features/booking/validation';
import { useBooking } from '@/lib/api/hooks';
import css from './BookingForm.module.css';

type Values = { name: string; email: string };
const EMPTY: Values = { name: '', email: '' };

export default function BookingForm({ camperId }: { camperId: string }) {
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<BookingErrors>({});
  const booking = useBooking(camperId);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const found = validateBooking(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    booking.mutate(
      { name: values.name.trim(), email: values.email.trim() },
      {
        onSuccess: () => {
          toast.success('Booking request sent successfully!');
          setValues(EMPTY);
        },
        onError: () => toast.error('Something went wrong. Please try again.'),
      },
    );
  };

  return (
    <section className={css.box} aria-labelledby="booking-title">
      <h2 id="booking-title" className={css.title}>
        Book your campervan now
      </h2>
      <p className={css.subtitle}>Stay connected! We are always ready to help you.</p>

      <form className={css.form} onSubmit={handleSubmit} noValidate>
        <div className={css.field}>
          <div className={`${css.inputWrap} ${errors.name ? css.invalid : ''}`}>
            <input
              name="name"
              type="text"
              placeholder="Name*"
              aria-label="Name"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'name-error' : undefined}
              autoComplete="name"
              value={values.name}
              onChange={handleChange}
            />
            {errors.name && (
              <span className={css.floatLabel} aria-hidden="true">
                Name*
              </span>
            )}
            {errors.name && <FiAlertCircle className={css.errorIcon} aria-hidden="true" />}
          </div>
          {errors.name && (
            <p id="name-error" className={css.error}>
              {errors.name}
            </p>
          )}
        </div>

        <div className={css.field}>
          <div className={`${css.inputWrap} ${errors.email ? css.invalid : ''}`}>
            <input
              name="email"
              type="email"
              placeholder="Email*"
              aria-label="Email"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'email-error' : undefined}
              autoComplete="email"
              value={values.email}
              onChange={handleChange}
            />
            {errors.email && (
              <span className={css.floatLabel} aria-hidden="true">
                Email*
              </span>
            )}
            {errors.email && <FiAlertCircle className={css.errorIcon} aria-hidden="true" />}
          </div>
          {errors.email && (
            <p id="email-error" className={css.error}>
              {errors.email}
            </p>
          )}
        </div>

        <Button type="submit" fullWidth disabled={booking.isPending}>
          {booking.isPending ? 'Sending...' : 'Send'}
        </Button>
      </form>
    </section>
  );
}
