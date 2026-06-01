import { ChallengeCreate, ChallengeUpdate, Id } from "@squelch/shared";
import { Statement } from "better-sqlite3";
import {
  ChallengeEntity,
  UserSessionEntity,
} from "../entities/types.entities.js";
import { IChallengeRepository } from "../interfaces/challenge.interface.js";
import ApplicationError from "../helpers/errors/application.error.js";
import { db } from "../database/connection.js";

export default class ChallengeRepository implements IChallengeRepository {
  // Prepared Statments
  private createStmt: Statement;
  private findUserSessionStmt: Statement;
  private createUserSessionStmt: Statement;
  private findByIdStmt: Statement;
  private findByTitleStmt: Statement;
  private updateByIdStmt: Statement;
  private deleteByIdStmt: Statement;
  private deleteAllUserSessionsStmt: Statement;
  constructor() {
    this.createStmt = db.prepare(`
      INSERT INTO challenges (title, markdown,  difficulty, validation_query, affected_rows)
      VALUES (@title, @markdown, @difficulty, @validationQuery, @affectedRows)
    `);
    this.findUserSessionStmt = db.prepare(`
      SELECT * FROM user_sessions
      WHERE challenge_id = @challengeId AND user_id = @userId`);
    this.createUserSessionStmt = db.prepare(`
      INSERT INTO user_sessions (user_id, challenge_id, group_slug session)
      VALUES (@userId, @challengeId, @groupSlug, @session)  
    `);
    this.findByIdStmt = db.prepare(`SELECT * FROM challenges WHERE id = ?`);
    this.findByTitleStmt = db.prepare(
      `SELECT * FROM challenges WHERE title = ?`,
    );
    this.updateByIdStmt = db.prepare(`
      UPDATE challenges 
      SET title = COALESCE(@title, title), markdown = COALESCE(@markdown, markdown), difficulty = COALESCE(@difficulty, difficulty), validation_query = COALESCE(@validationQuery, validation_query), affected_rows = COALESCE(@affectedRows, affected_rows)
      WHERE id = @id
    `);
    this.deleteByIdStmt = db.prepare(`DELETE FROM challenges WHERE id = ?`);
    this.deleteAllUserSessionsStmt = db.prepare(
      `DELETE FROM user_sessions WHERE user_id = ?`,
    );
  }

  async create(newChallenge: ChallengeCreate): Promise<ChallengeEntity> {
    try {
      const insertResult = this.createStmt.run(newChallenge);

      return (await this.findById(
        insertResult.lastInsertRowid as number,
      )) as ChallengeEntity;
    } catch (err) {
      throw ApplicationError.repositoryError(err);
    }
  }

  async createUserSession(
    challengeId: Id,
    groupSlug: string,
    session: string,
    userId: Id,
  ): Promise<UserSessionEntity> {
    try {
      const runResult = this.createUserSessionStmt.run({
        challengeId,
        session,
        groupSlug,
        userId,
      });

      return {
        id: runResult.lastInsertRowid as number,
        challenge_id: challengeId,
        user_id: userId,
        group_slug: groupSlug,
        session,
      };
    } catch (err) {
      throw ApplicationError.repositoryError(err);
    }
  }

  async findUserSession(
    challengeId: Id,
    userId: Id,
  ): Promise<UserSessionEntity | null> {
    try {
      const userSession = this.findUserSessionStmt.get({
        challengeId,
        userId,
      }) as UserSessionEntity | undefined;
      if (!userSession) {
        return null;
      }

      return userSession;
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

  async findByTitle(title: string): Promise<ChallengeEntity | null> {
    try {
      const challenge = this.findByTitleStmt.get(title) as
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

  async updateById(
    challengeId: Id,
    challengeData: ChallengeUpdate,
  ): Promise<ChallengeEntity | null> {
    try {
      this.updateByIdStmt.run({
        ...challengeData,
        id: challengeId,
      });

      return this.findById(challengeId);
    } catch (err) {
      throw ApplicationError.repositoryError(err);
    }
  }

  async deleteById(challengeId: Id): Promise<boolean> {
    try {
      const deleteResult = this.deleteByIdStmt.run(challengeId);
      return deleteResult.changes > 0;
    } catch (err) {
      throw ApplicationError.repositoryError(err);
    }
  }

  async deleteAllUserSessions(userId: Id): Promise<number> {
    try {
      const deleteResult = this.deleteAllUserSessionsStmt.run(userId);
      return deleteResult.changes;
    } catch (err) {
      throw ApplicationError.repositoryError(err);
    }
  }
}
