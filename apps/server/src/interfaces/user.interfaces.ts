import { UpdateUser, UserDTO } from "@squelch/shared";
import { UserEntity } from "../entities/types.entities.js";

export interface IUserRepository {
  findById(userId: number): UserEntity | null;

  findByEmail(email: string): UserEntity | null;

  updateById(
    userId: number,
    newData: Partial<Omit<UserEntity, "id">>,
  ): UserEntity | null;

  deleteById(userId: number): boolean;
}

export interface IUserService {
  findById(userId: number): UserDTO;

  updateById(userId: number, newData: UpdateUser): UserDTO;

  deleteById(userId: number): void;
}
