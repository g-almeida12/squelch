import { SubmissionValidation, Id } from "@squelch/shared";
import {
  ISubmissionRepository,
  ISubmissionService,
} from "../interfaces/submission.interfaces.js";
import ApplicationError from "../helpers/errors/application.error.js";
import { IChallengeService } from "../interfaces/challenge.interface.js";
import Database, { SqliteError } from "better-sqlite3";
import { join } from "node:path";
import {
  compareQueryResults,
  QueryValidationResult,
} from "../helpers/compare-query-results.helpers.js";
import {
  QueryRunEntity,
  SubmissionEntity,
} from "../entities/types.entities.js";

export default class SubmissionService implements ISubmissionService {
  constructor(
    private submissionRepository: ISubmissionRepository,
    private challengeService: IChallengeService,
  ) {
    this.submissionRepository = submissionRepository;
    this.challengeService = challengeService;
  }

  async runQuery(
    submittedQuery: string,
    challengeId: Id,
  ): Promise<QueryRunEntity[]> {
    const challenge = await this.challengeService.findById(challengeId);

    const folderPath = join(
      process.cwd(),
      "challenges",
      "groups",
      challenge.group_slug,
      "challenge.db",
    );
    const sandboxDb = new Database(folderPath, { readonly: true });

    try {
      const userAnswerStmt = sandboxDb.prepare(submittedQuery);
      const userAnswer = userAnswerStmt.all() as QueryRunEntity[];

      return userAnswer;
    } catch (err) {
      if (err instanceof SqliteError) {
        switch (err.code) {
          case "SQLITE_READONLY":
            throw new ApplicationError(
              "Query de alteração enviada. Apenas SELECTs são permitidos",
              422,
              [{ field: "submittedQuery", message: err.message }],
            );

          case "SQLITE_ERROR":
            throw new ApplicationError(
              "Sintaxe inválida para a query fornecida.",
              422,
              [{ field: "submittedQuery", message: err.message }],
            );

          default:
            throw new ApplicationError("Erro desconhecido do SQLite.", 500, [
              { field: "submittedQuery", message: err.message },
            ]);
        }
      } else if (err instanceof ApplicationError) {
        throw err;
      }

      throw new ApplicationError("Erro desconhecido do servidor", 500);
    }
  }

  async validateAndSave(
    submission: SubmissionValidation,
    challengeId: Id,
    userId: Id,
  ): Promise<{
    submission: SubmissionEntity;
    queryResult: QueryRunEntity[];
    errorMessages: string[] | null;
  }> {
    const challenge = await this.challengeService.findById(challengeId);

    const userQueryResult = await this.runQuery(
      submission.submittedQuery,
      challengeId,
    );
    const expectedQueryResult = await this.runQuery(
      challenge.validation_query,
      challengeId,
    );

    const queryValidationResult = compareQueryResults(
      userQueryResult,
      expectedQueryResult,
    );
    const { errorMessages, success } = this._verifyQueryRunResultErrors(
      queryValidationResult,
    );

    let savedSubmission;
    if (success) {
      savedSubmission = await this.submissionRepository.save({
        ...submission,
        success: true,
        userQueryResult,
        userId,
        challengeId,
      });
    } else {
      savedSubmission = await this.submissionRepository.save({
        ...submission,
        success: false,
        userQueryResult,
        userId,
        challengeId,
      });
    }

    return {
      submission: savedSubmission,
      queryResult: userQueryResult,
      errorMessages,
    };
  }

  async findById(submissionId: Id, userId: Id): Promise<SubmissionEntity> {
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

    return submission;
  }

  async findByUserId(userId: Id): Promise<SubmissionEntity[]> {
    const submissions = await this.submissionRepository.findByUserId(userId);

    return submissions;
  }

  async findByChallengeId(
    challengeId: Id,
    userId: Id,
  ): Promise<SubmissionEntity[]> {
    const submissions = await this.submissionRepository.findByChallengeId(
      challengeId,
      userId,
    );

    return submissions;
  }

  async deleteAllUserSubmissions(userId: Id): Promise<void> {
    await this.submissionRepository.deleteAllUserSubmissions(userId);
  }

  private _verifyQueryRunResultErrors(
    queryValidationResult: QueryValidationResult,
  ): { errorMessages: string[] | null; success: boolean } {
    // Check the number of rows
    if (queryValidationResult.differenceInRows < 0) {
      return {
        errorMessages: ["Quantidade de linhas menor que o esperado."],
        success: false,
      };
    } else if (queryValidationResult.differenceInRows > 0) {
      return {
        errorMessages: ["Quantidade de linhas maior que o esperado."],
        success: false,
      };
    }

    // Check the number of columns
    if (queryValidationResult.differenceInColumns < 0) {
      return {
        errorMessages: ["Quantidade de colunas menor que o esperado."],
        success: false,
      };
    } else if (queryValidationResult.differenceInColumns > 0) {
      return {
        errorMessages: ["Quantidade de colunas maior que o esperado."],
        success: false,
      };
    }

    // Check the missing fields
    if (queryValidationResult.missingFields) {
      return {
        errorMessages: queryValidationResult.missingFields.map(
          (err) => `Campo esperado não fornecido: '${err}'`,
        ),
        success: false,
      };
    }

    // Check the wrong field values
    if (queryValidationResult.wrongField) {
      return {
        errorMessages: queryValidationResult.wrongField.map(
          (incorrectFieldValue) =>
            `Valor(es) incorreto(s) para o retorno no campo '${incorrectFieldValue}'.`,
        ),
        success: false,
      };
    }

    return { errorMessages: null, success: true };
  }
}
