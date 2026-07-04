import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api/axios.api";
import { API_ROUTES } from "../../config/constants";
import type {
  ErrorPayload,
  QueryResultDTO,
  SubmissionValidation,
  SubmissionValidationDTO,
} from "@squelch/shared";
import { submissionQueryKeys } from "./submission.query-keys";

export function useRunQuery() {
  return useMutation<
    QueryResultDTO,
    ErrorPayload,
    { id: number; submittedQuery: string }
  >({
    mutationFn: async ({ id, submittedQuery }) => {
      const response = await api.post(
        API_ROUTES.QUERY_RUN(id),
        { submittedQuery },
        {
          withCredentials: true,
          withXSRFToken: true,
        },
      );

      return response.data.body;
    },
  });
}

export function useValidateQuery() {
  const queryClient = useQueryClient();

  return useMutation<
    SubmissionValidationDTO,
    ErrorPayload,
    { id: number; submission: SubmissionValidation }
  >({
    mutationFn: async ({ id, submission }) => {
      const response = await api.post(
        API_ROUTES.VALIDATION_RUN(id),
        submission,
        { withCredentials: true, withXSRFToken: true },
      );

      return response.data.body;
    },

    onSuccess: async (validation) => {
      await queryClient.invalidateQueries({
        queryKey: submissionQueryKeys.CHALLENGES(validation.submission.challengeId),
      });
      await queryClient.invalidateQueries({
        queryKey: submissionQueryKeys.SUBMISSION(validation.submission.id),
      });
      await queryClient.invalidateQueries({
        queryKey: submissionQueryKeys.USER_SUBMISSIONS,
      });
    },
  });
}
