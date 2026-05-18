import * as z from "zod";

const BaseUserSchema = z.object({
  name: z.string().min(1, "Mínimo de 1 caractere."),
  email: z.email("Email inválido."),
  password: z.string().min(8, "Senha deve ter no mínimo 8 caracteres."),
});
export const RegisterUserSchema = BaseUserSchema.required();
export const LoginUserSchema = BaseUserSchema.omit({ name: true });
export const UpdateUserSchema = BaseUserSchema.partial();
export const UserDTOSchema = BaseUserSchema.omit({ password: true }).extend({
  id: z.number(),
});
export const AuthUserDTOSchema = UserDTOSchema.extend({
  accessToken: z.jwt(),
  xsrfToken: z.string(),
});

export type RegisterUser = z.infer<typeof RegisterUserSchema>;
export type LoginUser = z.infer<typeof LoginUserSchema>;
export type UpdateUser = z.infer<typeof UpdateUserSchema>;
export type UserDTO = z.infer<typeof UserDTOSchema>;
export type AuthUserDTO = z.infer<typeof AuthUserDTOSchema>;
