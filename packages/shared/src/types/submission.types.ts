import type { SubmissionDTO } from "../schemas";

export type SubmissionValidationDTO = {
  submission: SubmissionDTO;
  errorMessages: string[] | null;
};
