export const submissionQueryKeys = {
  CHALLENGES: (id: number) => ["challenge", id, "submissions"] as const,
  SUBMISSION: (id: number) => ["submission", id] as const,
  USER_SUBMISSIONS: ["submissions"] as const,
};
