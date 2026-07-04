import type { UserDTO, ErrorPayload, UserProgressDTO } from "@squelch/shared";
import { useQuery } from "@tanstack/react-query";
import { userQueryKeys } from "./user.query-keys";
import api from "../../../api/axios.api";
import { API_ROUTES } from "../../../config/constants";

export function useGetUser() {
  return useQuery<UserDTO, ErrorPayload>({
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

    retry: false,
  });
}

export function useGetUserProgress() {
  return useQuery<UserProgressDTO, ErrorPayload>({
    queryKey: userQueryKeys.USER_PROGRESS,
    queryFn: async () => {
      const response = await api.get(API_ROUTES.USER_PROGRESS, {
        withCredentials: true,
        withXSRFToken: true,
      });

      return response.data.body;
    },
  });
}
