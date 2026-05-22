import { ChallengeCreate, ChallengeUpdate } from "@squelch/shared";
import { Statement } from "better-sqlite3";
import { ChallengeEntity } from "../entities/types.entities.js";
import { IChallengeRepository } from "../interfaces/challenge.interface.js";
import ApplicationError from "../helpers/errors/application.error.js";
import { db } from "../database/connection.js";

export default class ChallengeRepository implements IChallengeRepository {
  // Prepared Statments
  private createStmt: Statement;
  private findByIdStmt: Statement;
  private findByTitleStmt: Statement;
  private updateByIdStmt: Statement;
  private deleteByIdStmt: Statement;
  constructor() {
    this.createStmt = db.prepare(`
      INSERT INTO challenges (title, markdown,  difficulty, validation_query, affected_rows)
      VALUES (@title, @markdown, @difficulty, @validationQuery, @affectedRows)
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
  }

  create(newChallenge: ChallengeCreate): ChallengeEntity {
    try {
      const insertResult = this.createStmt.run(newChallenge);

      return this.findById(
        insertResult.lastInsertRowid as number,
      ) as ChallengeEntity;
    } catch (err) {
      throw ApplicationError.repositoryError(err);
    }
  }

  findById(challengeId: number): ChallengeEntity | null {
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

  findByTitle(title: string): ChallengeEntity | null {
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

  updateById(
    challengeId: number,
    challengeData: ChallengeUpdate,
  ): ChallengeEntity | null {
    try {
      const updateResult = this.updateByIdStmt.run({
        ...challengeData,
        id: challengeId,
      });

      return this.findById(challengeId);
    } catch (err) {
      throw ApplicationError.repositoryError(err);
    }
  }

  deleteById(challengeId: number): boolean {
    try {
      const deleteResult = this.deleteByIdStmt.run(challengeId);
      return deleteResult.changes > 0;
    } catch (err) {
      throw ApplicationError.repositoryError(err);
    }
  }
}
