import {
  Id,
  QueryResultDTO,
  SubmissionSave,
  SubmissionValidation,
} from "@squelch/shared";
import {
  QueryRunEntity,
  SubmissionEntity,
} from "../entities/types.entities.js";

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
    submission: SubmissionEntity;
    queryResult: QueryResultDTO;
    errorMessages: string[] | null;
  }>;

  runQuery(submittedQuery: string, challengeId: Id): Promise<QueryRunEntity[]>;

  findById(submissionId: Id, userId: Id): Promise<SubmissionEntity>;

  findByUserId(userId: Id): Promise<SubmissionEntity[]>;

  findByChallengeId(challengeId: Id, userId: Id): Promise<SubmissionEntity[]>;

  deleteAllUserSubmissions(userId: Id): Promise<void>;
}
