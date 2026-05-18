import { AuthUserDTO, LoginUser, RegisterUser, UserDTO } from "@squelch/shared";
import { UserEntity } from "../entities/types.entities.js";
import { RunResult } from "better-sqlite3";

export interface IAuthRepository {
  register(newUser: RegisterUser): RunResult;
}

export interface IAuthService {
  register(newUser: RegisterUser): Promise<AuthUserDTO>;

  login(user: LoginUser): Promise<AuthUserDTO>;
}
