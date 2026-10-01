'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import css from './Header.module.css';

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const isCatalog = pathname.startsWith('/catalog');

  return (
    <header className={css.header}>
      <div className={css.inner}>
        <Link href="/" className={css.logo} aria-label="TravelTrucks home">
          Travel<span>Trucks</span>
        </Link>
        <nav aria-label="Main">
          <ul className={css.nav}>
            <li>
              <Link href="/" className={isHome ? css.active : css.link} aria-current={isHome ? 'page' : undefined}>
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/catalog"
                className={isCatalog ? css.active : css.link}
                aria-current={isCatalog ? 'page' : undefined}
              >
                Catalog
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
