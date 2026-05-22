import { z } from "zod";

const UserBaseSchema = z.object({
  name: z.string().min(1, "Mínimo de 1 caractere."),
  email: z.email("Email inválido."),
  password: z.string().min(8, "Senha deve ter no mínimo 8 caracteres."),
});
export const UserRegisterSchema = UserBaseSchema.required();
export const UserLoginSchema = UserBaseSchema.omit({ name: true });
export const UserUpdateSchema = UserBaseSchema.partial();
export const UserDTOSchema = UserBaseSchema.omit({ password: true }).extend({
  id: z.number(),
});
export const AuthUserDTOSchema = UserDTOSchema.extend({
  accessToken: z.jwt(),
  refreshToken: z.string(),
  xsrfToken: z.string(),
});

export type UserRegister = z.infer<typeof UserRegisterSchema>;
export type UserLogin = z.infer<typeof UserLoginSchema>;
export type UserUpdate = z.infer<typeof UserUpdateSchema>
export type UserDTO = z.infer<typeof UserDTOSchema>;
export type UserAuthDTO = z.infer<typeof AuthUserDTOSchema>;
