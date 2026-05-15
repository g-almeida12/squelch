import { AuthUserDTO, LoginUser, RegisterUser, UserDTO } from "@squelch/shared";
import { UserEntity } from "../entities/entities.js";

export interface IAuthRepository {
  register(newUser: RegisterUser): Promise<UserEntity>;
}

export interface IAuthService {
  register(newUser: RegisterUser): Promise<AuthUserDTO>;

  login(user: LoginUser): Promise<AuthUserDTO>
}