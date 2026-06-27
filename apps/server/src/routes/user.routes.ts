import { Router } from "express";
import { userController } from "../config/factory.config.js";
import {
  authenticationMiddleware,
  AuthRequest,
} from "../middlewares/authentication.middleware.js";
import { removeTokens } from "../helpers/tokens.js";

export const userRouter = Router({ mergeParams: true });
userRouter.use(authenticationMiddleware);

// Get user progress route
userRouter.get("/users/progress", async (req: AuthRequest, res) => {
  const { success, statusCode, body } = await userController.getUserProgress(
    req.user?.id,
  );

  return res.status(statusCode).json({ success, body });
});

// Find by ID route
userRouter.get("/users", async (req: AuthRequest, res) => {
  const { statusCode, success, body } = await userController.findById(
    req.user?.id,
  );

  return res.status(statusCode).json({ success, body });
});

// Update route
userRouter.patch("/users", async (req: AuthRequest, res) => {
  const { statusCode, success, body } = await userController.updateById(
    req.user?.id,
    req.body,
  );

  return res.status(statusCode).json({ success, body });
});

// Delete route
userRouter.delete("/users", async (req: AuthRequest, res) => {
  const { statusCode, success, body } = await userController.deleteById(
    req.user?.id,
  );

  removeTokens(res);

  return res.status(statusCode).json({ success, body });
});
