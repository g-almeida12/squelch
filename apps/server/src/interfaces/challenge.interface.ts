import {
  ChallengeEntity,
  UserSessionEntity,
} from "../entities/types.entities.js";
import {
  ChallengeCreate,
  ChallengeDTO,
  ChallengeUpdate,
  Id,
} from "@squelch/shared";

export interface IChallengeRepository {
  create(newChallenge: ChallengeCreate): Promise<ChallengeEntity>;

  createUserSession(
    challengeId: Id,
    groupSlug: string,
    session: string,
    userId: Id,
  ): Promise<UserSessionEntity>;

  findUserSession(
    challengeId: Id,
    userId: Id,
  ): Promise<UserSessionEntity | null>;

  findById(challengeId: Id): Promise<ChallengeEntity | null>;

  findByTitle(title: string): Promise<ChallengeEntity | null>;

  updateById(
    challengeId: Id,
    challengeData: ChallengeUpdate,
  ): Promise<ChallengeEntity | null>;

  deleteById(challengeId: Id): Promise<boolean>;

  deleteAllUserSessions(userId: Id): Promise<number>;
}

export interface IChallengeService {
  create(newChallenge: ChallengeCreate): Promise<ChallengeDTO>;

  getUserSession(challengeId: Id, groupSlug: string, userId: Id): Promise<string>;

  findById(challengeId: Id): Promise<ChallengeDTO>;

  updateById(
    challengeId: Id,
    challengeData: ChallengeUpdate,
  ): Promise<ChallengeDTO>;

  deleteById(challengeId: Id): Promise<void>;

  deleteAllUserSessions(userId: Id): Promise<void>;
}
