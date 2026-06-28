import { ChallengeEntity, ChallengeResumeEntity } from "./challenge.entity.js";
import { Id } from "@squelch/shared";

export interface IChallengeRepository {
  getChallengeResume(userId: Id): Promise<ChallengeResumeEntity | null>;

  findById(challengeId: Id): Promise<ChallengeEntity | null>;
}

export interface IChallengeService {
  getChallengeResume(userId: Id): Promise<ChallengeResumeEntity | null>;

  findById(challengeId: Id): Promise<ChallengeEntity>;
}
