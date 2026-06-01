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
import { join } from "node:path";
import { copyFile } from "node:fs/promises";
import { validGroupSlugs } from "../config/challenges.config.js";

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

  async getUserSession(
    challengeId: Id,
    groupSlug: string,
    userId: Id,
  ): Promise<string> {
    if (!validGroupSlugs.includes(groupSlug)) {
      throw new ApplicationError(
        "Slug de grupo de desafios inválido fornecido.",
        400,
      );
    }

    const userSession = await this.challengeRepository.findUserSession(
      challengeId,
      userId,
    );
    if (userSession) {
      return userSession.session;
    }

    const session = crypto.randomUUID();
    const folderPath = join(process.cwd(), "challenges", groupSlug);
    const templateDB = join(folderPath, "config", "template.db");
    const userDB = join(folderPath, "databases", `${session}.db`);

    await copyFile(templateDB, userDB);
    return userDB;
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

  async deleteAllUserSessions(userId: Id): Promise<void> {
    await this.challengeRepository.deleteAllUserSessions(userId);
  }
}
