import { RegisterUser } from "@squelch/shared";
import { IAuthRepository } from "../interfaces/auth.interfaces.js";
import { db } from "../database/connection.js";
import { RunResult, Statement } from "better-sqlite3";
import ApplicationError from "../helpers/errors/application.error.js";

export default class AuthRepository implements IAuthRepository {
  // Prepared statments
  private registerUserStmt: Statement;
  constructor() {
    this.registerUserStmt = db.prepare(
      "INSERT INTO users (name, email, password) VALUES (:name, :email, :password)",
    );
  }

  register(newUser: RegisterUser): RunResult {
    try {
      return this.registerUserStmt.run(newUser);
    } catch (err) {
      throw ApplicationError.repositoryError(err);
    }
  }
}
