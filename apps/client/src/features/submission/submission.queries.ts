import { useQuery } from "@tanstack/react-query";
import { submissionQueryKeys } from "./submission.query-keys";
import type { SubmissionDTO } from "@squelch/shared";
import api from "../../api/axios.api";
import { API_ROUTES } from "../../config/constants";
import type { ExtendedErrorPayload } from "../../types";

export function useGetSubmission(id: number) {
  return useQuery<SubmissionDTO, ExtendedErrorPayload>({
    queryKey: submissionQueryKeys.SUBMISSION(id),
    queryFn: async () => {
      const response = await api.get(API_ROUTES.SUBMISSION(id), {
        withCredentials: true,
        withXSRFToken: true,
      });
      return response.data.body;
    },
    enabled: !!id,
  });
}

export function useGetUserSubmissions() {
  return useQuery<SubmissionDTO[], ExtendedErrorPayload>({
    queryKey: submissionQueryKeys.USER_SUBMISSIONS,
    queryFn: async () => {
      const response = await api.get(API_ROUTES.USER_SUBMISSIONS, {
        withCredentials: true,
        withXSRFToken: true,
      });
      return response.data.body;
    },
  });
}

export function useGetChallengeSubmissions(id: number) {
  return useQuery<SubmissionDTO[], ExtendedErrorPayload>({
    queryKey: submissionQueryKeys.CHALLENGES(id),
    queryFn: async () => {
      const response = await api.get(API_ROUTES.CHALLENGES_SUBMISSIONS(id), {
        withCredentials: true,
        withXSRFToken: true,
      });
      return response.data.body;
    },
    enabled: !!id,
  });
}
