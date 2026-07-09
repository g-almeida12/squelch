import { Router } from "express";
import { challengeController } from "../../config/factory.config.js";
import {
  authenticationMiddleware,
  AuthRequest,
} from "../../shared/middlewares/index.js";

export const challengeRouter = Router({ mergeParams: true });
challengeRouter.use(authenticationMiddleware);

// Get last pending challenge info route
challengeRouter.get("/challenges/resume", async (req: AuthRequest, res) => {
  const { success, statusCode, body } =
    await challengeController.getChallengeResume(req.user?.id);

  return res.status(statusCode).json({ success, body });
});

// Get challenge list to display in the sidebar
challengeRouter.get("/challenges/list", async (req: AuthRequest, res) => {
  const { success, statusCode, body } =
    await challengeController.getChallengeList(req.user?.id);

  return res.status(statusCode).json({ success, body });
});

// Find by ID route
challengeRouter.get(
  "/challenges/:challengeId",
  async (req: AuthRequest, res) => {
    const { success, statusCode, body } = await challengeController.findById(
      req.params?.challengeId,
      req.user?.id,
    );

    return res.status(statusCode).json({ success, body });
  },
);
