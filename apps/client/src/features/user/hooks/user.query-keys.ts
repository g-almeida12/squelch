export const userQueryKeys = {
  all: ["user"] as const,
  profile: () => [...userQueryKeys.all, "profile"] as const,
  progress: () => [...userQueryKeys.all, "progress"] as const,
} as const;
