export const APP_ROUTES = {
  LANDING_PAGE: "/landing-page",
  REGISTER: "/register",
  LOGIN: "/login",
  HOME: "/home",
  CHALLENGE: (id: number) => `/home/challenges/${id}` as const,
} as const;

export const API_BASE_URL = import.meta.env.VITE_API_URL;

export const API_ROUTES = {
  // Base URL
  BASE_URL: API_BASE_URL,

  // Auth URL
  REGISTER: "/auth/register",
  LOGIN: "/auth/login",
  LOGOUT: "/auth/logout",
  REFRESH: "/auth/refresh",

  // User URL
  USER: "/users",
  USER_PROGRESS: "/users/progress",

  // Submission URL
  QUERY_RUN: (id: number) => `/challenges/${id}/queries/run` as const,
  VALIDATION_RUN: (id: number) => `/challenges/${id}/submissions/run` as const,
  CHALLENGES_SUBMISSIONS: (id: number) => `/challenges/${id}/submissions` as const,
  SUBMISSION: (id: number) => `/submissions/${id}` as const,
  USER_SUBMISSIONS: "/submissions",

  // Challenge URL
  CHALLENGE: (id: number) => `/challenges/${id}` as const,
  CHALLENGE_LIST: "/challenges/list",
  CHALLENGE_RESUME: "/challenges/resume",
} as const;