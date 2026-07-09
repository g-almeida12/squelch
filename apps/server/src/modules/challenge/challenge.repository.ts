import { Id } from "@squelch/shared";
import { Statement } from "better-sqlite3";
import {
  ChallengeEntity,
  ChallengeListItemEntity,
  ChallengeQueryEntity,
  ChallengeResumeEntity,
} from "./challenge.entity.js";
import { IChallengeRepository } from "./challenge.interfaces.js";
import { ApplicationError } from "../../shared/errors/index.js";
import { db } from "../../shared/database/index.js";

export class ChallengeRepository implements IChallengeRepository {
  // Prepared Statments
  private getChallengeQueryInfoStmt: Statement;
  private getChallengeResumeStmt: Statement;
  private getChallengeListStmt: Statement;
  private findByIdStmt: Statement;
  constructor() {
    this.getChallengeQueryInfoStmt = db.prepare(`
      SELECT id, group_slug, validation_query
      FROM challenges
      WHERE id = @challengeId
    `);
    this.getChallengeResumeStmt = db.prepare(`
      SELECT 
        c.id, c.title, 
        c.group_slug, 
        c.group_title, 
        c.difficulty, 
        COUNT(s.id) as total_submissions, 
        MAX(s.date) as last_submission_date
      FROM challenges c
      JOIN submissions s ON c.id = s.challenge_id
      WHERE s.user_id = @userId
      GROUP BY c.id, c.title, c.group_slug, c.group_title, c.difficulty
      HAVING MAX(s.success) = 0
      ORDER BY last_submission_date DESC
      LIMIT 1
    `);
    this.getChallengeListStmt = db.prepare(`
      SELECT 
        c.id, 
        c.title,
        c.group_slug, 
        c.group_title, 
        c.difficulty, 
        COALESCE(MAX(s.success), 0) as completed_by_user
      FROM challenges c
      LEFT JOIN submissions s ON c.id = s.challenge_id AND s.user_id = ?
      GROUP BY c.id
      ORDER BY c.position ASC
    `);
    this.findByIdStmt = db.prepare(`
      SELECT 
        id, 
        title, 
        group_slug, 
        group_title, 
        markdown, 
        difficulty, 
        validation_query, 
        COALESCE(
          (SELECT MAX(success) 
          FROM submissions 
          WHERE challenge_id = @challengeId 
          AND user_id = @userId),
          0
        ) as completed_by_user
      FROM challenges
      WHERE id = @challengeId
    `);
  }

  async getChallengeQueryInfo(
    challengeId: Id,
  ): Promise<ChallengeQueryEntity | null> {
    try {
      const challengeQueryInfo = this.getChallengeQueryInfoStmt.get({
        challengeId,
      }) as ChallengeQueryEntity | undefined;
      if (!challengeQueryInfo) {
        return null;
      }

      return challengeQueryInfo;
    } catch (err) {
      throw ApplicationError.repositoryError(err);
    }
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

  async getChallengeList(userId: Id): Promise<ChallengeListItemEntity[]> {
    try {
      const challengeList = this.getChallengeListStmt.all(
        userId,
      ) as ChallengeListItemEntity[];

      return challengeList;
    } catch (err) {
      throw ApplicationError.repositoryError(err);
    }
  }

  async findById(challengeId: Id, userId: Id): Promise<ChallengeEntity | null> {
    try {
      const challenge = this.findByIdStmt.get({ challengeId, userId }) as
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
