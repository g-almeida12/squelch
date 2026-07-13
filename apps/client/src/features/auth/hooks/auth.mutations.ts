import { useQueryClient, useMutation } from "@tanstack/react-query";
import type { AuthRegister, AuthDTO, AuthLogin } from "@squelch/shared";
import api from "../../../api/axios.api";
import { API_ROUTES } from "../../../config/constants";
import type { ExtendedErrorPayload } from "../../../types";

export function useRegisterUser() {
  const queryClient = useQueryClient();

  return useMutation<AuthDTO, ExtendedErrorPayload, AuthRegister>({
    mutationFn: async (newUser) => {
      const response = await api.post(API_ROUTES.REGISTER, newUser);
      return response.data.body;
    },
    onSuccess: async (user) => {
      queryClient.clear();
      sessionStorage.clear();
      sessionStorage.setItem('xsrf-token', user.xsrfToken);
    },
  });
}

export function useLoginUser() {
  const queryClient = useQueryClient();

  return useMutation<AuthDTO, ExtendedErrorPayload, AuthLogin>({
    mutationFn: async (user) => {
      const response = await api.post(API_ROUTES.LOGIN, user);
      console.log('1', response.data);
      return response.data.body;
    },
    onSuccess: async (user) => {
      console.log('2', user);
      queryClient.clear();
      sessionStorage.clear();
      sessionStorage.setItem('xsrf-token', user.xsrfToken);
    },
  });
}

export function useLogoutUser() {
  const queryClient = useQueryClient();

  return useMutation<null, ExtendedErrorPayload, null>({
    mutationFn: async () => {
      const response = await api.post(API_ROUTES.LOGOUT, {});
      return response.data.body;
    },
    onSuccess: () => {
      queryClient.clear();
      sessionStorage.clear();
    },
  });
}
