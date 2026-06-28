import { Id } from "@squelch/shared";
import { Statement } from "better-sqlite3";
import { ChallengeEntity } from "./challenge.entity.js";
import { IChallengeRepository } from "./challenge.interfaces.js";
import { ApplicationError } from "../../shared/errors/index.js";
import { db } from "../../shared/database/index.js";

export class ChallengeRepository implements IChallengeRepository {
  // Prepared Statments
  private findByIdStmt: Statement;
  constructor() {
    this.findByIdStmt = db.prepare(
      `SELECT id, title, group_slug, markdown, difficulty, validation_query FROM challenges WHERE id = ?`,
    );
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
