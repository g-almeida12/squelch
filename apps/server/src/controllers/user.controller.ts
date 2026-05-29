import {
  HTTPResponse,
  IdSchema,
  UserUpdateSchema,
  UserDTO,
} from "@squelch/shared";
import ApplicationError from "../helpers/errors/application.error.js";
import { IUserService } from "../interfaces/user.interfaces.js";

export default class UserController {
  constructor(private userService: IUserService) {
    this.userService = userService;
  }

  async findById(userId: unknown): Promise<HTTPResponse<UserDTO>> {
    try {
      const validation = IdSchema.safeParse(userId);
      if (!validation.success) {
        throw new ApplicationError("ID de usuário inválido fornecido.", 400);
      }

      const user = await this.userService.findById(Number(userId));
      return { success: true, body: user, statusCode: 200 };
    } catch (err) {
      return ApplicationError.handleControllerError(err);
    }
  }

  async updateById(
    userId: unknown,
    newData: unknown,
  ): Promise<HTTPResponse<UserDTO>> {
    try {
      const idValidation = IdSchema.safeParse(userId);
      if (!idValidation.success) {
        throw new ApplicationError("ID de usuário inválido fornecido.", 400);
      }

      const dataValidation = UserUpdateSchema.safeParse(newData);
      if (!dataValidation.success) {
        const invalidFields = dataValidation.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        }));

        throw new ApplicationError(
          "Payload inválido fornecido para atualizar usuário",
          400,
          invalidFields,
        );
      }

      const updatedUser = await this.userService.updateById(
        idValidation.data,
        dataValidation.data,
      );
      return { success: true, statusCode: 200, body: updatedUser };
    } catch (err) {
      return ApplicationError.handleControllerError(err);
    }
  }

  async deleteById(userId: unknown): Promise<HTTPResponse<null>> {
    try {
      const idValidation = IdSchema.safeParse(userId);
      if (!idValidation.success) {
        throw new ApplicationError("ID de usuário inválido fornecido.", 400);
      }

      await this.userService.deleteById(idValidation.data);
      return { success: true, statusCode: 204, body: null };
    } catch (err) {
      return ApplicationError.handleControllerError(err);
    }
  }
}
