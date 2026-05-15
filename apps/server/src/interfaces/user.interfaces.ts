import { UserDTO } from "@squelch/shared";
import { UserEntity } from "../entities/entities.js";

export interface IUserRepository {
  findById(userId: number): Promise<UserEntity | null>;

  findByEmail(email: string): Promise<UserEntity | null>;

  updateById(userId: number): Promise<UserEntity | null>;

  deleteById(userId: number): Promise<UserEntity | null>;
}

export interface IUserService {
  findById(userId: number): Promise<UserDTO>;

  updateById(userId: number): Promise<UserDTO>;

  deleteById(userId: number): Promise<UserDTO>;
}