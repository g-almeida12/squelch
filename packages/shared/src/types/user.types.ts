export type RegisterUser = {
  name: string;
  email: string;
  password: string;
};

export type LoginUser = {
  email: string;
  password: string;
};

export type UpdateUser = Partial<RegisterUser>;

export type UserDTO = {
  id: number;
  name: string;
  email: string;
};

export type AuthUserDTO = UserDTO & {
  accessToken: string;
  xsrfToken: string;
};