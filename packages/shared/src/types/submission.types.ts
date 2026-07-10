import { z } from "zod";
import type {
  QueryResultDTOSchema,
  SubmissionValidationSchema,
  SubmissionDTOSchema,
} from "../schemas";

export type QueryResultDTO = z.infer<typeof QueryResultDTOSchema>;

export type SubmissionValidation = z.infer<typeof SubmissionValidationSchema>;

export type SubmissionDTO = z.infer<typeof SubmissionDTOSchema>;

export type SubmissionValidationDTO = {
  submission: SubmissionDTO;
  errorMessages: string[] | null;
};
