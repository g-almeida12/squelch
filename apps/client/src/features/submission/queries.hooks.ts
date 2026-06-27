import { useQuery } from "@tanstack/react-query";
import { submissionQueryKeys } from "./query-keys.submission";
import type { ErrorResponse, SubmissionDTO } from "@squelch/shared";
import api from "../../api/axios.api";
import { API_ROUTES } from "../../config/constants";

export function useRunQuery(id: number) {
  return useQuery<SubmissionDTO, ErrorResponse>({
    queryKey: submissionQueryKeys.RUN(id),
    queryFn: async () => {
      const response = await api.get(API_ROUTES.QUERY_RUN(id), {
        withCredentials: true,
        withXSRFToken: true,
      });
      return response.data.body;
    },
  });
}

export function useGetSubmission(id: number) {
  return useQuery<SubmissionDTO, ErrorResponse>({
    queryKey: submissionQueryKeys.SUBMISSION(id),
    queryFn: async () => {
      const response = await api.get(API_ROUTES.SUBMISSION(id), {
        withCredentials: true,
        withXSRFToken: true,
      });
      return response.data.body;
    },
  });
}

export function useGetUserSubmissions() {
  return useQuery<SubmissionDTO, ErrorResponse>({
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
  return useQuery<SubmissionDTO, ErrorResponse>({
    queryKey: submissionQueryKeys.CHALLENGES(id),
    queryFn: async () => {
      const response = await api.get(API_ROUTES.CHALLENGES_SUBMISSIONS(id), {
        withCredentials: true,
        withXSRFToken: true,
      });
      return response.data.body;
    },
  });
}

