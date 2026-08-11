import { z } from "zod";
import {
  UserUpdateSchema,
  UserDTOSchema,
  UserProgressDTOSchema,
} from "../schemas/index.js";

export type UserUpdate = z.infer<typeof UserUpdateSchema>;

export type UserDTO = z.infer<typeof UserDTOSchema>;

export type UserProgressDTO = z.infer<typeof UserProgressDTOSchema>;
