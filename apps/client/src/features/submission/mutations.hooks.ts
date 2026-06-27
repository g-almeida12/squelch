import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api/axios.api";
import { API_ROUTES } from "../../config/constants";
import type {
  ErrorResponse,
  SubmissionDTO,
  SubmissionValidation,
} from "@squelch/shared";
import { submissionQueryKeys } from "./query-keys.submission";

export function useValidateQuery() {
  const queryClient = useQueryClient();

  return useMutation<
    SubmissionDTO,
    ErrorResponse,
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

    onSuccess: async (submission) => {
      await queryClient.invalidateQueries({
        queryKey: submissionQueryKeys.RUN(submission.id),
      });
      await queryClient.invalidateQueries({
        queryKey: submissionQueryKeys.CHALLENGES(submission.challengeId),
      });
      await queryClient.invalidateQueries({
        queryKey: submissionQueryKeys.SUBMISSION(submission.id),
      });
      await queryClient.invalidateQueries({
        queryKey: submissionQueryKeys.USER_SUBMISSIONS,
      });
    },
  });
}
