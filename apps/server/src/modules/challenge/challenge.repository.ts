import { Id } from "@squelch/shared";
import { Statement } from "better-sqlite3";
import { ChallengeEntity, ChallengeResumeEntity } from "./challenge.entity.js";
import { IChallengeRepository } from "./challenge.interfaces.js";
import { ApplicationError } from "../../shared/errors/index.js";
import { db } from "../../shared/database/index.js";

export class ChallengeRepository implements IChallengeRepository {
  // Prepared Statments
  private getChallengeResumeStmt: Statement;
  private findByIdStmt: Statement;
  constructor() {
    this.getChallengeResumeStmt = db.prepare(`
      SELECT c.id, c.title, c.group_slug, c.group_title, c.difficulty, COUNT(s.id) as total_submissions, MAX(s.date) as last_submission_date
      FROM challenges c
      JOIN submissions s ON c.id = s.challenge_id
      WHERE s.user_id = @userId
      GROUP BY c.id, c.title, c.group_slug, c.group_title, c.difficulty
      HAVING MAX(s.success) = 0
      ORDER BY last_submission_date DESC
      LIMIT 1
    `);
    this.findByIdStmt = db.prepare(`
      SELECT id, title, group_slug, markdown, difficulty, validation_query
      FROM challenges
      WHERE id = ?
    `);
  }

  async getChallengeResume(userId: Id): Promise<ChallengeResumeEntity | null> {
    try {
      const challengeResume = this.getChallengeResumeStmt.get({
        userId,
      }) as ChallengeResumeEntity | undefined;
      if (!challengeResume) {
        return null;
      }

      return challengeResume;
    } catch (err) {
      throw ApplicationError.repositoryError(err);
    }
  }

  async findById(challengeId: Id): Promise<ChallengeEntity | null> {
    try {
      const challenge = this.findByIdStmt.get(challengeId) as
        | ChallengeEntity
        | undefined;
      if (!challenge) {
        return null;
      }

      return challenge;
    } catch (err) {
      throw ApplicationError.repositoryError(err);
    }
  }
}
