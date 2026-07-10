import type { Id } from "./";

export type ChallengeDifficultiesDTO = "EASY" | "MEDIUM" | "HARD";

export type ChallengeDTO = {
  title: string;
  markdown: string;
  groupSlug: string;
  groupTitle: string;
  difficulty: ChallengeDifficultiesDTO;
  completedByUser: boolean;
  id: Id;
};

export type ChallengeResumeDTO = Omit<
  ChallengeDTO,
  "markdown" | "completedByUser"
> & {
  userId: Id;
  totalSubmissions: number;
  lastSubmissionDate: Date;
};

export type ChallengeListItemDTO = Omit<ChallengeDTO, "markdown">;

export type ChallengeListDTO = Record<string, ChallengeListItemDTO[]>;
