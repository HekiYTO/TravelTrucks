import type { Metadata } from 'next';
import CatalogView from '@/components/CatalogView/CatalogView';

export const metadata: Metadata = {
  title: 'Catalog',
  description: 'Browse available campers and filter by location, body type, engine and transmission.',
};

export default function CatalogPage() {
  return (
    <main>
      <div className="container">
        <CatalogView />
      </div>
    </main>
  );
}
