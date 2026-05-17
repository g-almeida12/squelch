import { RegisterUser } from "@squelch/shared";
import { UserEntity } from "../entities/types.entities.js";
import { IAuthRepository } from "../interfaces/auth.interfaces.js";
import { db } from "../database/connection.js";
import { RunResult, Statement } from "better-sqlite3";
import ApplicationError from "../helpers/errors/application.error.js";
import { repositoryError } from "../helpers/errors/repository.errors.js";

export default class AuthRepository implements IAuthRepository {
  // Prepared statments
  private insertUserStmt: Statement;
  private selectUserEmailStmt: Statement;
  constructor() {
    this.insertUserStmt = db.prepare(
      "INSERT INTO users (name, email, password) VALUES (:name, :email, :password)",
    );
    this.selectUserEmailStmt = db.prepare(
      "SELECT * FROM users WHERE email = ?",
    );
  }

  register(newUser: RegisterUser): RunResult {
    try {
      return this.insertUserStmt.run(newUser);
    } catch (err) {
      throw ApplicationError.repositoryError(err);
    }
  }

  findByEmail(email: string): UserEntity | null {
    try {
      const user = this.selectUserEmailStmt.get(email) as
        | UserEntity
        | undefined;
      if (!user) {
        return null;
      }

      return user;
    } catch (err) {
      throw ApplicationError.repositoryError(err);
    }
  }
}
