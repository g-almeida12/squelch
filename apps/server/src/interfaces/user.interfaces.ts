import { UserDTO } from "@squelch/shared";
import { UserEntity } from "../entities/types.entities.js";

export interface IUserRepository {
  findById(userId: number): UserEntity | null;

  updateById(userId: number): UserEntity | null;

  deleteById(userId: number): UserEntity | null;
}

export interface IUserService {
  findById(userId: number): UserDTO;

  updateById(userId: number): UserDTO;

  deleteById(userId: number): UserDTO;
}
