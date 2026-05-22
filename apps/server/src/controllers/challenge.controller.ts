import {
  ChallengeDTO,
  HTTPResponse,
  IdSchema,
  ChallengeCreateSchema,
  ChallengeUpdateSchema,
} from "@squelch/shared";
import { IChallengeService } from "../interfaces/challenge.interface.js";
import ApplicationError from "../helpers/errors/application.error.js";
import { success } from "zod";

export default class ChallengeController {
  constructor(private challengeService: IChallengeService) {
    this.challengeService = challengeService;
  }

  create(newChallenge: unknown): HTTPResponse<ChallengeDTO> {
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

      const createdChallenge = this.challengeService.create(validation.data);
      return { success: true, statusCode: 201, body: createdChallenge };
    } catch (err) {
      return ApplicationError.handleControllerError(err);
    }
  }

  findById(challengeId: unknown): HTTPResponse<ChallengeDTO> {
    try {
      const validation = IdSchema.safeParse(challengeId);
      if (!validation.success) {
        throw new ApplicationError("ID de desafio inválido fornecido.", 400);
      }

      const challenge = this.challengeService.findById(validation.data);
      return { success: true, statusCode: 200, body: challenge };
    } catch (err) {
      return ApplicationError.handleControllerError(err);
    }
  }

  updateById(
    challengeId: unknown,
    challengeData: unknown,
  ): HTTPResponse<ChallengeDTO> {
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

      const updatedChallenge = this.challengeService.updateById(
        idValidation.data,
        challengeValidation.data,
      );
      return { success: true, statusCode: 200, body: updatedChallenge };
    } catch (err) {
      return ApplicationError.handleControllerError(err);
    }
  }

  deleteById(challengeId: unknown): HTTPResponse<null> {
    try {
      const validation = IdSchema.safeParse(challengeId);
      if (!validation.success) {
        throw new ApplicationError("ID de desafio inválido fornecido.", 400);
      }

      this.challengeService.deleteById(validation.data);
      return { success: true, statusCode: 204, body: null };
    } catch (err) {
      return ApplicationError.handleControllerError(err);
    }
  }
}
