export const APP_ROUTES = {
  LANDING_PAGE: "/landing-page",
  REGISTER: "/register",
  LOGIN: "/login",
  HOME: "/home",
};

const API_BASE_URL = "http://localhost:8080";
export const API_ROUTES = {
  BASE_URL: API_BASE_URL,
  REGISTER: `${API_BASE_URL}/auth/register`,
  LOGIN: `${API_BASE_URL}/auth/login`,
  LOGOUT: `${API_BASE_URL}/auth/logout`,
  REFRESH: `${API_BASE_URL}/auth/refresh`,
  USER: `${API_BASE_URL}/users`,
} as const;
