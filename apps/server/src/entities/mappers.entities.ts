import {
  ChallengeDTO,
  SubmissionDTO,
  UserAuthDTO,
  UserDTO,
  UserProgressDTO,
} from "@squelch/shared";
import {
  ChallengeEntity,
  SubmissionEntity,
  UserEntity,
  UserProgressEntity,
} from "./types.entities.js";

export function mapAuthUserDTO(
  user: UserEntity & {
    accessToken: string;
    refreshToken: string;
    xsrfToken: string;
  },
): UserAuthDTO {
  return {
    name: user.name,
    email: user.email,
    id: user.id,
    accessToken: user.accessToken,
    refreshToken: user.refreshToken,
    xsrfToken: user.xsrfToken,
  };
}

export function mapUserDTO(user: UserEntity): UserDTO {
  return {
    name: user.name,
    email: user.email,
    id: user.id,
  };
}

export function mapChallengeDTO(challenge: ChallengeEntity): ChallengeDTO {
  return {
    id: challenge.id,
    title: challenge.title,
    groupSlug: challenge.group_slug,
    difficulty: challenge.difficulty,
    markdown: challenge.markdown,
  };
}

export function mapSubmissionDTO(submission: SubmissionEntity): SubmissionDTO {
  return {
    id: submission.id,
    userId: submission.user_id,
    challengeId: submission.challenge_id,
    submittedQuery: submission.submitted_query,
    success: !!submission.success,
    userQueryResult: JSON.parse(submission.user_query_result),
    date: new Date(submission.date),
  };
}

export function mapUserProgressDTO(
  userProgress: UserProgressEntity,
): UserProgressDTO {
  return {
    userId: userProgress.user_id,
    totalSubmissions: userProgress.total_submissions,
    completedChallengeIds: userProgress.completed_challenge_ids,
    completedGroupSlugs: userProgress.completed_group_slugs,
  };
}
