export interface AdModel {
  id: string;
  title: string;
  country: string;
  city: string;
  price: number;
  rating: number;
  type: AdType;
  image: string;
  comments: Comment[];
  likes: number;
}

export interface Comment {
  id: string;
  text: string;
  author: string;
  createdAt: Date;
}

export type AdType = 'hotel' | 'villa' | 'apartment' | 'house';

export interface FilterState {
  type: string | null;
  city: string | null;
  priceFrom: number | null;
  priceTo: number | null;
  ratings: number[] | null;
  title: string;
  showLikedOnly: boolean;
}

export interface SearchFilters {
  query?: string;
  country?: string;
  type?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
}
