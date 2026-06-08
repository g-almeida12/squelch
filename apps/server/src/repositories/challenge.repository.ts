import { Id } from "@squelch/shared";
import { Statement } from "better-sqlite3";
import { ChallengeEntity } from "../entities/types.entities.js";
import { IChallengeRepository } from "../interfaces/challenge.interface.js";
import ApplicationError from "../helpers/errors/application.error.js";
import { db } from "../database/connection.js";

export default class ChallengeRepository implements IChallengeRepository {
  // Prepared Statments
  private findByIdStmt: Statement;
  constructor() {
    this.findByIdStmt = db.prepare(`SELECT id, title, group_slug, markdown, difficulty, validation_query FROM challenges WHERE id = ?`);
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
