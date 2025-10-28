// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiError {
  success: false;
  message: string;
  statusCode: number;
}

// User Types
export interface User {
  id: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

// Card Types
export type ArcanaType = 'major' | 'minor';
export type SuitType = 'wands' | 'cups' | 'swords' | 'pentacles';

export interface TarotCard {
  id: string;
  name: string;
  nameShort: string;
  value: string;
  arcana: ArcanaType;
  suit?: SuitType;
  imageUrl?: string;
  keywords: {
    upright: string[];
    reversed: string[];
  };
  meanings: {
    upright: string;
    reversed: string;
  };
  description: string;
}

// Reading Types
export type SpreadType = 'one-card' | 'three-card' | 'celtic-cross';
export type VisibilityType = 'private' | 'public';
export type CategoryType = 'love' | 'career' | 'health' | 'general';

export interface ReadingCard {
  card: TarotCard;
  position: number;
  isReversed: boolean;
  positionName?: string;
}

export interface Reading {
  id: string;
  userId: string;
  user?: User;
  question: string;
  spreadType: SpreadType;
  category: CategoryType;
  cards: ReadingCard[];
  interpretation: string;
  visibility: VisibilityType;
  isFavorite: boolean;
  likesCount: number;
  commentsCount: number;
  isLikedByUser?: boolean;
  createdAt: string;
  updatedAt: string;
}

// Comment Types
export interface Comment {
  id: string;
  readingId: string;
  userId: string;
  user?: User;
  content: string;
  createdAt: string;
  updatedAt: string;
}

// Dashboard Types
export interface DashboardStats {
  totalReadings: number;
  favoriteReadings: number;
  publicReadings: number;
  totalLikesReceived: number;
  readingsByCategory: Record<CategoryType, number>;
  readingsBySpreadType: Record<SpreadType, number>;
  recentReadings: Reading[];
  trendingCards: {
    card: TarotCard;
    count: number;
  }[];
}

// Request Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface CreateReadingRequest {
  question: string;
  spreadType: SpreadType;
  category: CategoryType;
  cardIds: string[];
}

export interface UpdateVisibilityRequest {
  visibility: VisibilityType;
}

export interface CreateCommentRequest {
  content: string;
}

export interface UpdateCommentRequest {
  content: string;
}

// Filter & Pagination Types
export interface CardFilters {
  arcana?: ArcanaType;
  suit?: SuitType;
  search?: string;
}

export interface ReadingFilters {
  category?: CategoryType;
  spreadType?: SpreadType;
  visibility?: VisibilityType;
  isFavorite?: boolean;
  page?: number;
  limit?: number;
}

export interface PublicReadingFilters {
  category?: CategoryType;
  sort?: 'recent' | 'popular' | 'trending';
  page?: number;
  limit?: number;
}

export type ExportFormat = 'pdf' | 'csv' | 'json';
