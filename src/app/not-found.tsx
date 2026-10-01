import Link from 'next/link';
import { buttonClass } from '@/components/Button/Button';

export default function NotFound() {
  return (
    <main className="container" style={{ padding: '96px 0', textAlign: 'center' }}>
      <h1 style={{ fontSize: 32, marginBottom: 16 }}>Page not found</h1>
      <Link href="/catalog" className={buttonClass('primary')}>
        Go to catalog
      </Link>
    </main>
  );
}
