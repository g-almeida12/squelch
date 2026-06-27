export const submissionQueryKeys = {
  RUN: (id: number) => ["challenge", id, "query", "run"] as const,
  CHALLENGES: (id: number) => ["challenge", id, "submissions"] as const,
  SUBMISSION: (id: number) => ["submission", id] as const,
  USER_SUBMISSIONS: ["submissions"] as const,
};
