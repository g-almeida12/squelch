export type ChallengeDTO = {
  id: number;
  title: string;
  markdown: string;
  difficulty: keyof typeof ChallengeDifficulties;
};

export const ChallengeDifficulties = {
  EASY: "FÁCIL",
  MEDIUM: "MODERADO",
  HARD: "DIFÍCIL",
} as const;