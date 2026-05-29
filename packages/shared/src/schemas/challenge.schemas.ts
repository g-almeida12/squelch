import { z } from "zod";
import { IdSchema } from "./id.schemas";

export const ChallengesDifficultiesSchema = z.enum(["EASY", "MEDIUM", "HARD"]);
const ChallengeBaseSchema = z.object({
  title: z.string().min(3, "Mínimo de 3 caracteres para o título."),
  markdown: z.string().min(1, "O texto em markdown do desafio precisa ser fornecido."),
  difficulty: ChallengesDifficultiesSchema,
  validationQuery: z.string().min(6, "Query de validação precisa ser fornecida."),
  affectedRows: z.number().min(1, "Mínimo de linhas afetadas é 1."),
});
export const ChallengeCreateSchema = ChallengeBaseSchema;
export const ChallengeUpdateSchema = ChallengeBaseSchema.partial();
export const ChallengeDTOSchema = ChallengeBaseSchema.omit({
  validationQuery: true,
  affectedRows: true,
}).extend({
  id: IdSchema,
});

export type ChallengeDifficulties = z.infer<
  typeof ChallengesDifficultiesSchema
>;
export type ChallengeCreate = z.infer<typeof ChallengeCreateSchema>;
export type ChallengeUpdate = z.infer<typeof ChallengeUpdateSchema>;
export type ChallengeDTO = z.infer<typeof ChallengeDTOSchema>;
