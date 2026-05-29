import {
  ChallengeDTO,
  HTTPResponse,
  IdSchema,
  ChallengeCreateSchema,
  ChallengeUpdateSchema,
} from "@squelch/shared";
import { IChallengeService } from "../interfaces/challenge.interface.js";
import ApplicationError from "../helpers/errors/application.error.js";

export default class ChallengeController {
  constructor(private challengeService: IChallengeService) {
    this.challengeService = challengeService;
  }

  async create(newChallenge: unknown): Promise<HTTPResponse<ChallengeDTO>> {
    try {
      const validation = ChallengeCreateSchema.safeParse(newChallenge);
      if (!validation.success) {
        const invalidFields = validation.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        }));

        throw new ApplicationError(
          "Payload inválido para criar um desafio.",
          400,
          invalidFields,
        );
      }

      const createdChallenge = await this.challengeService.create(
        validation.data,
      );
      return { success: true, statusCode: 201, body: createdChallenge };
    } catch (err) {
      return ApplicationError.handleControllerError(err);
    }
  }

  async findById(challengeId: unknown): Promise<HTTPResponse<ChallengeDTO>> {
    try {
      const validation = IdSchema.safeParse(challengeId);
      if (!validation.success) {
        throw new ApplicationError("ID de desafio inválido fornecido.", 400);
      }

      const challenge = await this.challengeService.findById(validation.data);
      return { success: true, statusCode: 200, body: challenge };
    } catch (err) {
      return ApplicationError.handleControllerError(err);
    }
  }

  async updateById(
    challengeId: unknown,
    challengeData: unknown,
  ): Promise<HTTPResponse<ChallengeDTO>> {
    try {
      const idValidation = IdSchema.safeParse(challengeId);
      if (!idValidation.success) {
        throw new ApplicationError("ID de desafio inválido fornecido.", 400);
      }

      const challengeValidation =
        ChallengeUpdateSchema.safeParse(challengeData);
      if (!challengeValidation.success) {
        const invalidFields = challengeValidation.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        }));

        throw new ApplicationError(
          "Payload inválido para atualizar um desafio.",
          400,
          invalidFields,
        );
      }

      const updatedChallenge = await this.challengeService.updateById(
        idValidation.data,
        challengeValidation.data,
      );
      return { success: true, statusCode: 200, body: updatedChallenge };
    } catch (err) {
      return ApplicationError.handleControllerError(err);
    }
  }

  async deleteById(challengeId: unknown): Promise<HTTPResponse<null>> {
    try {
      const validation = IdSchema.safeParse(challengeId);
      if (!validation.success) {
        throw new ApplicationError("ID de desafio inválido fornecido.", 400);
      }

      await this.challengeService.deleteById(validation.data);
      return { success: true, statusCode: 204, body: null };
    } catch (err) {
      return ApplicationError.handleControllerError(err);
    }
  }
}
