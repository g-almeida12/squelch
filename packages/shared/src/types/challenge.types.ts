import { ChallengeDTO } from "../schemas/challenge.schemas";
import { Id } from "../schemas/id.schemas";

export type ChallengeResume = Omit<ChallengeDTO, "markdown"> & {
  userId: Id;
  totalSubmissions: number;
  lastSubmissionDate: Date;
};

export type ChallengeListItem = Omit<ChallengeDTO, "markdown"> & {
  completedByUser: boolean;
};

export type ChallengeList = Record<string, ChallengeListItem[]>;
