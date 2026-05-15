export type SubmissionRequest = {
  challengeId: number;
  query: string;
};

export type SubmissionResponse = {
  id: number;
  challengeId: number;
  success: boolean;
  message: string;
  userResult: QueryResult | null;
  date: string;
};

export type QueryResult = {
  columns: string[];
  rows: Record<string, any>[];
};