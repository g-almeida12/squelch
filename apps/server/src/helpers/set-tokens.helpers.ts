import { Response } from "express";

export function setTokens(
  res: Response,
  tokens: { accessToken: string; refreshToken: string; xsrfToken: string },
) {
  res.cookie("access_token", tokens.accessToken, {
    httpOnly: true,
    maxAge: 1000 * 60 * 15, // 15 minutes
    sameSite: "none",
    secure: true,
    partitioned: true,
    path: "/",
  });

  res.cookie("refresh_token", tokens.refreshToken, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    sameSite: "none",
    secure: true,
    partitioned: true,
    path: "/auth/refresh",
  });

  res.cookie("xsrf_token", tokens.xsrfToken, {
    httpOnly: false,
    sameSite: "none",
    secure: true,
    partitioned: true,
    path: "/",
  });
}

export function removeTokens(res: Response) {
  res.clearCookie("access_token", { path: "/" });
  res.clearCookie("refresh_token", { path: "/auth/refresh" });
  res.clearCookie("xsrf_token", { path: "/" });
}
