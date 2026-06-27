export const APP_ROUTES = {
  LANDING_PAGE: "/landing-page",
  REGISTER: "/register",
  LOGIN: "/login",
  HOME: "/home",
};

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
  QUERY_RUN: (id: number) => `${API_BASE_URL}/challenges/${id}/queries/run`,
  VALIDATION_RUN: (id: number) =>
    `${API_BASE_URL}/challenges/${id}/submissions/run`,
  CHALLENGES_SUBMISSIONS: (id: number) =>
    `${API_BASE_URL}/challenges/${id}/submissions`,
  SUBMISSION: (id: number) => `${API_BASE_URL}/submissions/${id}`,
  USER_SUBMISSIONS: `${API_BASE_URL}/submissions`,
} as const;
