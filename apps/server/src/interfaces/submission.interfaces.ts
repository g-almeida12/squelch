import {
  Id,
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
    userId: Id,
  ): Promise<SubmissionDTO>;

  findById(submissionId: Id, userId: Id): Promise<SubmissionDTO>;

  findByUserId(userId: Id): Promise<SubmissionDTO[]>;

  findByChallengeId(challengeId: Id, userId: Id): Promise<SubmissionDTO[]>;

  deleteAllUserSubmissions(userId: Id): Promise<void>;
}
