import { AuthRegister, AuthLogin, Id } from "@squelch/shared";
import { AuthEntity, RefreshTokenEntity } from "./index.js";
import { UserEntity } from "../user/index.js";

export interface IAuthRepository {
  register(newUser: AuthRegister): Promise<UserEntity>;

  createRefreshToken(
    userId: Id,
    token: string,
    expiresAt: string,
  ): Promise<RefreshTokenEntity>;

  findRefreshTokenByToken(
    hashedToken: string,
  ): Promise<RefreshTokenEntity | null>;

  revokeToken(id: Id, revokedAt: string): Promise<RefreshTokenEntity>;

  invalidateTokensByUserId(
    userId: Id,
    revocationReason: "SECURITY_BREACH" | "LOGOUT",
  ): Promise<void>;
}

export interface IAuthService {
  register(newUser: AuthRegister): Promise<AuthEntity>;

  login(user: AuthLogin): Promise<AuthEntity>;

  refresh(token: string): Promise<AuthEntity>;
}
