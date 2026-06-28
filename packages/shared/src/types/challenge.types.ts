import { ChallengeDTO } from "../schemas/challenge.schemas";
import { Id } from "../schemas/id.schemas";

export type ChallengeResume = Omit<ChallengeDTO, "markdown"> & {
  userId: Id;
  groupTitle: string;
  totalSubmissions: number;
  lastSubmissionDate: Date;
};
