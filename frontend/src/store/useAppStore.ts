import { create } from 'zustand';
import type { Gym, Route, User } from '../types';

interface AppState {
  // Auth
  user: User | null;
  token: string | null;
  setAuth: (user: User, token: string) => void;
  logout: () => void;

  // Gym selection
  selectedGym: Gym | null;
  setSelectedGym: (gym: Gym) => void;

  // Difficulty filter
  minGrade: number;
  maxGrade: number;
  setGradeRange: (min: number, max: number) => void;

  // Feed state
  feedRoutes: Route[];
  setFeedRoutes: (routes: Route[]) => void;
  addFeedRoutes: (routes: Route[]) => void;
  seenRouteIds: number[];
  addSeenRoute: (id: number) => void;
  currentIndex: number;
  setCurrentIndex: (index: number) => void;

  // Filter drawer
  filterOpen: boolean;
  setFilterOpen: (open: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  token: localStorage.getItem('token'),
  setAuth: (user, token) => {
    localStorage.setItem('token', token);
    set({ user, token });
  },
  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null });
  },

  selectedGym: null,
  setSelectedGym: (gym) => set({ selectedGym: gym, feedRoutes: [], seenRouteIds: [], currentIndex: 0 }),

  minGrade: 0,
  maxGrade: 17,
  setGradeRange: (min, max) => set({ minGrade: min, maxGrade: max, feedRoutes: [], seenRouteIds: [], currentIndex: 0 }),

  feedRoutes: [],
  setFeedRoutes: (routes) => set({ feedRoutes: routes }),
  addFeedRoutes: (routes) => set((state) => ({ feedRoutes: [...state.feedRoutes, ...routes] })),
  seenRouteIds: [],
  addSeenRoute: (id) => set((state) => ({ seenRouteIds: [...state.seenRouteIds, id] })),
  currentIndex: 0,
  setCurrentIndex: (index) => set({ currentIndex: index }),

  filterOpen: false,
  setFilterOpen: (open) => set({ filterOpen: open }),
}));
