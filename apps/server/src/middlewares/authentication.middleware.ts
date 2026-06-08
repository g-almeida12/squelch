import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import ApplicationError from "../helpers/errors/application.error.js";
import { envConfig } from "../config/env.config.js";
import UserRepository from "../repositories/user.repository.js";

const userRepository = new UserRepository();

export interface AuthRequest extends Request {
  user?: {
    id: number;
  };
}

export async function authenticationMiddleware(
  req: AuthRequest,
  _res: Response,
  next: NextFunction,
) {
  try {
    const accessToken = req.cookies?.access_token;
    if (!accessToken) {
      return next(
        new ApplicationError("Token de autenticação não enviado.", 401),
      );
    }

    const xsrfToken = req.cookies?.xsrf_token;
    const xsrfHeader = req.headers["x-xsrf-token"];
    if (!xsrfToken || !xsrfHeader || xsrfToken !== xsrfHeader) {
      return next(
        new ApplicationError("XSRF Token não enviado ou inválido.", 403),
      );
    }

    const JWT_SECRET = envConfig.JWT_SECRET;
    const decoded = jwt.verify(accessToken, JWT_SECRET) as {
      sub: string;
    };

    const user = await userRepository.findById(Number(decoded.sub));
    if (!user) {
      return next(new ApplicationError("Usuário não encontrado.", 404));
    }

    req.user = { id: user.id };
    next();
  } catch (err) {
    return next(new ApplicationError("Sessão inválida ou expirada.", 403));
  }
}
