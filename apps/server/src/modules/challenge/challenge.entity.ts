import { ChallengeDifficulties, ChallengeDTO, Id } from "@squelch/shared";

export type ChallengeEntity = {
  id: Id;
  title: string;
  group_slug: string;
  markdown: string;
  difficulty: ChallengeDifficulties;
  validation_query: string;
};

export function mapChallengeDTO(challenge: ChallengeEntity): ChallengeDTO {
  return {
    id: challenge.id,
    title: challenge.title,
    groupSlug: challenge.group_slug,
    difficulty: challenge.difficulty,
    markdown: challenge.markdown,
  };
}
