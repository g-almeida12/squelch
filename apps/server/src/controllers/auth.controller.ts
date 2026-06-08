import {
  UserAuthDTO,
  HTTPResponse,
  UserLoginSchema,
  UserRegisterSchema,
} from "@squelch/shared";
import AuthService from "../services/auth.service.js";
import ApplicationError from "../helpers/errors/application.error.js";

export default class AuthController {
  constructor(private authService: AuthService) {
    this.authService = authService;
  }

  async register(newUser: unknown): Promise<HTTPResponse<UserAuthDTO>> {
    try {
      const validation = UserRegisterSchema.safeParse(newUser);
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

  async login(user: unknown): Promise<HTTPResponse<UserAuthDTO>> {
    try {
      const validation = UserLoginSchema.safeParse(user);
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

  async refresh(token: string): Promise<HTTPResponse<UserAuthDTO>> {
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
