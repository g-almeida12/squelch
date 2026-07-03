import { SubmissionDTO } from "../schemas/submissions.schemas"

export type SubmissionValidationDTO = {
  submission: SubmissionDTO;
  errorMessages: string[] | null;
}