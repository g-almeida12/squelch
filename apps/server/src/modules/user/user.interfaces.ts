import { UserUpdate, Id } from "@squelch/shared";
import { UserEntity, UserProgressEntity } from "./index.js";

export interface IUserRepository {
  getUserProgress(userId: Id): Promise<UserProgressEntity>;

  findById(userId: Id): Promise<UserEntity | null>;

  findByEmail(email: string): Promise<UserEntity | null>;

  updateById(
    userId: Id,
    newData: Partial<Omit<UserEntity, "id">>,
  ): Promise<UserEntity | null>;

  deleteById(userId: Id): Promise<boolean>;
}

export interface IUserService {
  getUserProgress(userId: Id): Promise<UserProgressEntity>;

  findById(userId: Id): Promise<UserEntity>;

  updateById(userId: Id, newData: UserUpdate): Promise<UserEntity>;

  deleteById(userId: Id): Promise<void>;
}
