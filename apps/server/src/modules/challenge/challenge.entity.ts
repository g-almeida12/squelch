import {
  ChallengeDifficulties,
  ChallengeDTO,
  ChallengeListItem,
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
  completed_by_user: boolean;
  validation_query: string;
};

export type ChallengeQueryEntity = {
  id: Id;
  group_slug: string;
  validation_query: string;
}

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

export type ChallengeListItemEntity = {
  id: Id;
  group_slug: string;
  title: string;
  difficulty: ChallengeDifficulties;
  group_title: string;
  completed_by_user: boolean;
};

export function mapChallengeDTO(challenge: ChallengeEntity): ChallengeDTO {
  return {
    id: challenge.id,
    title: challenge.title,
    groupSlug: challenge.group_slug,
    groupTitle: challenge.group_title,
    difficulty: challenge.difficulty,
    markdown: challenge.markdown,
    completedByUser: challenge.completed_by_user
  };
}

export function mapChallengeList(
  challengeList: ChallengeListItemEntity[],
): Record<string, ChallengeListItem[]> {
  const sanitizedChallengeList: ChallengeListItem[] = challengeList.map(
    (c) => ({
      id: c.id,
      title: c.title,
      completedByUser: c.completed_by_user,
      difficulty: c.difficulty,
      groupSlug: c.group_slug,
      groupTitle: c.group_title,
    }),
  );

  return Object.groupBy(sanitizedChallengeList, (c) => c.groupTitle) as Record<
    string,
    ChallengeListItem[]
  >;
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
