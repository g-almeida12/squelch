import { UserAuthDTO, UserRegister, UserLogin, Id } from "@squelch/shared";
import { RunResult } from "better-sqlite3";
import { RefreshTokenEntity, UserEntity } from "../entities/types.entities.js";

export interface IAuthRepository {
  register(newUser: UserRegister): Promise<UserEntity>;

  createRefreshToken(
    userId: Id,
    token: string,
    expiredAt: string,
  ): Promise<RunResult>;

  findRefreshTokenByToken(hashedToken: string): Promise<RefreshTokenEntity | null>;

  revokeToken(id: Id, revokedAt: string): Promise<RunResult>;

  invalidateTokensByUserId(
    userId: Id,
    revocationReason: "SECURITY_BREACH" | "LOGOUT",
  ): Promise<RunResult>;
}

export interface IAuthService {
  register(newUser: UserRegister): Promise<UserAuthDTO>;

  login(user: UserLogin): Promise<UserAuthDTO>;

  refresh(token: string): Promise<UserAuthDTO>;
}
