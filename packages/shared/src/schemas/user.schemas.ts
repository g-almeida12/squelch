import { z } from "zod";
import { IdSchema } from "./id.schemas.js";

export const UserBaseSchema = z.object({
  name: z.string().min(1, "Mínimo de 1 caractere."),
  email: z.email("Email inválido."),
  password: z.string().min(8, "Senha deve ter no mínimo 8 caracteres."),
});

export const UserUpdateSchema = UserBaseSchema.partial();

export const UserDTOSchema = UserBaseSchema.omit({ password: true }).extend({
  id: IdSchema,
});

export const UserProgressDTOSchema = z.object({
  userId: IdSchema,
  totalSubmissions: z.number().nonnegative(),
  totalChallenges: z.number().nonnegative(),
  totalGroups: z.number().nonnegative(),
  completedChallengeIds: z.array(IdSchema),
  completedGroupSlugs: z.array(z.string()),
});
