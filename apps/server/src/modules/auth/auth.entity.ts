import { Id, UserAuthDTO } from "@squelch/shared";
import { UserEntity } from "../user/index.js";

export type RefreshTokenEntity = {
  id: Id;
  user_id: Id;
  token: string;
  expires_at: string;
  revoked_at: string;
  revocation_reason: "ROTATION" | "SECURITY_BREACH" | "LOGOUT" | null;
};

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
