import { UserBaseSchema } from "./user.schemas.js";

export const AuthRegisterSchema = UserBaseSchema.required();

export const AuthLoginSchema = UserBaseSchema.omit({ name: true });
