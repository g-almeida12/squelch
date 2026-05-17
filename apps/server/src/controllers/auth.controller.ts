import {
  AuthUserDTO,
  HTTPResponse,
  LoginUser,
  LoginUserSchema,
  RegisterUser,
  RegisterUserSchema,
} from "@squelch/shared";
import { IAuthService } from "../interfaces/auth.interfaces.js";
import AuthService from "../services/auth.service.js";
import ApplicationError from "../helpers/errors/application.error.js";

export default class AuthController {
  private authService: IAuthService;
  constructor(authService: AuthService) {
    this.authService = authService;
  }

  async register(newUser: RegisterUser): Promise<HTTPResponse<AuthUserDTO>> {
    try {
      const validation = RegisterUserSchema.safeParse(newUser);
      if (!validation.success) {
        throw new ApplicationError(
          "Payload inválido fornecido para registrar usuário.",
          400,
        );
      }

      const registeredUser = await this.authService.register(validation.data);
      return { success: true, body: registeredUser, statusCode: 201 };
    } catch (err) {
        throw ApplicationError.controllerError(err);
    }
  }

  async login(user: LoginUser): Promise<HTTPResponse<AuthUserDTO>> {
    try {
      const validation = LoginUserSchema.safeParse(user);
      if (!validation.success) {
        throw new ApplicationError(
          "Payload inválido fornecido para conectar um usuário.",
          400,
        );
      }

      const loggedUser = await this.authService.login(user);
      return { success: true, body: loggedUser, statusCode: 200 };
    } catch (err) {
      throw ApplicationError.controllerError(err);
    }
  }
}
