import type { ReactNode } from 'react';
import css from './Chip.module.css';

export default function Chip({ icon, children }: { icon?: ReactNode; children: ReactNode }) {
  return (
    <li className={css.chip}>
      {icon}
      <span>{children}</span>
    </li>
  );
}
