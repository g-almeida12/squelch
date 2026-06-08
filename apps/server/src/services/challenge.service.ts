import { Id } from "@squelch/shared";
import {
  IChallengeRepository,
  IChallengeService,
} from "../interfaces/challenge.interface.js";
import ApplicationError from "../helpers/errors/application.error.js";
import { ChallengeEntity } from "../entities/types.entities.js";

export default class ChallengeService implements IChallengeService {
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
