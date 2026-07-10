import { Router } from "express";
import { authController } from "../../config/factory.config.js";
import { removeTokens, setTokens } from "../../shared/helpers/index.js";
import { mapAuthDTO } from "./auth.entity.js";

export const authRouter = Router({ mergeParams: true });

// Register route
authRouter.post("/auth/register", async (req, res) => {
  const { success, statusCode, body } = await authController.register(req.body);
  if (success) {
    setTokens(res, {
      accessToken: body.access_token,
      refreshToken: body.refresh_token,
      xsrfToken: body.xsrf_token,
    });

    return res.status(statusCode).json({ success, body: mapAuthDTO(body) });
  }

  return res.status(statusCode).json({ success, body });
});

// Login route
authRouter.post("/auth/login", async (req, res) => {
  const { success, statusCode, body } = await authController.login(req.body);
  if (success) {
    setTokens(res, {
      accessToken: body.access_token,
      refreshToken: body.refresh_token,
      xsrfToken: body.xsrf_token,
    });

    return res.status(statusCode).json({ success, body: mapAuthDTO(body) });
  }

  return res.status(statusCode).json({ success, body });
});

// Refresh route
authRouter.post("/auth/refresh", async (req, res) => {
  const { success, statusCode, body } = await authController.refresh(
    req.cookies.refresh_token,
  );
  if (success) {
    setTokens(res, {
      accessToken: body.access_token,
      refreshToken: body.refresh_token,
      xsrfToken: body.xsrf_token,
    });

    return res.status(statusCode).json({ success, body: mapAuthDTO(body) });
  }

  return res.status(statusCode).json({ success, body });
});

// Logout route
authRouter.post("/auth/logout", async (_req, res) => {
  removeTokens(res);

  return res.status(201).json({ success: true, body: null });
});
