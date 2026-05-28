import { Router } from "express";
import { submissionController } from "../config/factory.config.js";
import {
  authenticationMiddleware,
  AuthRequest,
} from "../middlewares/authentication.middleware.js";

export const submissionRouter = Router({ mergeParams: true });
submissionRouter.use(authenticationMiddleware);

// Save route
submissionRouter.post("/", async (req: AuthRequest, res) => {
  const { success, statusCode, body } =
    await submissionController.validateAndSave(req.body, req.user?.id);

  return res.status(statusCode).json({ success, body });
});

// Find by challenge route
submissionRouter.get(
  "/challenges/:challengeId",
  async (req: AuthRequest, res) => {
    const { success, statusCode, body } =
      await submissionController.findByChallengeId(
        req.params?.challengeId,
        req.user?.id,
      );

    return res.status(statusCode).json({ success, body });
  },
);

// Find by ID route
submissionRouter.get("/:submissionId", async (req: AuthRequest, res) => {
  const { success, statusCode, body } = await submissionController.findById(
    req.params?.submissionId,
    req.user?.id,
  );

  return res.status(statusCode).json({ success, body });
});

// Find By user ID route
submissionRouter.get("/", async (req: AuthRequest, res) => {
  const { success, statusCode, body } = await submissionController.findByUserId(
    req.user?.id,
  );

  return res.status(statusCode).json({ success, body });
});
