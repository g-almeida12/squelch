import {
  ChallengeDTO,
  ChallengeList,
  ChallengeResume,
  HTTPResponse,
  IdSchema,
} from "@squelch/shared";
import { IChallengeService } from "./challenge.interfaces.js";
import { ApplicationError } from "../../shared/errors/index.js";
import {
  mapChallengeDTO,
  mapChallengeList,
  mapChallengeResumeDTO,
} from "./challenge.entity.js";

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
