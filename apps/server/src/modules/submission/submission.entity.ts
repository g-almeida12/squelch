import { Id, SubmissionDTO, QueryResultDTO } from "@squelch/shared";

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

export type SubmissionSave = {
  challengeId: Id;
  submittedQuery: string;
  date: Date;
  success: boolean;
  userQueryResult: QueryResultDTO,
  userId: Id;
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
