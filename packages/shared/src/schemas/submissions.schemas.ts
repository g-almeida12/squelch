import { z } from "zod";
import { IdSchema } from "./id.schemas";

export const QueryResultSchema = z.array(
  z.record(
    z.string(),
    z.union([z.string(), z.number(), z.null(), z.boolean()]),
  ),
);
const SubmissionBaseSchema = z.object({
  challengeId: IdSchema,
  submittedQuery: z.string().min(6, "Query de submissão precisa ser enviada."),
  date: z.coerce
    .date()
    .default(() => new Date())
    .transform((val) => {
      const d = val.toISOString().split("T")[0];
      return new Date(`${d}T12:00:00Z`);
    })
    .refine((val) => {
      const currentNormalizedDate =
        new Date().toISOString().split("T")[0] + "T12:00:00Z";
      if (val.getTime() > new Date(currentNormalizedDate).getTime()) {
        return false;
      } else {
        return true;
      }
    }),
});
export const SubmissionValidationSchema = SubmissionBaseSchema.omit({
  challengeId: true,
});
export const SubmissionSaveSchema = SubmissionBaseSchema.extend({
  success: z.boolean(),
  userQueryResult: QueryResultSchema,
  userId: IdSchema,
});
export const SubmissionDTOSchema = SubmissionBaseSchema.extend({
  id: IdSchema,
  userId: IdSchema,
  userQueryResult: QueryResultSchema,
  success: z.boolean(),
});

export type QueryResultDTO = z.infer<typeof QueryResultSchema>;
export type SubmissionValidation = z.infer<typeof SubmissionValidationSchema>;
export type SubmissionSave = z.infer<typeof SubmissionSaveSchema>;
export type SubmissionDTO = z.infer<typeof SubmissionDTOSchema>;