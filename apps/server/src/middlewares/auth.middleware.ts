import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import ApplicationError from "../helpers/errors/application.error.js";
import { envConfig } from "../config/env.config.js";
import AuthRepository from "../repositories/auth.repository.js";
import UserRepository from "../repositories/user.repository.js";

// TODO: trocar o authRepository.findByEmail por userRepository.findById
const userRepository = new UserRepository();

export interface AuthRequest extends Request {
  userId: number;
}

export function authMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  const authReq = req as AuthRequest;
  try {
    const accessToken = authReq.cookies?.access_token;
    if (!accessToken) {
      throw new ApplicationError("Token de autenticação não enviado.", 401);
    }

    const JWT_SECRET = envConfig.JWT_SECRET;
    const decoded = jwt.verify(accessToken, JWT_SECRET) as {
      sub: string;
      email: string;
    };

    const user = userRepository.findById(Number(decoded.sub));
    if (!user) {
      throw new ApplicationError("Usuário não encontrado.", 404);
    }

    authReq.userId = user.id;
    next();
  } catch (err) {
    if (err instanceof ApplicationError) {
      return next(err);
    }

    return next(new ApplicationError("Sessão inválida ou expirada.", 403));
  }
}
