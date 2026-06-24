import { UserUpdate, Id } from "@squelch/shared";
import {
  IUserRepository,
  IUserService,
} from "../interfaces/user.interfaces.js";
import ApplicationError from "../helpers/errors/application.error.js";
import { UserEntity } from "../entities/types.entities.js";

export default class UserService implements IUserService {
  constructor(private userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async findById(userId: Id): Promise<UserEntity> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new ApplicationError("Usuário não encontrado.", 404);
    }

    return user;
  }

  async updateById(userId: Id, newData: UserUpdate): Promise<UserEntity> {
    const updatedUser = await this.userRepository.updateById(userId, newData);
    if (!updatedUser) {
      throw new ApplicationError("Usuário não encontrado.", 404);
    }

    return updatedUser;
  }

  async deleteById(userId: Id): Promise<void> {
    const isUserRegistered = await this.userRepository.deleteById(userId);
    if (!isUserRegistered) {
      throw new ApplicationError("Usuário não encontrado.", 404);
    }
  }
}
