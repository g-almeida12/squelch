import { AuthRegister, AuthLogin, Id } from "@squelch/shared";
import { RunResult } from "better-sqlite3";
import { AuthEntity, RefreshTokenEntity } from "./index.js";
import { UserEntity } from "../user/index.js";

export interface IAuthRepository {
  register(newUser: AuthRegister): Promise<UserEntity>;

  createRefreshToken(
    userId: Id,
    token: string,
    expiresAt: string,
  ): Promise<RunResult>;

  findRefreshTokenByToken(
    hashedToken: string,
  ): Promise<RefreshTokenEntity | null>;

  revokeToken(id: Id, revokedAt: string): Promise<RunResult>;

  invalidateTokensByUserId(
    userId: Id,
    revocationReason: "SECURITY_BREACH" | "LOGOUT",
  ): Promise<RunResult>;
}

export interface IAuthService {
  register(newUser: AuthRegister): Promise<AuthEntity>;

  login(user: AuthLogin): Promise<AuthEntity>;

  refresh(token: string): Promise<AuthEntity>;
}
