import { RegisterUser, AuthUserDTO, LoginUser } from "@squelch/shared";
import {
  IAuthRepository,
  IAuthService,
} from "../interfaces/auth.interfaces.js";
import { IUserRepository } from "../interfaces/user.interfaces.js";
import ApplicationError from "../helpers/errors/application.error.js";
import { hash, verify } from "argon2";
import jwt from "jsonwebtoken";
import { envConfig } from "../config/env.config.js";
import { mapAuthUserDTO } from "../entities/mappers.entities.js";
import { randomUUID } from "crypto";

export default class AuthService implements IAuthService {
  private authRepository: IAuthRepository;
  private userRepository: IUserRepository;
  constructor(authRepo: IAuthRepository, userRepository: IUserRepository) {
    this.authRepository = authRepo;
    this.userRepository = userRepository;
  }

  async register(newUser: RegisterUser): Promise<AuthUserDTO> {
    const user = this.userRepository.findByEmail(newUser.email);
    if (user) {
      throw new ApplicationError("Esse email já está registrado.", 409);
    }

    const hashedPassword = await hash(newUser.password);
    this.authRepository.register({ ...newUser, password: hashedPassword });

    const registeredUser = this.userRepository.findByEmail(newUser.email);
    if (!registeredUser) {
      throw new ApplicationError("Usuário não encontrado.", 404);
    }

    const accessToken = jwt.sign(
      { sub: String(registeredUser.id), email: registeredUser.email },
      envConfig.JWT_SECRET,
      {
        expiresIn: "7d",
        issuer: "squelch-auth-api",
      },
    );

    return mapAuthUserDTO({
      ...registeredUser,
      accessToken,
      xsrfToken: randomUUID(),
    });
  }

  async login(user: LoginUser): Promise<AuthUserDTO> {
    const registeredUser = this.userRepository.findByEmail(user.email);
    if (!registeredUser) {
      throw new ApplicationError("Email ou senha inválidos.", 422, [
        { field: "email", message: "Email inválido." },
        { field: "password", message: "Senha inválida." },
      ]);
    }

    const isValidUser = await verify(registeredUser.password, user.password);
    if (!isValidUser) {
      throw new ApplicationError("Email ou senha inválidos.", 422, [
        { field: "email", message: "Email inválido." },
        { field: "password", message: "Senha inválida." },
      ]);
    }

    const accessToken = jwt.sign(
      { sub: String(registeredUser.id), email: registeredUser.email },
      envConfig.JWT_SECRET,
      {
        expiresIn: "7d",
        issuer: "squelch-auth-api",
      },
    );

    return mapAuthUserDTO({
      ...registeredUser,
      accessToken,
      xsrfToken: randomUUID(),
    });
  }
}
