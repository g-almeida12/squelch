import {
  ChallengeDTO,
  ChallengeListDTO,
  ChallengeResumeDTO,
  IdSchema,
} from "@squelch/shared";
import { ApplicationError } from "../../shared/errors/index.js";
import {
  IChallengeService,
  mapChallengeDTO,
  mapChallengeListDTO,
  mapChallengeResumeDTO,
} from "./index.js";
import { HTTPResponse } from "../../shared/types/index.js";

export class ChallengeController {
  constructor(private challengeService: IChallengeService) {
    this.challengeService = challengeService;
  }

  async getChallengeResume(
    userId: unknown,
  ): Promise<HTTPResponse<ChallengeResumeDTO | null>> {
    try {
      const idValidation = IdSchema.safeParse(userId);
      if (!idValidation.success) {
        throw new ApplicationError("ID de usuário inválido fornecido.", 400);
      }

      const ChallengeResumeDTO = await this.challengeService.getChallengeResume(
        idValidation.data,
      );
      return {
        success: true,
        statusCode: 200,
        body: ChallengeResumeDTO
          ? mapChallengeResumeDTO(ChallengeResumeDTO)
          : null,
      };
    } catch (err) {
      return ApplicationError.handleControllerError(err);
    }
  }

  async getChallengeList(
    userId: unknown,
  ): Promise<HTTPResponse<ChallengeListDTO>> {
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
        body: mapChallengeListDTO(challengeList),
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
