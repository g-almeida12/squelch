import {
  Id,
  QueryResult,
  SubmissionDTO,
  SubmissionSave,
  SubmissionValidation,
} from "@squelch/shared";
import { SubmissionEntity } from "../entities/types.entities.js";

export interface ISubmissionRepository {
  save(submission: SubmissionSave): Promise<SubmissionEntity>;

  findById(submissionId: Id, userId: Id): Promise<SubmissionEntity | null>;

  findByUserId(userId: Id): Promise<SubmissionEntity[]>;

  findByChallengeId(challengeId: Id, userId: Id): Promise<SubmissionEntity[]>;

  deleteAllUserSubmissions(userId: Id): Promise<number>;
}

export interface ISubmissionService {
  validateAndSave(
    submission: SubmissionValidation,
    challengeId: Id,
    userId: Id,
  ): Promise<{
    submission: SubmissionDTO;
    queryResult: QueryResult;
    errorMessages: string[] | null;
  }>;

  runQuery(submittedQuery: string, challengeId: Id): Promise<QueryResult>;

  findById(submissionId: Id, userId: Id): Promise<SubmissionDTO>;

  findByUserId(userId: Id): Promise<SubmissionDTO[]>;

  findByChallengeId(challengeId: Id, userId: Id): Promise<SubmissionDTO[]>;

  deleteAllUserSubmissions(userId: Id): Promise<void>;
}
