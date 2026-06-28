import { Id } from "@squelch/shared";
import {
  IChallengeRepository,
  IChallengeService,
} from "./challenge.interfaces.js";
import { ApplicationError } from "../../shared/errors/index.js";
import { ChallengeEntity } from "./challenge.entity.js";

export class ChallengeService implements IChallengeService {
  constructor(private challengeRepository: IChallengeRepository) {
    this.challengeRepository = challengeRepository;
  }

  async findById(challengeId: Id): Promise<ChallengeEntity> {
    const challenge = await this.challengeRepository.findById(challengeId);
    if (!challenge) {
      throw new ApplicationError("Desafio não encontrado.", 404);
    }

    return challenge;
  }
}
