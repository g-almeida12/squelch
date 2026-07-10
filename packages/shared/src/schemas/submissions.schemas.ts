import { z } from "zod";
import { IdSchema } from "./id.schemas.js";

export const QueryResultDTOSchema = z.array(
  z.record(
    z.string(),
    z.union([z.string(), z.number(), z.null(), z.boolean()]),
  ),
);

export const SubmissionBaseSchema = z.object({
  challengeId: IdSchema,
  submittedQuery: z.string().min(6, "Query de submissão precisa ser enviada."),
  date: z.coerce
    .date()
    .default(() => new Date())
    .refine((val) => val.getTime() <= new Date().getTime(), {
      error: "Data de submissão não pode ser no futuro.",
    }),
});

export const SubmissionValidationSchema = SubmissionBaseSchema.omit({
  challengeId: true,
});

export const SubmissionDTOSchema = SubmissionBaseSchema.extend({
  id: IdSchema,
  userId: IdSchema,
  userQueryResult: QueryResultDTOSchema,
  challengeTitle: z.string(),
  challengeGroupTitle: z.string(),
  success: z.boolean(),
});
