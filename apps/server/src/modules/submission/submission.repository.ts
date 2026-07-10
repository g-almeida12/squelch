import { Id } from "@squelch/shared";
import {
  ISubmissionRepository,
  SubmissionEntity,
  SubmissionSave,
} from "./index.js";
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
      WHERE s.id = @submissionId 
      AND s.user_id = @userId
    `);
    this.findByUserIdStmt = db.prepare(`
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
      WHERE s.user_id = ?
      ORDER BY s.date DESC
    `);
    this.findByChallengeIdStmt = db.prepare(`
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
      WHERE s.challenge_id = @challengeId
      AND s.user_id = @userId
      ORDER BY s.date DESC
    `);
    this.deleteAllUserSubmissionsStmt = db.prepare(
      `DELETE FROM submissions WHERE user_id = ?`,
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
