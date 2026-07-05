import { z } from "zod";
import { IdSchema } from "./id.schemas.js";

const UserBaseSchema = z.object({
  name: z.string().min(1, "Mínimo de 1 caractere."),
  email: z.email("Email inválido."),
  password: z.string().min(8, "Senha deve ter no mínimo 8 caracteres."),
});
export const UserRegisterSchema = UserBaseSchema.required();
export const UserLoginSchema = UserBaseSchema.omit({ name: true });
export const UserUpdateSchema = UserBaseSchema.partial();
export const UserDTOSchema = UserBaseSchema.omit({ password: true }).extend({
  id: IdSchema,
});
export const AuthUserDTOSchema = UserDTOSchema.extend({
  accessToken: z.jwt(),
  refreshToken: z.string(),
  xsrfToken: z.string(),
});
export const UserProgressDTOSchema = z.object({
  userId: IdSchema,
  totalSubmissions: z.number().nonnegative(),
  totalChallenges: z.number().nonnegative(),
  totalGroups: z.number().nonnegative(),
  completedChallengeIds: z.array(IdSchema),
  completedGroupSlugs: z.array(z.string()),
});

export type UserRegister = z.infer<typeof UserRegisterSchema>;
export type UserLogin = z.infer<typeof UserLoginSchema>;
export type UserUpdate = z.infer<typeof UserUpdateSchema>;
export type UserDTO = z.infer<typeof UserDTOSchema>;
export type UserAuthDTO = z.infer<typeof AuthUserDTOSchema>;
export type UserProgressDTO = z.infer<typeof UserProgressDTOSchema>;
