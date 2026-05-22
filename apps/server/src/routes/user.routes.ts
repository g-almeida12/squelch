import { Router } from "express";
import { userController } from "../config/factory.config.js";
import {
  authenticationMiddleware,
  AuthRequest,
} from "../middlewares/authentication.middleware.js";
import { removeTokens } from "../helpers/set-tokens.js";

export const userRouter = Router({ mergeParams: true });
userRouter.use(authenticationMiddleware);
// Find by ID route
userRouter.get("/", async (req: AuthRequest, res) => {
  const { statusCode, success, body } = userController.findById(req.user?.id);

  return res.status(statusCode).json({ success, body });
});

// Update route
userRouter.patch("/", async (req: AuthRequest, res) => {
  const authReq = req as AuthRequest;
  const { statusCode, success, body } = userController.updateById(
    req.user?.id,
    authReq.body,
  );

  return res.status(statusCode).json({ success, body });
});

// Delete route
userRouter.delete("/", async (req: AuthRequest, res) => {
  const { statusCode, success, body } = userController.deleteById(req.user?.id);

  removeTokens(res);

  return res.status(statusCode).json({ success, body });
});
