// Типи зібрані зі Swagger. Точні типи полів у документації приховані ([...]),
// тому перевір їх за реальною відповіддю API.

export interface CamperCoverImage {
  thumb?: string;
  original?: string;
}

export interface CamperListItem {
  id: string;
  name: string;
  price: number;
  rating: number;
  location: string;
  form: string;
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
  transmission: string;
  engine: string;
  amenities: string[];
  description?: string; // у Swagger для списку поля немає, але в макеті є опис: показуємо, якщо API його віддає
  coverImage: string | CamperCoverImage;
  totalReviews: number;
}

export interface CamperListResponse {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  campers: CamperListItem[];
}

export interface FiltersResponse {
  forms: string[];
  transmissions: string[];
  engines: string[];
}

export interface CamperImage {
  id: string;
  camperId: string;
  thumb: string;
  original: string;
  order: number;
}

export interface CamperDetails extends Omit<CamperListItem, 'coverImage' | 'description'> {
  description: string;
  gallery: CamperImage[];
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  camperId: string;
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
  createdAt: string;
}

export interface BookingRequest {
  name: string;
  email: string;
}

export interface BookingResponse {
  message: string;
}

export interface CampersFilters {
  location?: string;
  form?: string;
  engine?: string;
  transmission?: string;
}
