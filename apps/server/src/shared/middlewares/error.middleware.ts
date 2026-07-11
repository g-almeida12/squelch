import { NextFunction, Request, Response } from "express";
import {ApplicationError} from "../errors/index.js";

export function errorMiddleware(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  console.error(`\n\n\x1b[1;31mError on request: ${err}\x1b[0;0m`);

  if (err instanceof ApplicationError) {
    return res.status(err.statusCode).json({
      success: false,
      body: { message: err.message, invalidFields: err.invalidFields },
    });
  }

  return res.status(500).json({
    success: false,
    body: {
      message: "Ops! Infelizmente um erro ocorreu.",
      invalidFields: [],
    },
  });
}
