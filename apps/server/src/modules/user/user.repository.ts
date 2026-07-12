import { Id } from "@squelch/shared";
import { prisma } from "../../shared/database/index.js";
import { ApplicationError } from "../../shared/errors/index.js";
import { UserEntity, UserProgressEntity, IUserRepository } from "./index.js";

export class UserRepository implements IUserRepository {
  async getUserProgress(userId: Id): Promise<UserProgressEntity> {
    try {
      const [
        totalSubmissions,
        totalChallenges,
        groupProgress,
        completedChallenges,
      ] = await prisma.$transaction([
        prisma.submission.count({ where: { user_id: userId } }),
        prisma.challenge.count(),
        prisma.$queryRaw<
          {
            group_slug: string;
            total: number;
            completed: number;
          }[]
        >`
          SELECT 
            c.group_slug, 
            COUNT(c.id)::int AS total,
            COUNT(
              DISTINCT CASE WHEN
              s.success = true
              AND s.user_id = ${userId} 
              THEN s.challenge_id END
            )::int AS completed
          FROM challenges c
          LEFT JOIN submissions s ON c.id = s.challenge_id
          GROUP BY c.group_slug
        `,
        prisma.$queryRaw<{ challenge_id: number }[]>`
          SELECT DISTINCT challenge_id 
          FROM submissions
          WHERE user_id = ${userId} 
          AND success = true
        `,
      ]);

      const completedGroupSlugs = groupProgress
        .filter((g) => g.completed === g.total)
        .map((g) => g.group_slug);

      const completedChallengeIds = completedChallenges.map(
        (s) => s.challenge_id,
      );

      return {
        user_id: userId,
        completed_group_slugs: completedGroupSlugs,
        completed_challenge_ids: completedChallengeIds,
        total_groups: groupProgress.length,
        total_submissions: totalSubmissions,
        total_challenges: totalChallenges,
      };
    } catch (err) {
      throw ApplicationError.repositoryError(err);
    }
  }

  async findById(userId: Id): Promise<UserEntity | null> {
    try {
      return await prisma.user.findUnique({
        where: { id: userId },
      });
    } catch (err) {
      throw ApplicationError.repositoryError(err);
    }
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    try {
      return await prisma.user.findUnique({
        where: { email },
      });
    } catch (err) {
      throw ApplicationError.repositoryError(err);
    }
  }

  async updateById(
    userId: Id,
    newData: Partial<Omit<UserEntity, "id">>,
  ): Promise<UserEntity | null> {
    try {
      return await prisma.user.update({
        where: { id: userId },
        data: newData,
      });
    } catch (err: any) {
      if (err.code === "P2025") {
        return null;
      }

      throw ApplicationError.repositoryError(err);
    }
  }

  async deleteById(userId: Id): Promise<boolean> {
    try {
      await prisma.user.delete({
        where: { id: userId },
      });

      return true;
    } catch (err: any) {
      if (err.code === "P2025") {
        return false;
      }

      throw ApplicationError.repositoryError(err);
    }
  }
}
