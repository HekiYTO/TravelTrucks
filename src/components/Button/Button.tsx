import type { ButtonHTMLAttributes } from 'react';
import css from './Button.module.css';

type Variant = 'primary' | 'outline';
type Size = 'md' | 'sm';

// Однакові стилі для <button> та для посилань (Link / a).
export function buttonClass(variant: Variant = 'primary', size: Size = 'md', fullWidth = false) {
  return [css.button, css[variant], css[size], fullWidth ? css.full : ''].filter(Boolean).join(' ');
}

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
  type = 'button',
  ...rest
}: Props) {
  return (
    <button
      type={type}
      className={[buttonClass(variant, size, fullWidth), className].filter(Boolean).join(' ')}
      {...rest}
    />
  );
}
