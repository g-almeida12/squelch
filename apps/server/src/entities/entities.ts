export type UserEntity = {
  id: number
  name: string;
  email: string;
  password: string;
}

export type ChallengeEntity = {
  id: number;
  title: string;
  markdown: string;
  validationQuery: string;
  affectedRows: number;
}

export type SubmissionEntity = {
  id: number;
  userId: number;
  challengeId: number;
  submittedQuery: string;
  success: boolean;
  userWrongResult: string;
  expectedResult: string;
  date: string;
}