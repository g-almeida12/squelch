import { UserAuthDTO, UserRegister, UserLogin } from "@squelch/shared";
import { RunResult } from "better-sqlite3";
import { RefreshTokenEntity, UserEntity } from "../entities/types.entities.js";

export interface IAuthRepository {
  register(newUser: UserRegister): UserEntity;

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
  register(newUser: UserRegister): Promise<UserAuthDTO>;

  login(user: UserLogin): Promise<UserAuthDTO>;

  refresh(token: string): UserAuthDTO;
}
