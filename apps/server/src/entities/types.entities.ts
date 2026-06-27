import { ChallengeDifficulties, Id } from "@squelch/shared";

export type UserEntity = {
  id: Id;
  name: string;
  email: string;
  password: string;
};

export type ChallengeEntity = {
  id: Id;
  title: string;
  group_slug: string;
  markdown: string;
  difficulty: ChallengeDifficulties;
  validation_query: string;
};

export type SubmissionEntity = {
  id: Id;
  user_id: Id;
  challenge_id: Id;
  submitted_query: string;
  date: string;
  success: boolean;
  user_query_result: string;
};

export type QueryRunEntity = {
  [x: string]: string | number | boolean | null;
};

export type UserProgressEntity = {
  user_id: Id;
  completed_challenge_ids: Id[];
  completed_group_slugs: string[];
  total_submissions: number;
}

export type RefreshTokenEntity = {
  id: Id;
  user_id: Id;
  token: string;
  expires_at: string;
  revoked_at: string;
  revocation_reason: "ROTATION" | "SECURITY_BREACH" | "LOGOUT" | null;
};
