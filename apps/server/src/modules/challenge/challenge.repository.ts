import { Id } from "@squelch/shared";
import {
  ChallengeEntity,
  ChallengeListItemEntity,
  ChallengeQueryEntity,
  ChallengeResumeEntity,
  IChallengeRepository,
} from "./index.js";
import { ApplicationError } from "../../shared/errors/index.js";
import { prisma } from "../../shared/database/index.js";

export class ChallengeRepository implements IChallengeRepository {
  async getChallengeQueryInfo(
    challengeId: Id,
  ): Promise<ChallengeQueryEntity | null> {
    try {
      return await prisma.challenge.findUnique({
        where: { id: challengeId },
        select: { id: true, group_slug: true, validation_query: true },
      });
    } catch (err) {
      throw ApplicationError.repositoryError(err);
    }
  }

  async getChallengeResume(userId: Id): Promise<ChallengeResumeEntity | null> {
    try {
      return (
        await prisma.$queryRaw<(ChallengeResumeEntity | null)[]>`
          SELECT 
            c.id, c.title, 
            c.group_slug, 
            c.group_title, 
            c.difficulty, 
            COUNT(s.id)::int as total_submissions, 
            MAX(s.date) as last_submission_date
          FROM challenges c
          JOIN submissions s ON c.id = s.challenge_id
          WHERE s.user_id = ${userId}
          GROUP BY c.id, c.title, c.group_slug, c.group_title, c.difficulty
          HAVING MAX(s.success::int) = 0
          ORDER BY last_submission_date DESC
          LIMIT 1
        `
      )[0];
    } catch (err) {
      throw ApplicationError.repositoryError(err);
    }
  }

  async getChallengeList(userId: Id): Promise<ChallengeListItemEntity[]> {
    try {
      return await prisma.$queryRaw<ChallengeListItemEntity[]>`
        SELECT
          c.id,
          c.title,
          c.group_slug,
          c.group_title,
          c.difficulty,
          COALESCE(BOOL_OR(s.success), false) AS completed_by_user
        FROM challenges c
        LEFT JOIN submissions s ON c.id = s.challenge_id AND s.user_id = ${userId}
        GROUP BY c.id
        ORDER BY c.position ASC
      `;
    } catch (err) {
      throw ApplicationError.repositoryError(err);
    }
  }

  async findById(challengeId: Id, userId: Id): Promise<ChallengeEntity | null> {
    try {
      return (
        await prisma.$queryRaw<(ChallengeEntity | null)[]>`
            SELECT 
              id, 
              title, 
              group_slug, 
              group_title, 
              markdown, 
              difficulty, 
              validation_query, 
              COALESCE(
                (SELECT BOOL_OR(success)
                FROM submissions 
                WHERE challenge_id = ${challengeId} 
                AND user_id = ${userId}),
                false
              ) as completed_by_user
            FROM challenges
            WHERE id = ${challengeId} 
        `
      )[0];
    } catch (err) {
      throw ApplicationError.repositoryError(err);
    }
  }
}
