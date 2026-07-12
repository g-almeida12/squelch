import { AuthRegister } from "@squelch/shared";
import { prisma } from "../../shared/database/index.js";
import { ApplicationError } from "../../shared/errors/index.js";
import { UserEntity } from "../user/index.js";
import { IAuthRepository, RefreshTokenEntity } from "./index.js";

export class AuthRepository implements IAuthRepository {
  async register(newUser: AuthRegister): Promise<UserEntity> {
    try {
      return await prisma.user.create({ data: newUser });
    } catch (err) {
      throw ApplicationError.repositoryError(err);
    }
  }

  async createRefreshToken(
    userId: number,
    token: string,
    expiresAt: string,
  ): Promise<RefreshTokenEntity> {
    try {
      return await prisma.refreshToken.create({
        data: {
          user_id: userId,
          expires_at: expiresAt,
          token,
        },
      });
    } catch (err) {
      throw ApplicationError.repositoryError(err);
    }
  }

  async findRefreshTokenByToken(
    hashedToken: string,
  ): Promise<RefreshTokenEntity | null> {
    try {
      return await prisma.refreshToken.findFirst({
        where: { token: hashedToken },
      });
    } catch (err) {
      throw ApplicationError.repositoryError(err);
    }
  }

  async revokeToken(
    id: number,
    revokedAt: string,
  ): Promise<RefreshTokenEntity> {
    try {
      return await prisma.refreshToken.update({
        where: { id },
        data: { revoked_at: revokedAt, revocation_reason: "ROTATION" },
      });
    } catch (err: any) {
      throw ApplicationError.repositoryError(err);
    }
  }

  async invalidateTokensByUserId(
    userId: number,
    revocationReason: "SECURITY_BREACH" | "LOGOUT",
  ): Promise<void> {
    try {
      await prisma.refreshToken.updateMany({
        where: { user_id: userId },
        data: { revocation_reason: revocationReason, revoked_at: new Date() },
      });
    } catch (err) {
      throw ApplicationError.repositoryError(err);
    }
  }
}
