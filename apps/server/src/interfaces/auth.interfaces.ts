import { AuthUserDTO, LoginUser, RegisterUser } from "@squelch/shared";
import { RunResult } from "better-sqlite3";
import { RefreshTokenEntity } from "../entities/types.entities.js";

export interface IAuthRepository {
  register(newUser: RegisterUser): RunResult;

  createRefreshToken(
    userId: number,
    token: string,
    expiredAt: string,
  ): RunResult;

  findRefreshTokenByToken(hashedToken: string): RefreshTokenEntity | null;

  revokeToken(id: number, revokedAt: string): RunResult;

  invalidateTokensByUserId(
    userId: number,
    revocationReason: "SECURITY_BREACH" | "LOGOUT",
  ): RunResult;
}

export interface IAuthService {
  register(newUser: RegisterUser): Promise<AuthUserDTO>;

  login(user: LoginUser): Promise<AuthUserDTO>;

  refresh(token: string): AuthUserDTO;
}
