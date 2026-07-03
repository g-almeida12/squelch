import { useQuery } from "@tanstack/react-query";
import type {
  ChallengeDTO,
  ChallengeResume,
  ErrorResponse,
} from "@squelch/shared";
import { CHALLENGE_QUERY_KEYS } from "./challenge.query-keys";
import api from "../../../api/axios.api";
import { API_ROUTES } from "../../../config/constants";

export function useGetChallenge(id: number) {
  return useQuery<ChallengeDTO, ErrorResponse>({
    queryKey: CHALLENGE_QUERY_KEYS.CHALLENGE(id),
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

export function useGetChallengeResume() {
  return useQuery<ChallengeResume | null, ErrorResponse>({
    queryKey: CHALLENGE_QUERY_KEYS.CHALLENGE_RESUME,
    queryFn: async () => {
      const response = await api.get(API_ROUTES.CHALLENGE_RESUME, {
        withCredentials: true,
        withXSRFToken: true,
      });

      return response.data.body;
    },
  });
}
