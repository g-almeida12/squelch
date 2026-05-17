import ApplicationError from "./application.error.js";

export function repositoryError(err: Error) {
  // !Delete on deploy
  console.error(err);

  if (err instanceof ApplicationError) {
    return err;
  }

  return new ApplicationError("Unknown error", 500);
}
