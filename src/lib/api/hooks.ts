'use client';

import { keepPreviousData, useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import {
  createBookingRequest,
  fetchCamper,
  fetchCampers,
  fetchFilters,
  fetchReviews,
} from './client';
import type { BookingRequest, CampersFilters } from './types';

// Каталог: Load More через useInfiniteQuery. Фільтри входять у queryKey,
// тому при їх зміні список скидається і вантажиться з першої сторінки.
// keepPreviousData: поки вантажиться нова видача, стара лишається під лоадером (як у макеті).
export function useCampers(filters: CampersFilters) {
  return useInfiniteQuery({
    queryKey: ['campers', filters],
    queryFn: ({ pageParam }) => fetchCampers(pageParam, filters),
    initialPageParam: 1,
    getNextPageParam: (last) => (last.page < last.totalPages ? last.page + 1 : undefined),
    placeholderData: keepPreviousData,
  });
}

export const useFilters = () =>
  useQuery({ queryKey: ['filters'], queryFn: fetchFilters, staleTime: Infinity });

export const useCamper = (id: string) =>
  useQuery({ queryKey: ['camper', id], queryFn: () => fetchCamper(id) });

export const useReviews = (id: string) =>
  useQuery({ queryKey: ['reviews', id], queryFn: () => fetchReviews(id) });

export const useBooking = (camperId: string) =>
  useMutation({ mutationFn: (body: BookingRequest) => createBookingRequest(camperId, body) });
