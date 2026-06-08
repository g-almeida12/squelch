import { Statement } from "better-sqlite3";
import { UserEntity } from "../entities/types.entities.js";
import { IUserRepository } from "../interfaces/user.interfaces.js";
import { db } from "../database/connection.js";
import ApplicationError from "../helpers/errors/application.error.js";
import { Id } from "@squelch/shared";

export default class UserRepository implements IUserRepository {
  // Prepared statments
  private findByIdStmt: Statement;
  private findByEmailStmt: Statement;
  private updateByIdStmt: Statement;
  private deleteByIdStmt: Statement;
  constructor() {
    this.findByIdStmt = db.prepare("SELECT id, name, email, password FROM users WHERE id = ?");
    this.findByEmailStmt = db.prepare("SELECT * FROM users WHERE email = ?");
    this.updateByIdStmt = db.prepare(`
      UPDATE users 
      SET name = COALESCE(@name, name), email = COALESCE(@email, email), password = COALESCE(@password, password)
      WHERE id = @id
    `);
    this.deleteByIdStmt = db.prepare("DELETE FROM users WHERE id = ?");
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
