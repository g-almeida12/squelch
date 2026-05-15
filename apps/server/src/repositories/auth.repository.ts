import { RegisterUser } from "@squelch/shared";
import { UserEntity } from "../entities/entities.js";
import { IAuthRepository } from "../interfaces/auth.interfaces.js";

export default class AuthRepository implements IAuthRepository {
  register(newUser: RegisterUser): Promise<UserEntity> {
    throw new Error("Method not implemented.");
  }
}
