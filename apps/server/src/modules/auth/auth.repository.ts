import { UserRegister } from "@squelch/shared";
import { RunResult, Statement } from "better-sqlite3";
import { IAuthRepository } from "./auth.interfaces.js";
import { db } from "../../shared/database/index.js";
import {ApplicationError} from "../../shared/errors/index.js";
import { RefreshTokenEntity } from "./auth.entity.js";
import { IUserRepository, UserEntity } from "../user/index.js";

export class AuthRepository implements IAuthRepository {
  // Prepared statments
  private registerUserStmt: Statement;
  private createRefreshTokenStmt: Statement;
  private findRefreshTokenByTokenStmt: Statement;
  private revokeTokenStmt: Statement;
  private invalidateRefreshTokensStmt: Statement;
  constructor(private userRepository: IUserRepository) {
    this.userRepository = userRepository;
    this.registerUserStmt = db.prepare(
      "INSERT INTO users (name, email, password) VALUES (@name, @email, @password)",
    );
    this.createRefreshTokenStmt = db.prepare(
      "INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES (@userId, @token, @expiresAt)",
    );
    this.findRefreshTokenByTokenStmt = db.prepare(
      "SELECT id, user_id, token, expires_at, revoked_at, revocation_reason FROM refresh_tokens WHERE token = ?",
    );
    this.revokeTokenStmt = db.prepare(
      "UPDATE refresh_tokens SET revoked_at = @revokedAt, revocation_reason = 'ROTATION' WHERE id = @id",
    );
    this.invalidateRefreshTokensStmt = db.prepare(
      "UPDATE refresh_tokens SET revoked_at = @revokedAt, revocation_reason = @revocationReason WHERE user_id = @userId",
    );
  }

  async register(newUser: UserRegister): Promise<UserEntity> {
    try {
      const registerResult = this.registerUserStmt.run(newUser);

      return (await this.userRepository.findById(
        registerResult.lastInsertRowid as number,
      )) as UserEntity;
    } catch (err) {
      throw ApplicationError.repositoryError(err);
    }
  }

  async createRefreshToken(
    userId: number,
    token: string,
    expiresAt: string,
  ): Promise<RunResult> {
    try {
      return this.createRefreshTokenStmt.run({ userId, token, expiresAt });
    } catch (err) {
      throw ApplicationError.repositoryError(err);
    }
  }

  async findRefreshTokenByToken(
    hashedToken: string,
  ): Promise<RefreshTokenEntity | null> {
    try {
      const refreshToken = this.findRefreshTokenByTokenStmt.get(hashedToken) as
        | RefreshTokenEntity
        | undefined;
      if (!refreshToken) {
        return Promise.resolve(null);
      }

      return refreshToken;
    } catch (err) {
      throw ApplicationError.repositoryError(err);
    }
  }

  async revokeToken(id: number, revokedAt: string): Promise<RunResult> {
    try {
      return this.revokeTokenStmt.run({ id, revokedAt });
    } catch (err) {
      throw ApplicationError.repositoryError(err);
    }
  }

  async invalidateTokensByUserId(
    userId: number,
    revocationReason: "SECURITY_BREACH" | "LOGOUT",
  ): Promise<RunResult> {
    try {
      return this.invalidateRefreshTokensStmt.run({ userId, revocationReason });
    } catch (err) {
      throw ApplicationError.repositoryError(err);
    }
  }
}
