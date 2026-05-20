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
import { randomUUID, createHash } from "crypto";

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

    const refreshToken = randomUUID();
    const hashedRefreshToken = createHash("sha256")
      .update(refreshToken)
      .digest("hex");
    const expiredAt = new Date(
      Date.now() + 1000 * 60 * 60 * 24 * 7,
    ).toISOString();
    this.authRepository.createRefreshToken(
      registeredUser.id,
      hashedRefreshToken,
      expiredAt,
    );

    const accessToken = jwt.sign(
      { sub: String(registeredUser.id), email: registeredUser.email },
      envConfig.JWT_SECRET,
      {
        expiresIn: "15m",
        issuer: "squelch-auth-api",
      },
    );

    return mapAuthUserDTO({
      ...registeredUser,
      accessToken,
      refreshToken,
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

    const refreshToken = randomUUID();
    const hashedRefreshToken = createHash("sha256")
      .update(refreshToken)
      .digest("hex");
    const expiredAt = new Date(
      Date.now() + 1000 * 60 * 60 * 24 * 7,
    ).toISOString();
    this.authRepository.createRefreshToken(
      registeredUser.id,
      hashedRefreshToken,
      expiredAt,
    );

    const accessToken = jwt.sign(
      { sub: String(registeredUser.id), email: registeredUser.email },
      envConfig.JWT_SECRET,
      {
        expiresIn: "15m",
        issuer: "squelch-auth-api",
      },
    );

    return mapAuthUserDTO({
      ...registeredUser,
      accessToken,
      refreshToken,
      xsrfToken: randomUUID(),
    });
  }

  refresh(token: string): AuthUserDTO {
    const hashedToken = createHash("sha256").update(token).digest("hex");
    const registeredRefreshToken =
      this.authRepository.findRefreshTokenByToken(hashedToken);

    if (!registeredRefreshToken) {
      throw new ApplicationError(
        "Refresh Token não encontrado para o usuário.",
        404,
      );
    }

    if (
      new Date(registeredRefreshToken.expiresAt).getTime() <
      new Date().getTime()
    ) {
      throw new ApplicationError(
        "Refresh Token expirou. Faça login novamente.",
        401,
      );
    }

    if (
      registeredRefreshToken.revokedAt &&
      new Date(registeredRefreshToken.revokedAt).getTime() >
        new Date(Date.now() + 30_000).getTime()
    ) {
      this.authRepository.invalidateTokensByUserId(
        registeredRefreshToken.userId,
        "SECURITY_BREACH",
      );
      throw new ApplicationError(
        "Refresh Token já revogado utilizado. Família de Refresh Tokens do usuário invalidada.",
        403,
      );
    }

    const user = this.userRepository.findById(registeredRefreshToken.userId);
    if (!user) {
      throw new ApplicationError("Usuário não encontrado.", 404);
    }

    this.authRepository.revokeToken(registeredRefreshToken.id, "ROTATION");

    const refreshToken = randomUUID();
    const hashedRefreshToken = createHash("sha256")
      .update(refreshToken)
      .digest("hex");
    const expiredAt = new Date(
      Date.now() + 1000 * 60 * 60 * 24 * 7,
    ).toISOString();
    this.authRepository.createRefreshToken(
      user.id,
      hashedRefreshToken,
      expiredAt,
    );

    const accessToken = jwt.sign(
      { sub: String(user.id), email: user.email },
      envConfig.JWT_SECRET,
      {
        expiresIn: "15m",
        issuer: "squelch-auth-api",
      },
    );

    return mapAuthUserDTO({
      ...user,
      accessToken,
      refreshToken,
      xsrfToken: randomUUID(),
    });
  }
}
