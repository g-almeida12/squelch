import { AuthLoginSchema, AuthRegisterSchema } from "@squelch/shared";
import { AuthService, AuthEntity } from "./index.js";
import { ApplicationError } from "../../shared/errors/index.js";
import { HTTPResponse } from "../../shared/types/index.js";

export class AuthController {
  constructor(private authService: AuthService) {
    this.authService = authService;
  }

  async register(newUser: unknown): Promise<HTTPResponse<AuthEntity>> {
    try {
      const validation = AuthRegisterSchema.safeParse(newUser);
      if (!validation.success) {
        const invalidFields = validation.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        }));

        throw new ApplicationError(
          "Payload inválido fornecido para registrar usuário.",
          400,
          invalidFields,
        );
      }

      const registeredUser = await this.authService.register(validation.data);
      return { success: true, body: registeredUser, statusCode: 201 };
    } catch (err) {
      return ApplicationError.handleControllerError(err);
    }
  }

  async login(user: unknown): Promise<HTTPResponse<AuthEntity>> {
    try {
      const validation = AuthLoginSchema.safeParse(user);
      if (!validation.success) {
        const invalidFields = validation.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        }));

        throw new ApplicationError(
          "Payload inválido fornecido para conectar um usuário.",
          400,
          invalidFields,
        );
      }

      const loggedUser = await this.authService.login(validation.data);
      return { success: true, body: loggedUser, statusCode: 200 };
    } catch (err) {
      return ApplicationError.handleControllerError(err);
    }
  }

  async refresh(token: unknown): Promise<HTTPResponse<AuthEntity>> {
    try {
      if (!token || typeof token !== "string") {
        throw new ApplicationError(
          "Payload inválido fornecido para rotacionar um Refresh Token.",
          400,
        );
      }

      const refreshedUser = await this.authService.refresh(token);
      return { success: true, body: refreshedUser, statusCode: 200 };
    } catch (err) {
      return ApplicationError.handleControllerError(err);
    }
  }
}
