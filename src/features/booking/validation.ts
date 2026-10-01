// Валідація форми бронювання. Повідомлення збігаються з макетом (Details_error).

export interface BookingErrors {
  name?: string;
  email?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateBooking(values: { name: string; email: string }): BookingErrors {
  const errors: BookingErrors = {};
  const name = values.name.trim();

  // Ім'я має містити хоча б одну літеру (у макеті "12345" вважається помилкою).
  if (!name || !/\p{L}/u.test(name)) errors.name = 'Please enter your name.';
  if (!EMAIL_RE.test(values.email.trim())) errors.email = 'Please enter your email.';

  return errors;
}
