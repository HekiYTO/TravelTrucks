'use client';

import Button from '@/components/Button/Button';
import CamperCard from '@/components/CamperCard/CamperCard';
import EmptyState from '@/components/EmptyState/EmptyState';
import FiltersSidebar from '@/components/FiltersSidebar/FiltersSidebar';
import { LoaderOverlay } from '@/components/Loader/Loader';
import { useCatalogFilters } from '@/features/catalog/useCatalogFilters';
import { useCampers, useFilters } from '@/lib/api/hooks';
import css from './CatalogView.module.css';

export default function CatalogView() {
  const { draft, applied, setField, search, clear } = useCatalogFilters();
  const filtersQuery = useFilters();
  const campersQuery = useCampers(applied);

  const campers = campersQuery.data?.pages.flatMap((page) => page.campers) ?? [];
  // Лоадер для нового запиту (старт або зміна фільтрів); догрузка має свій індикатор на кнопці.
  const isReloading = campersQuery.isFetching && !campersQuery.isFetchingNextPage;
  const isEmpty = !campersQuery.isFetching && !campersQuery.isError && campers.length === 0;

  return (
    <div className={css.layout}>
      <aside>
        <FiltersSidebar filters={filtersQuery.data} values={draft} onChange={setField} onSearch={search} onClear={clear} />
      </aside>

      <section className={css.results} aria-label="Campers" aria-busy={isReloading}>
        {isReloading && <LoaderOverlay />}

        {campersQuery.isError && (
          <div className={css.message} role="alert">
            <p>Something went wrong while loading campers.</p>
            <Button size="sm" onClick={() => campersQuery.refetch()}>
              Try again
            </Button>
          </div>
        )}

        {isEmpty && <EmptyState onClear={clear} />}

        {campers.length > 0 && (
          <>
            <ul className={`${css.list} ${isReloading ? css.dimmed : ''}`}>
              {campers.map((camper) => (
                <CamperCard key={camper.id} camper={camper} />
              ))}
            </ul>

            {campersQuery.hasNextPage && (
              <div className={css.more}>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => campersQuery.fetchNextPage()}
                  disabled={campersQuery.isFetchingNextPage || isReloading}
                >
                  {campersQuery.isFetchingNextPage ? 'Loading...' : 'Load more'}
                </Button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
