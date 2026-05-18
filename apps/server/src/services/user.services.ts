import { UpdateUser, UserDTO } from "@squelch/shared";
import {
  IUserRepository,
  IUserService,
} from "../interfaces/user.interfaces.js";
import ApplicationError from "../helpers/errors/application.error.js";
import { mapUserDTO } from "../entities/mappers.entities.js";

export default class UserService implements IUserService {
  private userRepository: IUserRepository;
  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  findById(userId: number): UserDTO {
    const user = this.userRepository.findById(userId);
    if (!user) {
      throw new ApplicationError("Usuário não encontrado.", 404);
    }

    return mapUserDTO(user);
  }

  updateById(userId: number, newData: UpdateUser): UserDTO {
    if (newData.email) {
      const user = this.userRepository.findByEmail(newData.email);
      if (user) {
        throw new ApplicationError("Email já registrado.", 409);
      }
    }
    
    const updatedUser = this.userRepository.updateById(userId, newData);
    if (!updatedUser) {
      throw new ApplicationError("Usuário não encontrado.", 404);
    }

    return mapUserDTO(updatedUser);
  }

  deleteById(userId: number): void {
    const isUserRegistered = this.userRepository.deleteById(userId);
    if (!isUserRegistered) {
      throw new ApplicationError("Usuário não encontrado.", 404);
    }
  }
}
