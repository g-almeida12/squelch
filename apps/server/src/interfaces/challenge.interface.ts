import { RunResult } from "better-sqlite3";
import { ChallengeEntity } from "../entities/types.entities.js";
import {
  ChallengeCreate,
  ChallengeDTO,
  ChallengeUpdate,
} from "@squelch/shared";

export interface IChallengeRepository {
  create(newChallenge: ChallengeCreate): ChallengeEntity;

  findById(challengeId: number): ChallengeEntity | null;

  findByTitle(title: string): ChallengeEntity | null;

  updateById(
    challengeId: number,
    challengeData: ChallengeUpdate,
  ): ChallengeEntity | null;

  deleteById(challengeId: number): boolean;
}

export interface IChallengeService {
  create(newChallenge: ChallengeCreate): ChallengeDTO;

  findById(challengeId: number): ChallengeDTO;

  updateById(challengeId: number, challengeData: ChallengeUpdate): ChallengeDTO;

  deleteById(challengeId: number): void;
}
