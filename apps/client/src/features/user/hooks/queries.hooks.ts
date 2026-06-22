import { type UserDTO, type ErrorResponse } from "@squelch/shared";
import { useQuery } from "@tanstack/react-query";
import { userQueryKeys } from "./query-keys.user";
import api from "../../../api/axios.api";
import { API_ROUTES } from "../../../config/constants";

export function useGetUser() {
  return useQuery<UserDTO, ErrorResponse>({
    queryKey: userQueryKeys.USER,
    queryFn: async () => {
      const response = await api.get(API_ROUTES.USER, {
        withCredentials: true,
        withXSRFToken: true,
      });

      return response.data.body;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,

    retry: (failureCount, err) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (err.statusCode === 401 || (err as any)?.response?.status === 401) {
        return false;
      }

      return failureCount < 3;
    },
  });
}
