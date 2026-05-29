import { RunResult } from "better-sqlite3";
import { ChallengeEntity } from "../entities/types.entities.js";
import {
  ChallengeCreate,
  ChallengeDTO,
  ChallengeUpdate,
  Id,
} from "@squelch/shared";

export interface IChallengeRepository {
  create(newChallenge: ChallengeCreate): Promise<ChallengeEntity>;

  findById(challengeId: Id): Promise<ChallengeEntity | null>;

  findByTitle(title: string): Promise<ChallengeEntity | null>;

  updateById(
    challengeId: Id,
    challengeData: ChallengeUpdate,
  ): Promise<ChallengeEntity | null>;

  deleteById(challengeId: Id): Promise<boolean>;
}

export interface IChallengeService {
  create(newChallenge: ChallengeCreate): Promise<ChallengeDTO>;

  findById(challengeId: Id): Promise<ChallengeDTO>;

  updateById(challengeId: Id, challengeData: ChallengeUpdate): Promise<ChallengeDTO>;

  deleteById(challengeId: Id): Promise<void>;
}
