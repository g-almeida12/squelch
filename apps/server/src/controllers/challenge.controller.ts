import { ChallengeDTO, HTTPResponse, IdSchema } from "@squelch/shared";
import { IChallengeService } from "../interfaces/challenge.interface.js";
import ApplicationError from "../helpers/errors/application.error.js";
import { mapChallengeDTO } from "../entities/mappers.entities.js";

export default class ChallengeController {
  constructor(private challengeService: IChallengeService) {
    this.challengeService = challengeService;
  }

  async findById(challengeId: unknown): Promise<HTTPResponse<ChallengeDTO>> {
    try {
      const validation = IdSchema.safeParse(challengeId);
      if (!validation.success) {
        throw new ApplicationError("ID de desafio inválido fornecido.", 400);
      }

      const challenge = await this.challengeService.findById(validation.data);
      return {
        success: true,
        statusCode: 200,
        body: mapChallengeDTO(challenge),
      };
    } catch (err) {
      return ApplicationError.handleControllerError(err);
    }
  }
}
