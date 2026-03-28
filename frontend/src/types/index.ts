export interface Gym {
  id: number;
  name: string;
  slug: string;
  city: string | null;
  state: string | null;
  country: string | null;
  logoUrl: string | null;
  isBoard: boolean;
  boardType: string | null;
}

export interface Route {
  id: number;
  gymId: number;
  gymName: string;
  name: string | null;
  grade: string;
  gradeSort: number;
  photoUrl: string;
  boardLayoutId: string | null;
  setter: string | null;
  color: string | null;
  videoCount: number;
}

export interface BetaVideo {
  id: number;
  routeId: number;
  videoUrl: string;
  source: string | null;
  climber: string | null;
  thumbnail: string | null;
  durationSeconds: number | null;
  sortOrder: number;
}

export interface User {
  id: number;
  email: string;
  displayName: string | null;
  avatarUrl: string | null;
  preferredGym: number | null;
  minGrade: number;
  maxGrade: number;
}

export interface ClimbHistory {
  id: number;
  route: Route;
  viewedAt: string;
  watchedBeta: boolean;
}
