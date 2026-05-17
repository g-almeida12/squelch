import { AuthUserDTO } from "@squelch/shared";
import { UserEntity } from "./types.entities.js";

export default function mapAuthUserDTO(
  user: UserEntity & { accessToken: string; xsrfToken: string },
): AuthUserDTO {
  return {
    name: user.name,
    email: user.email,
    id: user.id,
    accessToken: user.accessToken,
    xsrfToken: user.xsrfToken,
  };
}
