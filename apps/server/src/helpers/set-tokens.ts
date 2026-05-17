import { Response } from "express";

export function setTokens(
  res: Response,
  tokens: { accessToken: string; xsrfToken: string },
) {
  res.cookie("access_token", tokens.accessToken, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    sameSite: "none",
    secure: true,
    partitioned: true,
    path: "/",
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
  res.clearCookie("xsrf_token", { path: "/" });
}
