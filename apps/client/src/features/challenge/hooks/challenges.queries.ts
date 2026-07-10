import { useQuery } from "@tanstack/react-query";
import type {
  ChallengeDTO,
  ChallengeListDTO,
  ChallengeResumeDTO,
} from "@squelch/shared";
import { challengeQueryKeys } from "./challenge.query-keys";
import api from "../../../api/axios.api";
import { API_ROUTES } from "../../../config/constants";
import type { ExtendedErrorPayload } from "../../../types";

export function useGetChallenge(id: number) {
  return useQuery<ChallengeDTO, ExtendedErrorPayload>({
    queryKey: challengeQueryKeys.challenge(id),
    queryFn: async () => {
      const response = await api.get(API_ROUTES.CHALLENGE(id), {
        withCredentials: true,
        withXSRFToken: true,
      });

      return response.data.body;
    },
    enabled: !!id,
  });
}

export function useGetChallengeList() {
  return useQuery<ChallengeListDTO, ExtendedErrorPayload>({
    queryKey: challengeQueryKeys.list(),
    queryFn: async () => {
      const response = await api.get(API_ROUTES.CHALLENGE_LIST, {
        withCredentials: true,
        withXSRFToken: true,
      });

      return response.data.body;
    },
  });
}

export function useGetChallengeResume() {
  return useQuery<ChallengeResumeDTO | null, ExtendedErrorPayload>({
    queryKey: challengeQueryKeys.resume(),
    queryFn: async () => {
      const response = await api.get(API_ROUTES.CHALLENGE_RESUME, {
        withCredentials: true,
        withXSRFToken: true,
      });

      return response.data.body;
    },
  });
}
