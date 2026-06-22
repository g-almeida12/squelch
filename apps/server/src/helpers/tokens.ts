import { Response } from "express";

const cookieOptionsBase = {
  sameSite: "none" as const,
  secure: true,
  partitioned: true,
};

const COOKIES = {
  ACCESS_TOKEN: {
    ...cookieOptionsBase,
    httpOnly: true,
    maxAge: 1000 * 60 * 15, // 15 minutes
    path: "/",
  },
  REFRESH_TOKEN: {
    ...cookieOptionsBase,
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    path: "/auth/refresh",
  },
  XSRF_TOKEN: {
    ...cookieOptionsBase,
    httpOnly: false,
    path: "/",
  },
} as const;

export function setTokens(
  res: Response,
  tokens: { accessToken: string; refreshToken: string; xsrfToken: string },
) {
  res.cookie("access_token", tokens.accessToken, COOKIES.ACCESS_TOKEN);

  res.cookie("refresh_token", tokens.refreshToken, COOKIES.REFRESH_TOKEN);

  res.cookie("xsrf_token", tokens.xsrfToken, COOKIES.XSRF_TOKEN);
}

export function removeTokens(res: Response) {
  res.clearCookie("access_token", COOKIES.ACCESS_TOKEN);
  res.clearCookie("refresh_token", COOKIES.REFRESH_TOKEN);
  res.clearCookie("xsrf_token", COOKIES.XSRF_TOKEN);
}
