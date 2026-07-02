import { z } from "zod";
import { IdSchema } from "./id.schemas";

export const ChallengesDifficultiesSchema = z.enum(["EASY", "MEDIUM", "HARD"]);

const ChallengeBaseSchema = z.object({
  title: z.string().min(3, "Mínimo de 3 caracteres para o título."),
  markdown: z
    .string()
    .min(1, "O texto em markdown do desafio precisa ser fornecido."),
  groupSlug: z.string().min(1, "O grupo do desafio precisa ser fornecido."),
  groupTitle: z.string().min(1, "O título do grupo do desafio precisa ser fornecido."),
  difficulty: ChallengesDifficultiesSchema,
});
export const ChallengeDTOSchema = ChallengeBaseSchema.extend({
  id: IdSchema,
});

export type ChallengeDifficulties = z.infer<
  typeof ChallengesDifficultiesSchema
  >;
export type ChallengeDTO = z.infer<typeof ChallengeDTOSchema>;
