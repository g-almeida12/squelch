export const CHALLENGE_QUERY_KEYS = {
  CHALLENGE: (id: number) => ["challenge", id] as const,
  CHALLENGE_LIST: ["challenge", "list"],
  CHALLENGE_RESUME: ["challenge", "resume"],
} as const;
