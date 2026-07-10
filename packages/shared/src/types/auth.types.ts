import { z } from "zod";
import { AuthRegisterSchema, AuthLoginSchema } from "../schemas";
import { UserDTO } from "./user.types";

export type AuthRegister = z.infer<typeof AuthRegisterSchema>;
export type AuthLogin = z.infer<typeof AuthLoginSchema>;
export type AuthDTO = UserDTO & { xsrfToken: string };
