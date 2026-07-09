import { Id } from "@squelch/shared";
import {
  IChallengeRepository,
  IChallengeService,
} from "./challenge.interfaces.js";
import { ApplicationError } from "../../shared/errors/index.js";
import {
  ChallengeEntity,
  ChallengeListItemEntity,
  ChallengeQueryEntity,
  ChallengeResumeEntity,
} from "./challenge.entity.js";

export class ChallengeService implements IChallengeService {
  constructor(private challengeRepository: IChallengeRepository) {
    this.challengeRepository = challengeRepository;
  }

  async getChallengeQueryInfo(
    challengeId: Id,
  ): Promise<ChallengeQueryEntity> {
    const challengeQueryInfo =
      await this.challengeRepository.getChallengeQueryInfo(challengeId);
    if (!challengeQueryInfo) {
      throw new ApplicationError("Desafio não encontrado.", 404);
    }

    return challengeQueryInfo;
  }

  async getChallengeResume(userId: Id): Promise<ChallengeResumeEntity | null> {
    const challengeResume =
      await this.challengeRepository.getChallengeResume(userId);

    return challengeResume;
  }

  async getChallengeList(userId: Id): Promise<ChallengeListItemEntity[]> {
    const challengeList =
      await this.challengeRepository.getChallengeList(userId);

    return challengeList;
  }

  async findById(challengeId: Id, userId: Id): Promise<ChallengeEntity> {
    const challenge = await this.challengeRepository.findById(
      challengeId,
      userId,
    );
    if (!challenge) {
      throw new ApplicationError("Desafio não encontrado.", 404);
    }

    return challenge;
  }
}
