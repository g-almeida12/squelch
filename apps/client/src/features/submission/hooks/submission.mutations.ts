import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api/axios.api";
import { API_ROUTES } from "../../../config/constants";
import type {
  QueryResultDTO,
  SubmissionValidation,
  SubmissionValidationDTO,
} from "@squelch/shared";
import { submissionQueryKeys } from "./submission.query-keys";
import type { ExtendedErrorPayload } from "../../../types";
import { challengeQueryKeys } from "../../challenge/hooks/challenge.query-keys";

export function useRunQuery() {
  return useMutation<
    QueryResultDTO,
    ExtendedErrorPayload,
    { id: number; submittedQuery: string }
  >({
    mutationFn: async ({ id, submittedQuery }) => {
      const response = await api.post(
        API_ROUTES.EXECUTION_RUN(id),
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
    ExtendedErrorPayload,
    { id: number; submission: SubmissionValidation }
  >({
    mutationFn: async ({ id, submission }) => {
      const response = await api.post(
        API_ROUTES.SUBMISSION_RUN(id),
        submission,
        { withCredentials: true, withXSRFToken: true },
      );

      return response.data.body;
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: submissionQueryKeys.all,
      });
      await queryClient.invalidateQueries({
        queryKey: challengeQueryKeys.all,
      });
    },
  });
}
