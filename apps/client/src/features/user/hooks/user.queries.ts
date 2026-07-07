import type { UserDTO, UserProgressDTO } from "@squelch/shared";
import { useQuery } from "@tanstack/react-query";
import { userQueryKeys } from "./user.query-keys";
import api from "../../../api/axios.api";
import { API_ROUTES } from "../../../config/constants";
import type { ExtendedErrorPayload } from "../../../types";

export function useGetUserProfile() {
  return useQuery<UserDTO, ExtendedErrorPayload>({
    queryKey: userQueryKeys.profile(),
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
  return useQuery<UserProgressDTO, ExtendedErrorPayload>({
    queryKey: userQueryKeys.progress(),
    queryFn: async () => {
      const response = await api.get(API_ROUTES.USER_PROGRESS, {
        withCredentials: true,
        withXSRFToken: true,
      });

      return response.data.body;
    },
  });
}
