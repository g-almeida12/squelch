import {
  ChallengeDTO,
  ChallengeList,
  ChallengeResume,
  IdSchema,
} from "@squelch/shared";
import { IChallengeService } from "./challenge.interfaces.js";
import { ApplicationError } from "../../shared/errors/index.js";
import {
  mapChallengeDTO,
  mapChallengeList,
  mapChallengeResumeDTO,
} from "./challenge.entity.js";
import { HTTPResponse } from "../../shared/types/index.js";

export class ChallengeController {
  constructor(private challengeService: IChallengeService) {
    this.challengeService = challengeService;
  }

  async getChallengeResume(
    userId: unknown,
  ): Promise<HTTPResponse<ChallengeResume | null>> {
    try {
      const idValidation = IdSchema.safeParse(userId);
      if (!idValidation.success) {
        throw new ApplicationError("ID de usuário inválido fornecido.", 400);
      }

      const challengeResume = await this.challengeService.getChallengeResume(
        idValidation.data,
      );
      return {
        success: true,
        statusCode: 200,
        body: challengeResume ? mapChallengeResumeDTO(challengeResume) : null,
      };
    } catch (err) {
      return ApplicationError.handleControllerError(err);
    }
  }

  async getChallengeList(
    userId: unknown,
  ): Promise<HTTPResponse<ChallengeList>> {
    try {
      const idValidation = IdSchema.safeParse(userId);
      if (!idValidation.success) {
        throw new ApplicationError("ID de usuário inválido fornecido.", 400);
      }

      const challengeList = await this.challengeService.getChallengeList(
        idValidation.data,
      );
      return {
        success: true,
        statusCode: 200,
        body: mapChallengeList(challengeList),
      };
    } catch (err) {
      return ApplicationError.handleControllerError(err);
    }
  }

  async findById(
    challengeId: unknown,
    userId: unknown,
  ): Promise<HTTPResponse<ChallengeDTO>> {
    try {
      const challengeIdValidation = IdSchema.safeParse(challengeId);
      if (!challengeIdValidation.success) {
        throw new ApplicationError("ID de desafio inválido fornecido.", 400);
      }

      const userIdValidation = IdSchema.safeParse(userId);
      if (!userIdValidation.success) {
        throw new ApplicationError("ID de usuário inválido fornecido.", 400);
      }

      const challenge = await this.challengeService.findById(
        challengeIdValidation.data,
        userIdValidation.data,
      );
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
