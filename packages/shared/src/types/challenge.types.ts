import type { Id, ChallengeDTO } from "../schemas";

export type ChallengeResume = Omit<ChallengeDTO, "markdown"> & {
  userId: Id;
  totalSubmissions: number;
  lastSubmissionDate: Date;
};

export type ChallengeListItem = Omit<ChallengeDTO, "markdown"> & {
  completedByUser: boolean;
};

export type ChallengeList = Record<string, ChallengeListItem[]>;
