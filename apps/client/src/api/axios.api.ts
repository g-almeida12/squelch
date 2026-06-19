import axios from "axios";
import { type ErrorResponse, type UserAuthDTO } from "@squelch/shared";
import { _rootQueryClient } from "../config/query-client.config";
import { APP_ROUTES, API_ROUTES } from "../config/constants";

const api = axios.create({
  baseURL: API_ROUTES.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 5_000,
  xsrfHeaderName: "X-XSRF-TOKEN",
  xsrfCookieName: "xsrf_token",
});

api.interceptors.request.use((config) => {
  const xsrfToken = sessionStorage.getItem("xsrf-token");
  if (xsrfToken) {
    config.headers["X-XSRF-TOKEN"] = xsrfToken;
  }

  return config;
});

api.interceptors.response.use(
  (sucess) => sucess,
  async (err) => {
    const originalRequest = err.config;
    if (originalRequest.url === `${API_ROUTES.BASE_URL}/auth/refresh`) {
      return Promise.reject(err);
    }

    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await api.post<UserAuthDTO>(
          API_ROUTES.REFRESH,
          {},
          { withCredentials: true },
        );

        console.log('token', response.data.xsrfToken);
        sessionStorage.setItem("xsrf-token", response.data.xsrfToken);

        return api(originalRequest);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (authErr: any) {
        _rootQueryClient.clear();

        if (window.location.href.includes("http://localhost:5173/home")) {
          window.location.href = APP_ROUTES.LOGIN;
        }

        const isApiError = !!authErr.response?.data;
        const refreshErr: ErrorResponse = {
          statusCode: isApiError ? authErr.response?.status : 500,
          body: isApiError ? authErr.response?.data : err.response?.message,
          success: false,
        };

        return Promise.reject(refreshErr);
      }
    }

    const isApiError = !!err.response?.data;
    const unhandledError: ErrorResponse = {
      statusCode: isApiError ? err.response?.status : 500,
      body: isApiError ? err.response?.data : err.response?.message,
      success: false,
    };

    return Promise.reject(unhandledError);
  },
);

export default api;
