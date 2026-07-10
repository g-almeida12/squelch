import { Id, AuthDTO } from "@squelch/shared";
import { UserEntity } from "../user/index.js";

export type AuthEntity = UserEntity & {
  access_token: string;
  refresh_token: string;
  xsrf_token: string;
};

export type RefreshTokenEntity = {
  id: Id;
  user_id: Id;
  token: string;
  expires_at: string;
  revoked_at: string;
  revocation_reason: "ROTATION" | "SECURITY_BREACH" | "LOGOUT" | null;
};

export function mapAuthDTO(auth: AuthEntity): AuthDTO {
  return {
    name: auth.name,
    email: auth.email,
    id: auth.id,
    xsrfToken: auth.xsrf_token,
  };
}
