import { Id } from "@squelch/shared";
import { SubmissionEntity, SubmissionSave } from "./submission.entity.js";
import { ISubmissionRepository } from "./submission.interfaces.js";
import { ApplicationError } from "../../shared/errors/index.js";
import { Statement } from "better-sqlite3";
import { db } from "../../shared/database/connection.js";

export class SubmissionRepository implements ISubmissionRepository {
  // Prepared Statments
  private saveStmt: Statement;
  private findByIdStmt: Statement;
  private findByUserIdStmt: Statement;
  private findByChallengeIdStmt: Statement;
  private deleteAllUserSubmissionsStmt: Statement;
  constructor() {
    this.saveStmt = db.prepare(`
      INSERT INTO submissions (user_id, challenge_id, submitted_query, success, user_query_result, date)
      VALUES (@userId, @challengeId, @submittedQuery, @success, @userQueryResult, @date)
    `);
    this.findByIdStmt = db.prepare(`
      SELECT id, user_id, challenge_id, submitted_query, date, success, user_query_result 
      FROM submissions
      WHERE id = @submissionId 
      AND user_id = @userId
    `);
    this.findByUserIdStmt = db.prepare(`
      SELECT id, user_id, challenge_id, submitted_query, date, success, user_query_result
      FROM submissions
      WHERE user_id = ?
      ORDER BY date ASC
    `);
    this.findByChallengeIdStmt = db.prepare(`
      SELECT id, user_id, challenge_id, submitted_query, date, success, user_query_result
      FROM submissions
      WHERE challenge_id = @challengeId
      AND user_id = @userId
    `);
    this.deleteAllUserSubmissionsStmt = db.prepare(
      `DELETE FROM submissions WHERE id = ?`,
    );
  }

  async save(submission: SubmissionSave): Promise<SubmissionEntity> {
    try {
      const saveResult = this.saveStmt.run({
        ...submission,
        userQueryResult: JSON.stringify(submission.userQueryResult),
        success: Number(submission.success),
        date: submission.date.toISOString(),
      });
      const savedSubmission = this.findByIdStmt.get({
        submissionId: saveResult.lastInsertRowid as number,
        userId: submission.userId,
      }) as SubmissionEntity;

      return savedSubmission;
    } catch (err) {
      throw ApplicationError.repositoryError(err);
    }
  }

  async findById(
    submissionId: Id,
    userId: Id,
  ): Promise<SubmissionEntity | null> {
    try {
      const submission = this.findByIdStmt.get({
        submissionId,
        userId,
      }) as SubmissionEntity | null;
      if (!submission) {
        return null;
      }

      return submission;
    } catch (err) {
      throw ApplicationError.repositoryError(err);
    }
  }

  async findByUserId(userId: Id): Promise<SubmissionEntity[]> {
    try {
      const submission = this.findByUserIdStmt.all(
        userId,
      ) as SubmissionEntity[];

      return submission;
    } catch (err) {
      throw ApplicationError.repositoryError(err);
    }
  }

  async findByChallengeId(
    challengeId: Id,
    userId: Id,
  ): Promise<SubmissionEntity[]> {
    try {
      const submission = this.findByChallengeIdStmt.all({
        challengeId,
        userId,
      }) as SubmissionEntity[];

      return submission;
    } catch (err) {
      throw ApplicationError.repositoryError(err);
    }
  }

  async deleteAllUserSubmissions(userId: Id): Promise<number> {
    try {
      const deleteResult = this.deleteAllUserSubmissionsStmt.run(userId);

      return deleteResult.changes;
    } catch (err) {
      throw ApplicationError.repositoryError(err);
    }
  }
}
