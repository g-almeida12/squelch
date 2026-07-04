import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ErrorPayload, UserDTO, UserUpdate } from "@squelch/shared";
import api from "../../../api/axios.api";
import { API_ROUTES } from "../../../config/constants";
import { userQueryKeys } from "./user.query-keys";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation<UserDTO, ErrorPayload, UserUpdate>({
    mutationFn: async (newData) => {
      const response = await api.patch(API_ROUTES.USER, newData, {
        withCredentials: true,
        withXSRFToken: true,
      });

      return response.data.body;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userQueryKeys.USER });
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation<null, ErrorPayload, null>({
    mutationFn: async () => {
      const response = await api.delete(API_ROUTES.USER, {
        withCredentials: true,
        withXSRFToken: true,
      });

      return response.data.body;
    },
    onSuccess: () => {
      queryClient.clear();
      sessionStorage.clear();
    },
  });
}
