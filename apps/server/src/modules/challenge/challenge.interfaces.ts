import { ChallengeEntity, ChallengeListItemEntity, ChallengeQueryEntity, ChallengeResumeEntity } from "./challenge.entity.js";
import { Id } from "@squelch/shared";

export interface IChallengeRepository {
  getChallengeQueryInfo(challengeId: Id): Promise<ChallengeQueryEntity | null>;

  getChallengeResume(userId: Id): Promise<ChallengeResumeEntity | null>;

  getChallengeList(userId: Id): Promise<ChallengeListItemEntity[]>;

  findById(challengeId: Id, userId: Id): Promise<ChallengeEntity | null>;
}

export interface IChallengeService {
  getChallengeQueryInfo(challengeId: Id): Promise<ChallengeQueryEntity>;

  getChallengeResume(userId: Id): Promise<ChallengeResumeEntity | null>;

  getChallengeList(userId: Id): Promise<ChallengeListItemEntity[]>;

  findById(challengeId: Id, userId: Id): Promise<ChallengeEntity>;
}
