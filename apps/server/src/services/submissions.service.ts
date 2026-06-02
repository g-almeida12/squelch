import { SubmissionValidation, SubmissionDTO, Id } from "@squelch/shared";
import {
  ISubmissionRepository,
  ISubmissionService,
} from "../interfaces/submission.interfaces.js";
import ApplicationError from "../helpers/errors/application.error.js";
import { mapSubmissionDTO } from "../entities/mappers.entities.js";

export default class SubmissionService implements ISubmissionService {
  constructor(private submissionRepository: ISubmissionRepository) {
    this.submissionRepository = submissionRepository;
  }

  // ! CONSTRUIR O SERVICE PARA VALIDAÇÃO DO DESAFIO
  async validateAndSave(
    submission: SubmissionValidation,
    userId: Id,
  ): Promise<SubmissionDTO> {
    const savedSubmission = await this.submissionRepository.save({
      ...submission,
      success: true,
      userWrongResult: null,
      userId,
    });

    return mapSubmissionDTO(savedSubmission);
  }

  async findById(submissionId: Id, userId: Id): Promise<SubmissionDTO> {
    const submission = await this.submissionRepository.findById(
      submissionId,
      userId,
    );
    if (!submission) {
      throw new ApplicationError(
        "Submissão não encontrada para o usuário.",
        404,
      );
    }

    return mapSubmissionDTO(submission);
  }

  async findByUserId(userId: Id): Promise<SubmissionDTO[]> {
    const submission = await this.submissionRepository.findByUserId(userId);
    if (!submission) {
      throw new ApplicationError(
        "Submissão não encontrada para o usuário.",
        404,
      );
    }

    return submission.map((s) => mapSubmissionDTO(s));
  }

  async findByChallengeId(
    challengeId: Id,
    userId: Id,
  ): Promise<SubmissionDTO[]> {
    const submission = await this.submissionRepository.findByChallengeId(
      challengeId,
      userId,
    );
    if (!submission) {
      throw new ApplicationError(
        "Submissão não encontrada para o usuário.",
        404,
      );
    }

    return submission.map((s) => mapSubmissionDTO(s));
  }

  async deleteAllUserSubmissions(userId: Id): Promise<void> {
    await this.submissionRepository.deleteAllUserSubmissions(userId);
  }
}
