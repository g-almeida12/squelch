import { HTTPStatusCode } from "@squelch/shared";
import { ErrorResponse } from "../types/index.js";

export class ApplicationError extends Error {
  constructor(
    message: string,
    public statusCode: HTTPStatusCode,
    public invalidFields: { field: string; message: string }[] = [],
  ) {
    super(message);
    this.statusCode = statusCode;
    this.invalidFields = invalidFields;

    this.name = "ApplicationError";

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  static repositoryError(err: unknown) {
    console.error('\n\nRepository error: ', err);

    if (err instanceof ApplicationError) {
      return err;
    }

    return new ApplicationError("Erro desconhecido.", 500);
  }

  static handleControllerError(err: unknown): ErrorResponse {
    console.error('\n\nController error: ', err);

    if (err instanceof ApplicationError) {
      return {
        success: false,
        statusCode: err.statusCode,
        body: {
          message: err.message,
          invalidFields: err.invalidFields,
        },
      };
    }

    return {
      success: false,
      statusCode: 500,
      body: {
        message: "Ops! Infelizmente um erro ocorreu.",
        invalidFields: [],
      },
    };
  }
}
