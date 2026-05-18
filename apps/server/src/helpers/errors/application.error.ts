import { ErrorResponse, HTTPStatusCode } from "@squelch/shared";

export default class ApplicationError extends Error {
  public statusCode: HTTPStatusCode;
  public invalidFields: { field: string; message: string }[] | undefined;
  constructor(
    message: string,
    statusCode: HTTPStatusCode,
    invalidFields: { field: string; message: string }[] = [],
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
    // !Deletar no deploy
    console.error(err);

    if (err instanceof ApplicationError) {
      return err;
    }

    return new ApplicationError("Erro desconhecido.", 500);
  }

  static handleControllerError(err: unknown): ErrorResponse {
    // !Deletar no deploy
    console.error(err);
    
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
