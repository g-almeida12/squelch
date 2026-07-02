import {
  ChallengeDifficulties,
  ChallengeDTO,
  ChallengeResume,
  Id,
} from "@squelch/shared";

export type ChallengeEntity = {
  id: Id;
  title: string;
  group_slug: string;
  group_title: string;
  markdown: string;
  difficulty: ChallengeDifficulties;
  validation_query: string;
};

export type ChallengeResumeEntity = {
  id: Id;
  group_slug: string;
  title: string;
  difficulty: ChallengeDifficulties;
  user_id: Id;
  group_title: string;
  total_submissions: number;
  last_submission_date: string;
};

export function mapChallengeDTO(challenge: ChallengeEntity): ChallengeDTO {
  return {
    id: challenge.id,
    title: challenge.title,
    groupSlug: challenge.group_slug,
    groupTitle: challenge.group_title,
    difficulty: challenge.difficulty,
    markdown: challenge.markdown,
  };
}

export function mapChallengeResumeDTO(
  challengeResume: ChallengeResumeEntity,
): ChallengeResume {
  return {
    id: challengeResume.id,
    title: challengeResume.title,
    groupSlug: challengeResume.group_slug,
    difficulty: challengeResume.difficulty,
    groupTitle: challengeResume.group_title,
    userId: challengeResume.user_id,
    totalSubmissions: challengeResume.total_submissions,
    lastSubmissionDate: new Date(challengeResume.last_submission_date),
  };
}
