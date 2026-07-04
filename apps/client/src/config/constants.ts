export const APP_ROUTES = {
  LANDING_PAGE: "/landing-page",
  REGISTER: "/register",
  LOGIN: "/login",
  HOME: "/home",
  CHALLENGE: (id: number) => `/home/challenges/${id}` as const,
} as const;

const API_BASE_URL = "http://localhost:8080";
export const API_ROUTES = {
  // Base URL
  BASE_URL: API_BASE_URL,

  // Auth URL
  REGISTER: `${API_BASE_URL}/auth/register`,
  LOGIN: `${API_BASE_URL}/auth/login`,
  LOGOUT: `${API_BASE_URL}/auth/logout`,
  REFRESH: `${API_BASE_URL}/auth/refresh`,

  // User URL
  USER: `${API_BASE_URL}/users`,
  USER_PROGRESS: `${API_BASE_URL}/users/progress`,

  // Submission URL
  QUERY_RUN: (id: number) =>
    `${API_BASE_URL}/challenges/${id}/queries/run` as const,
  VALIDATION_RUN: (id: number) =>
    `${API_BASE_URL}/challenges/${id}/submissions/run` as const,
  CHALLENGES_SUBMISSIONS: (id: number) =>
    `${API_BASE_URL}/challenges/${id}/submissions` as const,
  SUBMISSION: (id: number) => `${API_BASE_URL}/submissions/${id}` as const,
  USER_SUBMISSIONS: `${API_BASE_URL}/submissions`,

  // Challenge URL
  CHALLENGE: (id: number) => `${API_BASE_URL}/challenges/${id}` as const,
  CHALLENGE_LIST: `${API_BASE_URL}/challenges/list`,
  CHALLENGE_RESUME: `${API_BASE_URL}/challenges/resume`,
} as const;
