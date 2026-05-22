import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import ApplicationError from "../helpers/errors/application.error.js";
import { envConfig } from "../config/env.config.js";
import UserRepository from "../repositories/user.repository.js";

const userRepository = new UserRepository();

export interface AuthRequest extends Request {
  user?: {
    id: number;
    role: "USER" | "ADMIN";
  };
}

export function authenticationMiddleware(
  req: AuthRequest,
  _res: Response,
  next: NextFunction,
) {
  try {
    const accessToken = req.cookies?.access_token;
    if (!accessToken) {
      throw new ApplicationError("Token de autenticação não enviado.", 401);
    }

    const JWT_SECRET = envConfig.JWT_SECRET;
    const decoded = jwt.verify(accessToken, JWT_SECRET) as {
      sub: string;
      email: string;
      role: "USER" | "ADMIN";
    };

    const user = userRepository.findById(Number(decoded.sub));
    if (!user) {
      throw new ApplicationError("Usuário não encontrado.", 404);
    }

    req.user = { id: user.id, role: user.role };
    next();
  } catch (err) {
    if (err instanceof ApplicationError) {
      return next(err);
    }

    return next(new ApplicationError("Sessão inválida ou expirada.", 403));
  }
}
