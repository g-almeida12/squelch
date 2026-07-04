import { useQueryClient, useMutation } from "@tanstack/react-query";
import type {
  UserRegister,
  UserAuthDTO,
  ErrorPayload,
  UserLogin,
} from "@squelch/shared";
import api from "../../../api/axios.api";
import { API_ROUTES } from "../../../config/constants";
import { userQueryKeys } from "../../user/hooks/user.query-keys";

export function useRegisterUser() {
  const queryClient = useQueryClient();

  return useMutation<UserAuthDTO, ErrorPayload, UserRegister>({
    mutationFn: async (newUser) => {
      const response = await api.post(API_ROUTES.REGISTER, newUser);
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: userQueryKeys.USER });
    },
  });
}

export function useLoginUser() {
  const queryClient = useQueryClient();

  return useMutation<UserAuthDTO, ErrorPayload, UserLogin>({
    mutationFn: async (user) => {
      const response = await api.post(API_ROUTES.LOGIN, user);
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: userQueryKeys.USER });
    },
  });
}

export function useLogoutUser() {
  const queryClient = useQueryClient();

  return useMutation<null, ErrorPayload, null>({
    mutationFn: async () => {
      const response = await api.post(API_ROUTES.LOGOUT, {});
      return response.data;
    },
    onSuccess: () => {
      queryClient.clear();
      sessionStorage.clear();
    },
  });
}
