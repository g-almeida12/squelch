export const submissionQueryKeys = {
  all: ["submissions"] as const,
  challenge: (id: number) =>
    [...submissionQueryKeys.all, "challenge", id] as const,
  submission: (id: number) =>
    [...submissionQueryKeys.all, "details", id] as const,
  user: () => [...submissionQueryKeys.all, "user"] as const,
} as const;
