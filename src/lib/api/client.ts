import axios from 'axios';
import type {
  BookingRequest,
  BookingResponse,
  CamperDetails,
  CamperListResponse,
  CampersFilters,
  FiltersResponse,
  Review,
} from './types';

export const PER_PAGE = 4;

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'https://campers-api.goit.study',
});

// Порожні значення не відправляємо, щоб фільтр не ламав видачу.
function cleanParams(filters: CampersFilters) {
  return Object.fromEntries(
    Object.entries(filters).filter(([, v]) => typeof v === 'string' && v.trim() !== ''),
  );
}

export async function fetchCampers(
  page: number,
  filters: CampersFilters = {},
): Promise<CamperListResponse> {
  // ПЕРЕВІР імена query-параметрів у Swagger (GET /campers).
  // Припущено: page, perPage, location, form, engine, transmission.
  try {
    const { data } = await api.get<CamperListResponse>('/campers', {
      params: { page, perPage: PER_PAGE, ...cleanParams(filters) },
    });
    return data;
  } catch (error) {
    // Якщо сервер на порожню видачу відповідає 404, показуємо порожній стан, а не помилку.
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return { page, perPage: PER_PAGE, total: 0, totalPages: 0, campers: [] };
    }
    throw error;
  }
}

export async function fetchFilters(): Promise<FiltersResponse> {
  const { data } = await api.get<FiltersResponse>('/campers/filters');
  return data;
}

export async function fetchCamper(camperId: string): Promise<CamperDetails> {
  const { data } = await api.get<CamperDetails>(`/campers/${camperId}`);
  return data;
}

export async function fetchReviews(camperId: string): Promise<Review[]> {
  const { data } = await api.get<Review[]>(`/campers/${camperId}/reviews`);
  return data;
}

export async function createBookingRequest(
  camperId: string,
  body: BookingRequest,
): Promise<BookingResponse> {
  const { data } = await api.post<BookingResponse>(
    `/campers/${camperId}/booking-requests`,
    body,
  );
  return data;
}
