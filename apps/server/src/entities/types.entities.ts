import { ChallengeDifficulties } from "@squelch/shared";

export type UserEntity = {
  id: number;
  name: string;
  email: string;
  password: string;
  role: "USER" | "ADMIN";
};

export type ChallengeEntity = {
  id: number;
  title: string;
  markdown: string;
  difficulty: ChallengeDifficulties;
  validation_query: string;
  affected_rows: number;
};

export type SubmissionEntity = {
  id: number;
  user_id: number;
  challenge_id: number;
  submitted_query: string;
  date: string;
  success: boolean;
  user_wrong_result: string | null;
}

export type RefreshTokenEntity = {
  id: number;
  user_id: number;
  token: string;
  expires_at: string;
  revoked_at: string;
  revocation_reason: "ROTATION" | "SECURITY_BREACH" | "LOGOUT" | null;
};
