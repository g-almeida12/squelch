import { Router } from "express";
import { userController } from "../config/factory.config.js";
import { authMiddleware, AuthRequest } from "../middlewares/auth.middleware.js";
import { removeTokens } from "../helpers/set-tokens.js";

export const userRouter = Router({ mergeParams: true });
userRouter.use(authMiddleware);

// Find by ID route
userRouter.get("/", async (req, res) => {
  const authReq = req as AuthRequest;
  const { statusCode, success, body } = userController.findById(authReq.userId);

  return res.status(statusCode).json({ success, body });
});

// Update route
userRouter.patch("/", async (req, res) => {
  const authReq = req as AuthRequest;
  const { statusCode, success, body } = userController.updateById(
    authReq.userId,
    authReq.body,
  );

  return res.status(statusCode).json({ success, body });
});

// Delete route
userRouter.delete("/", async (req, res) => {
  const authReq = req as AuthRequest;
  const { statusCode, success, body } = userController.deleteById(
    authReq.userId,
  );

  removeTokens(res);

  return res.status(statusCode).json({ success, body });
});
