import { z } from "zod";
import { AuthRegisterSchema, AuthLoginSchema } from "../schemas/index.js";
import { UserDTO } from "./user.types.js";

export type AuthRegister = z.infer<typeof AuthRegisterSchema>;
export type AuthLogin = z.infer<typeof AuthLoginSchema>;
export type AuthDTO = UserDTO & { xsrfToken: string };
