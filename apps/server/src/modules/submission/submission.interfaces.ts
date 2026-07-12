import { Id, QueryResultDTO, SubmissionValidation } from "@squelch/shared";
import { QueryRunEntity, SubmissionEntity, SubmissionSave } from "./index.js";

export interface ISubmissionRepository {
  save(submission: SubmissionSave): Promise<SubmissionEntity>;

  findById(submissionId: Id, userId: Id): Promise<SubmissionEntity | null>;

  findByUserId(userId: Id): Promise<SubmissionEntity[]>;

  findByChallengeId(challengeId: Id, userId: Id): Promise<SubmissionEntity[]>;
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
}
