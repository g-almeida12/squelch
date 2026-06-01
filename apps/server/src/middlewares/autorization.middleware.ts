import { NextFunction, Response } from "express";
import { AuthRequest } from "./authentication.middleware.js";
import ApplicationError from "../helpers/errors/application.error.js";

export function autorizationMiddleware(
  req: AuthRequest,
  _res: Response,
  next: NextFunction,
) {
  if (!req.user) {
    return next(new ApplicationError("Usuário não autenticado.", 401));
  }

  if (req.user.role !== "ADMIN") {
    return next(new ApplicationError("Acesso negado. Permissão insuficiente.", 403));
  }

  return next();
}
