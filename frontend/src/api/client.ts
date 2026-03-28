import axios from 'axios';
import type { Gym, Route, BetaVideo, User, ClimbHistory } from '../types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api/v1',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  loginWithGoogle: async (idToken: string) => {
    const { data } = await api.post<{ token: string; user: User }>('/auth/google', { idToken });
    return data;
  },
};

export const gymApi = {
  getAll: async () => {
    const { data } = await api.get<Gym[]>('/gyms');
    return data;
  },
  getBoards: async () => {
    const { data } = await api.get<Gym[]>('/gyms?board=true');
    return data;
  },
};

export const routeApi = {
  getRandom: async (gymId: number, minGrade = 0, maxGrade = 17, exclude: number[] = [], limit = 5) => {
    const params: Record<string, string | number> = { minGrade, maxGrade, limit };
    if (exclude.length > 0) {
      (params as Record<string, unknown>).exclude = exclude;
    }
    const { data } = await api.get<Route[]>(`/gyms/${gymId}/routes/random`, { params });
    return data;
  },
  getById: async (routeId: number) => {
    const { data } = await api.get<Route>(`/routes/${routeId}`);
    return data;
  },
  getVideos: async (routeId: number) => {
    const { data } = await api.get<BetaVideo[]>(`/routes/${routeId}/videos`);
    return data;
  },
};

export const userApi = {
  getMe: async () => {
    const { data } = await api.get<User>('/users/me');
    return data;
  },
  updatePreferences: async (prefs: { preferredGym?: number; minGrade?: number; maxGrade?: number }) => {
    const { data } = await api.put<User>('/users/me/preferences', prefs);
    return data;
  },
  getHistory: async () => {
    const { data } = await api.get<ClimbHistory[]>('/users/me/history');
    return data;
  },
  recordHistory: async (routeId: number, watchedBeta: boolean) => {
    await api.post('/users/me/history', { routeId, watchedBeta });
  },
};
