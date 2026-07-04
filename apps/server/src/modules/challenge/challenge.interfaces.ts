import { ChallengeEntity, ChallengeListItemEntity, ChallengeResumeEntity } from "./challenge.entity.js";
import { Id } from "@squelch/shared";

export interface IChallengeRepository {
  getChallengeResume(userId: Id): Promise<ChallengeResumeEntity | null>;

  getChallengeList(userId: Id): Promise<ChallengeListItemEntity[]>;

  findById(challengeId: Id): Promise<ChallengeEntity | null>;
}

export interface IChallengeService {
  getChallengeResume(userId: Id): Promise<ChallengeResumeEntity | null>;

  getChallengeList(userId: Id): Promise<ChallengeListItemEntity[]>;

  findById(challengeId: Id): Promise<ChallengeEntity>;
}
