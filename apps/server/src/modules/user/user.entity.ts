import { Id, UserDTO, UserProgressDTO } from "@squelch/shared";

export type UserEntity = {
  id: Id;
  name: string;
  email: string;
  password: string;
};

export type UserProgressEntity = {
  user_id: Id;
  completed_challenge_ids: Id[];
  completed_group_slugs: string[];
  total_challenges: number;
  total_groups: number;
  total_submissions: number;
}

export function mapUserDTO(user: UserEntity): UserDTO {
  return {
    name: user.name,
    email: user.email,
    id: user.id,  
  };
}

export function mapUserProgressDTO(
  userProgress: UserProgressEntity,
): UserProgressDTO {
  return {
    userId: userProgress.user_id,
    totalSubmissions: userProgress.total_submissions,
    totalChallenges: userProgress.total_challenges,
    totalGroups: userProgress.total_groups,
    completedChallengeIds: userProgress.completed_challenge_ids,
    completedGroupSlugs: userProgress.completed_group_slugs,
  };
}
