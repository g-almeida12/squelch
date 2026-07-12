import { Id } from "@squelch/shared";
import {
  ISubmissionRepository,
  SubmissionEntity,
  SubmissionSave,
} from "./index.js";
import { ApplicationError } from "../../shared/errors/index.js";
import { prisma } from "../../shared/database/connection.js";

export class SubmissionRepository implements ISubmissionRepository {
  async save(submission: SubmissionSave): Promise<SubmissionEntity> {
    try {
      const challenge = await prisma.challenge.findUnique({
        where: { id: submission.challengeId },
      });
      if (!challenge) {
        throw new ApplicationError(
          "ID de desafio fornecido não encontrado.",
          404,
        );
      }

      const savedSubmission = await prisma.submission.create({
        data: {
          submitted_query: submission.submittedQuery,
          user_query_result: JSON.stringify(submission.userQueryResult),
          challenge_id: submission.challengeId,
          user_id: submission.userId,
          date: submission.date,
          success: submission.success,
        },
      });

      return {
        ...savedSubmission,
        challenge_group_title: challenge.group_title,
        challenge_title: challenge.title,
      };
    } catch (err) {
      throw ApplicationError.repositoryError(err);
    }
  }

  async findById(
    submissionId: Id,
    userId: Id,
  ): Promise<SubmissionEntity | null> {
    try {
      return (
        await prisma.$queryRaw<(SubmissionEntity | null)[]>`
          SELECT  
            s.id, 
            s.user_id, 
            c.id as challenge_id, 
            c.title as challenge_title, 
            c.group_title as challenge_group_title, 
            s.submitted_query, 
            s.date, s.success, 
            s.user_query_result
          FROM submissions s
          JOIN challenges c ON s.challenge_id = c.id
          WHERE s.id = ${submissionId} 
          AND s.user_id = ${userId}
      `
      )[0];
    } catch (err) {
      throw ApplicationError.repositoryError(err);
    }
  }

  async findByUserId(userId: Id): Promise<SubmissionEntity[]> {
    try {
      return await prisma.$queryRaw<SubmissionEntity[]>`
        SELECT
          s.id, 
          s.user_id, 
          c.id as challenge_id, 
          c.title as challenge_title, 
          c.group_title as challenge_group_title, 
          s.submitted_query, 
          s.date, s.success, 
          s.user_query_result
        FROM submissions s
        JOIN challenges c ON s.challenge_id = c.id
        WHERE s.user_id = ${userId}
        ORDER BY s.date DESC
      `;
    } catch (err) {
      throw ApplicationError.repositoryError(err);
    }
  }

  async findByChallengeId(
    challengeId: Id,
    userId: Id,
  ): Promise<SubmissionEntity[]> {
    try {
      return await prisma.$queryRaw<SubmissionEntity[]>`
        SELECT 
          s.id, 
          s.user_id, 
          c.id as challenge_id, 
          c.title as challenge_title, 
          c.group_title as challenge_group_title, 
          s.submitted_query, 
          s.date, s.success, 
          s.user_query_result
        FROM submissions s
        JOIN challenges c ON s.challenge_id = c.id
        WHERE s.challenge_id = ${challengeId}
        AND s.user_id = ${userId}
        ORDER BY s.date DESC
      `;
    } catch (err) {
      throw ApplicationError.repositoryError(err);
    }
  }
}
