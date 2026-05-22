import { ChallengeDTO, UserAuthDTO, UserDTO } from "@squelch/shared";
import { ChallengeEntity, UserEntity } from "./types.entities.js";

export function mapAuthUserDTO(
  user: UserEntity & {
    accessToken: string;
    refreshToken: string;
    xsrfToken: string;
  },
): UserAuthDTO {
  return {
    name: user.name,
    email: user.email,
    id: user.id,
    accessToken: user.accessToken,
    refreshToken: user.refreshToken,
    xsrfToken: user.xsrfToken,
  };
}

export function mapUserDTO(user: UserEntity): UserDTO {
  return {
    name: user.name,
    email: user.email,
    id: user.id,
  };
}

export function mapChallengeDTO(challenge: ChallengeEntity): ChallengeDTO {
  return {
    id: challenge.id,
    title: challenge.title,
    difficulty: challenge.difficulty,
    markdown: challenge.markdown,
  }
}
