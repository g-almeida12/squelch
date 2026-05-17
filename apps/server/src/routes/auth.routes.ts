import { Router } from "express";
import { authController } from "../config/factory.config.js";
import { removeTokens, setTokens } from "../helpers/set-tokens.js";

export const authRouter = Router({ mergeParams: true });

// Register route
authRouter.post("/auth/register", async (req, res) => {
  const { success, statusCode, body } = await authController.register(req.body);
  if (success) {
    setTokens(res, {
      accessToken: body.accessToken,
      xsrfToken: body.xsrfToken,
    });
  }

  return res.status(statusCode).json({ success, body });
});

// Login route
authRouter.post("/auth/login", async (req, res) => {
  const { success, statusCode, body } = await authController.login(req.body);
  if (success) {
    setTokens(res, {
      accessToken: body.accessToken,
      xsrfToken: body.xsrfToken,
    });
  }

  return res.status(statusCode).json(body);
});

// Logout route
authRouter.post("/auth/logout", async (_req, res) => {
  removeTokens(res);

  return res.status(201);
});
