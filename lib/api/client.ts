import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { tokenManager } from '@/lib/auth/token';
import type { ApiError } from '@/lib/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://tarot-production-ed3e.up.railway.app/api/v1';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = tokenManager.get();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    // Handle 401 Unauthorized - auto logout
    if (error.response?.status === 401) {
      tokenManager.remove();
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }

    // Return standardized error
    const apiError: ApiError = {
      success: false,
      message: error.response?.data?.message || error.message || 'An error occurred',
      statusCode: error.response?.status || 500,
    };

    return Promise.reject(apiError);
  }
);
