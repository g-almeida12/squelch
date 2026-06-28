import { UserRegister, UserAuthDTO, UserLogin } from "@squelch/shared";
import {
  IAuthRepository,
  IAuthService,
} from "./auth.interfaces.js";
import { IUserRepository } from "../user/index.js";
import {ApplicationError} from "../../shared/errors/index.js";
import { hash, verify } from "argon2";
import jwt from "jsonwebtoken";
import { envConfig } from "../../config/env.config.js";
import { mapAuthUserDTO } from "./auth.entity.js";
import { randomUUID, createHash } from "crypto";

export class AuthService implements IAuthService {
  constructor(
    private authRepository: IAuthRepository,
    private userRepository: IUserRepository,
  ) {
    this.authRepository = authRepository;
    this.userRepository = userRepository;
  }

  async register(newUser: UserRegister): Promise<UserAuthDTO> {
    const user = await this.userRepository.findByEmail(newUser.email);
    if (user) {
      throw new ApplicationError("Esse email já está registrado.", 409);
    }

    const hashedPassword = await hash(newUser.password);
    const registeredUser = await this.authRepository.register({
      ...newUser,
      password: hashedPassword,
    });

    const refreshToken = randomUUID();
    const hashedRefreshToken = createHash("sha256")
      .update(refreshToken)
      .digest("hex");
    const expiresAt = new Date(
      Date.now() + 1000 * 60 * 60 * 24 * 7,
    ).toISOString();
    this.authRepository.createRefreshToken(
      registeredUser.id,
      hashedRefreshToken,
      expiresAt,
    );

    const accessToken = jwt.sign(
      {
        sub: String(registeredUser.id),
        email: registeredUser.email,
      },
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

  async login(user: UserLogin): Promise<UserAuthDTO> {
    const registeredUser = await this.userRepository.findByEmail(user.email);
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
    const expiresAt = new Date(
      Date.now() + 1000 * 60 * 60 * 24 * 7,
    ).toISOString();
    this.authRepository.createRefreshToken(
      registeredUser.id,
      hashedRefreshToken,
      expiresAt,
    );

    const accessToken = jwt.sign(
      {
        sub: String(registeredUser.id),
        email: registeredUser.email,
      },
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

  async refresh(token: string): Promise<UserAuthDTO> {
    const hashedToken = createHash("sha256").update(token).digest("hex");
    const registeredRefreshToken =
      await this.authRepository.findRefreshTokenByToken(hashedToken);

    if (!registeredRefreshToken) {
      throw new ApplicationError(
        "Refresh Token não encontrado para o usuário.",
        404,
      );
    }

    if (
      new Date(registeredRefreshToken.expires_at).getTime() <
      new Date().getTime()
    ) {
      throw new ApplicationError(
        "Refresh Token expirou. Faça login novamente.",
        401,
      );
    }

    if (
      registeredRefreshToken.revoked_at &&
      new Date(registeredRefreshToken.revoked_at).getTime() >
        new Date(Date.now() + 10_000).getTime()
    ) {
      this.authRepository.invalidateTokensByUserId(
        registeredRefreshToken.user_id,
        "SECURITY_BREACH",
      );
      throw new ApplicationError(
        "Refresh Token já revogado utilizado. Família de Refresh Tokens do usuário invalidada.",
        403,
      );
    }

    const user = await this.userRepository.findById(
      registeredRefreshToken.user_id,
    );
    if (!user) {
      throw new ApplicationError("Usuário não encontrado.", 404);
    }

    await this.authRepository.revokeToken(
      registeredRefreshToken.id,
      "ROTATION",
    );

    const refreshToken = randomUUID();
    const hashedRefreshToken = createHash("sha256")
      .update(refreshToken)
      .digest("hex");
    const expiresAt = new Date(
      Date.now() + 1000 * 60 * 60 * 24 * 7,
    ).toISOString();
    this.authRepository.createRefreshToken(
      user.id,
      hashedRefreshToken,
      expiresAt,
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
