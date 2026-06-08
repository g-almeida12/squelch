import { ChallengeEntity } from "../entities/types.entities.js";
import { Id } from "@squelch/shared";

export interface IChallengeRepository {
  findById(challengeId: Id): Promise<ChallengeEntity | null>;
}

export interface IChallengeService {
  findById(challengeId: Id): Promise<ChallengeEntity>;
}
