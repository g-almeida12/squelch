import type { Id } from "../schemas";

export type ChallengeDifficulties = "EASY" | "MEDIUM" | "HARD";

export type ChallengeDTO = {
  title: string;
  markdown: string;
  groupSlug: string;
  groupTitle: string;
  difficulty: ChallengeDifficulties;
  completedByUser: boolean;
  id: Id;
};

export type ChallengeResume = Omit<
  ChallengeDTO,
  "markdown" | "completedByUser"
> & {
  userId: Id;
  totalSubmissions: number;
  lastSubmissionDate: Date;
};

export type ChallengeListItem = Omit<ChallengeDTO, "markdown">;

export type ChallengeList = Record<string, ChallengeListItem[]>;
