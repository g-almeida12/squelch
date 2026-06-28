import { Statement } from "better-sqlite3";
import { UserEntity, UserProgressEntity } from "./user.entity.js";
import { IUserRepository } from "./user.interfaces.js";
import { db } from "../../shared/database/index.js";
import { ApplicationError } from "../../shared/errors/index.js";
import { Id } from "@squelch/shared";

export class UserRepository implements IUserRepository {
  // Prepared statments
  private getUserProgressInfoStmt: Statement;
  private findByIdStmt: Statement;
  private findByEmailStmt: Statement;
  private updateByIdStmt: Statement;
  private deleteByIdStmt: Statement;
  constructor() {
    this.getUserProgressInfoStmt = db.prepare(`
            WITH user_completed_challenges AS (
              SELECT challenge_id 
              FROM submissions 
              WHERE user_id = @userId AND success = 1
            ), group_progress AS (
              SELECT c.group_slug, COUNT(c.id) as total_in_group, COUNT(ucc.challenge_id) as completed_in_group
              FROM challenges c
              LEFT JOIN user_completed_challenges ucc ON c.id = ucc.challenge_id
              GROUP BY c.group_slug
            )
    
            SELECT 
              (
                SELECT COUNT(*) 
                FROM submissions 
                WHERE user_id = @userId
              ) as total_submissions,
              (
                SELECT COUNT(DISTINCT group_slug)
                FROM challenges
              ) as total_groups,
              (
                SELECT COUNT(*)
                FROM challenges
              ) as total_challenges,
              (
                SELECT json_group_array(challenge_id) 
                FROM user_completed_challenges
              ) as completed_challenge_ids,
              (
                SELECT json_group_array(group_slug)
                FROM group_progress
                WHERE  completed_in_group = total_in_group
              ) as completed_group_slugs
    
        `);
    this.findByIdStmt = db.prepare(
      "SELECT id, name, email, password FROM users WHERE id = ?",
    );
    this.findByEmailStmt = db.prepare("SELECT * FROM users WHERE email = ?");
    this.updateByIdStmt = db.prepare(`
      UPDATE users 
      SET name = COALESCE(@name, name), email = COALESCE(@email, email), password = COALESCE(@password, password)
      WHERE id = @id
    `);
    this.deleteByIdStmt = db.prepare("DELETE FROM users WHERE id = ?");
  }

  async getUserProgress(userId: Id): Promise<UserProgressEntity> {
    type DBUserProgress = {
      total_submissions: number;
      total_challenges: number;
      total_groups: number;
      completed_challenge_ids: string;
      completed_group_slugs: string;
    };

    try {
      const userProgress = this.getUserProgressInfoStmt.get({ userId }) as
        | DBUserProgress
        | undefined;
      if (!userProgress) {
        return {
          user_id: userId,
          total_submissions: 0,
          total_challenges: 0,
          total_groups: 0,
          completed_challenge_ids: [],
          completed_group_slugs: [],
        };
      }

      return {
        user_id: userId,
        total_submissions: userProgress.total_submissions,
        total_challenges: userProgress.total_challenges,
        total_groups: userProgress.total_groups,
        completed_challenge_ids: JSON.parse(
          userProgress.completed_challenge_ids,
        ),
        completed_group_slugs: JSON.parse(userProgress.completed_group_slugs),
      };
    } catch (err) {
      throw ApplicationError.repositoryError(err);
    }
  }

  async findById(userId: Id): Promise<UserEntity | null> {
    try {
      const user = this.findByIdStmt.get(userId) as UserEntity | undefined;
      if (!user) {
        return null;
      }

      return user;
    } catch (err) {
      throw ApplicationError.repositoryError(err);
    }
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    try {
      const user = this.findByEmailStmt.get(email) as UserEntity | undefined;
      if (!user) {
        return null;
      }

      return user;
    } catch (err) {
      throw ApplicationError.repositoryError(err);
    }
  }

  async updateById(
    userId: Id,
    newData: Partial<Omit<UserEntity, "id">>,
  ): Promise<UserEntity | null> {
    try {
      const updateInfo = this.updateByIdStmt.run({
        id: userId,
        name: newData.name ?? null,
        email: newData.email ?? null,
        password: newData.password ?? null,
      });
      if (updateInfo.changes === 0) {
        return null;
      }

      return (await this.findById(userId)) as UserEntity;
    } catch (err) {
      throw ApplicationError.repositoryError(err);
    }
  }

  async deleteById(userId: Id): Promise<boolean> {
    try {
      const deleteInfo = this.deleteByIdStmt.run(userId);

      return deleteInfo.changes > 0;
    } catch (err) {
      throw ApplicationError.repositoryError(err);
    }
  }
}
