import { ChallengeDifficulties, Id } from "@squelch/shared";

export type UserEntity = {
  id: Id;
  name: string;
  email: string;
  password: string;
  role: "USER" | "ADMIN";
};

export type ChallengeEntity = {
  id: Id;
  title: string;
  markdown: string;
  difficulty: ChallengeDifficulties;
  validation_query: string;
  affected_rows: number;
};

export type SubmissionEntity = {
  id: Id;
  user_id: Id;
  challenge_id: Id;
  submitted_query: string;
  date: string;
  success: boolean;
  user_wrong_result: string | null;
}

export type UserSessionEntity = {
  id: Id;
  user_id: Id;
  challenge_id: Id;
  group_slug: string;
  session: string;
}

export type RefreshTokenEntity = {
  id: Id;
  user_id: Id;
  token: string;
  expires_at: string;
  revoked_at: string;
  revocation_reason: "ROTATION" | "SECURITY_BREACH" | "LOGOUT" | null;
};
