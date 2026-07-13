import axios from "axios";
import type { AuthDTO } from "@squelch/shared";
import { API_ROUTES } from "../config/constants";
import type { ExtendedErrorPayload } from "../types";

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
    if (originalRequest.url?.includes(API_ROUTES.REFRESH)) {
      return Promise.reject(formatGenericError(err));
    }

    if (err.response?.status === 401 && !originalRequest._retry) {
      console.log("tentou de novo");
      originalRequest._retry = true;

      try {
        const response = await axios.post<AuthDTO>(
          `${API_ROUTES.BASE_URL}${API_ROUTES.REFRESH}`,
          {},
          { withCredentials: true },
        );

        sessionStorage.setItem("xsrf-token", response.data.xsrfToken);
        originalRequest.headers["X-XSRF-TOKEN"] = response.data.xsrfToken;
        return api(originalRequest);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (authErr: any) {
        return Promise.reject(formatGenericError(authErr));
      }
    }

    return Promise.reject(formatGenericError(err));
  },
);

export default api;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function formatGenericError(err: any) {
  const isApiError = !!err.response?.data;
  const formatedError: ExtendedErrorPayload = {
    statusCode: isApiError ? err.response?.status : 500,
    body: isApiError ? err.response?.data.body : err.response?.message,
    success: false,
  };

  return formatedError;
}
