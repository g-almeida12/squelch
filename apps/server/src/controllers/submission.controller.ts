import {
  HTTPResponse,
  IdSchema,
  QueryResult,
  SubmissionDTO,
  SubmissionValidationSchema,
} from "@squelch/shared";
import ApplicationError from "../helpers/errors/application.error.js";
import { ISubmissionService } from "../interfaces/submission.interfaces.js";
import { mapSubmissionDTO } from "../entities/mappers.entities.js";

export default class SubmissionController {
  constructor(private submissionService: ISubmissionService) {
    this.submissionService = submissionService;
  }

  async runQuery(
    submittedQuery: unknown,
    challengeId: unknown,
  ): Promise<HTTPResponse<QueryResult>> {
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

      return { success: true, statusCode: 200, body: userQueryResult };
    } catch (err) {
      return ApplicationError.handleControllerError(err);
    }
  }

  async validateAndSave(
    submission: unknown,
    challengeId: unknown,
    userId: unknown,
  ): Promise<
    HTTPResponse<{ submission: SubmissionDTO; errorMessages: string[] | null }>
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
