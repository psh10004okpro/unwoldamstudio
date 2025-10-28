import { apiClient } from './client';
import type {
  ApiResponse,
  TarotCard,
  Reading,
  Comment,
  User,
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  CreateReadingRequest,
  UpdateVisibilityRequest,
  CreateCommentRequest,
  UpdateCommentRequest,
  CardFilters,
  ReadingFilters,
  PublicReadingFilters,
  DashboardStats,
  ExportFormat,
} from '@/lib/types';

// ============================================
// Authentication APIs
// ============================================
export const authApi = {
  register: (data: RegisterRequest) =>
    apiClient.post<ApiResponse<AuthResponse>>('/auth/register', data),

  login: (data: LoginRequest) =>
    apiClient.post<ApiResponse<AuthResponse>>('/auth/login', data),

  getMe: () =>
    apiClient.get<ApiResponse<User>>('/auth/me'),

  logout: () =>
    apiClient.post<ApiResponse<null>>('/auth/logout'),
};

// ============================================
// Cards APIs
// ============================================
export const cardsApi = {
  getAll: (filters?: CardFilters) =>
    apiClient.get<ApiResponse<TarotCard[]>>('/cards', { params: filters }),

  getById: (id: string) =>
    apiClient.get<ApiResponse<TarotCard>>(`/cards/${id}`),

  search: (query: string) =>
    apiClient.get<ApiResponse<TarotCard[]>>('/cards/search', { params: { q: query } }),

  getRandom: (count: number = 1) =>
    apiClient.get<ApiResponse<TarotCard[]>>(`/cards/random/${count}`),
};

// ============================================
// Readings APIs
// ============================================
export const readingsApi = {
  create: (data: CreateReadingRequest) =>
    apiClient.post<ApiResponse<Reading>>('/readings', data),

  getMyReadings: (filters?: ReadingFilters) =>
    apiClient.get<ApiResponse<Reading[]>>('/readings', { params: filters }),

  getById: (id: string) =>
    apiClient.get<ApiResponse<Reading>>(`/readings/${id}`),

  delete: (id: string) =>
    apiClient.delete<ApiResponse<null>>(`/readings/${id}`),

  toggleFavorite: (id: string) =>
    apiClient.put<ApiResponse<Reading>>(`/readings/${id}/favorite`),

  like: (id: string) =>
    apiClient.post<ApiResponse<Reading>>(`/readings/${id}/like`),

  updateVisibility: (id: string, data: UpdateVisibilityRequest) =>
    apiClient.put<ApiResponse<Reading>>(`/readings/${id}/visibility`, data),
};

// ============================================
// Public Readings APIs
// ============================================
export const publicReadingsApi = {
  getPublicReadings: (filters?: PublicReadingFilters) =>
    apiClient.get<ApiResponse<Reading[]>>('/readings/public', { params: filters }),

  getSharedReading: (id: string) =>
    apiClient.get<ApiResponse<Reading>>(`/readings/shared/${id}`),
};

// ============================================
// Comments APIs
// ============================================
export const commentsApi = {
  create: (readingId: string, data: CreateCommentRequest) =>
    apiClient.post<ApiResponse<Comment>>(`/readings/${readingId}/comments`, data),

  update: (id: string, data: UpdateCommentRequest) =>
    apiClient.put<ApiResponse<Comment>>(`/comments/${id}`, data),

  delete: (id: string) =>
    apiClient.delete<ApiResponse<null>>(`/comments/${id}`),

  getByReading: (readingId: string) =>
    apiClient.get<ApiResponse<Comment[]>>(`/readings/${readingId}/comments`),
};

// ============================================
// User Dashboard & Export APIs
// ============================================
export const userApi = {
  getDashboard: () =>
    apiClient.get<ApiResponse<DashboardStats>>('/users/dashboard'),

  exportReadings: (format: ExportFormat) =>
    apiClient.get(`/users/export`, {
      params: { format },
      responseType: format === 'json' ? 'json' : 'blob',
    }),
};
