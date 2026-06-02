import { SubmissionDTO } from "../schemas/submissions.schemas";

export type SubmissionValidationErrors = {
  diffColumnsAffected: -1 | 0 | 1 | null;
  diffRowsAffected: -1 | 0 | 1 | null;
  queryError: string | null;
}

export type SuccessSubmission = {
  success: true;
  submission: Omit<SubmissionDTO, 'success'>;
}

export type ErrorSubmission = {
  success: false;
  submission: Omit<SubmissionDTO, 'success'>;
  errors: SubmissionValidationErrors;
}