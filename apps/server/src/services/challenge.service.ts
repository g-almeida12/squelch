import {
  ChallengeCreate,
  ChallengeDTO,
  ChallengeUpdate,
  Id,
} from "@squelch/shared";
import {
  IChallengeRepository,
  IChallengeService,
} from "../interfaces/challenge.interface.js";
import ApplicationError from "../helpers/errors/application.error.js";
import { mapChallengeDTO } from "../entities/mappers.entities.js";

export default class ChallengeService implements IChallengeService {
  constructor(private challengeRepository: IChallengeRepository) {
    this.challengeRepository = challengeRepository;
  }

  async create(newChallenge: ChallengeCreate): Promise<ChallengeDTO> {
    const challenge = await this.challengeRepository.findByTitle(
      newChallenge.title,
    );
    if (challenge) {
      throw new ApplicationError("O título fornecido já está registrado.", 409);
    }

    return mapChallengeDTO(await this.challengeRepository.create(newChallenge));
  }

  async findById(challengeId: Id): Promise<ChallengeDTO> {
    const challenge = await this.challengeRepository.findById(challengeId);
    if (!challenge) {
      throw new ApplicationError("Desafio não encontrado.", 404);
    }

    return mapChallengeDTO(challenge);
  }

  async updateById(
    challengeId: Id,
    challengeData: ChallengeUpdate,
  ): Promise<ChallengeDTO> {
    if (challengeData.title) {
      const challenge = await this.challengeRepository.findByTitle(
        challengeData.title,
      );
      if (challenge && challenge.id !== challengeId) {
        console.log(challenge.id, challengeId);
        throw new ApplicationError(
          "O título fornecido já está registrado.",
          409,
        );
      }
    }

    const updatedChallenge = await this.challengeRepository.updateById(
      challengeId,
      challengeData,
    );

    if (!updatedChallenge) {
      throw new ApplicationError("Desafio não encontrado.", 404);
    }

    return mapChallengeDTO(updatedChallenge);
  }

  async deleteById(challengeId: Id): Promise<void> {
    const isDeleted = await this.challengeRepository.deleteById(challengeId);
    if (!isDeleted) {
      throw new ApplicationError("Desafio não encontrado.", 404);
    }
  }
}
