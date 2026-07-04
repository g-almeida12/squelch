import {
  IdSchema,
  QueryResultDTO,
  SubmissionDTO,
  SubmissionValidationDTO,
  SubmissionValidationSchema,
} from "@squelch/shared";
import { ApplicationError } from "../../shared/errors/index.js";
import { HTTPResponse } from "../../shared/types/index.js";
import { ISubmissionService } from "./submission.interfaces.js";
import { mapSubmissionDTO } from "./submission.entity.js";

export class SubmissionController {
  constructor(private submissionService: ISubmissionService) {
    this.submissionService = submissionService;
  }

  async runQuery(
    submittedQuery: unknown,
    challengeId: unknown,
  ): Promise<HTTPResponse<QueryResultDTO>> {
    try {
      if (!submittedQuery || typeof submittedQuery !== "string") {
        throw new ApplicationError("Formato de query inválido fornecido", 400);
      }

      const idValidation = IdSchema.safeParse(challengeId);
      if (!idValidation.success) {
        throw new ApplicationError("ID de desafio inválido fornecido.", 400);
      }

      const userQueryResult = await this.submissionService.runQuery(
        submittedQuery,
        idValidation.data,
      );

      return {
        success: true,
        statusCode: 200,
        body: userQueryResult as QueryResultDTO,
      };
    } catch (err) {
      return ApplicationError.handleControllerError(err);
    }
  }

  async validateAndSave(
    submission: unknown,
    challengeId: unknown,
    userId: unknown,
  ): Promise<
    HTTPResponse<SubmissionValidationDTO>
  > {
    try {
      const submissionValidation =
        SubmissionValidationSchema.safeParse(submission);
      if (!submissionValidation.success) {
        const invalidFields = submissionValidation.error.issues.map(
          (issue) => ({
            field: issue.path.join("."),
            message: issue.message,
          }),
        );

        throw new ApplicationError(
          "Payload para submissão inválido fornecido.",
          400,
          invalidFields,
        );
      }

      const userIdValidation = IdSchema.safeParse(userId);
      if (!userIdValidation.success) {
        throw new ApplicationError("ID de submissão inválido fornecido.", 400);
      }

      const challengeIdValidation = IdSchema.safeParse(challengeId);
      if (!challengeIdValidation.success) {
        throw new ApplicationError("ID de submissão inválido fornecido.", 400);
      }
      const { submission: validatedSubmission, errorMessages } =
        await this.submissionService.validateAndSave(
          submissionValidation.data,
          challengeIdValidation.data,
          userIdValidation.data,
        );

      return {
        success: true,
        statusCode: 200,
        body: {
          submission: mapSubmissionDTO(validatedSubmission),
          errorMessages,
        },
      };
    } catch (err) {
      return ApplicationError.handleControllerError(err);
    }
  }

  async findById(
    submissionId: unknown,
    userId: unknown,
  ): Promise<HTTPResponse<SubmissionDTO>> {
    try {
      const submissionIdValidation = IdSchema.safeParse(submissionId);
      if (!submissionIdValidation.success) {
        throw new ApplicationError("ID de submissão inválido fornecido.", 400);
      }

      const userIdValidation = IdSchema.safeParse(userId);
      if (!userIdValidation.success) {
        throw new ApplicationError("ID de submissão inválido fornecido.", 400);
      }
      const submission = await this.submissionService.findById(
        submissionIdValidation.data,
        userIdValidation.data,
      );

      return {
        success: true,
        statusCode: 200,
        body: mapSubmissionDTO(submission),
      };
    } catch (err) {
      return ApplicationError.handleControllerError(err);
    }
  }

  async findByUserId(userId: unknown): Promise<HTTPResponse<SubmissionDTO[]>> {
    try {
      const userIdValidation = IdSchema.safeParse(userId);
      if (!userIdValidation.success) {
        throw new ApplicationError("ID de usuário inválido fornecido.", 400);
      }
      const submissions = await this.submissionService.findByUserId(
        userIdValidation.data,
      );

      return {
        success: true,
        statusCode: 200,
        body: submissions.map((s) => mapSubmissionDTO(s)),
      };
    } catch (err) {
      return ApplicationError.handleControllerError(err);
    }
  }

  async findByChallengeId(
    challengeId: unknown,
    userId: unknown,
  ): Promise<HTTPResponse<SubmissionDTO[]>> {
    try {
      const challengeIdValidation = IdSchema.safeParse(challengeId);
      if (!challengeIdValidation.success) {
        throw new ApplicationError("ID de desafio inválido fornecido.", 400);
      }

      const userIdValidation = IdSchema.safeParse(userId);
      if (!userIdValidation.success) {
        throw new ApplicationError("ID de submissão inválido fornecido.", 400);
      }
      const submissions = await this.submissionService.findByChallengeId(
        challengeIdValidation.data,
        userIdValidation.data,
      );

      return {
        success: true,
        statusCode: 200,
        body: submissions.map((s) => mapSubmissionDTO(s)),
      };
    } catch (err) {
      return ApplicationError.handleControllerError(err);
    }
  }
}
