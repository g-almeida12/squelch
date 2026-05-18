import { NextFunction, Request, Response } from "express";
import ApplicationError from "../helpers/errors/application.error.js";

export function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof ApplicationError) {
    return res.status(err.statusCode).json({
      success: false,
      body: { message: err.message, invalidFields: err.invalidFields },
    });
  }

  // !Deletar no deploy
  console.error(err);

  return res.status(500).json({
    success: false,
    body: {
      message: "Ops! Infelizmente um erro ocorreu.",
      invalidFields: [],
    },
  });
}
