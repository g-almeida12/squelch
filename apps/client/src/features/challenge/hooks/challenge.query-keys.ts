export const challengeQueryKeys = {
  all: ["challenges"] as const,
  challenge: (id: number) => [...challengeQueryKeys.all, id] as const,
  list: () => [...challengeQueryKeys.all, "list"] as const,
  resume: () => [...challengeQueryKeys.all, "resume"] as const,
} as const;
